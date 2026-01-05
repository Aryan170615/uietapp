"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, ArrowLeft, Calendar, MessageSquare } from "lucide-react"

export default function CounsellorPage() {
  const router = useRouter()
  const param = useParams()
  console.log(param)
  let today = new Date().toISOString().slice(0, 10)
  return (
    <div className="w-full">
      <DashboardHeader title="Career Counsellor Session" />
      <div className="p-8">
        <Button onClick={() => router.back()} variant="outline" className="mb-6 border border-gray-300 cursor-pointer flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="max-w-2xl space-y-6">
          {/* Booking Confirmation */}
          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Booking Confirmed!</h3>
                  <p className=" mt-1">
                    Your counselling session has been successfully booked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card className="border border-gray-300">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Session Details</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm ">Date & Time</p>
                    <p className="font-semibold">
                      {today}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <p className="text-sm ">Topic</p>
                    <p className="font-semibold">
                      {param.email}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border border-gray-300">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">What's Next?</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold">
                    1
                  </span>
                  <span className="">
                    You'll receive a confirmation email shortly
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold">
                    2
                  </span>
                  <span className="">
                    Join the video call 5 minutes before the scheduled time
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-semibold">
                    3
                  </span>
                  <span className="">
                    Get personalized advice and career guidance
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Button
            onClick={() => router.push("/dashboard/career")}
            className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
          >
            Back to Career Services
          </Button>
        </div>
      </div>
    </div>
  )
}
