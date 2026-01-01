"use client"

import type React from "react"
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"

interface User {
  email: string
  name: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userStr = sessionStorage.getItem("user")
    if (!userStr) {
      router.push("/")
    } else {
      setUser(JSON.parse(userStr))
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) return null

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar user={user} />
      <main className="flex-1 overflow-auto">
        {children}
        <Toaster />
        </main>
    </div>
  )
}
