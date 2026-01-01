"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCareerActivities } from "../../../../lib/useCareerActivites"

export default function ResumeActivityPage() {
  const data = useCareerActivities()
  if (!data) return null

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="pt-6 space-y-3">
        <h2 className="text-xl font-bold">Resume Review</h2>

        {data.resume?.uploaded ? (
          <Badge className="bg-green-600">
            {data.resume.reviewed ? "Reviewed" : "Under Review"}
          </Badge>
        ) : (
          <Badge variant="outline">No resume uploaded</Badge>
        )}
      </CardContent>
    </Card>
  )
}
