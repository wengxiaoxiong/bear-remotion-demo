const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function renderHTMLToPNG() {
  const htmlPath = path.join(__dirname, 'cover.html');
  const outputPath = path.join(__dirname, 'cover.png');
  
  // 检查HTML文件是否存在
  if (!fs.existsSync(htmlPath)) {
    console.error('HTML file not found:', htmlPath);
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // 设置视口大小为800x450（16:9）
    await page.setViewport({
      width: 800,
      height: 450,
      deviceScaleFactor: 2 // 2x分辨率以获得更清晰的图片
    });

    // 加载HTML文件
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });

    // 等待字体加载
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 截图保存为PNG
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false
    });

    console.log(`Successfully rendered to: ${outputPath}`);
  } catch (error) {
    console.error('Error rendering HTML:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

renderHTMLToPNG();
