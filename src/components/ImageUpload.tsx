'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      await uploadImage(file)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await uploadImage(file)
    }
  }

  const uploadImage = async (file: File) => {
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }

      const data = await response.json()
      setPreview(data.imageUrl)
      onChange(data.imageUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error al subir la imagen. Intenta de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onChange('')
  }

  const handleClick = () => {
    if (!preview && !uploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded">
            Imagen cargada correctamente
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-300 hover:border-gray-400'}
            ${uploading ? 'cursor-wait opacity-60' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          <div className="flex flex-col items-center gap-3">
            <div className={`
              p-4 rounded-full bg-blue-500/10
              ${uploading ? 'animate-pulse' : ''}
            `}>
              {uploading ? (
                <ImageIcon className="h-8 w-8 text-blue-500" />
              ) : (
                <Upload className="h-8 w-8 text-blue-500" />
              )}
            </div>

            {uploading ? (
              <div>
                <p className="text-sm font-medium text-foreground">
                  Subiendo imagen...
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Por favor espera
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-foreground">
                  Arrastra una imagen aquí
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, GIF hasta 10MB
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
