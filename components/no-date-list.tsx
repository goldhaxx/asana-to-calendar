"use client"

import * as React from "react"
import { useAppContext } from "@/context/app-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink } from "lucide-react"

export function NoDateList() {
  const { tasks, sections, showCompleted } = useAppContext()

  const undatedTasksBySection = React.useMemo(() => {
    const visibleSections = new Set(sections.filter((s) => s.isVisible).map((s) => s.name))

    const filteredTasks = tasks.filter(
      (task) => !task.date && visibleSections.has(task.section) && (showCompleted || !task.completed),
    )

    return filteredTasks.reduce(
      (acc, task) => {
        if (!acc[task.section]) {
          acc[task.section] = []
        }
        acc[task.section].push(task)
        return acc
      },
      {} as Record<string, typeof tasks>,
    )
  }, [tasks, sections, showCompleted])

  const sectionColorMap = new Map(sections.map((s) => [s.name, s.color]))
  const undatedSections = Object.keys(undatedTasksBySection)

  if (undatedSections.length === 0) {
    return null
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <h4 className="font-medium">Tasks with No Due Date</h4>
      <Accordion type="multiple" className="w-full flex-1 overflow-y-auto pr-2">
        {undatedSections.map((sectionName) => (
          <AccordionItem value={sectionName} key={sectionName}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: sectionColorMap.get(sectionName) }} />
                <span className="truncate">{sectionName}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2 pl-4">
                {undatedTasksBySection[sectionName].map((task) => (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between text-sm ${
                      task.completed ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    <span className="truncate pr-2">{task.title}</span>
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View task "${task.title}" in Asana`}
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
