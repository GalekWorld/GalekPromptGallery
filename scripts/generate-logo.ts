import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

async function generateLogo() {
  try {
    console.log('Generating G logo...');
    const zai = await ZAI.create();

    const response = await zai.images.generations.create({
      prompt: 'A modern, minimalist letter G logo, clean white background, professional corporate design, gradient blue colors from light sky blue to deep blue, vector style, simple and elegant, 512x512 square format, high quality',
      size: '512x512'
    });

    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outputPath = path.join(publicDir, 'logo-g.png');
    fs.writeFileSync(outputPath, buffer);

    console.log('✓ Logo generated successfully!');
    console.log('Path:', outputPath);
    console.log('File size:', buffer.length, 'bytes');

    return outputPath;
  } catch (error) {
    console.error('Error generating logo:', error);
    throw error;
  }
}

generateLogo().catch(console.error);
