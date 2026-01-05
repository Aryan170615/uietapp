"use client"

import { cn } from "@/lib/utils"

export function PremiumCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        `
        group cursor-pointer
        rounded-xl border border-gray-300 bg-card
        shadow-md
        transition-all duration-200 ease-out
        hover:-translate-y-1 hover:scale-[1.02]
        hover:shadow-l
        hover:border-muted-foreground/30
        `,
        className
      )}
    >
      {children}
    </div>
  )
}
