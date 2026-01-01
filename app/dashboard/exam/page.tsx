"use client"

import DashboardHeader from "@/components/dashboard/header"
import ExamPreparation from "@/components/dashboard/exam-preparation"

export default function ExamPage() {
  return (
    <div className="w-full">
      <DashboardHeader title="Exam Preparation" />
      <div className="p-8">
        <ExamPreparation />
      </div>
    </div>
  )
}
