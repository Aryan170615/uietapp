"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCareerActivities } from "../../../../lib/useCareerActivites"

export default function PlacementActivityPage() {
  const data = useCareerActivities()
  if (!data) return null

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="pt-6 space-y-3">
        <h2 className="text-xl font-bold">Placement Membership</h2>

        {data.placement?.active ? (
          <Badge className="bg-green-600">Active Member</Badge>
        ) : (
          <Badge variant="outline">Not Joined</Badge>
        )}
      </CardContent>
    </Card>
  )
}
