"use client"

import DashboardHeader from "@/components/dashboard/header"
import CareerAssistance from "@/components/dashboard/career-assistance"

export default function CareerPage() {
  return (
    <div className="w-full">
      <DashboardHeader title="Career Assistance" />
      <div className="p-8">
        <CareerAssistance />
      </div>
    </div>
  )
}
