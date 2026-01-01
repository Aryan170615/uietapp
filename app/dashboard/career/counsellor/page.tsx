"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCareerActivities } from "../../../../lib/useCareerActivites"
import { Undo2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CounsellorActivityPage() {
    const router = useRouter()
  const data = useCareerActivities()
  if (!data) return null

  return (
    <Card className="max-w-xl flex items-center justify-center text-black mx-auto mt-10">
      <CardContent className="pt-6 space-y-3 ">
        <h2 className="text-xl font-bold">Career Counsellor</h2>

        {data.counsellor?.booked ? (
          <>
            <Badge className="bg-green-600">Session Booked</Badge>
            <p>Date: {data.counsellor.date}</p>
            <p>Slot: {data.counsellor.slot}</p>
          </>
        ) : (
            <div className="flex flex-col gap-4 items-center">
                <Badge variant="outline" className=" text-black">No session booked yet</Badge>
                <button className="cursor-pointer" onClick={()=>router.push('/dashboard/career')}>
                    <div className="flex gap-2 items-center"><Undo2 />Back</div>
                </button>
            </div>
        )}
      </CardContent>
    </Card>
  )
}
