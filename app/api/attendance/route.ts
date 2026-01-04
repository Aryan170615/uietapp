
import prismaClient from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { status, subjectId, userId, date } = await req.json()

  const attendance = await prismaClient.attendance.create({
    data: {
      status,
      subjectId,
      userId,
      date
    }
  })

  return NextResponse.json(attendance)
}

export async function GET(req: Request) {
  const userId = Number(new URL(req.url).searchParams.get("userId"))

  const attendance = await prismaClient.attendance.findMany({
    where: { userId }
  })

  return NextResponse.json(attendance)
}
