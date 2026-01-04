import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import mammoth from "mammoth"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"

// ---------------- CONFIG ----------------

// DEV MODE → no OpenAI calls
const DEV_MODE = process.env.NODE_ENV === "development"

// Disable pdf.js worker (required for Next.js)
;(pdfjs as any).GlobalWorkerOptions.workerSrc = ""

// ---------------- PDF TEXT EXTRACTION ----------------

async function extractPdfText(data: Uint8Array): Promise<string> {
  const loadingTask = pdfjs.getDocument(
    {
      data,
      disableWorker: true,
    } as any
  )

  const pdf = await loadingTask.promise
  let text = ""

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const content = await page.getTextContent()

    text +=
      content.items.map((item: any) => item.str).join(" ") + "\n"
  }

  return text
}

// ---------------- RESUME EXTRACTION ----------------

async function extractResumeText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  if (file.type === "application/pdf") {
    return await extractPdfText(uint8Array)
  }

  // DOC / DOCX
  const buffer = Buffer.from(uint8Array)
  const doc = await mammoth.extractRawText({ buffer })
  return doc.value
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

    // ---------------- DEV MODE MOCK ----------------
    if (DEV_MODE) {
      return NextResponse.json({
        score: 74,
        strengths: [
          "Clean resume structure",
          "Relevant coursework",
          "Good academic background",
        ],
        missing_skills: [
          role === "frontend" ? "React" : "",
          role === "backend" ? "Databases" : "",
          role === "analyst" ? "SQL" : "",
        ].filter(Boolean),
        improvements: [
          "Add 2–3 real-world projects",
          "Quantify achievements using numbers",
          "Include internships or certifications",
        ],
        roadmap_links: [
          {
            title:
              role === "frontend"
                ? "Frontend Roadmap"
                : role === "backend"
                ? "Backend Roadmap"
                : "Analyst Roadmap",
            url:
              role === "frontend"
                ? "/dashboard/career/roadmap/frontend"
                : role === "backend"
                ? "/dashboard/career/roadmap/backend"
                : "/dashboard/career/roadmap/analyst",
          },
        ],
      })
    }

    // ---------------- REAL AI FLOW (PRODUCTION) ----------------

    const resumeText = await extractResumeText(file)

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract resume text" },
        { status: 400 }
      )
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })

    const prompt = `
You are an ATS resume reviewer.

Role: ${role}
Candidate level: Student / Fresher

Resume:
"""
${resumeText.slice(0, 12000)}
"""

Return STRICT JSON ONLY:

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    })

    const content = completion.choices[0].message.content
    if (!content) {
      return NextResponse.json(
        { error: "Empty AI response" },
        { status: 500 }
      )
    }

    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    console.error("Resume review error:", error)
    return NextResponse.json(
      { error: "Resume review failed" },
      { status: 500 }
    )
  }
}
