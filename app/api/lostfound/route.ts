import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { title, description, type, email } = await req.json() 
    // call db
    const result = await prismaClient.lostFound.create({
        data: {
            title,
            description,
            type,
            email
        }
    })

    return NextResponse.json({ 
         result
     })
}
export async function GET(req: NextRequest){
    
    const result = await prismaClient.lostFound.findMany({
        orderBy: {
            time: 'asc'
        }
    })
    
    return NextResponse.json(result)
}
