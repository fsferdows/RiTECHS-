import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { mentors } from "./src/mentor";

// Lazy-initialized GoogleGenAI core
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please configure a valid API key in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Copilot and Matchmaker Core
  app.post("/api/copilot", async (req, res) => {
    try {
      const { message, abstract, type = "general" } = req.body;
      const ai = getAI();

      // Compact mentor details for Gemini context representation to fit boundaries gracefully
      const mentorsList = mentors
        .filter(m => m.type === "mentor")
        .map(m => ({
          id: m.id,
          name: m.name,
          university: m.university,
          country: m.country,
          fields: m.fields || []
        }));

      if (type === "matchmaker" || abstract) {
        const textTarget = abstract || message || "";
        const prompt = `You are the RiTECHS AI Academic Matchmaker.
Analyze the following research summary or abstract text:
"${textTarget}"

Below is our elite directory of world-class publishing board mentors:
${JSON.stringify(mentorsList.slice(0, 95))}

Determine the 3 most suitable mentors from our board for this abstract.
Format your response as a JSON object matching this TypeScript structure:
{
  "answer": "A luxurious, senior academic advisor review summarizing the key theoretical pillars, methodologies, and technical novelty inside the abstract. Explain how these connect with our elite boarding team, in elegant markdown.",
  "matches": [
    {
      "mentorId": number,
      "rationale": "High-fidelity precise rationale explaining why this specific mentor's literature, university, or background matches the abstract."
    }
  ]
}
Return ONLY valid JSON. Absolutely no markdown wrappers or enclosing blocks outside of the JSON.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        const jsonText = response.text || "{}";
        const parsedData = JSON.parse(jsonText.replace(/```json|```/g, "").trim());
        res.json(parsedData);
      } else {
        // General Q&A Assistant response about RiTECHS and generic mentor recommendations
        const prompt = `You are the RiTECHS Premium Academic Co-pilot, a luxurious senior AI concierge guiding authors, students, PhD researchers, and scholars.
Our platform coordinates: Mentorial Board directories, international conferences (ICETCS, ITSS-IoE, AIoT-RSE), e-learning certifications, academic modifications (technical proofreading, formatting), and high-impact journal roadmap publishing.

Answer this query with elite academic authority, concise luxurious presentation, and practical directives:
"${message}"

If the query is related to specific academic topics, you may suggest up to 3 relevant board profiles from here:
${JSON.stringify(mentorsList.slice(0, 45))}

Format your response as a JSON object matching this structure:
{
  "answer": "The beautifully formatted complete answer using elegant headings, bullet points, or lists in clean markdown.",
  "matches": [
    {
      "mentorId": number,
      "rationale": "Briefly state how this mentor's profile suits their focus."
    }
  ]
}
Return ONLY valid JSON. No surrounding labels or formatting wrappers.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        const jsonText = response.text || "{}";
        const parsedData = JSON.parse(jsonText.replace(/```json|```/g, "").trim());
        res.json(parsedData);
      }
    } catch (err: any) {
      console.error("AI Copilot Error:", err);
      res.status(500).json({
        error: true,
        message: err.message || "An unexpected error occurred in our AI core. Please verify your GEMINI_API_KEY."
      });
    }
  });

  // Client asset serving / building
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[RiTECHS Server] Server running on http://localhost:${PORT}`);
  });
}

startServer();
