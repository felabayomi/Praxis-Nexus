import type { Express } from "express";
import { nanoid } from "nanoid";
import type { ShareLink } from "@shared/schema";

const shareLinks: Map<string, ShareLink> = new Map();

export function registerShareRoutes(app: Express) {
  app.post("/api/share/create", async (req, res) => {
    try {
      const { type, project, title, content } = req.body;
      
      if (!type || !project || !title || !content) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const token = nanoid(12);
      const shareLink: ShareLink = {
        id: nanoid(),
        token,
        type,
        project,
        title,
        content,
        createdAt: new Date(),
      };

      shareLinks.set(token, shareLink);

      const shareUrl = `/share/${token}`;
      
      res.json({ 
        success: true, 
        token,
        shareUrl,
        fullUrl: `${req.protocol}://${req.get('host')}${shareUrl}`
      });
    } catch (error) {
      console.error("Failed to create share link:", error);
      res.status(500).json({ error: "Failed to create share link" });
    }
  });

  app.get("/api/share/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const shareLink = shareLinks.get(token);

      if (!shareLink) {
        return res.status(404).json({ error: "Share link not found or expired" });
      }

      if (shareLink.expiresAt && new Date() > shareLink.expiresAt) {
        shareLinks.delete(token);
        return res.status(404).json({ error: "Share link has expired" });
      }

      res.json(shareLink);
    } catch (error) {
      console.error("Failed to fetch share link:", error);
      res.status(500).json({ error: "Failed to fetch share link" });
    }
  });

  app.get("/api/shares", async (req, res) => {
    try {
      const links = Array.from(shareLinks.values()).map(link => ({
        token: link.token,
        type: link.type,
        project: link.project,
        title: link.title,
        createdAt: link.createdAt,
      }));
      res.json(links);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch share links" });
    }
  });

  app.delete("/api/share/:token", async (req, res) => {
    try {
      const { token } = req.params;
      if (shareLinks.has(token)) {
        shareLinks.delete(token);
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Share link not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete share link" });
    }
  });
}
