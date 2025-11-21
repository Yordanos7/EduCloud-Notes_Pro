import express from "express";
import prisma from "@cloudCB/db";
import { z } from "zod";

const router = express.Router();

const createTagSchema = z.object({
  name: z.string().min(1),
});

const addTagToNoteSchema = z.object({
  noteId: z.string(),
  tagName: z.string().min(1),
});

// Get all tags
router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            notes: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = createTagSchema.parse(req.body);

    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { name: validatedData.name },
    });

    if (existingTag) {
      return res.json(existingTag);
    }

    const tag = await prisma.tag.create({
      data: validatedData,
    });

    res.status(201).json(tag);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Failed to create tag" });
  }
});

// Add tag to note
router.post("/note", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = addTagToNoteSchema.parse(req.body);

    // Check if user owns the note
    const note = await prisma.note.findFirst({
      where: {
        id: validatedData.noteId,
        ownerId: userId,
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Get or create tag
    let tag = await prisma.tag.findUnique({
      where: { name: validatedData.tagName },
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: validatedData.tagName },
      });
    }

    // Add tag to note
    const noteTag = await prisma.noteTag.create({
      data: {
        noteId: validatedData.noteId,
        tagId: tag.id,
      },
      include: {
        tag: true,
      },
    });

    res.status(201).json(noteTag);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error adding tag to note:", error);
    res.status(500).json({ error: "Failed to add tag to note" });
  }
});

// Remove tag from note
router.delete("/note/:noteId/:tagId", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { noteId, tagId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user owns the note
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        ownerId: userId,
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await prisma.noteTag.delete({
      where: {
        noteId_tagId: {
          noteId,
          tagId,
        },
      },
    });

    res.json({ message: "Tag removed from note" });
  } catch (error) {
    console.error("Error removing tag from note:", error);
    res.status(500).json({ error: "Failed to remove tag from note" });
  }
});

export default router;
