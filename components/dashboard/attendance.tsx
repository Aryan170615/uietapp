"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TrendingUp, CalendarCheck, Plus } from "lucide-react"
import { toast } from "sonner"

interface AttendanceData {
  subject: string
  records: Record<string, "present" | "absent">
}

export default function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceData[]>([])

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [newSubject, setNewSubject] = useState("")

  /* -------------------- HELPERS -------------------- */
  const normalizeDate = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  /* -------------------- MARK ATTENDANCE -------------------- */
  const handleMarkAttendance = (isPresent: boolean) => {
    if (!selectedSubject || !selectedDate) return

    const today = normalizeDate(new Date())
    const selected = normalizeDate(selectedDate)

    if (selected.getTime() > today.getTime()) {
      toast.error("cannot mark attendance for future dates.", {
            position: 'top-center',
            style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
          } as React.CSSProperties
      })
      return
    }

    const dateKey = selected.toISOString().split("T")[0]

    const subject = attendance.find(
    (item) => item.subject === selectedSubject
  )

  if (subject?.records[dateKey]) {
    toast.error(
      "Attendance already marked for this subject on this date",{ 
        position: "top-center",
        style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
          } as React.CSSProperties
       }
    )
    return
  }

    setAttendance((prev) =>
    prev.map((item) =>
      item.subject === selectedSubject
        ? {
            ...item,
            records: {
              ...item.records,
              [dateKey]: isPresent ? "present" : "absent",
            },
          }
        : item
    )
  )
}


  /* -------------------- ADD SUBJECT -------------------- */
  const handleAddSubject = () => {
    if (!newSubject.trim()) return

    const exists = attendance.some(
      (item) => item.subject.toLowerCase() === newSubject.toLowerCase()
    )
    if (exists) return

    setAttendance((prev) => [
      ...prev,
      { subject: newSubject, records: {} },
    ])

    setNewSubject("")
  }

  /* -------------------- CALCULATIONS -------------------- */
  const getStats = (records: Record<string, "present" | "absent">) => {
    const total = Object.keys(records).length
    const attended = Object.values(records).filter(
      (v) => v === "present"
    ).length
    const percentage = total === 0 ? 0 : Math.round((attended / total) * 100)

    return { total, attended, percentage }
  }

  const overallAttendance =
    attendance.length === 0
      ? 0
      : Math.round(
          attendance.reduce((sum, a) => {
            const { percentage } = getStats(a.records)
            return sum + percentage
          }, 0) / attendance.length
        )

  return (
    <div className="space-y-6">
      {/* OVERALL */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="pt-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-600">Overall Attendance</p>
            <p className="text-4xl font-bold text-blue-600">
              {overallAttendance}%
            </p>
          </div>
          <CalendarCheck className="w-16 h-16 text-blue-300" />
        </CardContent>
      </Card>

      {/* MARK ATTENDANCE */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-black">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Mark Attendance
          </CardTitle>
          <CardDescription className="text-black">
            Pick date & subject
          </CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md text-black border"
          />

          <div className="space-y-4">
            <Select onValueChange={setSelectedSubject}>
              <SelectTrigger className="text-black">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {attendance.map((item) => (
                  <SelectItem
                    key={item.subject}
                    value={item.subject}
                    className="text-black"
                  >
                    {item.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleMarkAttendance(true)}
              >
                Present
              </Button>
              <Button
                variant="destructive"
                className="flex-1 bg-red-500"
                onClick={() => handleMarkAttendance(false)}
              >
                Absent
              </Button>
            </div>

            {selectedDate && (
              <p className="text-xs text-slate-600">
                Date: {selectedDate.toDateString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ADD SUBJECT */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-black">Add New Subject</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="text-black"
          />
          <Button onClick={handleAddSubject} className="text-black">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </CardContent>
      </Card>

      {/* SUBJECT-WISE */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-black">
            Subject-wise Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {attendance.map((item) => {
            const { attended, total, percentage } = getStats(item.records)

            return (
              <div key={item.subject} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-black">
                    {item.subject}
                  </span>
                  <span className="font-bold text-black">
                    {percentage}%
                  </span>
                </div>
                <Progress value={percentage} />
                <p className="text-xs text-slate-500">
                  {attended} / {total} classes
                </p>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
