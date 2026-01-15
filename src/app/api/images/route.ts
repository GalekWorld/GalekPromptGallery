import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const images = await db.imagePrompt.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(images)
  } catch (error: any) {
    console.error('Error fetching images:', error)

    return NextResponse.json(
      {
        error: 'Error al obtener las imágenes',
        message: error?.message ?? String(error),
        code: error?.code,
      },
      { status: 500 }
    )
  }
}
