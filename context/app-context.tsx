"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

// --- Types ---
export interface AsanaTask {
  gid: string
  name: string
  completed: boolean
  due_on: string | null
  due_at: string | null
  permalink_url: string
  memberships: { section: { name: string } }[]
}

export interface Task {
  id: string
  title: string
  date: string | null
  completed: boolean
  section: string
  url: string
}

export interface Section {
  name: string
  isVisible: boolean
  color: string
}

interface AppState {
  projectName: string
  tasks: Task[]
  sections: Section[]
  showCompleted: boolean
}

interface AppContextProps extends AppState {
  setProjectName: (name: string) => void
  loadTasks: (rawJson: string) => void
  toggleSectionVisibility: (sectionName: string) => void
  setSectionColor: (sectionName: string, color: string) => void
  toggleShowCompleted: () => void
  resetState: () => void
}

// --- Constants ---
const COLOR_PALETTE = [
  "#1E90FF",
  "#FF7F50",
  "#32CD32",
  "#FFB400",
  "#BA55D3",
  "#FF69B4",
  "#20B2AA",
  "#F08080",
  "#DAA520",
  "#708090",
]

const INITIAL_STATE: AppState = {
  projectName: "Client Calendar",
  tasks: [],
  sections: [],
  showCompleted: true,
}

// --- Context ---
const AppContext = createContext<AppContextProps | undefined>(undefined)

// --- Provider ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE)
  const { toast } = useToast()

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("asanaCalendarState")
      if (savedState) {
        const parsedState = JSON.parse(savedState)
        // Make sure all fields are present to avoid breaking changes
        setState({ ...INITIAL_STATE, ...parsedState })
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error)
      setState(INITIAL_STATE)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("asanaCalendarState", JSON.stringify(state))
    } catch (error) {
      console.error("Failed to save state to localStorage", error)
    }
  }, [state])

  const parseAsanaTasks = (data: AsanaTask[]): { tasks: Task[]; sections: Section[] } => {
    const parsedTasks: Task[] = []
    const sectionNames = new Set<string>()

    data.forEach((asanaTask) => {
      if (!asanaTask.name || !asanaTask.memberships || asanaTask.memberships.length === 0) {
        return // Skip tasks with missing essential data
      }
      const sectionName = asanaTask.memberships[0].section?.name || "Uncategorized"
      sectionNames.add(sectionName)

      parsedTasks.push({
        id: asanaTask.gid,
        title: asanaTask.name,
        date: asanaTask.due_on || (asanaTask.due_at ? asanaTask.due_at.split("T")[0] : null),
        completed: asanaTask.completed,
        section: sectionName,
        url: asanaTask.permalink_url,
      })
    })

    const existingSections = new Map(state.sections.map((s) => [s.name, s]))
    const newSections: Section[] = Array.from(sectionNames).map((name, index) => {
      if (existingSections.has(name)) {
        return existingSections.get(name)!
      }
      return {
        name,
        isVisible: true,
        color: COLOR_PALETTE[index % COLOR_PALETTE.length],
      }
    })

    return { tasks: parsedTasks, sections: newSections }
  }

  const loadTasks = (rawJson: string) => {
    try {
      const json = JSON.parse(rawJson)
      if (!json.data || !Array.isArray(json.data)) {
        throw new Error("Invalid JSON format: 'data' array not found.")
      }
      const { tasks, sections } = parseAsanaTasks(json.data)
      if (tasks.length === 0) {
        toast({
          variant: "destructive",
          title: "No Tasks Found",
          description: "The JSON file seems valid but contains no tasks to display.",
        })
        return
      }
      setState((prevState) => ({ ...prevState, tasks, sections }))
      toast({
        title: "Success!",
        description: `Loaded ${tasks.length} tasks and ${sections.length} sections.`,
      })
    } catch (error) {
      console.error("Failed to parse JSON:", error)
      toast({
        variant: "destructive",
        title: "Invalid JSON",
        description: "Please check the file or pasted text. " + (error instanceof Error ? error.message : ""),
      })
    }
  }

  const setProjectName = (name: string) => {
    setState((prevState) => ({ ...prevState, projectName: name }))
  }

  const toggleSectionVisibility = (sectionName: string) => {
    setState((prevState) => ({
      ...prevState,
      sections: prevState.sections.map((s) => (s.name === sectionName ? { ...s, isVisible: !s.isVisible } : s)),
    }))
  }

  const setSectionColor = (sectionName: string, color: string) => {
    setState((prevState) => ({
      ...prevState,
      sections: prevState.sections.map((s) => (s.name === sectionName ? { ...s, color } : s)),
    }))
  }

  const toggleShowCompleted = () => {
    setState((prevState) => ({ ...prevState, showCompleted: !prevState.showCompleted }))
  }

  const resetState = () => {
    const projectName = state.projectName
    localStorage.removeItem("asanaCalendarState")
    setState({ ...INITIAL_STATE, projectName })
    toast({
      title: "Reset Complete",
      description: "All tasks and settings have been cleared.",
    })
  }

  const value = {
    ...state,
    setProjectName,
    loadTasks,
    toggleSectionVisibility,
    setSectionColor,
    toggleShowCompleted,
    resetState,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// --- Hook ---
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export { COLOR_PALETTE }
