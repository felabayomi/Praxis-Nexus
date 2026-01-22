import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerPresentationRoutes } from "./replit_integrations/ai-presentation";
import { sendContactEmail } from "./email";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerPresentationRoutes(app);
  
  app.get("/api/journal", async (req, res) => {
    try {
      const journal = await storage.getJournalEntry();
      res.json(journal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch journal data" });
    }
  });

  app.get("/api/months", async (req, res) => {
    try {
      const months = await storage.getMonths();
      res.json(months);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch months" });
    }
  });

  app.get("/api/months/:id", async (req, res) => {
    try {
      const month = await storage.getMonth(req.params.id);
      if (!month) {
        return res.status(404).json({ error: "Month not found" });
      }
      res.json(month);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch month" });
    }
  });

  app.get("/api/references", async (req, res) => {
    try {
      const references = await storage.getReferences();
      res.json(references);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch references" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required" });
      }

      await sendContactEmail({ name, email, subject, message });
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Failed to send contact email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  return httpServer;
}
