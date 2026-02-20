import { useDroppable } from '@dnd-kit/core'
import { useSpring, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { Factor, PanSide } from '../../types/scale.types'
import { FactorCard } from '../ui/FactorCard'

interface ScalePanProps {
  side: PanSide
  factors: Factor[]
  total: number
  rotationDeg: number
  onRemove: (id: string) => void
}

const config: Record<PanSide, { label: string; flag: string; bg: string; border: string; ring: string }> = {
  italy: {
    label: 'Itália',
    flag: '🇮🇹',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    ring: 'ring-2 ring-blue-400',
  },
  brazil: {
    label: 'Brasil',
    flag: '🇧🇷',
    bg: 'bg-green-50',
    border: 'border-green-300',
    ring: 'ring-2 ring-green-500',
  },
}

export function ScalePan({ side, factors, total, rotationDeg, onRemove }: ScalePanProps) {
  const { setNodeRef, isOver } = useDroppable({ id: side })
  const { label, flag, bg, border, ring } = config[side]

  const counterRotate = useSpring(-rotationDeg, { stiffness: 100, damping: 15 })

  useEffect(() => {
    counterRotate.set(-rotationDeg)
  }, [rotationDeg, counterRotate])

  return (
    <motion.div
      ref={setNodeRef}
      style={{ rotate: counterRotate }}
      className={`flex flex-col gap-1 rounded-xl border-2 p-2 min-w-[160px] max-w-[220px] min-h-[100px] transition-shadow ${bg} ${border} ${isOver ? ring : ''}`}
    >
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-sm font-semibold text-stone-600">
          {flag} {label}
        </span>
        <span className="text-xs font-bold text-stone-500">Σ {total}</span>
      </div>
      {factors.length === 0 ? (
        <p className="text-xs text-stone-300 text-center py-3">Solte aqui</p>
      ) : (
        <div className="flex flex-col gap-1">
          {factors.map(factor => (
            <FactorCard key={factor.id} factor={factor} onRemove={onRemove} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
