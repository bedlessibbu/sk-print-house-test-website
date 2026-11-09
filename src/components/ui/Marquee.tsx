import { services } from '../../content/services'

export function Marquee() {
  const row = [...services.map((service) => service.name), 'Design support', 'Bulk orders']

  return (
    <div className="group relative overflow-hidden border-y border-paper/10 bg-navy py-4 text-paper">
      <div className="mask-fade-x flex">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {row.map((name, index) => (
                <span key={`${copy}-${name}-${index}`} className="flex items-center">
                  <span className="whitespace-nowrap px-6 font-display text-lg tracking-tight sm:text-xl">
                    {name}
                  </span>
                  <span className="text-[9px] text-red" aria-hidden="true">
                    ✳
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
