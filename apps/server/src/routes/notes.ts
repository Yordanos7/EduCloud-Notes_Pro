import express from "express";
import { PrismaClient } from "../../../../packages/db/generated/client.js";
import { z } from "zod";

const prisma = new PrismaClient();

const router = express.Router();

// Validation schemas
const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  contentMime: z.string().optional(),
  notebookId: z.string().optional(),
  summary: z.string().optional(),
});

const updateNoteSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  contentMime: z.string().optional(),
  summary: z.string().optional(),
  pinned: z.boolean().optional(),
});

// Get all notes for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const notes = await prisma.note.findMany({
      where: {
        ownerId: userId,
        isDeleted: false,
      },
      include: {
        notebook: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Get a single note by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const note = await prisma.note.findFirst({
      where: {
        id,
        OR: [
          { ownerId: userId },
          {
            collaborators: {
              some: {
                userId,
              },
            },
          },
        ],
        isDeleted: false,
      },
      include: {
        notebook: true,
        tags: {
          include: {
            tag: true,
          },
        },
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        revisions: {
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          include: {
            editor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = createNoteSchema.parse(req.body);

    const note = await prisma.note.create({
      data: {
        ...validatedData,
        ownerId: userId,
      },
      include: {
        notebook: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Create initial revision
    await prisma.revision.create({
      data: {
        noteId: note.id,
        editorId: userId,
        content: validatedData.content,
        contentMime: validatedData.contentMime,
        comment: "Initial version",
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId,
        action: "CREATE_NOTE",
        entityType: "Note",
        entityId: note.id,
        metadata: {
          title: note.title,
        },
      },
    });

    res.status(201).json(note);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = updateNoteSchema.parse(req.body);

    // Check if user has permission to edit
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        OR: [
          { ownerId: userId },
          {
            collaborators: {
              some: {
                userId,
                role: "EDITOR",
              },
            },
          },
        ],
        isDeleted: false,
      },
    });

    if (!existingNote) {
      return res.status(404).json({ error: "Note not found or no permission" });
    }

    const note = await prisma.note.update({
      where: { id },
      data: {
        ...validatedData,
        lastEditedAt: new Date(),
      },
      include: {
        notebook: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Create revision if content changed
    if (validatedData.content) {
      await prisma.revision.create({
        data: {
          noteId: note.id,
          editorId: userId,
          content: validatedData.content,
          contentMime: validatedData.contentMime,
        },
      });
    }

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId,
        action: "UPDATE_NOTE",
        entityType: "Note",
        entityId: note.id,
        metadata: {
          changes: validatedData,
        },
      },
    });

    res.json(note);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete a note (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is the owner
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        ownerId: userId,
        isDeleted: false,
      },
    });

    if (!existingNote) {
      return res.status(404).json({ error: "Note not found or no permission" });
    }

    await prisma.note.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId,
        action: "DELETE_NOTE",
        entityType: "Note",
        entityId: id,
        metadata: {
          title: existingNote.title,
        },
      },
    });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
