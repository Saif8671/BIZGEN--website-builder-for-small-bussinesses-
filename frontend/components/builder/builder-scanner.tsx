"use client"

import { useState, useRef } from "react"
import { Camera, Upload, ImageIcon, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BuilderScanner() {
  const [isDragging, setIsDragging] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedImage, setScannedImage] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<{
    businessName: string
    phone: string
    address: string
    services: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      processImage(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }

  const processImage = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      setScannedImage(e.target?.result as string)
      setIsScanning(true)

      // Simulate OCR processing
      await new Promise((resolve) => setTimeout(resolve, 2500))

      // Simulated extracted data
      setExtractedData({
        businessName: "Sample Business",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, City",
        services: ["Service 1", "Service 2", "Service 3"],
      })
      setIsScanning(false)
    }
    reader.readAsDataURL(file)
  }

  const handleCameraClick = () => {
    // In a real app, this would open the camera
    fileInputRef.current?.click()
  }

  const clearScan = () => {
    setScannedImage(null)
    setExtractedData(null)
  }

  return (
    <div className="flex h-full flex-col p-4">
      <h3 className="text-sm font-medium text-foreground mb-2">Scan Flyer</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Upload a business card, flyer, or banner to automatically create your website
      </p>

      {!scannedImage ? (
        <>
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
              isDragging
                ? "border-accent bg-accent/10"
                : "border-border bg-background hover:border-accent/50"
            }`}
          >
            <ImageIcon className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm text-foreground mb-1">Drop an image here</p>
            <p className="text-xs text-muted-foreground mb-4">or</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload
              </Button>
              <Button
                size="sm"
                onClick={handleCameraClick}
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Camera className="h-4 w-4" />
                Camera
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Supported Formats */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Supports: Business cards, Flyers, Banners, Posters
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Scanned Image Preview */}
          <div className="relative mb-4">
            <img
              src={scannedImage}
              alt="Scanned"
              className="w-full rounded-lg border border-border"
            />
            <button
              onClick={clearScan}
              className="absolute top-2 right-2 rounded-full bg-background/80 p-1 hover:bg-background"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>
          </div>

          {/* Scanning State */}
          {isScanning ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
              <p className="text-sm text-foreground">Extracting information...</p>
              <p className="text-xs text-muted-foreground">This may take a moment</p>
            </div>
          ) : extractedData ? (
            <div className="flex-1 space-y-4">
              <h4 className="text-sm font-medium text-foreground">Extracted Information</h4>
              
              <div className="space-y-3">
                <div className="rounded-lg border border-border bg-background p-3">
                  <label className="text-xs text-muted-foreground">Business Name</label>
                  <p className="text-sm text-foreground font-medium">{extractedData.businessName}</p>
                </div>
                
                <div className="rounded-lg border border-border bg-background p-3">
                  <label className="text-xs text-muted-foreground">Phone</label>
                  <p className="text-sm text-foreground">{extractedData.phone}</p>
                </div>
                
                <div className="rounded-lg border border-border bg-background p-3">
                  <label className="text-xs text-muted-foreground">Address</label>
                  <p className="text-sm text-foreground">{extractedData.address}</p>
                </div>
                
                <div className="rounded-lg border border-border bg-background p-3">
                  <label className="text-xs text-muted-foreground">Services</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {extractedData.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Generate Website
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}
