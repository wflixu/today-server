// Simple wrapper to run Node.js built-in test with ts-node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get test files
const testPattern = process.argv[2] || 'test/**/*.test.ts';
const isCoverage = process.argv.includes('--coverage');

// Build node test command
const nodeArgs = [
  '--test',
  isCoverage ? '--experimental-test-coverage' : '',
  testPattern
].filter(Boolean).join(' ');

// Use ts-node to compile and run
try {
  execSync(`node --loader ts-node/esm ${nodeArgs}`, {
    stdio: 'inherit',
    cwd: process.cwd()
  });
} catch (error) {
  process.exit(error.status || 1);
}
