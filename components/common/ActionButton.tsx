"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ActionButtonProps {
  icon: LucideIcon
  // onClick: () => void
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "default" | "ghost" | "outline"
  size?: "sm" | "default"
  className?: string
  children?: React.ReactNode
}

export default function ActionButton({
  icon: Icon,
  onClick,
  variant = "ghost",
  size = "sm",
  className = "",
  children,
}: ActionButtonProps) {
  return (
    <Button variant={variant} size={size} onClick={onClick} className={className}>
      <Icon className="w-4 h-4" />
      {children && <span className="ml-2">{children}</span>}
    </Button>
  )
}
