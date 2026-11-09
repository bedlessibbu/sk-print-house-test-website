export interface ProcessStep {
  number: string
  title: string
  short: string
  description: string
  deliverables: string[]
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell us what you are making',
    short: 'A call, a message or a quote request.',
    description:
      'Start with the object, the quantity and the date it needs to be in hand. Share any references, sketches or existing artwork — a rough idea is more than enough to begin.',
    deliverables: ['A clear brief', 'Format and quantity check', 'A realistic starting point'],
  },
  {
    number: '02',
    title: 'Shape the brief',
    short: 'The practical questions, asked early.',
    description:
      'We work through stock, size, colour and finishing, and point out where a simpler choice might serve the piece better. You leave this step with a specification you understand.',
    deliverables: ['Written specification', 'Stock and finish options', 'Transparent quote'],
  },
  {
    number: '03',
    title: 'Design and artwork',
    short: 'Files prepared properly for print.',
    description:
      'Bring print-ready artwork or use our design support. We check bleed, resolution, colour mode and typography, and fix the small things that become expensive later.',
    deliverables: ['Artwork preflight', 'Bleed and colour setup', 'Design support if needed'],
  },
  {
    number: '04',
    title: 'Proof and approve',
    short: 'Nothing runs until you are happy.',
    description:
      'You receive a proof to review — layout, colour, trim and finish. We make the agreed corrections and wait for your clear approval before the press is booked.',
    deliverables: ['Digital proof', 'Correction round', 'Written approval'],
  },
  {
    number: '05',
    title: 'Print and finish',
    short: 'Ink, paper, precision.',
    description:
      'The chosen process runs, then the piece is finished: cut, folded, bound, foiled or mounted. We keep an eye on colour and consistency throughout the run.',
    deliverables: ['Production run', 'Finishing and quality checks', 'Progress updates'],
  },
  {
    number: '06',
    title: 'Check and hand over',
    short: 'Counted, inspected, packed.',
    description:
      'Every piece is checked against the approved proof, counted and packed with care. Then it is ready to send, sell, wear or celebrate — collected or delivered as agreed.',
    deliverables: ['Final inspection', 'Protective packing', 'Collection or delivery'],
  },
]

export const principles = [
  {
    number: '01',
    title: 'Proof before print',
    body: 'Every job is proofed and approved before production. The small details are cheaper to fix on screen than on a press.',
  },
  {
    number: '02',
    title: 'Paper chosen by hand',
    body: 'Stock is part of the design, not an afterthought. We help you feel the difference between weights, textures and finishes.',
  },
  {
    number: '03',
    title: 'One point of contact',
    body: 'From the first brief to the final handover, you speak to the same studio — no handoffs, no guessing who knows what.',
  },
]
