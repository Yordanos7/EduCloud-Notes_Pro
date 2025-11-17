import express from "express";
import { PrismaClient } from "../../../../packages/db/generated/client.js";
import crypto from "crypto";

const prisma = new PrismaClient();
const router = express.Router();

// Update note by share token (public route - no auth required)
router.put("/:token/save", async (req, res) => {
  try {
    const { token } = req.params;
    const { title, content, password } = req.body;

    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
      include: {
        note: true,
      },
    });

    if (!shareLink) {
      return res.status(404).json({ error: "Share link not found" });
    }

    // Check if revoked
    if (shareLink.revokedAt) {
      return res.status(403).json({ error: "This link has been revoked" });
    }

    // Check if expired
    if (shareLink.expiresAt && new Date(shareLink.expiresAt) < new Date()) {
      return res.status(403).json({ error: "This link has expired" });
    }

    // Check if has edit permission
    if (shareLink.permission !== "EDIT") {
      return res.status(403).json({ error: "No edit permission" });
    }

    // Check password if protected
    if (shareLink.isProtected && shareLink.passwordHash) {
      if (!password) {
        return res.status(401).json({ error: "Password required" });
      }

      const passwordHash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (passwordHash !== shareLink.passwordHash) {
        return res.status(401).json({ error: "Incorrect password" });
      }
    }

    // Update the note
    const updatedNote = await prisma.note.update({
      where: { id: shareLink.noteId },
      data: {
        title,
        content,
        lastEditedAt: new Date(),
      },
    });

    // Create revision
    await prisma.revision.create({
      data: {
        noteId: shareLink.noteId,
        editorId: "anonymous", // Since this is public access
        content,
        contentMime: "text/html",
        comment: "Edited via share link",
      },
    });

    res.json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating shared note:", error);
    res.status(500).json({ error: "Failed to update shared note" });
  }
});

// Get note by share token (public route - no auth required)
router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.query;

    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
      include: {
        note: {
          include: {
            owner: {
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

    if (!shareLink) {
      return res.status(404).json({ error: "Share link not found" });
    }

    // Check if revoked
    if (shareLink.revokedAt) {
      return res.status(403).json({ error: "This link has been revoked" });
    }

    // Check if expired
    if (shareLink.expiresAt && new Date(shareLink.expiresAt) < new Date()) {
      return res.status(403).json({ error: "This link has expired" });
    }

    // Check password if protected
    if (shareLink.isProtected && shareLink.passwordHash) {
      if (!password) {
        return res.status(401).json({
          error: "Password required",
          requiresPassword: true,
        });
      }

      const passwordHash = crypto
        .createHash("sha256")
        .update(password as string)
        .digest("hex");

      if (passwordHash !== shareLink.passwordHash) {
        return res.status(401).json({ error: "Incorrect password" });
      }
    }

    res.json({
      note: shareLink.note,
      permission: shareLink.permission,
      isProtected: shareLink.isProtected,
    });
  } catch (error) {
    console.error("Error accessing shared note:", error);
    res.status(500).json({ error: "Failed to access shared note" });
  }
});

export default router;
