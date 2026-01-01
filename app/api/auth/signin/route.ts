import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  return NextResponse.json({
    message : "Hi from main route"
  })
}

export async function POST(req: NextRequest){
    const body = await req.json()
    const result = await prismaClient.user.create({
        data: {
          email: body.email,
          password: body.password 
        }   
      })
   return NextResponse.json({
    result
  })
}
