import fs from 'node:fs';
import path from 'node:path';

const source = path.join(process.cwd(), 'public', 'og', 'lab-036-root-cause-analysis-small.b64');
const target = path.join(process.cwd(), 'public', 'og', 'lab-036-root-cause-analysis.jpg');

const base64 = fs.readFileSync(source, 'utf8').trim();
const image = Buffer.from(base64, 'base64');

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, image);
console.log(`Materialized OG image: ${target} (${image.length} bytes)`);
