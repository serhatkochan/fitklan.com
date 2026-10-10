import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
if (path.relative(root, path.resolve(output)) !== 'dist') {
  throw new Error('Build output must stay inside the project dist directory.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'en', 'styles.css', 'script.js', 'robots.txt', 'sitemap.xml', 'assets']) {
  await cp(path.join(root, name), path.join(output, name), { recursive: true });
}
console.log('Fit Klan statik sayfası dist/ klasörüne hazırlandı.');
