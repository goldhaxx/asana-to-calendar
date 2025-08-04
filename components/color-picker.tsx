"use client"
import { COLOR_PALETTE, useAppContext } from "@/context/app-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface ColorPickerProps {
  sectionName: string
  currentColor: string
}

export function ColorPicker({ sectionName, currentColor }: ColorPickerProps) {
  const { setSectionColor } = useAppContext()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: currentColor }}
          aria-label={`Change color for ${sectionName}`}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-5 gap-2">
          {COLOR_PALETTE.map((color) => (
            <Button
              key={color}
              size="icon"
              className={`h-6 w-6 rounded-full cursor-pointer ${
                currentColor === color ? "ring-2 ring-offset-2 ring-primary" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSectionColor(sectionName, color)}
              aria-label={`Set color to ${color}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
