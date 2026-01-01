import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json()
   console.log(process.env.GMAIL_USER)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Lost & Found" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Email failed" },
      { status: 500 }
    )
  }
}
