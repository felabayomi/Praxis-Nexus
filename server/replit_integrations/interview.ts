import type { Express } from "express";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export function registerInterviewRoutes(app: Express) {
  app.post("/api/interview/submit", async (req, res) => {
    try {
      const data = req.body;

      if (!data.participant_id || !data.consent_recording) {
        return res.status(400).json({ error: "Participant ID and consent are required." });
      }

      const result = await pool.query(
        `INSERT INTO interview_responses (
          participant_id, consent_recording,
          q1_description, q1_options,
          q2_options, q2_probe,
          q3_risk, q3_probe,
          q4_options, q4_probe,
          q5_options, q5_probe,
          q6_options, q6_probe,
          q7_rank1, q7_rank2, q7_rank3, q7_probe,
          q8_answer, q8_probe,
          q9_answer, q9_probe,
          q10_options, q10_probe,
          q11_options, q11_probe,
          q12_workflow, q12_probe,
          closing_question
        ) VALUES (
          $1, $2,
          $3, $4,
          $5, $6,
          $7, $8,
          $9, $10,
          $11, $12,
          $13, $14,
          $15, $16, $17, $18,
          $19, $20,
          $21, $22,
          $23, $24,
          $25, $26,
          $27, $28,
          $29
        ) RETURNING id, submitted_at`,
        [
          data.participant_id,
          data.consent_recording,
          data.q1_description || null,
          data.q1_options || [],
          data.q2_options || [],
          data.q2_probe || null,
          data.q3_risk || null,
          data.q3_probe || null,
          data.q4_options || [],
          data.q4_probe || null,
          data.q5_options || [],
          data.q5_probe || null,
          data.q6_options || [],
          data.q6_probe || null,
          data.q7_rank1 || null,
          data.q7_rank2 || null,
          data.q7_rank3 || null,
          data.q7_probe || null,
          data.q8_answer || null,
          data.q8_probe || null,
          data.q9_answer || null,
          data.q9_probe || null,
          data.q10_options || [],
          data.q10_probe || null,
          data.q11_options || [],
          data.q11_probe || null,
          data.q12_workflow || null,
          data.q12_probe || null,
          data.closing_question || null,
        ]
      );

      res.json({
        success: true,
        id: result.rows[0].id,
        submitted_at: result.rows[0].submitted_at,
      });
    } catch (error) {
      console.error("Failed to save interview response:", error);
      res.status(500).json({ error: "Failed to save response" });
    }
  });

  app.get("/api/interview/responses", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM interview_responses ORDER BY submitted_at DESC"
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Failed to fetch interview responses:", error);
      res.status(500).json({ error: "Failed to fetch responses" });
    }
  });

  app.get("/api/interview/responses/:id", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM interview_responses WHERE id = $1",
        [req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Response not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Failed to fetch interview response:", error);
      res.status(500).json({ error: "Failed to fetch response" });
    }
  });
}
