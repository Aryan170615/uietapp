"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus } from "lucide-react"

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    { label: "Mark Attendance", href: "/dashboard/attendance" },
    { label: "View Exams", href: "/dashboard/exam" },
    { label: "Report Lost Item", href: "/dashboard/lost-found" },
    { label: "Find Career Events", href: "/dashboard/career" },
  ]

  return (
    <Card className="border-0 shadow-lg lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg lan">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => router.push(action.href)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-blue-50 group transition-colors"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
