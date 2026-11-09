export interface Faq {
  question: string
  answer: string
  category: 'Ordering' | 'Artwork' | 'Production' | 'Delivery'
}

export const faqs: Faq[] = [
  {
    question: 'What can I order from SK Print House?',
    answer:
      'Everything from a single visiting card to a complete wedding suite, packaging run, signage installation or merchandise order. The full list covers digital and offset printing, stationery, invitations, posters, brochures, stickers, labels, packaging, apparel, mugs, photo prints, corporate print and large-format work.',
    category: 'Ordering',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Use the Get a Quote form, call us, or send a WhatsApp message with the item, quantity, size and any deadline. The more detail you share, the more accurate the quote. We will confirm the specification and price before anything goes ahead.',
    category: 'Ordering',
  },
  {
    question: 'Can you help with the design?',
    answer:
      'Yes. If you have a rough idea, reference images or a brand guide, we can shape it into print-ready artwork. If you already have a designer, we will work with their files and handle the print preparation.',
    category: 'Artwork',
  },
  {
    question: 'What file formats do you accept?',
    answer:
      'Print-ready PDF is ideal. We also work with AI, CDR, PSD and high-resolution JPG or PNG files. For best results, supply CMYK artwork at 300 DPI with 3 mm bleed and all fonts outlined or embedded.',
    category: 'Artwork',
  },
  {
    question: 'Will I see a proof before printing?',
    answer:
      'Yes. You receive a proof to check layout, colour, trim and finishing, and nothing is produced until you approve it. Physical proofs can be arranged for jobs where paper feel and colour accuracy matter most — ask when you enquire.',
    category: 'Production',
  },
  {
    question: 'What is the minimum order quantity?',
    answer:
      'It depends on the process and the item. Digital printing is well suited to short runs, while offset becomes more economical at higher quantities. Tell us the quantity you need and we will recommend the sensible route.',
    category: 'Ordering',
  },
  {
    question: 'How long does printing take?',
    answer:
      'Turnaround depends on the process, quantity, finishing and the current production schedule. We confirm a realistic date with your quote and keep you updated if anything changes. For urgent work, message us on WhatsApp before ordering.',
    category: 'Production',
  },
  {
    question: 'Can you match a specific colour?',
    answer:
      'We work with Pantone references and printed samples where possible. Colour can shift slightly between paper stocks, inks and processes, so a proof or physical sample is the safest way to approve a critical colour.',
    category: 'Production',
  },
  {
    question: 'Do you deliver?',
    answer:
      'Delivery options depend on your location and the size of the order. Share your pin code on WhatsApp and we will confirm the available options, packing and cost before you commit.',
    category: 'Delivery',
  },
  {
    question: 'Can wedding invitations be personalised?',
    answer:
      'Yes. Names, monograms, dates, inserts and envelope addressing can all be tailored. We can also build a complete suite — invitation, insert cards, envelopes and tags — so everything feels like one piece.',
    category: 'Ordering',
  },
  {
    question: 'Do you print small batches of T-shirts or mugs?',
    answer:
      'Yes, small batches are possible, though the most economical quantity depends on the decoration method. Send us the design, garment or mug type and quantity, and we will confirm the best option.',
    category: 'Production',
  },
  {
    question: 'How do I pay?',
    answer:
      'Payment details and any advance required are confirmed with your quote. We will set everything out clearly before production begins, so there are no surprises at handover.',
    category: 'Ordering',
  },
]

export const faqCategories = ['All', 'Ordering', 'Artwork', 'Production', 'Delivery'] as const
