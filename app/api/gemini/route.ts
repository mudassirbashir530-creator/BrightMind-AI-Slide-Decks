import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini on server-side with key and User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { action, text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    let prompt = "";
    if (action === "shorten") {
      prompt = `Rewrite this presentation bullet point to be under 8 words. It must remain simple, friendly, clear, and perfectly designed for high-school students (ages 14-20). Do not include quotes in your final output. Return ONLY the rewritten bullet point: "${text}"`;
    } else {
      prompt = `Refine this presentation sentence or bullet point to be extremely professional, friendly, engaging for students (ages 14-20), and strictly under 8 words. Return ONLY the refined statement: "${text}"`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const result = response.text?.trim().replace(/^["']|["']$/g, "") || text;

    return NextResponse.json({ result });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
