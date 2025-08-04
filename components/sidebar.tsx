"use client"
import { useAppContext } from "@/context/app-context"
import { SectionFilter } from "./section-filter"
import { NoDateList } from "./no-date-list"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function Sidebar() {
  const { tasks, showCompleted, toggleShowCompleted } = useAppContext()

  if (tasks.length === 0) {
    return null // Don't show sidebar if no tasks are loaded
  }

  return (
    <aside className="hidden w-72 flex-col border-r bg-card p-4 print:hidden lg:flex">
      <h3 className="text-lg font-semibold">Controls</h3>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <Label htmlFor="show-completed" className="font-medium">
          Show Completed Tasks
        </Label>
        <Switch id="show-completed" checked={showCompleted} onCheckedChange={toggleShowCompleted} />
      </div>
      <Separator className="my-4" />
      <SectionFilter />
      <Separator className="my-4" />
      <NoDateList />
    </aside>
  )
}
