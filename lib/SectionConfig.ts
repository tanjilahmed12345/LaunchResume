import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  Award,
  Globe,
  Heart,
  Users,
  BookOpen,
  Mic,
  UserCheck,
  Share2,
  BookMarked,
  Trophy,
  TestTube,
  Shield,
  Target,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import type { SectionType } from "./store"

export const sectionIcons: Record<SectionType, any> = {
  personal: User,
  summary: Target,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: FolderOpen,
  certifications: Award,
  achievements: Trophy,
  languages: Globe,
  interests: Heart,
  volunteer: Users,
  publications: BookOpen,
  conferences: Mic,
  references: UserCheck,
  social: Share2,
  courses: BookMarked,
  extracurricular: Users,
  testscores: TestTube,
  clearances: Shield,
}

export const sectionLabels: Record<SectionType, string> = {
  personal: "Personal Info",
  summary: "Professional Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  achievements: "Achievements & Awards",
  languages: "Languages",
  interests: "Interests & Hobbies",
  volunteer: "Volunteer Work",
  publications: "Publications & Blogs",
  conferences: "Conferences & Speaking",
  references: "References",
  social: "Social Media",
  courses: "Courses & Training",
  extracurricular: "Extracurricular Activities",
  testscores: "Test Scores",
  clearances: "Clearances & Licenses",
}

export const socialPlatformIcons: Record<string, any> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
  Email: Mail,
  Phone: Phone,
  Website: Globe,
  Portfolio: FolderOpen,
}

export const contactIcons = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  website: Globe,
  linkedin: Linkedin,
  github: Github,
}

export function extractDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "")
    return domain
  } catch {
    return url
  }
}

export function getDisplayNameFromUrl(url: string, platform?: string): string {
  if (!url) return ""

  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname

    if (platform === "GitHub" && pathname.length > 1) {
      return pathname.split("/")[1] || extractDomainFromUrl(url)
    }

    if (platform === "LinkedIn" && pathname.includes("/in/")) {
      return pathname.split("/in/")[1]?.replace("/", "") || extractDomainFromUrl(url)
    }

    if (platform === "Twitter" && pathname.length > 1) {
      return `@${pathname.substring(1)}` || extractDomainFromUrl(url)
    }

    return extractDomainFromUrl(url)
  } catch {
    return url
  }
}
