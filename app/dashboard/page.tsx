"use client"
import DashboardHeader from "@/components/dashboard/header"
import StatsOverview from "@/components/dashboard/stats-overview"
import QuickActions from "@/components/dashboard/quick-actions"
import RecentActivity from "@/components/dashboard/recent-activity"

export default function Dashboard() {
  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="p-8 space-y-8">
        <StatsOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
