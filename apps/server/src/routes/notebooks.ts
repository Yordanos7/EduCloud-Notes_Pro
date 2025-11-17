import express from "express";
import { PrismaClient } from "../../../../packages/db/generated/client.js";
import { z } from "zod";

const prisma = new PrismaClient();

const router = express.Router();

const createNotebookSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  visibility: z.enum(["PRIVATE", "TEAM", "PUBLIC"]).default("PRIVATE"),
});

const updateNotebookSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  visibility: z.enum(["PRIVATE", "TEAM", "PUBLIC"]).optional(),
});

// Get all notebooks for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const notebooks = await prisma.noteBook.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        notes: {
          where: {
            isDeleted: false,
          },
          select: {
            id: true,
            title: true,
            updatedAt: true,
          },
        },
        _count: {
          select: {
            notes: {
              where: {
                isDeleted: false,
              },
            },
          },
        },
      },
      orderBy: {
        updateAt: "desc",
      },
    });

    res.json(notebooks);
  } catch (error) {
    console.error("Error fetching notebooks:", error);
    res.status(500).json({ error: "Failed to fetch notebooks" });
  }
});

// Get a single notebook
router.get("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const notebook = await prisma.noteBook.findFirst({
      where: {
        id,
        ownerId: userId,
      },
      include: {
        notes: {
          where: {
            isDeleted: false,
          },
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    res.json(notebook);
  } catch (error) {
    console.error("Error fetching notebook:", error);
    res.status(500).json({ error: "Failed to fetch notebook" });
  }
});

// Create a new notebook
router.post("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = createNotebookSchema.parse(req.body);

    const notebook = await prisma.noteBook.create({
      data: {
        ...validatedData,
        ownerId: userId,
      },
    });

    res.status(201).json(notebook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error creating notebook:", error);
    res.status(500).json({ error: "Failed to create notebook" });
  }
});

// Update a notebook
router.put("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = updateNotebookSchema.parse(req.body);

    const notebook = await prisma.noteBook.updateMany({
      where: {
        id,
        ownerId: userId,
      },
      data: validatedData,
    });

    if (notebook.count === 0) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    const updatedNotebook = await prisma.noteBook.findUnique({
      where: { id },
    });

    res.json(updatedNotebook);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error updating notebook:", error);
    res.status(500).json({ error: "Failed to update notebook" });
  }
});

// Delete a notebook
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if notebook exists and belongs to user
    const notebook = await prisma.noteBook.findFirst({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found" });
    }

    // Delete the notebook (this will cascade to notes if configured)
    await prisma.noteBook.delete({
      where: { id },
    });

    res.json({ message: "Notebook deleted successfully" });
  } catch (error) {
    console.error("Error deleting notebook:", error);
    res.status(500).json({ error: "Failed to delete notebook" });
  }
});

export default router;
