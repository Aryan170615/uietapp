import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const id = req.url.split('=')[1]
    console.log(id);
    
    const result = await prismaClient.subject.findMany({
        where : {
            userId: Number(id)
        } 
    })
    return NextResponse.json(result)
}


export async function POST(req: NextRequest){
    const { name, userId } = await req.json();
    const result = await prismaClient.subject.create({
        data : {
            name,
            userId
        } 
    })
    return NextResponse.json(result)
}
