import { useDroppable } from '@dnd-kit/core'
import type { Factor, PanSide } from '../../types/scale.types'
import { FactorCard } from '../ui/FactorCard'

interface ScalePanProps {
  side: PanSide
  factors: Factor[]
  total: number
  rotationDeg: number
  onRemove: (id: string) => void
}

const config: Record<
  PanSide,
  {
    label: string
    flag: string
    bgFrom: string
    bgTo: string
    border: string
    ringActive: string
    accent: string
  }
> = {
  italy: {
    label: 'Italia',
    flag: '🇮🇹',
    bgFrom: 'from-italy-50',
    bgTo: 'to-white',
    border: 'border-italy-200/60',
    ringActive: 'ring-2 ring-italy-400/60 shadow-[0_0_20px_rgba(59,122,191,0.12)]',
    accent: 'text-italy-700',
  },
  brazil: {
    label: 'Brasil',
    flag: '🇧🇷',
    bgFrom: 'from-brazil-50',
    bgTo: 'to-white',
    border: 'border-brazil-200/60',
    ringActive: 'ring-2 ring-brazil-500/60 shadow-[0_0_20px_rgba(58,160,106,0.12)]',
    accent: 'text-brazil-700',
  },
}


export function ScalePan({ side, factors, total, rotationDeg, onRemove }: ScalePanProps) {
  const { setNodeRef, isOver } = useDroppable({ id: side })
  const c = config[side]

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `rotate(${-rotationDeg}deg)`,
        transition: 'transform 0.5s ease-out',
      }}
      className={`
        flex flex-col rounded-2xl border-2 min-w-[190px] max-w-[210px]
        transition-all duration-300
        bg-gradient-to-b ${c.bgFrom} ${c.bgTo}
        ${c.border}
        ${isOver ? c.ringActive : 'shadow-clinical-md'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
        <span className={`text-sm font-display font-600 ${c.accent}`}>
          {c.flag} {c.label}
        </span>
        <span className="text-[10px] font-display font-700 text-steel-700 bg-steel-50 rounded-full px-2 py-0.5 tabular-nums">
          Σ {total}
        </span>
      </div>

      {/* Cards area */}
      <div className="px-2 pb-1 min-h-[52px]">
        {factors.length === 0 ? (
          <p className="text-[11px] font-body italic text-slate-300 text-center py-3">Solte aqui</p>
        ) : (
          <div className="flex flex-col gap-1">
            {factors.map((factor) => (
              <FactorCard key={factor.id} factor={factor} onRemove={onRemove} compact />
            ))}
          </div>
        )}
      </div>


    </div>
  )
}
