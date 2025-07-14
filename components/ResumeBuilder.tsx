"use client"

import { useState } from "react"
import TemplateSelector from "./TemplateSelector"
import SectionManager from "./SectionManager"
import EditorPanel from "./EditorPanel"
import ResumePreview from "./resume-preview"
import ExportBar from "./ExportBar"
import ThemeCustomizer from "./ThemeCustomizer"
import { Button } from "@/components/ui/button"
import { Palette, Layout, Sparkles } from "lucide-react"

export default function ResumeBuilder() {
  const [showTemplates, setShowTemplates] = useState(false)
  const [showThemes, setShowThemes] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("personal")

  return (
    <div className="min-h-screen">
      {/* Floating Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Resume Craft
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplates(true)}
                className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Layout className="w-4 h-4" />
                Templates
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowThemes(true)}
                className="flex items-center gap-2 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                <Palette className="w-4 h-4" />
                Themes
              </Button>
            </div>
          </div>
          <ExportBar />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Section Manager + Editor */}
          <div className="lg:col-span-1 space-y-6">
            <SectionManager activeSection={activeSection} onSectionSelect={setActiveSection} />
            <EditorPanel activeSection={activeSection} />
          </div>

          {/* Right Panel - Live Preview */}
          <div className="lg:col-span-2">
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTemplates && <TemplateSelector onClose={() => setShowTemplates(false)} />}
      {showThemes && <ThemeCustomizer onClose={() => setShowThemes(false)} />}
    </div>
  )
}
