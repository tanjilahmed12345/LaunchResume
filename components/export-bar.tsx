"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Download, FileText, File } from "lucide-react"

export default function ExportBar() {
  const resume = useSelector((state: RootState) => state.resume)

  const exportToPDF = async () => {
    const element = document.getElementById("resume-preview")
    if (!element) return

    // Enhanced print styles
    const printStyles = `
      @media print {
        body * { visibility: hidden; }
        #resume-preview, #resume-preview * { visibility: visible; }
        #resume-preview { 
          position: absolute; 
          left: 0; 
          top: 0; 
          width: 100% !important;
          margin: 0 !important;
          padding: 20px !important;
        }
      }
    `

    const styleSheet = document.createElement("style")
    styleSheet.textContent = printStyles
    document.head.appendChild(styleSheet)

    window.print()

    document.head.removeChild(styleSheet)
  }

  const exportToDOCX = async () => {
    const element = document.getElementById("resume-preview")
    if (!element) return

    // Create a more structured DOCX content
    let docxContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: ${resume.theme.fontFamily}, sans-serif; 
              margin: 1in; 
              line-height: 1.6;
              color: #1e293b;
            }
            h1 { 
              font-size: 24pt; 
              text-align: center; 
              margin-bottom: 8pt;
              color: #1e293b;
            }
            h2 { 
              font-size: 16pt; 
              border-bottom: 2px solid ${resume.theme.primaryColor}; 
              padding-bottom: 4pt;
              margin-top: 20pt;
              margin-bottom: 12pt;
            }
            h3 { 
              font-size: 14pt; 
              margin-bottom: 4pt;
            }
            p { 
              font-size: 11pt; 
              margin-bottom: 6pt;
            }
            .contact-info {
              text-align: center;
              margin-bottom: 20pt;
            }
            .section {
              margin-bottom: 20pt;
            }
          </style>
        </head>
        <body>
    `

    // Add structured content
    resume.sections.forEach((section) => {
      if (!section.visible) return

      if (section.type === "personal") {
        docxContent += `
          <h1>${section.content.name}</h1>
          <div class="contact-info">
            <p>${section.content.email} | ${section.content.phone} | ${section.content.location}</p>
            ${section.content.website ? `<p>${section.content.website}</p>` : ""}
          </div>
        `
      } else if (section.type === "experience") {
        docxContent += `<div class="section"><h2>EXPERIENCE</h2>`
        section.content.forEach((exp: any) => {
          docxContent += `
            <h3>${exp.title} - ${exp.company}</h3>
            <p><strong>${exp.startDate} - ${exp.endDate} | ${exp.location}</strong></p>
            <p>${exp.description.replace(/\n/g, "<br>")}</p>
          `
        })
        docxContent += `</div>`
      } else if (section.type === "skills") {
        docxContent += `<div class="section"><h2>SKILLS</h2>`
        section.content.forEach((skill: any) => {
          docxContent += `<p><strong>${skill.category}:</strong> ${skill.skills}</p>`
        })
        docxContent += `</div>`
      }
    })

    docxContent += `</body></html>`

    const blob = new Blob([docxContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resume.sections.find((s) => s.type === "personal")?.content.name || "resume"}.docx`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToTXT = () => {
    let textContent = ""

    resume.sections.forEach((section) => {
      if (!section.visible) return

      if (section.type === "personal") {
        textContent += `${section.content.name}\n`
        textContent += `${section.content.email} | ${section.content.phone} | ${section.content.location}\n`
        if (section.content.website) textContent += `${section.content.website}\n`
        textContent += "\n" + "=".repeat(60) + "\n\n"
      } else if (section.type === "experience") {
        textContent += "EXPERIENCE\n" + "=".repeat(60) + "\n\n"
        section.content.forEach((exp: any) => {
          textContent += `${exp.title} - ${exp.company}\n`
          textContent += `${exp.startDate} - ${exp.endDate} | ${exp.location}\n`
          if (exp.description) {
            textContent += `${exp.description}\n`
          }
          textContent += "\n"
        })
      } else if (section.type === "skills") {
        textContent += "SKILLS\n" + "=".repeat(60) + "\n\n"
        section.content.forEach((skill: any) => {
          textContent += `${skill.category}: ${skill.skills}\n`
        })
        textContent += "\n"
      }
    })

    const blob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${resume.sections.find((s) => s.type === "personal")?.content.name || "resume"}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={exportToPDF}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all"
      >
        <FileText className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
      <Button
        onClick={exportToDOCX}
        variant="outline"
        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all bg-transparent"
      >
        <File className="w-4 h-4 mr-2" />
        Export DOCX
      </Button>
      <Button
        onClick={exportToTXT}
        variant="outline"
        className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all bg-transparent"
      >
        <Download className="w-4 h-4 mr-2" />
        Export TXT
      </Button>
    </div>
  )
}
