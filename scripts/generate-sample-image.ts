import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generateSampleImage() {
  try {
    console.log('Generating sample image...');
    const zai = await ZAI.create();

    const response = await zai.images.generations.create({
      prompt: 'A stunning futuristic cityscape at sunset, floating gardens in the air, glass skyscrapers with holographic displays, golden hour lighting, cinematic, highly detailed, 8K quality',
      size: '1024x1024'
    });

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public', 'sample-images');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, 'futuristic-city.png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✓ Image generated successfully!');
    console.log('Path:', outputPath);
    console.log('File size:', buffer.length, 'bytes');

    return outputPath;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

generateSampleImage().catch(console.error);
