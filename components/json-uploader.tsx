"use client"

import { Label } from "@/components/ui/label"

import * as React from "react"
import { UploadCloud } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function JsonUploader() {
  const { loadTasks } = useAppContext()
  const { toast } = useToast()
  const [isDragging, setIsDragging] = React.useState(false)
  const [pastedJson, setPastedJson] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (file && file.type === "application/json") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        loadTasks(text)
      }
      reader.readAsText(file)
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a valid JSON file.",
      })
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handlePasteSubmit = () => {
    if (pastedJson.trim()) {
      loadTasks(pastedJson)
    } else {
      toast({
        variant: "destructive",
        title: "Empty Input",
        description: "Please paste your Asana JSON content.",
      })
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileClick}
        className={`flex w-full max-w-2xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
          isDragging ? "border-primary bg-muted" : "border-border hover:border-primary/50"
        }`}
      >
        <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-semibold">Drag & drop your Asana JSON file here</p>
        <p className="text-muted-foreground">or click to select a file</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="text-center text-muted-foreground">OR</div>
      <div className="w-full max-w-2xl">
        <Label htmlFor="json-paste" className="text-lg font-semibold">
          Paste your JSON data
        </Label>
        <Textarea
          id="json-paste"
          value={pastedJson}
          onChange={(e) => setPastedJson(e.target.value)}
          placeholder="Paste your Asana JSON export content here..."
          className="mt-2 min-h-[150px] font-mono text-sm"
        />
        <Button onClick={handlePasteSubmit} className="mt-4 w-full">
          Generate Calendar from Pasted Text
        </Button>
      </div>
    </div>
  )
}
