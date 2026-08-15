const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const indexHtmlPath = path.join(rootDir, 'index.html');
const distDir = path.join(rootDir, 'dist');
const outputPath = path.join(distDir, 'curl-builder-standalone.html');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Function to resolve and inline CSS (handling @import)
function inlineCSS(cssFilePath) {
  let cssContent = fs.readFileSync(cssFilePath, 'utf8');
  const baseDir = path.dirname(cssFilePath);

  // Replace @import './filename.css'; with actual content
  cssContent = cssContent.replace(/@import\s+['"]([^'"]+)['"]\s*;/g, (match, importPath) => {
    // Ignore external imports like google fonts
    if (importPath.startsWith('http')) {
      return match;
    }
    const fullImportPath = path.join(baseDir, importPath);
    return inlineCSS(fullImportPath);
  });

  return cssContent;
}

// 1. Inline CSS
htmlContent = htmlContent.replace(/<link\s+rel="stylesheet"\s+href="([^"]+)">/g, (match, cssPath) => {
  if (cssPath.startsWith('http')) return match;
  const fullCssPath = path.join(rootDir, cssPath);
  console.log(`Inlining CSS: ${cssPath}`);
  const inlinedCss = inlineCSS(fullCssPath);
  return `<style>\n/* Inlined from ${cssPath} */\n${inlinedCss}\n</style>`;
});

// 2. Inline JavaScript
htmlContent = htmlContent.replace(/<script\s+src="([^"]+)"><\/script>/g, (match, jsPath) => {
  if (jsPath.startsWith('http')) return match;
  const fullJsPath = path.join(rootDir, jsPath);
  console.log(`Inlining JS: ${jsPath}`);
  const jsContent = fs.readFileSync(fullJsPath, 'utf8');
  return `<script>\n/* Inlined from ${jsPath} */\n${jsContent}\n</script>`;
});

// Remove some development specific things if needed (optional)

fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log(`\nSuccessfully built standalone HTML: ${outputPath}`);
