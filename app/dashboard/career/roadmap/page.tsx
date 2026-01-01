"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCareerActivities } from "../../../../lib/useCareerActivites"

export default function RoadmapActivityPage() {
  const data = useCareerActivities()
  if (!data) return null

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="pt-6 space-y-3">
        <h2 className="text-xl font-bold">Career Roadmap</h2>

        {data.roadmap ? (
          <>
            <p>Role: {data.roadmap.selected}</p>
            <Progress value={data.roadmap.progress ?? 0} />
          </>
        ) : (
          <p>No roadmap selected</p>
        )}
      </CardContent>
    </Card>
  )
}
