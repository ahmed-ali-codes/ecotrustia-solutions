const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 757 });
  await page.goto('http://localhost:3001/privacy-policy', { waitUntil: 'networkidle0' });

  const overflows = await page.evaluate(() => {
    const docWidth = 500;
    const elements = document.querySelectorAll('*');
    const overflowing = [];
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > docWidth) {
        overflowing.push({
          tag: el.tagName,
          className: el.className,
          width: rect.width
        });
      }
    });
    return overflowing;
  });

  console.log(JSON.stringify(overflows.filter(o => o.className && !o.className.includes('absolute') && !o.className.includes('w-[500px]')), null, 2));
  await browser.close();
})();
