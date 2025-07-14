"use client"



import FormField from "@/components/common/FormField"

interface PersonalEditorProps {
  content: any
  onChange: (content: any) => void
}

export default function PersonalEditor({ content, onChange }: PersonalEditorProps) {
  const updateField = (field: string, value: string) => {
    onChange({ ...content, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Full Name" value={content.name || ""} onChange={(value) => updateField("name", value)} />
        <FormField label="Job Title" value={content.title || ""} onChange={(value) => updateField("title", value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Email"
          type="email"
          value={content.email || ""}
          onChange={(value) => updateField("email", value)}
        />
        <FormField label="Phone" value={content.phone || ""} onChange={(value) => updateField("phone", value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Location"
          value={content.location || ""}
          onChange={(value) => updateField("location", value)}
        />
        <FormField
          label="Website"
          type="url"
          value={content.website || ""}
          onChange={(value) => updateField("website", value)}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="LinkedIn"
          type="url"
          value={content.linkedin || ""}
          onChange={(value) => updateField("linkedin", value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
        <FormField
          label="GitHub"
          type="url"
          value={content.github || ""}
          onChange={(value) => updateField("github", value)}
          placeholder="https://github.com/yourusername"
        />
      </div>
    </div>
  )
}
