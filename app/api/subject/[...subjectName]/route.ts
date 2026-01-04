import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const subject = req.url.split('=')[1]
    console.log(subject);
    
    const result = await prismaClient.subject.findFirst({
        where : {
            name: subject
        } 
    })
    return NextResponse.json(result)
}
