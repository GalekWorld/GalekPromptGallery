'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageCard } from '@/components/ImageCard'
import { ImageUpload } from '@/components/ImageUpload'
import { toast } from 'sonner'
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react'

interface ImagePrompt {
  id: string
  title: string
  imageUrl: string
  prompt: string
  description?: string
  createdAt: string
}

export default function AdminPage() {
  const [images, setImages] = useState<ImagePrompt[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    prompt: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images')
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('Error fetching images:', error)
      toast.error('Error al cargar las imágenes')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Error al crear la imagen')
      }

      toast.success('Imagen creada correctamente')
      setFormData({
        title: '',
        imageUrl: '',
        prompt: '',
        description: ''
      })
      setShowForm(false)
      fetchImages()
    } catch (error) {
      console.error('Error creating image:', error)
      toast.error('Error al crear la imagen')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/images?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la imagen')
      }

      toast.success('Imagen eliminada correctamente')
      fetchImages()
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Error al eliminar la imagen')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </a>
              <div>
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
                <p className="text-sm text-muted-foreground">
                  Gestiona tus imágenes y prompts
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nueva Imagen
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Form to add new image */}
        {showForm && (
          <Card className="mb-8 border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-sky-500/5">
            <CardHeader>
              <CardTitle className="text-xl">Añadir Nueva Imagen</CardTitle>
              <CardDescription>
                Sube una nueva imagen con su prompt a la galería
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Paisaje futurista con edificios de cristal"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Imagen *</Label>
                  <ImageUpload
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Arrastra una imagen o haz clic para seleccionar
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt *</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Escribe el prompt completo utilizado para crear la imagen..."
                    value={formData.prompt}
                    onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Una breve descripción de la imagen..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 gap-2"
                    size="lg"
                  >
                    <Save className="h-4 w-4" />
                    {submitting ? 'Guardando...' : 'Guardar Imagen'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    size="lg"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Imágenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{images.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prompts Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{images.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Estado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-blue-600">Activo</div>
            </CardContent>
          </Card>
        </div>

        {/* Images Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Imágenes en la Galería</h2>
          
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Cargando...
            </div>
          ) : images.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No hay imágenes</h3>
              <p className="text-muted-foreground mb-6">
                Empieza añadiendo tu primera imagen a la galería
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Añadir Primera Imagen
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <ImageCard
                    id={image.id}
                    title={image.title}
                    imageUrl={image.imageUrl}
                    prompt={image.prompt}
                    description={image.description}
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Galek Prompt Gallery. Panel de Administración.</p>
        </div>
      </footer>
    </div>
  )
}
