"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download } from "lucide-react"

interface ExamResource {
  id: string
  subject: string
  exam: string
  date: string
  progress: number
  resources: number
  status: "Not Started" | "In Progress" | "Nearly Complete"
}

export default function ExamPreparation() {
  const [exams] = useState<ExamResource[]>([
    {
      id: "1",
      subject: "Data Structures",
      exam: "Midterm",
      date: "Feb 10, 2026",
      progress: 75,
      resources: 12,
      status: "In Progress",
    },
    {
      id: "2",
      subject: "Web Development",
      exam: "Final Project",
      date: "Feb 28, 2026",
      progress: 60,
      resources: 8,
      status: "In Progress",
    },
    {
      id: "3",
      subject: "Database Systems",
      exam: "Midterm",
      date: "Feb 15, 2026",
      progress: 85,
      resources: 15,
      status: "Nearly Complete",
    },
    {
      id: "4",
      subject: "Algorithms",
      exam: "Final",
      date: "Mar 5, 2026",
      progress: 40,
      resources: 10,
      status: "Not Started",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nearly Complete":
        return "bg-green-100 text-green-700"
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Not Started":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <BookOpen className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Exam Preparation</h3>
              <p className="text-sm text-slate-600">Track your study progress and access materials</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exams Grid */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{exam.subject}</h4>
                    <p className="text-sm text-slate-600">{exam.exam}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                    <Badge variant="outline">{exam.resources} resources</Badge>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Progress</span>
                    <span className="text-sm font-bold text-slate-900">{exam.progress}%</span>
                  </div>
                  <Progress value={exam.progress} className="h-3" />
                </div>

                {/* Date and Actions */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-600">Exam on {exam.date}</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Materials
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold h-11">
        Browse Study Materials Library
      </Button>
    </div>
  )
}
