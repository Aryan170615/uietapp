"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
  Briefcase,
  UserCheck,
  GraduationCap,
  FileText,
  Mic,
  Map,
  Users,
} from "lucide-react"

type Modal =
  | "counsellor"
  | "placement"
  | "mentorship"
  | "resume"
  | "interview"
  | "roadmap"
  | null

export default function CareerAssistance() {
  const [modal, setModal] = useState<Modal>(null)
  const [data, setData] = useState<any>({})
  const router = useRouter()
  const [value, setValue] = useState("");

  /* ---------------- LOAD / SAVE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("career-assistance")
    if (saved) setData(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("career-assistance", JSON.stringify(data))
  }, [data])

  /* ---------------- SERVICES ---------------- */
  const services = [
    {
      key: "counsellor",
      title: "Career Counsellor",
      icon: UserCheck,
      badge: data.counsellorBooking ? "Booked" : "Live",
      action: "Book Session",
    },
    {
      key: "placement",
      title: "Placement Membership",
      icon: Briefcase,
      badge: data.placementMember ? "Joined" : "Premium",
      action: "Join Program",
    },
    {
      key: "mentorship",
      title: "1:1 Mentorship",
      icon: Users,
      badge: data.mentorshipRequest ? "Requested" : "Popular",
      action: "Request Mentor",
    },
    {
      key: "resume",
      title: "Resume Review",
      icon: FileText,
      badge: data.resumeUploaded ? "Submitted" : "Fast",
      action: "Upload Resume",
    },
    {
      key: "interview",
      title: "Mock Interview",
      icon: Mic,
      badge: data.mockInterview ? "Scheduled" : "Practice",
      action: "Schedule",
    },
    {
      key: "roadmap",
      title: "Career Roadmap",
      icon: Map,
      badge: data.roadmap ? "Selected" : "Free",
      action: "View",
    },
  ]

  /* ---------------- SUBMIT HANDLERS ---------------- */
  const submit = (key: string, value: any, msg: string) => {
    setData((prev: any) => ({ ...prev, [key]: value }))
    toast.success(msg,{ 
        position: "top-center",
        style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
            '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))'
          } as React.CSSProperties
       })
    setModal(null)
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
        <CardContent className="pt-6 flex gap-4">
          <GraduationCap className="w-12 h-12 text-orange-600" />
          <div>
            <h2 className="text-xl font-bold text-black">Career Assistance Hub</h2>
            <p className="text-sm text-slate-600">
              End-to-end career planning & placement support
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SERVICES */}
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.key} className="shadow-lg">
              <CardContent className="pt-6 flex gap-4">
                <Icon className="w-8 h-8 text-orange-600" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-black">{s.title}</h3>
                    <Badge className="text-black">{s.badge}</Badge>
                  </div>
                  <Button
                    className="mt-3 cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      setModal(s.key as Modal)
                    }}
                  >
                    {s.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ---------------- MODALS ---------------- */}
      <Dialog open={!!modal} onOpenChange={() => setModal(null)}>
        <DialogContent className="bg-slate-100 ">
          {/* Counsellor */}
          {modal === "counsellor" && (
            <>
              <DialogHeader>
                <DialogTitle>Book Counsellor</DialogTitle>
                <DialogDescription>30-minute guidance session</DialogDescription>
              </DialogHeader>
              <Input placeholder="Name" id="name" />
              <Input placeholder="Email" id="email" />
              <Select>
                <SelectTrigger><SelectValue placeholder="Select Slot" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
              <Button className="cursor-pointer" onClick={() => {
                submit("counsellorBooking", { booked: true }, "Session booked")
                router.push(`career/${modal}`)
              }
              }>
                Confirm
              </Button>
            </>
          )}

          {/* Placement */}
          {modal === "placement" && (
            <>
              <DialogHeader>
                <DialogTitle>Placement Membership</DialogTitle>
                <DialogDescription>Unlock referrals & drives</DialogDescription>
              </DialogHeader>
              <Button onClick={() =>{
                submit("placementMember", true, "Membership activated")
                router.push(`career/${modal}`)
              }
              }>
                Join Membership
              </Button>
            </>
          )}

          {/* Mentorship */}
          {modal === "mentorship" && (
            <>
              <DialogHeader>
                <DialogTitle>Mentorship Request</DialogTitle>
              </DialogHeader>
              <Select>
                <SelectTrigger><SelectValue placeholder="Career Goal" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => {
                submit("mentorshipRequest", { requested: true }, "Mentor requested")
                router.push(`career/${modal}`) 
              }
              }>
                Submit
              </Button>
            </>
          )}

          {/* Resume */}
          {modal === "resume" && (
            <>
              <DialogHeader>
                <DialogTitle>Resume Upload</DialogTitle>
              </DialogHeader>
              <Input type="file" />
              <Button onClick={() =>{
                submit("resumeUploaded", true, "Resume submitted")
                router.push(`career/${modal}`)
              }
              }>
                Upload
              </Button>
            </>
          )}

          {/* Interview */}
          {modal === "interview" && (
            <>
              <DialogHeader>
                <DialogTitle>Mock Interview</DialogTitle>
              </DialogHeader>
              <Select>
                <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="tech">Technical</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() =>{
                submit("mockInterview", { scheduled: true }, "Interview scheduled")
                router.push(`career/${modal}`)
              }
              }>
                Schedule
              </Button>
            </>
          )}

          {/* Roadmap */}
          {modal === "roadmap" && (
            <>
              <DialogHeader>
                <DialogTitle>Select Roadmap</DialogTitle>
              </DialogHeader>
              <Select value={value}
                    onValueChange={(e) => {
                      setValue(e);
                    }}>
                <SelectTrigger><SelectValue placeholder="Choose Role" /></SelectTrigger>
                <SelectContent >
                  <SelectItem value="frontend">Frontend Dev</SelectItem>
                  <SelectItem value="backend">Backend Dev</SelectItem>
                  <SelectItem value="data">Data Analyst</SelectItem>
                </SelectContent>
              </Select>
              <Button className="cursor-pointer" onClick={() =>{
                // submit("roadmap", "selected", "Roadmap saved")
                //get the selected item value
                router.push(`career/${modal}/${value}`)
              }
              }>
                Save
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
