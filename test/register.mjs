import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Register tsx to handle TypeScript using full path
const tsxPath = join(__dirname, '..', 'node_modules', 'tsx', 'dist', 'esm', 'index.mjs');
register(tsxPath, pathToFileURL(join(__dirname, '..')));
