import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const src = 'C:/Users/SAJID/AppData/Local/Temp/opencode/hi'
const out = 'D:/SK-PRINT-HOUSE-OPENCODE/public/assets/photos'
await mkdir(out, { recursive: true })

const jobs = [
  ['designer.jpg', 'hero-press', 1600, 1200, 'centre'],
  ['press.jpg', 'consult', 1400, 1000, 'attention'],
  ['swatches.jpg', 'swatches', 1200, 1500, 'attention'],
  ['paper-dark.jpg', 'paper-dark', 1400, 1000, 'centre'],
  ['paper-white.jpg', 'paper-white', 1400, 1000, 'centre'],
  ['pen.jpg', 'pen', 1200, 1500, 'attention'],
  ['papers.jpg', 'book', 1600, 1000, 'centre'],
  ['paper-cut.jpg', 'paper-cut', 1400, 1000, 'attention'],
  ['dried-flowers.jpg', 'dried-flowers', 1400, 1000, 'attention'],
  ['soap.jpg', 'soap', 1400, 1000, 'attention'],
  ['amber.jpg', 'amber', 1000, 1250, 'centre'],
  ['gift.jpg', 'gift', 1000, 1250, 'attention'],
  ['tote.jpg', 'tote', 1000, 1250, 'centre'],
  ['mug.jpg', 'mug', 1000, 1250, 'centre'],
  ['tshirt-black.jpg', 'tee-black', 1000, 1250, 'attention'],
  ['tshirt-white.jpg', 'tee-white', 1000, 1250, 'attention'],
  ['street.jpg', 'street', 1600, 1000, 'centre'],
  ['notebook.jpg', 'notebook', 1400, 1000, 'attention'],
]

for (const [input, name, width, height, position] of jobs) {
  await sharp(path.join(src, input))
    .rotate()
    .resize(width, height, { fit: 'cover', position })
    .webp({ quality: 80, effort: 5 })
    .toFile(path.join(out, `${name}.webp`))
  console.log('✓', name)
}

// Favicons and touch icon from the untouched official logo
const logo = 'D:/SK-PRINT-HOUSE-OPENCODE/public/assets/logo.png'
await sharp(logo).resize(64, 64, { fit: 'contain', background: '#ffffff' }).png().toFile('D:/SK-PRINT-HOUSE-OPENCODE/public/assets/favicon-64.png')
await sharp(logo).resize(180, 180, { fit: 'contain', background: '#ffffff' }).png().toFile('D:/SK-PRINT-HOUSE-OPENCODE/public/assets/apple-touch-icon.png')
await sharp(logo).resize(32, 32, { fit: 'contain', background: '#ffffff' }).png().toFile('D:/SK-PRINT-HOUSE-OPENCODE/public/assets/favicon-32.png')
console.log('✓ icons')
