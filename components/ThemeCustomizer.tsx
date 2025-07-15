"use client"

import { useDispatch, useSelector } from "react-redux"
import { type RootState, updateTheme } from "@/lib/store"
import { Button } from "@/components/ui/button"
import ColorPicker from "@/components/common/ColorPicker"
import { X } from "lucide-react"

const presetColors = [
  { name: "Blue", value: "#2563eb", gradient: "from-blue-500 to-blue-600" },
  { name: "Purple", value: "#7c3aed", gradient: "from-purple-500 to-purple-600" },
  { name: "Green", value: "#059669", gradient: "from-green-500 to-green-600" },
  { name: "Red", value: "#dc2626", gradient: "from-red-500 to-red-600" },
  { name: "Orange", value: "#ea580c", gradient: "from-orange-500 to-orange-600" },
  { name: "Teal", value: "#0d9488", gradient: "from-teal-500 to-teal-600" },
  { name: "Pink", value: "#db2777", gradient: "from-pink-500 to-pink-600" },
  { name: "Indigo", value: "#4f46e5", gradient: "from-indigo-500 to-indigo-600" },
]

const fonts = [
  { name: "Inter", value: "Inter", preview: "Modern & Clean" },
  { name: "Roboto", value: "Roboto", preview: "Professional" },
  { name: "Lato", value: "Lato", preview: "Friendly & Readable" },
  { name: "Montserrat", value: "Montserrat", preview: "Bold & Strong" },
  { name: "Open Sans", value: "Open Sans", preview: "Versatile & Clear" },
  { name: "Poppins", value: "Poppins", preview: "Modern & Geometric" },
]

interface ThemeCustomizerProps {
  onClose: () => void
}

export default function ThemeCustomizer({ onClose }: ThemeCustomizerProps) {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.resume.theme)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Customize Theme</h2>
            <p className="text-slate-600 mt-1">Personalize your resume's appearance</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 space-y-8">
          {/* Preset Colors */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Preset Colors</h3>
            <div className="grid grid-cols-4 gap-4">
              {presetColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => dispatch(updateTheme({ primaryColor: color.value }))}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    theme.primaryColor === color.value
                      ? "border-slate-400 shadow-lg"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-full h-12 bg-gradient-to-r ${color.gradient} rounded-lg mb-2`}></div>
                  <p className="text-sm font-medium text-slate-700">{color.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Custom Color</h3>
            <ColorPicker
              value={theme.primaryColor}
              onChange={(color) => dispatch(updateTheme({ primaryColor: color }))}
              label="Choose any color"
            />
          </div>

          {/* Font Selection */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Typography</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fonts.map((font) => (
                <button
                  key={font.value}
                  onClick={() => dispatch(updateTheme({ fontFamily: font.value }))}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                    theme.fontFamily === font.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg text-slate-900">{font.name}</p>
                      <p className="text-slate-600 text-sm">{font.preview}</p>
                    </div>
                    <div className="text-2xl text-slate-400" style={{ fontFamily: font.value }}>
                      Aa
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Font Size</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Small", value: "small" as const, size: "text-sm" },
                { label: "Medium", value: "medium" as const, size: "text-base" },
                { label: "Large", value: "large" as const, size: "text-lg" },
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => dispatch(updateTheme({ fontSize: size.value }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme.fontSize === size.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`${size.size} font-medium text-slate-900 mb-1`}>Sample Text</div>
                  <p className="text-xs text-slate-600">{size.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
