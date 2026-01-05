"use client"

import { createContext, useContext, useState } from "react"

type AttendanceContextType = {
  overallPercentage: number
  setOverallPercentage: (value: number) => void
}

const AttendanceContext = createContext<AttendanceContextType | null>(null)

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [overallPercentage, setOverallPercentage] = useState<number>(0)

  return (
    <AttendanceContext.Provider value={{ overallPercentage, setOverallPercentage }}>
      {children}
    </AttendanceContext.Provider>
  )
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (!context) {
    throw new Error("useAttendance must be used inside AttendanceProvider")
  }
  return context
}
