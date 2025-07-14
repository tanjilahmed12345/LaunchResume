"use client"

import { Button } from "@/components/ui/button"
import FormField from "@/components/Common/FormField"
import ActionButton from "@/components/Common/ActionButton"
import { Plus, Trash2, Edit3 } from "lucide-react"
import { Label } from "@/components/ui/label"

const platformOptions = [
  "LinkedIn",
  "GitHub",
  "Twitter",
  "Instagram",
  "Facebook",
  "YouTube",
  "Portfolio",
  "Website",
  "Behance",
  "Dribbble",
  "Medium",
  "Dev.to",
]

interface SocialEditorProps {
  content: any[]
  onChange: (content: any[]) => void
}

export default function SocialEditor({ content, onChange }: SocialEditorProps) {
  const addSocial = () => {
    const newSocial = { id: Date.now().toString(), platform: "", url: "", displayName: "" }
    onChange([...content, newSocial])
  }

  const updateSocial = (index: number, field: string, value: string) => {
    const updated = [...content]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeSocial = (index: number) => {
    onChange(content.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {content.map((social: any, index: number) => (
        <div key={social.id} className="bg-slate-50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Social Media {index + 1}
            </h4>
            <ActionButton
              icon={Trash2}
              onClick={() => removeSocial(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-slate-700">Platform</Label>
              <select
                value={social.platform || ""}
                onChange={(e) => updateSocial(index, "platform", e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Platform</option>
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            <FormField
              label="Display Name"
              value={social.displayName || ""}
              onChange={(value) => updateSocial(index, "displayName", value)}
              placeholder="e.g., TanjilAhmed, @tanjil_ahmed"
            />
          </div>

          <FormField
            label="URL"
            type="url"
            value={social.url || ""}
            onChange={(value) => updateSocial(index, "url", value)}
            placeholder="https://..."
          />
        </div>
      ))}

      <Button
        onClick={addSocial}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Social Media
      </Button>
    </div>
  )
}
