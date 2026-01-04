import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { signJwt } from "@/lib/jwt";

export async function POST(req: NextRequest){
    const { email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
        data: {
          email: email,
          password: hashedPassword 
        }   
      })
    const token = signJwt({ id: user.id, email: email})
    return NextResponse.json({
    token
  })
}
