"use client"
import React from "react"
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
  const { theme } = useTheme()
  const [isPrinting, setIsPrinting] = React.useState(false)

  const handlePrint = async () => {
    // Prevent multiple simultaneous print operations
    if (isPrinting) return
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return
    
    setIsPrinting(true)
    const isDarkMode = theme === 'dark'
    
    // Use requestAnimationFrame to yield to the browser and improve INP
    const requestAnimationFrame = (fn: () => void) => {
      return new Promise<void>(resolve => {
        window.requestAnimationFrame(() => {
          fn()
          resolve()
        })
      })
    }
    
    // Optimized beforePrint function with minimal synchronous operations
    const beforePrint = () => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') return
      
      // Essential synchronous DOM changes for print mode
      if (isDarkMode) {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
      document.body.classList.add('printing')
      
      // Schedule layout adjustments asynchronously to avoid blocking
      window.requestAnimationFrame(() => {
        const fcElement = document.querySelector('.fc')
        if (fcElement) {
          fcElement.dispatchEvent(new Event('resize'))
        }
        
        // Apply column width adjustments with minimal delay
        setTimeout(() => {
          const dayCells = document.querySelectorAll('.fc-daygrid-day, .fc-col-header-cell')
          dayCells.forEach(cell => {
            (cell as HTMLElement).style.width = '14.285714%'
          })
        }, 25) // Further reduced delay
      })
    }
    
    const afterPrint = () => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof document === 'undefined') return
      
      // Restore original theme after printing
      if (isDarkMode) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      }
      document.body.classList.remove('printing')
      setIsPrinting(false)
    }
    
    // Set up print event listeners (browser environment already checked above)
    window.addEventListener('beforeprint', beforePrint)
    window.addEventListener('afterprint', afterPrint)
    
    // Yield to browser before triggering print dialog
    await requestAnimationFrame(() => {
      window.print()
    })
    
    // Clean up listeners with reduced timeout and error handling
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeprint', beforePrint)
        window.removeEventListener('afterprint', afterPrint)
      }
      // Ensure isPrinting is reset even if afterPrint doesn't fire
      if (isPrinting) {
        setIsPrinting(false)
      }
    }, 500) // Reduced from 1000ms
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
          disabled={tasks.length === 0 || isPrinting}
          aria-label="Print Calendar"
          className="hover:bg-accent transition-colors"
        >
          {isPrinting ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <PrinterIcon className="h-4 w-4" />
          )}
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
