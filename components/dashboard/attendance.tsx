"use client"

import { useEffect, useState } from "react"
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
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { Spinner } from "../ui/shadcn-io/spinner"
import { tr } from "date-fns/locale"

interface AttendanceData {
  subjectId: number
  subject: string
  records: Record<string, "present" | "absent">
}

type AuthPayload = {
  id: number
  email: string
}

export default function Attendance() {
  /* -------------------- ALL HOOKS FIRST -------------------- */

  const [userId, setUserId] = useState<number | null>(null)
  const [attendance, setAttendance] = useState<AttendanceData[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedSubject, setSelectedSubject] = useState("")
  const [newSubject, setNewSubject] = useState("")
  const [month, setMonth] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)
  const [presentloading, setPresentLoading] = useState(false)
  const [absentloading, setAbsentLoading] = useState(false)

  /* -------------------- AUTH -------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const decoded = jwtDecode<AuthPayload>(token)
    setUserId(decoded.id)
  }, [])

  /* -------------------- FETCH SUBJECTS -------------------- */
  useEffect(() => {
    if (!userId) return

    async function fetchSubjects() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/subject?id=${userId}`
        )
         console.log(res.data)
        const formatted: AttendanceData[] = res.data.map(
        (s: { id: number; name: string }) => ({
          subjectId: s.id,
          subject: s.name,
          records: {},
        })
      )

        setAttendance(formatted)
      } catch (e) {
        console.log(e)
      }
    }

    fetchSubjects()
  }, [userId])

useEffect(() => {
  if (!userId || attendance.length === 0) return

  async function fetchAttendance() {
    try {
      const res = await axios.get(`/api/attendance?userId=${userId}`)

      setAttendance((prev) =>
        prev.map((subject) => {
          const updatedRecords = { ...subject.records }

          res.data.forEach((entry: any) => {
            if (entry.subjectId === subject.subjectId) {
              const key = getDateKey(entry.date)
              updatedRecords[key] = entry.status
            }
          })

          return {
            ...subject,
            records: updatedRecords,
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  fetchAttendance()
}, [userId, attendance.length])


  /* -------------------- HELPERS -------------------- */
  const normalizeDate = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const getDateKey = (date: Date | string) => {
  const d = typeof date === "string" ? new Date(date) : date

  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")

  return `${y}-${m}-${day}`
}
  const handleSelectDate = (date?: Date) => {
  if (!date) return
  setSelectedDate(date)
  setMonth(date)
 }
  /* -------------------- MARK ATTENDANCE -------------------- */
  const handleMarkAttendance = async (isPresent: boolean) => {
    if (!selectedSubject || !selectedDate) {
      toast.error("Select subject and date", {
        duration: 4000,
        position: "top-center",
        style: {
                    '--normal-bg':
                      'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
                    '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
                    '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
                  } as React.CSSProperties
        
      })
      return
    }

    const today = normalizeDate(new Date())
    const selected = normalizeDate(selectedDate)

    if (selected > today) {
      toast.error("Cannot mark attendance for future dates", {
        duration: 4000,
        position: "top-center",
        style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
          } as React.CSSProperties
        
      })
      return
    }
    try{
      if(isPresent) {
        setPresentLoading(true)
      }
      else {
        setAbsentLoading(true)
      }
      const subject = await axios.get(`/api/subject/subject=${selectedSubject}`)
      console.log(subject.data.id)

    const result = await axios.post('/api/attendance', {
       status: (isPresent)? "present" : "absent",
       subjectId : subject.data.id,
       userId,
       date : selected
    })
    
     const dateKey = getDateKey(selected)

    setAttendance((prev) =>
      prev.map((item) => {
        if (item.subject !== selectedSubject) return item

        if (item.records[dateKey]) {
          toast.error("Attendance already marked for this date", {
            duration: 4000,
            position: "top-center",
            style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
          } as React.CSSProperties
            
          })
          return item
        }
        return {
          ...item,
          records: {
            ...item.records,
            [dateKey]: result.data.status,
          },
        }
      })
    )

  } catch(e) {
    console.log(e)
  } finally {
     if(isPresent) {
        setPresentLoading(false)
      }
      else {
        setAbsentLoading(false)
      }
  }
   
  }

  /* -------------------- ADD SUBJECT -------------------- */
  const handleAddSubject = async () => {
    if (!newSubject.trim()) return

    const exists = attendance.some(
      (s) => s.subject.toLowerCase() === newSubject.toLowerCase()
    )

    if (exists) {
      toast.error("Subject already exists")
      return
    }

    try {
      setLoading(true);
      const result = await axios.post("/api/subject", {
        name: newSubject,
        userId: userId,
      })

      setAttendance((prev) => [
        ...prev,
        { subjectId:result.data.id ,subject: newSubject, records: {} },
      ])

      setNewSubject("")
      toast.success("Subject added")
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
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
          attendance.reduce(
            (sum, a) => sum + getStats(a.records).percentage,
            0
          ) / attendance.length
        )

  /* -------------------- SAFE RENDER GUARD -------------------- */
  if (!userId) {
    return <div className="text-center text-slate-500">Loading...</div>
  }

  /* -------------------- UI -------------------- */
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
          <CardTitle className="flex gap-2 items-center">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Mark Attendance
          </CardTitle>
          <CardDescription>Pick date & subject</CardDescription>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelectDate}
            disabled={(date) => date > new Date()}
            className="rounded-md border"
          />


          <div className="space-y-4">
            <Select onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {attendance.map((item) => (
                  <SelectItem key={item.subject} value={item.subject}>
                    {item.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              {!presentloading && <Button
                className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700"
                onClick={() => handleMarkAttendance(true)}
              >
                Present
              </Button>}
              {presentloading && <Button
                className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700"
                onClick={() => handleMarkAttendance(true)}
              >
                <div className="flex justify-center items-center"> <Spinner /> </div>
              </Button>}
              {!absentloading && <Button
                variant="destructive"
                className="flex-1 cursor-pointer bg-red-500 hover:bg-red-700"
                onClick={() => handleMarkAttendance(false)}
              >
                Absent
              </Button>}
              {absentloading && <Button
                variant="destructive"
                className="flex-1 cursor-pointer bg-red-500 hover:bg-red-700"
                disabled= {true}
                onClick={() => handleMarkAttendance(false)}
              >
                <div className="flex justify-center items-center"> <Spinner /> </div>
              </Button>}
            </div>

            <p className="text-xs text-slate-600">
              Date: {selectedDate.toDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ADD SUBJECT */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          {!loading && <Button className="cursor-pointer" onClick={handleAddSubject}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>}
          {loading && <div className="flex justify-center items-center"> <Spinner /> </div>}
        </CardContent>
      </Card>

      {/* SUBJECT-WISE */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {attendance.map((item) => {
            const { attended, total, percentage } = getStats(item.records)
            return (
              <div key={item.subject} className="space-y-2">
                <div className="flex justify-between">
                  <span>{item.subject}</span>
                  <span className="font-bold">{percentage}%</span>
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
