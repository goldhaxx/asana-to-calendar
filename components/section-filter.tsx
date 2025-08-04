"use client"

import type * as React from "react"
import { useAppContext } from "@/context/app-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "./color-picker"

export function SectionFilter() {
  const { sections, toggleSectionVisibility } = useAppContext()

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-medium">Filter by Section</h4>
      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
        {sections.map((section) => (
          <div key={section.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`section-${section.name}`}
                checked={section.isVisible}
                onCheckedChange={() => toggleSectionVisibility(section.name)}
                style={{ "--checkbox-color": section.color } as React.CSSProperties}
                className="data-[state=checked]:bg-[var(--checkbox-color)] data-[state=checked]:border-[var(--checkbox-color)]"
              />
              <Label htmlFor={`section-${section.name}`} className="truncate" title={section.name}>
                {section.name}
              </Label>
            </div>
            <ColorPicker sectionName={section.name} currentColor={section.color} />
          </div>
        ))}
      </div>
    </div>
  )
}
