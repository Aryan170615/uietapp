"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function Mentorship() {
  const [requested, setRequested] = useState(false)

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">1:1 Mentorship</h1>
          <p className="text-muted-foreground">
            Get guidance from seniors & alumni
          </p>
        </div>
        <Badge className="bg-orange-500 text-white">Popular</Badge>
      </div>

      {!requested ? (
        <Card className="group transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-l shadow-md border border-gray-300">
          <CardHeader>
            <CardTitle>Request a Mentor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input className="border border-gray-300"  placeholder="Target Role (e.g. Frontend Developer)" />
            <Input  className="border border-gray-300" placeholder="Current Year (e.g. 3rd Year)" />
            <Textarea  className="border border-gray-300" placeholder="What help do you need?" />
            <Button className="cursor-pointer border border-gray-300" onClick={() => setRequested(true)}>
              Submit Request
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="transition-all border-gray-300 duration-200 ease-out hover:shadow-xl shadow-md border">
          <CardHeader>
            <CardTitle>Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Your request is{" "}
              <b className="text-orange-600">Pending</b>.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
