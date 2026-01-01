"use client"

import DashboardHeader from "@/components/dashboard/header"
import Attendance from "@/components/dashboard/attendance"

export default function AttendancePage() {
  return (
    <div className="w-full">
      <DashboardHeader title="Attendance Tracker" />
      <div className="p-8">
        <Attendance />
      </div>
    </div>
  )
}