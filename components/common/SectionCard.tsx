import type * as React from "react"

interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export default function SectionCard({ children, className = "" }: SectionCardProps) {
  return <div className={`bg-white rounded-xl p-6 shadow-sm border border-slate-100 ${className}`}>{children}</div>
}
