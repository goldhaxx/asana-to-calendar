"use client"
import { CalendarIcon, PrinterIcon, Trash2Icon } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Header() {
  const { projectName, setProjectName, resetState, tasks } = useAppContext()
  const { theme, setTheme } = useTheme()

  const handlePrint = () => {
    // Store current theme to restore after printing
    const currentTheme = theme
    const isDarkMode = theme === 'dark'
    
    // Set up print-specific optimizations
    const beforePrint = () => {
      // Force light mode for printing if currently in dark mode
      if (isDarkMode) {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
      
      // Ensure all colors are properly set
      document.body.classList.add('printing')
      
      // Force recalculation of calendar layout
      const fcElement = document.querySelector('.fc')
      if (fcElement) {
        fcElement.dispatchEvent(new Event('resize'))
      }
      
      // Gentle adjustment for equal column widths
      setTimeout(() => {
        const dayCells = document.querySelectorAll('.fc-daygrid-day, .fc-col-header-cell')
        dayCells.forEach(cell => {
          (cell as HTMLElement).style.width = '14.285714%'
        })
      }, 100)
    }
    
    const afterPrint = () => {
      // Restore original theme after printing
      if (isDarkMode) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      }
      
      document.body.classList.remove('printing')
    }
    
    // Set up print event listeners
    window.addEventListener('beforeprint', beforePrint)
    window.addEventListener('afterprint', afterPrint)
    
    // Trigger print
    window.print()
    
    // Clean up listeners
    setTimeout(() => {
      window.removeEventListener('beforeprint', beforePrint)
      window.removeEventListener('afterprint', afterPrint)
    }, 1000)
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card/95 backdrop-blur-sm px-4 md:px-6 print:hidden sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <CalendarIcon className="h-5 w-5 text-primary" />
        </div>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="text-lg font-semibold border-0 focus-visible:ring-0 shadow-none p-1 h-auto bg-transparent"
          aria-label="Project Name"
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrint}
          disabled={tasks.length === 0}
          aria-label="Print Calendar"
          className="hover:bg-accent transition-colors"
        >
          <PrinterIcon className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              size="icon" 
              disabled={tasks.length === 0} 
              aria-label="Reset Application"
              className="hover:bg-destructive/90 transition-colors"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all imported tasks and reset your section settings. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetState}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}
