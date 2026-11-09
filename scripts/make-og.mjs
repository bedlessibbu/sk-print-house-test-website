import sharp from 'sharp'

const bg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F4EEE4"/>
  <circle cx="1010" cy="120" r="260" fill="none" stroke="#0B0C0E" stroke-opacity="0.07" stroke-width="1"/>
  <circle cx="1010" cy="120" r="190" fill="none" stroke="#0B0C0E" stroke-opacity="0.05" stroke-width="1"/>
  <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="5" fill="#6E675C">SK PRINT HOUSE</text>
  <rect x="80" y="178" width="48" height="3" fill="#DE1F26"/>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="#0B0C0E">Your Complete</text>
  <text x="80" y="385" font-family="Georgia, 'Times New Roman', serif" font-size="76" font-style="italic" fill="#DE1F26">Printing Solution.</text>
  <text x="80" y="455" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#6E675C">Invitations, packaging, stationery, signage and merchandise.</text>
  <text x="80" y="485" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#6E675C">Design-led, proofed and finished with care.</text>
  <line x1="80" y1="548" x2="1120" y2="548" stroke="#0B0C0E" stroke-opacity="0.15"/>
  <text x="80" y="590" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="2" fill="#6E675C">+91 96436 62299</text>
  <text x="1120" y="590" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="15" letter-spacing="2" fill="#6E675C">SK.PRINTHOUSE@GMAIL.COM</text>
</svg>`)

const logo = await sharp('public/assets/logo.png')
  .resize(230, 230, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer()

await sharp(bg)
  .composite([{ input: logo, left: 895, top: 360 }])
  .jpeg({ quality: 88 })
  .toFile('public/assets/og-cover.jpg')

console.log('og-cover.jpg created')
