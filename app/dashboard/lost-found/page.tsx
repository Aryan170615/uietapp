"use client"

import { useState } from "react"

type Item = {
  id: number
  title: string
  description: string
  type: "lost" | "found"
  email: string
}

export default function LostAndFoundPage() {
  const [items, setItems] = useState<Item[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"lost" | "found">("lost")
  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !description || !email) return

    setItems([
      {
        id: Date.now(),
        title,
        description,
        type,
        email,
      },
      ...items,
    ])

    setTitle("")
    setDescription("")
    setEmail("")
    setType("lost")
  }

  async function contactReporter(item: Item) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: item.email,
      subject: `Regarding ${item.type.toUpperCase()} item: ${item.title}`,
      message: `
Hi,

Someone is contacting you regarding the ${item.type} item:

Title: ${item.title}
Description: ${item.description}

Please reply to this email to continue the conversation.

Thanks,
Lost & Found Team
      `,
    }),
  })

  if (res.ok) {
    alert("Email sent successfully")
  } else {
    alert("Failed to send email")
  }
}


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <h1 className="text-3xl text-black font-bold text-center">
          🔍 Lost & Found
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-6 rounded-xl shadow space-y-3"
        >
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full border outline-0 p-2 rounded-lg"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <input
            className="w-full border p-2 outline-0 rounded-lg"
            placeholder="Item title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded-lg outline-0"
            placeholder="Item description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="email"
            required
            className="w-full border outline-0 p-2 rounded-lg"
            placeholder="Your email (not shown publicly)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-full bg-black text-white cursor-pointer py-2 rounded-lg">
            Submit Report
          </button>
        </form>

        {/* Items */}
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-black">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm flex items-center rounded-full ${
                  item.type === "lost"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.type.toUpperCase()}
              </span>
            </div>

            <button onClick={() => contactReporter(item)}
                className="text-blue-600 text-sm hover:underline cursor-pointer"
                >
                Contact Reporter
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
