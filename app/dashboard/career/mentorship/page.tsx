"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCareerActivities } from "../../../../lib/useCareerActivites"

export default function MentorshipActivityPage() {
  const data = useCareerActivities()
  if (!data) return null

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="pt-6 space-y-3">
        <h2 className="text-xl font-bold">1:1 Mentorship</h2>

        {data.mentorship?.requested ? (
          <>
            <Badge>{data.mentorship.status}</Badge>
            <p>Domain: {data.mentorship.domain}</p>
          </>
        ) : (
          <Badge variant="outline">No mentorship requested</Badge>
        )}
      </CardContent>
    </Card>
  )
}
