import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSeo } from '../lib/seo'
import { Button } from '../components/ui/Button'
import { PrintArt } from '../components/art/PrintArt'

export function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you were looking for could not be found. Return to SK Print House or explore the print services.',
    path: '/404',
  })

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="shell grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-red" aria-hidden="true" />
            <span className="eyebrow text-muted">404 / Off the sheet</span>
          </div>
          <h1 className="display-xl mt-7">
            This page is <span className="italic text-red">out of register.</span>
          </h1>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            The page you were looking for is not here. It may have moved, or the link may have been trimmed a little too
            close to the edge.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/">Back to home</Button>
            <Button to="/services" variant="outline">
              Explore services
            </Button>
          </div>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-red"
          >
            <ArrowLeft size={14} strokeWidth={1.7} />
            Or tell us what you were looking for
          </Link>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="mx-auto max-w-sm rotate-2 overflow-hidden shadow-[0_40px_80px_-30px_rgba(17,29,51,0.45)]">
            <div className="aspect-[4/5]">
              <PrintArt art="poster" variant="red" title="An out-of-register print study" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
