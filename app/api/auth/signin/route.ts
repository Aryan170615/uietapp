import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { signJwt } from "@/lib/jwt"
import { use } from "react";

export async function POST(req: NextRequest){
    const { email, password } = await req.json() 
    const user = await prismaClient.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = signJwt({ id: user.id, email: email})

    return NextResponse.json({ token })
}
