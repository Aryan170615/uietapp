"use client"

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars"
import Landing from "@/components/Landing"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div className="relative min-h-screen">
      
      <StarsBackground
        className={cn(
          "fixed inset-0 -z-10 pointer-events-none",
          "dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]",
          "bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]"
        )}
      />
      <Landing />
    </div>
  )
}
