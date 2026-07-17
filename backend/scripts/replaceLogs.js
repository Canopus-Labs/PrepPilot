const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== 'scripts' && f !== 'utils') {
        walkDir(dirPath, callback);
      }
    } else {
      if (f.endsWith('.js')) {
        callback(dirPath);
      }
    }
  });
}

const targetFiles = [];
walkDir(basePath, (filePath) => targetFiles.push(filePath));

targetFiles.forEach(fullPath => {
  let content = fs.readFileSync(fullPath, 'utf-8');
  let needsImport = false;

  if (content.includes('console.log') || content.includes('console.warn') || content.includes('console.error')) {
    needsImport = true;
    content = content.replace(/console\.log/g, 'logger.info');
    content = content.replace(/console\.error/g, 'logger.error');
    content = content.replace(/console\.warn/g, 'logger.warn');
  }

  if (needsImport && !content.includes('const logger = require(')) {
    const relativeDepth = path.relative(path.dirname(fullPath), path.join(basePath, 'utils/logger.js')).replace(/\\/g, '/');
    let importPath = relativeDepth;
    if (!importPath.startsWith('.')) {
      importPath = './' + importPath;
    }
    // Remove .js extension
    importPath = importPath.replace(/\.js$/, '');
    
    const importStatement = `const logger = require('${importPath}');\n`;
    content = importStatement + content;
  }

  if (needsImport) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${fullPath}`);
  }
});

