"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2, FileText } from "lucide-react"

type ReviewResult = {
  score: number
  strengths: string[]
  missing_skills: string[]
  improvements: string[]
  roadmap_links: { title: string; url: string }[]
}

export default function ResumeReview() {
  const [file, setFile] = useState<File | null>(null)
  const [role, setRole] = useState("frontend")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ReviewResult | null>(null)

  async function handleSubmit() {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("role", role)

      const res = await fetch("/api/resume-review", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Failed to review resume")
      }

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] p-4 flex flex-col items-center justify-center px-4 gap-8">
      {/* UPLOAD CARD */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">AI Resume Review</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload your resume and get role-specific AI feedback.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* FILE UPLOAD */}
          <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted transition">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="font-medium">
              {file ? file.name : "Click to upload resume"}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              DOCX (max 3MB)
            </span>

            <input
              type="file"
              accept=".doc,.docx"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

          </label>

          {/* ROLE SELECT */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Developer</SelectItem>
                <SelectItem value="analyst">Data Analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* CTA */}
          <Button
            className="w-full cursor-pointer"
            size="lg"
            disabled={!file || loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Reviewing Resume...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Review Resume
              </>
            )}
          </Button>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* RESULTS */}
      {result && (
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Resume Score: {result.score}/100</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <ResultSection title="Strengths" items={result.strengths} />
            <ResultSection
              title="Missing Skills"
              items={result.missing_skills}
            />
            <ResultSection
              title="Improvements"
              items={result.improvements}
            />

            <div>
              <h4 className="font-semibold mb-2">Recommended Roadmaps</h4>
              <div className="flex gap-3 flex-wrap">
                {result.roadmap_links.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    className="px-4 py-2 rounded-lg border hover:bg-muted text-sm"
                  >
                    {r.title}
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ResultSection({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <ul className="list-disc ml-6 space-y-1 text-sm">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
