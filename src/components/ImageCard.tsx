'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, ExternalLink, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface ImageCardProps {
  id: string
  title: string
  imageUrl: string
  prompt: string
  description?: string
}

export function ImageCard({ id, title, imageUrl, prompt, description }: ImageCardProps) {
  const [open, setOpen] = useState(false)
  const [hasVerified, setHasVerified] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [copied, setCopied] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const instagramUsername = 'galek.ia'

  const handleVerify = () => {
    setVerifying(true)
    setCountdown(10)

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setHasVerified(true)
          setShowPrompt(true)
          localStorage.setItem(`verified_${id}`, 'true')
          setVerifying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      toast.success('Prompt copiado al portapapeles')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Error al copiar el prompt')
    }
  }

  // Check if user already verified
  useState(() => {
    const verified = localStorage.getItem(`verified_${id}`)
    if (verified === 'true') {
      setHasVerified(true)
      setShowPrompt(true)
    }
  })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
      </CardHeader>
      
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>

      <CardFooter className="p-4 mt-auto">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              Obtener Prompt
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[500px]">
            {!showPrompt ? (
              <>
                <DialogHeader>
                  <DialogTitle>🔒 Prompt Bloqueado</DialogTitle>
                  <DialogDescription>
                    Para ver el prompt de esta imagen, primero debes seguirme en Instagram.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-sky-500/10 p-6 text-center border border-blue-500/20">
                    <p className="text-lg font-semibold mb-2">@{instagramUsername}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dale Follow para desbloquear el prompt
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={`https://instagram.com/${instagramUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ir a Instagram
                      </a>
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>¿Ya me sigues?</p>
                  </div>
                  
                  <Button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600"
                    size="lg"
                  >
                    {verifying ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Espera {countdown}s...
                      </>
                    ) : (
                      'Hecho, ya te sigo'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>✨ Prompt Desbloqueado</DialogTitle>
                  <DialogDescription>
                    Aquí tienes el prompt utilizado para crear esta imagen
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="rounded-lg bg-muted p-4 max-h-[300px] overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap break-words">{prompt}</p>
                  </div>
                  
                  <Button
                    onClick={handleCopyPrompt}
                    variant={copied ? "default" : "outline"}
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar Prompt
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
