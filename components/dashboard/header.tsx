"use client"

interface DashboardHeaderProps {
  title?: string
}

export default function DashboardHeader({ title = "Dashboard" }: DashboardHeaderProps) {
  return (
    <div className="border-b bg-slate-100 border-slate-200 sticky top-0 z-10">
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-slate-600 text-sm mt-1">Manage your college life efficiently</p>
      </div>
    </div>
  )
}
