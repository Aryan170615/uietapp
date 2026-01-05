"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react"
import { useContext } from "react"
import { useAttendance } from "@/app/context/attendanceContext"

export default function StatsOverview() {
  const { overallPercentage } = useAttendance()
  const stats = [
    {
      icon: TrendingUp,
      label: "Overall Attendance",
      value: `${overallPercentage}`,
      change: "+5%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      label: "Exams This Month",
      value: "3",
      change: "2 upcoming",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      label: "Career Events",
      value: "8",
      change: "4 attended",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      label: "Study Progress",
      value: "72%",
      change: "+12%",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
