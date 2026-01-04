"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Briefcase, Search, BarChart3, LogOut, Home, Menu, X } from "lucide-react"
import { useState } from "react"
import { TextSplit } from "../ui/text-split"

interface User {
  user: string
}


export default function Sidebar({ user }: User) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const isActive = (path: string) => pathname === path

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Attendance", href: "/dashboard/attendance" },
    { icon: Briefcase, label: "Career", href: "/dashboard/career" },
    { icon: Search, label: "Lost & Found", href: "/dashboard/lost-found" },
    { icon: BookOpen, label: "Exam Prep", href: "/dashboard/exam" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <>
      <aside
        className={`bg-white border-r border-gray-200 shadow-lg flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "w-72" : "w-24"
        }`}
      >
        {/* Header with Toggle */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div>
                <TextSplit
                    className="text-4xl font-semibold uppercase"
                    topClassName="text-blue-500"
                    bottomClassName="text-gray-500"
                  >
                    UIETMATE
                  </TextSplit>
                <p className="text-xs text-gray-500">College Hub</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        {user && isOpen && (
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Welcome</p>
            <p className="text-xs text-gray-600 truncate">{user}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                  active
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
                title={!isOpen ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <Button
            onClick={handleLogout}
            className={`w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
              !isOpen && "px-0"
            }`}
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}
