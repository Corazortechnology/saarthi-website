import { cp, mkdir, readFile, readdir, stat, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

// Compose a new release without altering the saved film/simulator build.
const { values } = parseArgs({ options: {
  'base-release': { type: 'string' }, output: { type: 'string' },
} });
if (!values['base-release'] || !values.output) throw Error('Use --base-release <existing demo dist> --output <new release dist>');
const root = fileURLToPath(new URL('../', import.meta.url));
const base = resolve(values['base-release']);
const output = resolve(values.output);
const insurance = join(root, 'dist-insurance');
await Promise.all(['index.html', 'app/main.dart.js', 'watch/index.html', 'staticwebapp.config.json'].map(p => access(join(base, p))));
await access(join(insurance, 'index.html'));
if (output === base || output.startsWith(base + '/') || output === insurance || output.startsWith(insurance + '/')) throw Error('Output must be separate from source builds.');
try { await access(output); throw Error('Output already exists. Choose a new release directory.'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
await mkdir(dirname(output), { recursive: true });
await cp(base, output, { recursive: true, force: false, errorOnExist: true });
await cp(insurance, join(output, 'insurance'), { recursive: true, force: false, errorOnExist: true });

const htmlPath = join(output, 'insurance/index.html');
let html = await readFile(htmlPath, 'utf8');
if (!html.includes('/insurance/assets/')) throw Error('Run npm run build:insurance-demo first.');
html = html.replace(/<title>.*?<\/title>/, '<title>Saarthi | Insurance Intelligence</title>')
  .replace(/(<meta\s+(?:name|property)="(?:description|og:description)"\s+content=")[^"]*/g, '$1Explore vehicle exposure, driver behaviour, claims and rewards in the Saarthi insurance demonstration.')
  .replace(/(<meta property="og:title" content=")[^"]*/, '$1Saarthi | Insurance Intelligence')
  .replace(/(<meta property="og:image" content=")[^"]*/, '$1https://demo.saarthiin.com/insurance/og-image.png')
  .replace(/(<meta name="theme-color" content=")[^"]*/, '$1#18201b');
await writeFile(htmlPath, html);
const manifestPath = join(output, 'insurance/site.webmanifest');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
manifest.name = 'Saarthi Insurance Intelligence';
manifest.start_url = '/insurance';
manifest.scope = '/insurance/';
manifest.icons = manifest.icons.map(icon => ({ ...icon, src: `/insurance/${icon.src.replace(/^\//, '')}` }));
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

const configPath = join(output, 'staticwebapp.config.json');
const config = JSON.parse(await readFile(configPath, 'utf8'));
if ((config.routes || []).some(r => r.route === '/insurance' || r.route.startsWith('/insurance/'))) throw Error('The base release already contains insurance routes; review before replacing them.');
const pages = ['overview', 'portfolio', 'vehicles', 'drivers', 'incidents', 'alerts', 'camera', 'risk', 'decisions', 'claims', 'rewards', 'simulation', 'guide', 'scenarios', 'customer', 'sources', 'integrations'];
const rewrite = route => ({ route, rewrite: '/insurance/index.html' });
config.routes = [
  { route: '/insurance/assets/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
  rewrite('/insurance'),
  ...pages.flatMap(page => [rewrite(`/insurance/${page}`), rewrite(`/insurance/${page}/*`)]),
  ...(config.routes || []),
];
await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(join(directory, e.name)) : [join(directory, e.name)]))).flat();
}
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const baseFiles = await files(base);
for (const file of baseFiles) {
  const path = relative(base, file);
  if (path === 'staticwebapp.config.json') continue;
  if (digest(await readFile(file)) !== digest(await readFile(join(output, path)))) throw Error(`Base file changed: ${path}`);
}
const outputFiles = await files(output);
const bytes = (await Promise.all(outputFiles.map(f => stat(f)))).reduce((sum, s) => sum + s.size, 0);
if (bytes > 250 * 1024 * 1024) throw Error('Composed release exceeds the existing 250 MiB static content limit.');
const report = { output, files: outputFiles.length, bytes, preservedBaseFiles: baseFiles.length - 1, addedRouteRules: 2 + pages.length * 2, baseConfigurationPreserved: true };
await writeFile(join(output, '..', 'composition.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
