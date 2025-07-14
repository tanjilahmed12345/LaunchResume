"use client"

import { useDispatch, useSelector } from "react-redux"
import { type RootState, setTemplate } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

const templates = [
  {
    id: "modern" as const,
    name: "Modern",
    description: "Clean, contemporary design with subtle accents",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Two-column layout", "Color accents", "Modern typography"],
  },
  {
    id: "classic" as const,
    name: "Classic",
    description: "Traditional professional layout",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Single column", "Traditional styling", "ATS-friendly"],
  },
  {
    id: "creative" as const,
    name: "Creative",
    description: "Bold design for creative professionals",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Unique layout", "Visual elements", "Stand out design"],
  },
  {
    id: "minimal" as const,
    name: "Minimal",
    description: "Clean and simple, focus on content",
    preview: "/placeholder.svg?height=400&width=300",
    features: ["Minimal design", "Maximum readability", "Clean spacing"],
  },
]

interface TemplateSelectorProps {
  onClose: () => void
}

export default function TemplateSelector({ onClose }: TemplateSelectorProps) {
  const dispatch = useDispatch()
  const currentTemplate = useSelector((state: RootState) => state.resume.template)

  const handleTemplateSelect = (templateId: (typeof templates)[0]["id"]) => {
    dispatch(setTemplate(templateId))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Choose Your Template</h2>
            <p className="text-slate-600 mt-1">Select a design that matches your style</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`group relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  currentTemplate === template.id
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                {currentTemplate === template.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                <div className="aspect-[3/4] bg-slate-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-bold text-lg mb-2 text-slate-900">{template.name}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{template.description}</p>

                <div className="space-y-2">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
