const fs = require('fs');
const path = require('path');

const toolsDir = '/Users/apple/Documents/Ecotrustia-data/Ecotrustia-site/final-web-app-next_js/src/app/tools';

const names = {
  "age-calculator": ["Age", "Calculator"],
  "audio-converter": ["Audio", "Converter"],
  "background-remover": ["Background", "Remover"],
  "bmi-calculator": ["BMI", "Calculator"],
  "calories-calculator": ["Calories", "Calculator"],
  "case-converter": ["Case", "Converter"],
  "client-image-compressor": ["Pro Image", "Compressor"],
  "color-picker": ["Color", "Picker"],
  "miles-to-kilometer": ["Miles to KM", "Converter"],
  "countdown-timer": ["Countdown", "Timer"],
  "days-between-dates": ["Days Between", "Dates"],
  "excel-to-pdf": ["Excel to PDF", "Converter"],
  "facebook-downloader": ["Facebook Video", "Downloader"],
  "file-compressor": ["File", "Compressor"],
  "gradient-generator": ["Gradient", "Generator"],
  "hex-to-rgb": ["HEX to RGB", "Converter"],
  "image-compressor": ["Image", "Compressor"],
  "image-converter": ["Image", "Converter"],
  "image-resizer": ["Image", "Resizer"],
  "image-to-base64": ["Image to Base64", "Converter"],
  "instagram-downloader": ["Instagram", "Downloader"],
  "length-converter": ["Length", "Converter"],
  "lorem-ipsum-generator": ["Lorem Ipsum", "Generator"],
  "password-generator": ["Password", "Generator"],
  "pdf-compressor": ["PDF", "Compressor"],
  "pdf-merger": ["PDF", "Merger"],
  "pdf-to-word-converter": ["PDF to Word", "Converter"],
  "percentage-calculator": ["Percentage", "Calculator"],
  "ppt-to-pdf": ["PPT to PDF", "Converter"],
  "qr-code-generator": ["QR Code", "Generator"],
  "remove-spaces": ["Remove", "Spaces"],
  "scientific-calculator": ["Scientific", "Calculator"],
  "slug-generator": ["Slug", "Generator"],
  "temperature-converter": ["Temperature", "Converter"],
  "url-shortener": ["URL", "Shortener"],
  "video-converter": ["Video", "Converter"],
  "weight-converter": ["Weight", "Converter"],
  "word-counter": ["Word", "Counter"],
  "word-to-pdf": ["Word to PDF", "Converter"],
  "youtube-downloader": ["YouTube", "Downloader"]
};

for (const [dir, [part1, part2]] of Object.entries(names)) {
  const file = path.join(toolsDir, dir, 'page.tsx');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const h1Regex = /(<h1[^>]*>)\s*([\s\S]*?)(<span[^>]*>)([\s\S]*?)(<\/span>)\s*(<\/h1>)/i;
    
    content = content.replace(h1Regex, (match, h1Open, oldPart1, spanOpen, oldPart2, spanClose, h1Close) => {
        return `${h1Open}\n                        ${part1} ${spanOpen}${part2}${spanClose}\n                    ${h1Close}`;
    });
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${dir}`);
  } else {
    console.log(`Skipped ${dir} - not found`);
  }
}
