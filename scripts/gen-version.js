// Generates public/version.json with a unique build timestamp.
// Angular copies public/ → dist/browser/ on every build, so this file ships automatically.
const fs = require('node:fs');
const path = require('node:path');

const version = { v: Date.now().toString() };
fs.writeFileSync(
  path.join(__dirname, '../public/version.json'),
  JSON.stringify(version)
);
console.log('[gen-version]', version);
