"use client"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import ResumeBuilder from "@/components/ResumeBuilder"

export default function Home() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <ResumeBuilder />
      </div>
    </Provider>
  )
}
