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

  // Export all interview responses as a downloadable JSON file
  app.get("/api/interview/export", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM interview_responses ORDER BY submitted_at ASC"
      );
      const filename = `interview-responses-${new Date().toISOString().slice(0, 10)}.json`;
      res.set("Content-Disposition", `attachment; filename="${filename}"`);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result.rows, null, 2));
    } catch (error) {
      console.error("Failed to export interview responses:", error);
      res.status(500).json({ error: "Failed to export responses" });
    }
  });

  // Import interview responses from a JSON export (replaces all existing rows)
  app.post("/api/interview/import", async (req, res) => {
    try {
      const rows: Record<string, unknown>[] = req.body;
      if (!Array.isArray(rows)) return res.status(400).json({ error: "Expected an array" });
      // Clear existing data then re-insert from the export
      await pool.query("TRUNCATE TABLE interview_responses RESTART IDENTITY");
      let imported = 0;
      for (const r of rows) {
        await pool.query(
          `INSERT INTO interview_responses (
            participant_id, consent_recording,
            q1_description, q1_options, q2_options, q2_probe,
            q3_risk, q3_probe, q4_options, q4_probe,
            q5_options, q5_probe, q6_options, q6_probe,
            q7_rank1, q7_rank2, q7_rank3, q7_probe,
            q8_answer, q8_probe, q9_answer, q9_probe,
            q10_options, q10_probe, q11_options, q11_probe,
            q12_workflow, q12_probe, closing_question, transcript, submitted_at
          ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
            $15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31
          )`,
          [
            r.participant_id, r.consent_recording,
            r.q1_description, r.q1_options, r.q2_options, r.q2_probe,
            r.q3_risk, r.q3_probe, r.q4_options, r.q4_probe,
            r.q5_options, r.q5_probe, r.q6_options, r.q6_probe,
            r.q7_rank1, r.q7_rank2, r.q7_rank3, r.q7_probe,
            r.q8_answer, r.q8_probe, r.q9_answer, r.q9_probe,
            r.q10_options, r.q10_probe, r.q11_options, r.q11_probe,
            r.q12_workflow, r.q12_probe, r.closing_question, r.transcript,
            r.submitted_at
          ]
        );
        imported++;
      }
      res.json({ success: true, imported });
    } catch (error) {
      console.error("Failed to import interview responses:", error);
      res.status(500).json({ error: "Failed to import responses" });
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

  app.patch("/api/interview/responses/:id/transcript", async (req, res) => {
    try {
      const { transcript } = req.body;
      const result = await pool.query(
        "UPDATE interview_responses SET transcript = $1 WHERE id = $2 RETURNING id",
        [transcript, req.params.id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Response not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save transcript:", error);
      res.status(500).json({ error: "Failed to save transcript" });
    }
  });

  app.get("/api/interview/data-for-generator", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM interview_responses ORDER BY submitted_at ASC"
      );
      
      if (result.rows.length === 0) {
        return res.json({ hasData: false, summary: "" });
      }

      let summary = "## INTERVIEW DATA FROM QUALITATIVE PILOT STUDY\n\n";
      
      for (const r of result.rows) {
        summary += `### Participant ${r.participant_id}\n\n`;
        
        if (r.q1_options?.length) summary += `Q1 Encounter context: ${r.q1_options.join(", ")}\n`;
        if (r.q1_description) summary += `Q1 Description: ${r.q1_description}\n`;
        if (r.q2_options?.length) summary += `Q2 Animals involved: ${r.q2_options.join(", ")}\n`;
        if (r.q2_probe) summary += `Q2 Identification confidence: ${r.q2_probe}\n`;
        if (r.q3_risk) summary += `Q3 Risk perception: ${r.q3_risk}\n`;
        if (r.q3_probe) summary += `Q3 Risk signs: ${r.q3_probe}\n`;
        if (r.q4_options?.length) summary += `Q4 Immediate response: ${r.q4_options.join(", ")}\n`;
        if (r.q4_probe) summary += `Q4 Why: ${r.q4_probe}\n`;
        if (r.q5_options?.length) summary += `Q5 Information needs: ${r.q5_options.join(", ")}\n`;
        if (r.q5_probe) summary += `Q5 Specifics: ${r.q5_probe}\n`;
        if (r.q6_options?.length) summary += `Q6 Prevention supports: ${r.q6_options.join(", ")}\n`;
        if (r.q6_probe) summary += `Q6 When used: ${r.q6_probe}\n`;
        if (r.q7_rank1) summary += `Q7 Top features: 1) ${r.q7_rank1}`;
        if (r.q7_rank2) summary += `, 2) ${r.q7_rank2}`;
        if (r.q7_rank3) summary += `, 3) ${r.q7_rank3}`;
        if (r.q7_rank1) summary += `\n`;
        if (r.q7_probe) summary += `Q7 Trust factors: ${r.q7_probe}\n`;
        if (r.q8_answer) summary += `Q8 Would report: ${r.q8_answer}\n`;
        if (r.q8_probe) summary += `Q8 Conditions: ${r.q8_probe}\n`;
        if (r.q9_answer) summary += `Q9 Trusted manager: ${r.q9_answer}\n`;
        if (r.q9_probe) summary += `Q9 Why: ${r.q9_probe}\n`;
        if (r.q10_options?.length) summary += `Q10 Privacy protections: ${r.q10_options.join(", ")}\n`;
        if (r.q10_probe) summary += `Q10 Biggest concern: ${r.q10_probe}\n`;
        if (r.q11_options?.length) summary += `Q11 Barriers: ${r.q11_options.join(", ")}\n`;
        if (r.q11_probe) summary += `Q11 Biggest barrier: ${r.q11_probe}\n`;
        if (r.q12_workflow) summary += `Q12 Ideal workflow: ${r.q12_workflow}\n`;
        if (r.q12_probe) summary += `Q12 Details: ${r.q12_probe}\n`;
        if (r.closing_question) summary += `Closing: ${r.closing_question}\n`;
        
        if (r.transcript) {
          summary += `\nFULL INTERVIEW TRANSCRIPT:\n${r.transcript}\n`;
        }
        
        summary += `\n---\n\n`;
      }

      res.json({ hasData: true, summary, count: result.rows.length });
    } catch (error) {
      console.error("Failed to build interview data summary:", error);
      res.status(500).json({ error: "Failed to fetch interview data" });
    }
  });

  // Coding sheets — one row per participant
  app.get("/api/coding-sheets", async (req, res) => {
    try {
      res.set("Cache-Control", "no-store");
      const result = await pool.query("SELECT participant_key, data FROM coding_sheets ORDER BY id ASC");
      if (result.rows.length === 0) return res.json({ data: null });
      const data = result.rows.map(r => r.data);
      res.json({ data });
    } catch (error) {
      console.error("Failed to fetch coding sheets:", error);
      res.status(500).json({ error: "Failed to fetch coding sheets" });
    }
  });

  // Flush endpoint — saves all sheets and removes any extra slots beyond the current count
  app.post("/api/coding-sheets/flush", async (req, res) => {
    try {
      const body = req.body;
      // Supports both array format (sendBeacon) and {sheets, totalCount} format
      const sheets: { key: string; data: unknown }[] = Array.isArray(body) ? body : body.sheets;
      const totalCount: number | undefined = Array.isArray(body) ? undefined : body.totalCount;
      if (!Array.isArray(sheets)) return res.json({ success: false });
      for (const { key, data } of sheets) {
        await pool.query(
          `INSERT INTO coding_sheets (participant_key, data, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (participant_key) DO UPDATE SET data = $2, updated_at = NOW()`,
          [key, JSON.stringify(data)]
        );
      }
      // If totalCount is provided, delete any slots beyond that count
      if (totalCount !== undefined) {
        const keepKeys = Array.from({ length: totalCount }, (_, i) => `slot-${i}`);
        if (keepKeys.length > 0) {
          await pool.query(
            `DELETE FROM coding_sheets WHERE participant_key LIKE 'slot-%' AND participant_key != ALL($1)`,
            [keepKeys]
          );
        } else {
          await pool.query(`DELETE FROM coding_sheets WHERE participant_key LIKE 'slot-%'`);
        }
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to flush coding sheets:", error);
      res.status(500).json({ error: "Failed to flush" });
    }
  });

  // Export all coding sheets as a downloadable JSON file
  app.get("/api/coding-sheets/export", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT participant_key, data, updated_at FROM coding_sheets ORDER BY id ASC"
      );
      const filename = `coding-sheets-${new Date().toISOString().slice(0, 10)}.json`;
      res.set("Content-Disposition", `attachment; filename="${filename}"`);
      res.set("Content-Type", "application/json");
      res.send(JSON.stringify(result.rows, null, 2));
    } catch (error) {
      console.error("Failed to export coding sheets:", error);
      res.status(500).json({ error: "Failed to export coding sheets" });
    }
  });

  // Import coding sheets from a JSON export (replaces all existing rows)
  app.post("/api/coding-sheets/import", async (req, res) => {
    try {
      const rows: { participant_key: string; data: unknown }[] = req.body;
      if (!Array.isArray(rows)) return res.status(400).json({ error: "Expected an array" });
      await pool.query("TRUNCATE TABLE coding_sheets RESTART IDENTITY");
      for (const row of rows) {
        await pool.query(
          `INSERT INTO coding_sheets (participant_key, data, updated_at)
           VALUES ($1, $2, NOW())`,
          [row.participant_key, JSON.stringify(row.data)]
        );
      }
      res.json({ success: true, imported: rows.length });
    } catch (error) {
      console.error("Failed to import coding sheets:", error);
      res.status(500).json({ error: "Failed to import coding sheets" });
    }
  });

  app.put("/api/coding-sheets/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { data } = req.body;
      await pool.query(
        `INSERT INTO coding_sheets (participant_key, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (participant_key) DO UPDATE SET data = $2, updated_at = NOW()`,
        [key, JSON.stringify(data)]
      );
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save coding sheet:", error);
      res.status(500).json({ error: "Failed to save coding sheet" });
    }
  });

  // Consent forms — one row per participant
  app.get("/api/consent-forms", async (req, res) => {
    try {
      const result = await pool.query("SELECT participant_key, data FROM consent_forms ORDER BY id ASC");
      if (result.rows.length === 0) return res.json({ data: null });
      const data = result.rows.map(r => r.data);
      res.json({ data });
    } catch (error) {
      console.error("Failed to fetch consent forms:", error);
      res.status(500).json({ error: "Failed to fetch consent forms" });
    }
  });

  app.put("/api/consent-forms/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const { data } = req.body;
      await pool.query(
        `INSERT INTO consent_forms (participant_key, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (participant_key) DO UPDATE SET data = $2, updated_at = NOW()`,
        [key, JSON.stringify(data)]
      );
      res.json({ success: true });
    } catch (error) {
      console.error("Failed to save consent form:", error);
      res.status(500).json({ error: "Failed to save consent form" });
    }
  });
}
