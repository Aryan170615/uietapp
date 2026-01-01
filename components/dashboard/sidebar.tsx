"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Briefcase, Search, BarChart3, LogOut } from "lucide-react"

interface User {
  email: string
  name: string
}

interface SidebarProps {
  user: User | null
}

export default function Sidebar({ user }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Attendance", href: "/dashboard/attendance" },
    { icon: Briefcase, label: "Career", href: "/dashboard/career" },
    { icon: Search, label: "Lost & Found", href: "/dashboard/lost-found" },
    { icon: BookOpen, label: "Exam Prep", href: "/dashboard/exam" },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    router.push("/")
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col border-r border-slate-700">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center font-bold">
            U
          </div>
          <div>
            <h2 className="text-lg font-bold">UIETMATE</h2>
            <p className="text-xs text-slate-400">College Hub</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="px-6 py-4 border-b border-slate-700">
          <p className="text-xs text-slate-400 uppercase tracking-wide">Welcome</p>
          <p className="text-sm font-semibold truncate text-white">{user.name}</p>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
