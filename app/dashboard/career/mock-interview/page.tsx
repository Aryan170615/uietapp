"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCareerActivities } from "../../../../lib/useCareerActivites"

export default function InterviewActivityPage() {
  const data = useCareerActivities()
  if (!data) return null

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="pt-6 space-y-3">
        <h2 className="text-xl font-bold">Mock Interview</h2>

        {data.interview?.scheduled ? (
          <>
            <Badge className="bg-green-600">Scheduled</Badge>
            <p>Type: {data.interview.type}</p>
            <p>Date: {data.interview.date}</p>
          </>
        ) : (
          <Badge variant="outline">Not scheduled</Badge>
        )}
      </CardContent>
    </Card>
  )
}
