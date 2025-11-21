import express from "express";
import prisma from "@cloudCB/db";
import { z } from "zod";
import crypto from "crypto";
const router = express.Router();

const createShareLinkSchema = z.object({
  noteId: z.string(),
  permission: z.enum(["VIEW", "EDIT"]),
  expiresIn: z.number().optional(), // days
  password: z.string().optional(),
});

const addCollaboratorSchema = z.object({
  noteId: z.string(),
  email: z.string().email(),
  role: z.enum(["VIEWER", "EDITOR"]),
});

// Create share link
router.post("/link", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = createShareLinkSchema.parse(req.body);

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

    // Generate unique token
    const token = crypto.randomBytes(32).toString("hex");

    // Calculate expiration
    let expiresAt = null;
    if (validatedData.expiresIn) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + validatedData.expiresIn);
    }

    // Hash password if provided
    let passwordHash = null;
    if (validatedData.password) {
      passwordHash = crypto
        .createHash("sha256")
        .update(validatedData.password)
        .digest("hex");
    }

    const shareLink = await prisma.shareLink.create({
      data: {
        noteId: validatedData.noteId,
        token,
        permission: validatedData.permission,
        createdById: userId,
        expiresAt,
        isProtected: !!validatedData.password,
        passwordHash,
      },
    });

    res.status(201).json({
      ...shareLink,
      url: `${process.env.WEB_URL || process.env.CORS_ORIGIN}/share/${token}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error creating share link:", error);
    res.status(500).json({ error: "Failed to create share link" });
  }
});

// Get share links for a note
router.get("/link/:noteId", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { noteId } = req.params;

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

    const shareLinks = await prisma.shareLink.findMany({
      where: {
        noteId,
        revokedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(shareLinks);
  } catch (error) {
    console.error("Error fetching share links:", error);
    res.status(500).json({ error: "Failed to fetch share links" });
  }
});

// Revoke share link
router.delete("/link/:token", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { token } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
      include: {
        note: true,
      },
    });

    if (!shareLink) {
      return res.status(404).json({ error: "Share link not found" });
    }

    if (shareLink.note.ownerId !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.shareLink.update({
      where: { token },
      data: {
        revokedAt: new Date(),
      },
    });

    res.json({ message: "Share link revoked" });
  } catch (error) {
    console.error("Error revoking share link:", error);
    res.status(500).json({ error: "Failed to revoke share link" });
  }
});

// Add collaborator
router.post("/collaborator", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validatedData = addCollaboratorSchema.parse(req.body);

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

    // Find user by email
    const collaboratorUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!collaboratorUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already a collaborator
    const existing = await prisma.collaborator.findFirst({
      where: {
        noteId: validatedData.noteId,
        userId: collaboratorUser.id,
      },
    });

    if (existing) {
      return res.status(400).json({ error: "User is already a collaborator" });
    }

    const collaborator = await prisma.collaborator.create({
      data: {
        noteId: validatedData.noteId,
        userId: collaboratorUser.id,
        role: validatedData.role,
        invitedById: userId,
      },
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
    });

    res.status(201).json(collaborator);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }
    console.error("Error adding collaborator:", error);
    res.status(500).json({ error: "Failed to add collaborator" });
  }
});

// Get collaborators for a note
router.get("/collaborator/:noteId", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { noteId } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user has access to the note
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
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
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const collaborators = await prisma.collaborator.findMany({
      where: {
        noteId,
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(collaborators);
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    res.status(500).json({ error: "Failed to fetch collaborators" });
  }
});

// Remove collaborator
router.delete("/collaborator/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"] as string;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const collaborator = await prisma.collaborator.findUnique({
      where: { id },
      include: {
        note: true,
      },
    });

    if (!collaborator) {
      return res.status(404).json({ error: "Collaborator not found" });
    }

    if (collaborator.note.ownerId !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.collaborator.delete({
      where: { id },
    });

    res.json({ message: "Collaborator removed" });
  } catch (error) {
    console.error("Error removing collaborator:", error);
    res.status(500).json({ error: "Failed to remove collaborator" });
  }
});

export default router;
