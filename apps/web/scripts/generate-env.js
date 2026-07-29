const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const webRoot = path.resolve(__dirname, '..');

function loadEnvFile(fileName) {
  const filePath = path.join(webRoot, fileName);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return dotenv.parse(fs.readFileSync(filePath));
}

function writeEnvironmentFile(fileName, production, source) {
  const apiUrl = process.env.API_URL || source.API_URL || '/api';
  const content = `export const environment = {
  production: ${production},
  apiUrl: '${apiUrl}',
};
`;
  fs.writeFileSync(path.join(webRoot, 'src/environments', fileName), content);
  console.log(`[generate-env] ${fileName} apiUrl = ${apiUrl}`);
}

writeEnvironmentFile('environment.ts', false, loadEnvFile('.env.local'));
writeEnvironmentFile('environment.prod.ts', true, loadEnvFile('.env'));
