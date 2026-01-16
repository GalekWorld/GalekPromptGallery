"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ImageCard } from "@/components/ImageCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Instagram } from "lucide-react";

interface ImagePrompt {
  id: string;
  title: string;
  imageUrl: string;
  prompt: string;
  description?: string;
  createdAt: string;
}

export default function Home() {
  const [images, setImages] = useState<ImagePrompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/images");
      const data = await response.json();

      // Verificar que data sea un array antes de asignar
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        console.error("API returned non-array data:", data);
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">G</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  Galek Prompt Gallery
                </h1>
                <p className="text-sm text-muted-foreground">
                  Descubre los prompts detrás de cada imagen
                </p>
              </div>
            </div>
            <a
              href="/admin"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Galería de Prompts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección de imágenes creadas con IA. Obtén acceso a
            los prompts siguiéndonos en Instagram.
          </p>
        </div>

        {/* Adsterra Native Banner */}
        <div className="my-6 flex justify-center">
          <div className="w-full max-w-3xl">
            <Script
              id="adsterra-native"
              async
              data-cfasync="false"
              src="https://processesshaken.com/a82a9df3ea10819f842a19a89208aea4/invoke.js"
              strategy="afterInteractive"
            />
            <div id="container-a82a9df3ea10819f842a19a89208aea4" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <Skeleton className="aspect-square w-full" />
                <CardFooter className="p-4">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Instagram className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay imágenes aún</h3>
            <p className="text-muted-foreground mb-6">
              ¡Pronto habrá contenido nuevo aquí!
            </p>
            <a
              href="/admin"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Ir al Panel de Admin
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                id={image.id}
                title={image.title}
                imageUrl={image.imageUrl}
                prompt={image.prompt}
                description={image.description}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground space-y-3">
          <p>©️ 2024 Galek Prompt Gallery. Todos los derechos reservados.</p>

          {/* Adsterra Direct Link (solo bajo click) */}
          <a
            href="https://processesshaken.com/xhi14cwnnr?key=4a1e29b4a0b2e255558a75288c401351"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border hover:bg-muted transition"
          >
            Ver oferta
          </a>
        </div>
      </footer>
    </div>
  );
}
