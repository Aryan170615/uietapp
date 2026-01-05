"use client"

import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Star } from "lucide-react"

export default function PlacementPage() {
  const router = useRouter()

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <DashboardHeader title="Placement Membership" />
      <div className="p-8">
        <Button onClick={() => router.back()} variant="outline" className="mb-6 border border-gray-300 cursor-pointer flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="max-w-2xl space-y-6">
          {/* Success Message */}
          <Card className="border border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold ">
                    Welcome to Premium Placement!
                  </h3>
                  <p className=" mt-1">
                    You now have access to exclusive placement opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border border-gray-300">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold">Premium Benefits</h3>

              <div className="space-y-3">
                {[
                  { title: "Priority Job Access", desc: "Get first access to new job postings" },
                  { title: "Company Partnerships", desc: "Direct connections with top companies" },
                  { title: "Interview Preparation", desc: "One-on-one interview coaching" },
                  { title: "Salary Negotiation", desc: "Expert guidance on salary discussions" },
                  { title: "24/7 Support", desc: "Dedicated placement advisor support" },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">{benefit.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Jobs */}
          <Card className="border border-gray-300">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-bold ">Latest Job Openings</h3>

              <div className="space-y-3 ">
                {[
                  { company: "Tech Corp", role: "Software Engineer", location: "Remote" },
                  { company: "Data Systems Inc", role: "Data Analyst", location: "Bangalore" },
                  { company: "Innovation Labs", role: "Full Stack Developer", location: "Mumbai" },
                ].map((job, idx) => (
                  <div key={idx} className="p-3 border border-gray-300 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold ">{job.role}</p>
                        <p className="text-sm">{job.company}</p>
                        <p className="text-xs mt-1">{job.location}</p>
                      </div>
                      <Button className="border border-gray-300 cursor-pointer" variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
