"use client"

import * as React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useAppContext } from "@/context/app-context"
import type { EventSourceInput } from "@fullcalendar/core"
import { CalendarIcon } from "lucide-react" // Import CalendarIcon

export function CalendarView() {
  const { tasks, sections, showCompleted, projectName } = useAppContext() // Destructure projectName from useAppContext

  const events = React.useMemo(() => {
    const visibleSections = new Set(sections.filter((s) => s.isVisible).map((s) => s.name))
    const sectionColorMap = new Map(sections.map((s) => [s.name, s.color]))

    return tasks
      .filter((task) => {
        if (!task.date) return false
        if (!visibleSections.has(task.section)) return false
        if (!showCompleted && task.completed) return false
        return true
      })
      .map((task) => {
        const color = sectionColorMap.get(task.section) || "#708090"
        return {
          id: task.id,
          title: task.title,
          start: task.date,
          allDay: true,
          backgroundColor: color,
          borderColor: color,
          extendedProps: {
            completed: task.completed,
            url: task.url,
            sectionColor: color,
          },
          className: task.completed ? "opacity-40" : "",
        }
      })
  }, [tasks, sections, showCompleted])

  const handleEventClick = (clickInfo: { event: { extendedProps: { url?: string } } }) => {
    if (clickInfo.event.extendedProps.url) {
      window.open(clickInfo.event.extendedProps.url, "_blank")
    }
  }

  // Inject CSS custom properties for event colors to ensure print compatibility
  React.useEffect(() => {
    // Remove existing style if it exists
    const existingStyle = document.getElementById('fc-event-colors')
    if (existingStyle) {
      document.head.removeChild(existingStyle)
    }
    
    const style = document.createElement('style')
    style.id = 'fc-event-colors'
    
    // Create comprehensive CSS rules for each event and section
    const eventCSS = events.map((event) => `
      .fc-event[data-event-id="${event.id}"] {
        --event-bg-color: ${event.backgroundColor} !important;
        background-color: ${event.backgroundColor} !important;
        border-color: ${event.backgroundColor} !important;
      }
      .fc-daygrid-event[data-event-id="${event.id}"] {
        --event-bg-color: ${event.backgroundColor} !important;
        background-color: ${event.backgroundColor} !important;
        border-color: ${event.backgroundColor} !important;
      }
    `).join('\n')
    
    // Also add section-based CSS for broader coverage
    const sectionCSS = sections.map((section) => `
      .fc-event[data-section="${section.name.replace(/[^a-zA-Z0-9]/g, '-')}"] {
        --event-bg-color: ${section.color} !important;
        background-color: ${section.color} !important;
        border-color: ${section.color} !important;
      }
    `).join('\n')
    
    style.textContent = `
      ${eventCSS}
      ${sectionCSS}
      
      /* Fallback colors for print media */
      @media print {
        .fc-event {
          background-color: var(--event-bg-color) !important;
          border-color: var(--event-bg-color) !important;
          color: white !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `
    
    document.head.appendChild(style)
    
    return () => {
      const styleToRemove = document.getElementById('fc-event-colors')
      if (styleToRemove) {
        document.head.removeChild(styleToRemove)
      }
    }
  }, [events, sections])

  return (
    <div className="h-full flex-1 print:h-auto print:overflow-visible">
      <div className="print-header hidden print:block mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-8 w-8" />
            <h1 className="text-2xl font-bold">{projectName}</h1>
          </div>
          <p className="text-sm text-muted-foreground">Generated on: {new Date().toLocaleDateString()}</p>
        </div>
        <hr className="my-2" />
      </div>
      <div className="fc-custom">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          events={events as EventSourceInput}
          eventClick={handleEventClick}
          height="100%"
          contentHeight="auto"
          aspectRatio={1.6}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          dayMaxEvents={3}
          navLinks={true}
          stickyHeaderDates={false}
          fixedWeekCount={false}
          dayHeaderFormat={{ weekday: 'short' }}
          moreLinkClick="popover"
        eventDidMount={(info) => {
          // Add data attributes for CSS targeting
          info.el.setAttribute('data-event-id', info.event.id)
          
          // Find the task to get section info
          const task = tasks.find(t => t.id === info.event.id)
          if (task) {
            const sanitizedSection = task.section.replace(/[^a-zA-Z0-9]/g, '-')
            info.el.setAttribute('data-section', sanitizedSection)
          }
          
          // Ensure color is applied for print - multiple methods for reliability
          const color = info.event.extendedProps.sectionColor || info.event.backgroundColor
          info.el.setAttribute('data-color', color)
          info.el.style.setProperty('--event-bg-color', color)
          info.el.style.backgroundColor = color
          info.el.style.borderColor = color
          
          // Add class based on color for easier CSS targeting
          const colorClass = `color-${color.replace('#', '').toLowerCase()}`
          info.el.classList.add(colorClass)
          
          // Force color on all child elements
          const titleEl = info.el.querySelector('.fc-event-title')
          if (titleEl) {
            (titleEl as HTMLElement).style.color = 'white'
          }
          
          const mainEl = info.el.querySelector('.fc-event-main')
          if (mainEl) {
            (mainEl as HTMLElement).style.color = 'white'
          }
        }}
        eventContent={(eventInfo) => {
          // Custom event rendering for better print compatibility
          const bgColor = eventInfo.event.extendedProps.sectionColor || eventInfo.event.backgroundColor
          return {
            html: `<div class="fc-event-main" style="color: white; font-weight: 500; background-color: ${bgColor};">
                     <div class="fc-event-title" style="color: white;">${eventInfo.event.title}</div>
                   </div>`
          }
        }}
        />
      </div>
    </div>
  )
}
