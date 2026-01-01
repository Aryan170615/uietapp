"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus } from "lucide-react"

interface LostItem {
  id: string
  name: string
  category: "Electronics" | "Clothing" | "Documents" | "Other"
  date: string
  location: string
  status: "Lost" | "Found"
}

export default function LostAndFound() {
  const [items] = useState<LostItem[]>([
    {
      id: "1",
      name: "Apple AirPods Pro",
      category: "Electronics",
      date: "Jan 10, 2026",
      location: "Library Building",
      status: "Lost",
    },
    {
      id: "2",
      name: "Blue Backpack",
      category: "Clothing",
      date: "Jan 8, 2026",
      location: "Cafeteria",
      status: "Found",
    },
    {
      id: "3",
      name: "Student ID Card",
      category: "Documents",
      date: "Jan 5, 2026",
      location: "Sports Complex",
      status: "Lost",
    },
    {
      id: "4",
      name: "Laptop Charger",
      category: "Electronics",
      date: "Jan 12, 2026",
      location: "Lab 301",
      status: "Found",
    },
  ])

  const categoryColors: Record<string, { bg: string; badge: string }> = {
    Electronics: { bg: "from-cyan-50 to-blue-50", badge: "bg-cyan-100 text-cyan-700" },
    Clothing: { bg: "from-pink-50 to-rose-50", badge: "bg-pink-100 text-pink-700" },
    Documents: { bg: "from-red-50 to-orange-50", badge: "bg-red-100 text-red-700" },
    Other: { bg: "from-slate-50 to-gray-50", badge: "bg-slate-100 text-slate-700" },
  }

  const lostItems = items.filter((i) => i.status === "Lost")
  const foundItems = items.filter((i) => i.status === "Found")

  const renderItems = (itemList: LostItem[], isLost: boolean) => (
    <div className="space-y-3">
      {itemList.map((item) => (
        <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">{item.name}</h4>
                <div className="flex items-center gap-2 mt-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{item.location}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.date}</p>
              </div>
              <Badge className={categoryColors[item.category].badge}>{item.category}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Report Button */}
      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold h-11 flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Report Lost or Found Item
      </Button>

      {/* Lost Items */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          Lost Items ({lostItems.length})
        </h3>
        {renderItems(lostItems, true)}
      </div>

      {/* Found Items */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          Found Items ({foundItems.length})
        </h3>
        {renderItems(foundItems, false)}
      </div>
    </div>
  )
}
