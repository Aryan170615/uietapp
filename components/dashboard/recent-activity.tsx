"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, BookMarked } from "lucide-react"

export default function RecentActivity() {
  const activities = [
    { icon: CheckCircle, label: "Attendance marked", time: "Today", color: "text-green-600" },
    { icon: BookMarked, label: "Exam scheduled", time: "2 days ago", color: "text-blue-600" },
    { icon: AlertCircle, label: "Career event posted", time: "5 days ago", color: "text-orange-600" },
  ]

  return (
    <Card className="border-0 shadow-lg  lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg text-black">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = activity.icon
          return (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
              <Icon className={`w-5 h-5 ${activity.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{activity.label}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
