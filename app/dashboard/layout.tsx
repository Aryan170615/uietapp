"use client"

import type React from "react"
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/dashboard/sidebar"
import { jwtDecode } from "jwt-decode"


type AuthPayload = {
  id: number
  email: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/")
      return
    }

    try {
      const decoded = jwtDecode<AuthPayload>(token)
      setUser(decoded.email)
    } catch {
      localStorage.clear()
      router.replace("/")
    } finally {
      setIsLoading(false)
    }
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
