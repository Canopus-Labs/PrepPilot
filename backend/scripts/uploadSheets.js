const fs = require('fs');
const path = require('path');

const SHEETS_DIR = path.join(__dirname, '../sheets');
const API_URL = 'http://localhost:8000/api/sheets/upload'; // Use local backend for uploads

async function uploadSheet(filename) {
  const filePath = path.join(SHEETS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, data })
    });
    const result = await res.json();
    console.log(`Uploaded ${filename}:`, result);
  } catch (err) {
    console.error(`Error uploading ${filename}:`, err);
  }
}

async function main() {
  const files = fs.readdirSync(SHEETS_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    await uploadSheet(file);
  }
  console.log('All sheets attempted.');
}

main();
