import fs from 'node:fs';
import path from 'node:path';

export const prerender = true;

export function GET() {
  const source = path.join(process.cwd(), 'public', 'og', 'lab-036-root-cause-analysis-small.b64');
  const base64 = fs.readFileSync(source, 'utf-8').trim();
  const image = Buffer.from(base64, 'base64');

  return new Response(image, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
