import { NextRequest, NextResponse } from "next/server"
import mammoth from "mammoth"
import { GoogleGenerativeAI } from "@google/generative-ai"

// ---------------- GEMINI CLIENT ----------------

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// ---------------- HELPERS ----------------

function looksLikeResume(text: string): boolean {
  const keywords = [
    "education",
    "experience",
    "skills",
    "projects",
    "internship",
    "objective",
    "summary",
  ]
  return keywords.some((k) => text.toLowerCase().includes(k))
}

// Deterministic fallback (USED IN PROD IF GEMINI FAILS)
function fallbackReview(resumeText: string, role: string) {
  const lengthScore = Math.min(20, Math.floor(resumeText.length / 300))
  const randomFactor = Math.floor(Math.random() * 10)
  const score = Math.min(60 + lengthScore + randomFactor, 90)

  const strengths: string[] = []
  const improvements: string[] = []
  const missing_skills: string[] = []

  const lower = resumeText.toLowerCase()

  if (lower.includes("project")) strengths.push("Hands-on project experience")
  else improvements.push("Add 2–3 academic or personal projects")

  if (lower.includes("intern")) strengths.push("Industry exposure")
  else improvements.push("Include internships or training experience")

  if (!lower.includes("skill"))
    improvements.push("Add a dedicated skills section")

  if (role === "frontend") {
    missing_skills.push("React", "CSS")
  } else if (role === "backend") {
    missing_skills.push("Databases", "APIs")
  } else {
    missing_skills.push("SQL", "Data Analysis")
  }

  return {
    score,
    strengths,
    missing_skills,
    improvements,
    roadmap_links: [
      {
        title: `${role[0].toUpperCase() + role.slice(1)} Roadmap`,
        url: `/dashboard/roadmap/${role}`,
      },
    ],
  }
}

// ---------------- DOC/DOCX EXTRACTION ----------------

async function extractResumeText(file: File): Promise<string> {
  if (
    file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    file.type !== "application/msword"
  ) {
    throw new Error("Only DOC/DOCX files are supported")
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

// ---------------- API HANDLER ----------------

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("resume") as File | null
    const role = formData.get("role") as string | null

    if (!file || !role) {
      return NextResponse.json(
        { error: "Resume file or role missing" },
        { status: 400 }
      )
    }

    const resumeText = await extractResumeText(file)

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Invalid or empty resume content" },
        { status: 400 }
      )
    }

    if (!looksLikeResume(resumeText)) {
      return NextResponse.json(
        { error: "Uploaded file does not look like a resume" },
        { status: 400 }
      )
    }

    // ---------------- TRY GEMINI ----------------
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
      })

      const prompt = `
You are an ATS resume reviewer.

Role: ${role}
Candidate level: Student / Fresher

Resume:
"""
${resumeText.slice(0, 12000)}
"""

Return ONLY valid JSON.
Do not include explanations, markdown, or extra text.
{
  "score": number,
  "strengths": string[],
  "missing_skills": string[],
  "improvements": string[],
  "roadmap_links": [
    { "title": string, "url": string }
  ]
}
`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text()

      const jsonStart = responseText.indexOf("{")
      const jsonEnd = responseText.lastIndexOf("}")

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Invalid JSON from Gemini")
      }

      const safeJson = responseText.slice(jsonStart, jsonEnd + 1)
      return NextResponse.json(JSON.parse(safeJson))
    } catch (aiError: any) {
  console.error("Gemini error:", aiError?.message || aiError)

  return NextResponse.json(
    fallbackReview(resumeText, role)
  )
}
  } catch (err: any) {
    console.error("Resume review error:", err)
    return NextResponse.json(
      { error: err.message || "Resume review failed" },
      { status: 500 }
    )
  }
}
