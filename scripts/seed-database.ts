import { db } from '@/lib/db'

async function seedSampleImage() {
  try {
    console.log('Adding sample image to database...')

    const image = await db.imagePrompt.create({
      data: {
        title: 'Ciudad Futurista al Atardecer',
        imageUrl: '/sample-images/futuristic-city.png',
        prompt: 'A stunning futuristic cityscape at sunset, floating gardens in the air, glass skyscrapers with holographic displays, golden hour lighting, cinematic, highly detailed, 8K quality',
        description: 'Una vista impresionante de una metrópolis futurista con jardines flotantes y edificios de cristal con pantallas holográficas. La luz dorada del atardecer baña toda la escena.'
      }
    })

    console.log('✓ Sample image added to database!')
    console.log('ID:', image.id)
    console.log('Title:', image.title)
  } catch (error) {
    console.error('Error adding sample image:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

seedSampleImage().catch(console.error)
