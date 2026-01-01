"use client"

import { useEffect, useState } from "react"

export function useCareerActivities() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("career-activities")
    setData(stored ? JSON.parse(stored) : {})
  }, [])

  return data
}
