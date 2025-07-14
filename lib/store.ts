import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type SectionType =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "languages"
  | "interests"
  | "volunteer"
  | "publications"
  | "conferences"
  | "references"
  | "social"
  | "courses"
  | "extracurricular"
  | "testscores"
  | "clearances"

export interface ResumeSection {
  id: string
  type: SectionType
  content: any
  visible: boolean
}

export interface ResumeState {
  template: "classic" | "modern" | "creative" | "minimal" | "executive" | "tech" | "academic" | "designer"
  sections: ResumeSection[]
  availableSections: SectionType[]
  theme: {
    primaryColor: string
    fontFamily: string
    fontSize: "small" | "medium" | "large"
  }
}

const initialState: ResumeState = {
  template: "modern",
  theme: {
    primaryColor: "#2563eb",
    fontFamily: "Inter",
    fontSize: "medium",
  },
  sections: [
    {
      id: "personal",
      type: "personal",
      content: {
        name: "Sarah Johnson",
        title: "Senior Product Designer",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "https://sarahjohnson.design",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
      },
      visible: true,
    },
    {
      id: "summary",
      type: "summary",
      content: {
        text: "Creative product designer with 6+ years of experience crafting user-centered digital experiences. Passionate about solving complex problems through intuitive design and data-driven insights.",
      },
      visible: true,
    },
    {
      id: "experience",
      type: "experience",
      content: [
        {
          id: "1",
          title: "Senior Product Designer",
          company: "TechFlow Inc.",
          location: "San Francisco, CA",
          startDate: "Jan 2022",
          endDate: "Present",
          description:
            "• Led design for 3 major product features, increasing user engagement by 40%\n• Collaborated with cross-functional teams to deliver seamless user experiences\n• Mentored 2 junior designers and established design system standards",
        },
        {
          id: "2",
          title: "Product Designer",
          company: "StartupXYZ",
          location: "Remote",
          startDate: "Mar 2020",
          endDate: "Dec 2021",
          description:
            "• Designed end-to-end user flows for mobile and web applications\n• Conducted user research and usability testing to inform design decisions\n• Reduced user onboarding time by 60% through improved UX design",
        },
      ],
      visible: true,
    },
    {
      id: "skills",
      type: "skills",
      content: [
        { id: "1", category: "Design Tools", skills: "Figma, Sketch, Adobe Creative Suite, Principle" },
        { id: "2", category: "Prototyping", skills: "Framer, InVision, Marvel, Axure RP" },
        { id: "3", category: "Research", skills: "User Interviews, A/B Testing, Analytics, Surveys" },
        { id: "4", category: "Technical", skills: "HTML/CSS, JavaScript, React Basics, Design Systems" },
      ],
      visible: true,
    },
    {
      id: "projects",
      type: "projects",
      content: [
        {
          id: "1",
          title: "E-commerce Mobile App Redesign",
          description: "Complete UX/UI overhaul of mobile shopping experience",
          technologies: "Figma, React Native, Firebase",
          startDate: "Jan 2023",
          endDate: "Mar 2023",
          url: "https://github.com/sarah/ecommerce-app",
        },
        {
          id: "2",
          title: "Design System Implementation",
          description: "Built comprehensive design system for enterprise software",
          technologies: "Figma, Storybook, React",
          startDate: "Sep 2022",
          endDate: "Dec 2022",
          url: "https://designsystem.techflow.com",
        },
      ],
      visible: true,
    },
    {
      id: "education",
      type: "education",
      content: [
        {
          id: "1",
          degree: "Bachelor of Fine Arts in Graphic Design",
          school: "California College of the Arts",
          location: "Oakland, CA",
          year: "2018",
          gpa: "3.8/4.0",
        },
      ],
      visible: true,
    },
  ],
  availableSections: [
    "certifications",
    "achievements",
    "languages",
    "interests",
    "volunteer",
    "publications",
    "conferences",
    "references",
    "social",
    "courses",
    "extracurricular",
    "testscores",
    "clearances",
  ],
}

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setTemplate: (
      state,
      action: PayloadAction<
        "classic" | "modern" | "creative" | "minimal" | "executive" | "tech" | "academic" | "designer"
      >,
    ) => {
      state.template = action.payload
    },
    updateTheme: (state, action: PayloadAction<Partial<ResumeState["theme"]>>) => {
      state.theme = { ...state.theme, ...action.payload }
    },
    updateSection: (state, action: PayloadAction<{ id: string; content: any }>) => {
      const section = state.sections.find((s) => s.id === action.payload.id)
      if (section) {
        section.content = action.payload.content
      }
    },
    reorderSections: (state, action: PayloadAction<ResumeSection[]>) => {
      state.sections = action.payload
    },
    addSection: (state, action: PayloadAction<SectionType>) => {
      const sectionType = action.payload
      const newSection: ResumeSection = {
        id: `${sectionType}-${Date.now()}`,
        type: sectionType,
        content: getDefaultContent(sectionType),
        visible: true,
      }
      state.sections.push(newSection)
      state.availableSections = state.availableSections.filter((type) => type !== sectionType)
    },
    removeSection: (state, action: PayloadAction<string>) => {
      const section = state.sections.find((s) => s.id === action.payload)
      if (section && section.type !== "personal") {
        state.sections = state.sections.filter((s) => s.id !== action.payload)
        if (!state.availableSections.includes(section.type)) {
          state.availableSections.push(section.type)
        }
      }
    },
    toggleSectionVisibility: (state, action: PayloadAction<string>) => {
      const section = state.sections.find((s) => s.id === action.payload)
      if (section) {
        section.visible = !section.visible
      }
    },
  },
})

function getDefaultContent(sectionType: SectionType) {
  switch (sectionType) {
    case "summary":
      return { text: "" }
    case "experience":
    case "education":
    case "projects":
    case "certifications":
    case "achievements":
    case "volunteer":
    case "publications":
    case "conferences":
    case "courses":
    case "extracurricular":
    case "testscores":
    case "clearances":
      return []
    case "skills":
    case "languages":
      return []
    case "interests":
      return { items: "" }
    case "references":
      return { text: "Available upon request" }
    case "social":
      return [
        { id: "1", platform: "LinkedIn", url: "", displayName: "" },
        { id: "2", platform: "GitHub", url: "", displayName: "" },
      ]
    default:
      return {}
  }
}

export const {
  setTemplate,
  updateTheme,
  updateSection,
  reorderSections,
  addSection,
  removeSection,
  toggleSectionVisibility,
} = resumeSlice.actions

export const store = configureStore({
  reducer: {
    resume: resumeSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
