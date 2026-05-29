const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.resolve(__dirname, 'index.html');
const OUTPUT_PATH = path.resolve(__dirname, 'AI编程课程-幻灯片.pdf');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=swiftshader',         // software WebGL for headless
      '--allow-file-access-from-files',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Open the HTML file (file:// URL so relative assets resolve)
  await page.goto(`file://${HTML_PATH}`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for WebGL and fonts to settle
  await new Promise(r => setTimeout(r, 3000));

  // Count slides
  const totalSlides = await page.evaluate(() =>
    document.querySelectorAll('#deck .slide').length
  );
  console.log(`Found ${totalSlides} slides`);

  const screenshotPaths = [];

  for (let i = 0; i < totalSlides; i++) {
    console.log(`Capturing slide ${i + 1}/${totalSlides}...`);

    // Navigate to this slide
    await page.evaluate((n) => {
      const deck = document.getElementById('deck');
      deck.style.transition = 'none';
      deck.style.transform = `translateX(${-n * 100}vw)`;
      // Force show all animated elements on this slide
      const slides = document.querySelectorAll('.slide');
      if (slides[n]) {
        slides[n].querySelectorAll('[data-anim]').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
        slides[n].querySelectorAll('[data-animate="pipeline"] [data-anim]').forEach(el => {
          el.style.opacity = '1';
        });
      }
    }, i);

    // Let WebGL + paint settle
    await new Promise(r => setTimeout(r, 800));

    const screenshotPath = path.resolve(__dirname, `.tmp-slide-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: screenshotPath, type: 'png' });
    screenshotPaths.push(screenshotPath);
  }

  await browser.close();
  console.log(`Captured ${screenshotPaths.length} screenshots`);

  // Combine screenshots into a single PDF using pdf-lib
  const { PDFDocument } = require('pdf-lib');

  const pdfDoc = await PDFDocument.create();

  for (const imgPath of screenshotPaths) {
    const imgBytes = fs.readFileSync(imgPath);
    let image;
    if (imgPath.endsWith('.png')) {
      image = await pdfDoc.embedPng(imgBytes);
    } else {
      image = await pdfDoc.embedJpg(imgBytes);
    }

    // A4 landscape-ish page that fits 16:9
    const pageWidth = 1920;
    const pageHeight = 1080;
    // Scale down to fit within reasonable PDF dimensions (~841 x 473 pts for 16:9 on landscape A4)
    const pdfPage = pdfDoc.addPage([841, 473]); // roughly 16:9 on landscape-ish A4
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: 841,
      height: 473,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(OUTPUT_PATH, pdfBytes);
  console.log(`PDF saved to: ${OUTPUT_PATH}`);

  // Clean up temp screenshots
  for (const p of screenshotPaths) {
    fs.unlinkSync(p);
  }
  console.log('Done!');
})();
