import { useDroppable } from '@dnd-kit/core'
import type { Factor } from '../../types/scale.types'
import { FactorCard } from '../ui/FactorCard'

interface ItemBankProps {
  factors: Factor[]
  onRemove: (id: string) => void
}

export function ItemBank({ factors, onRemove }: ItemBankProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'bank' })

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-2xl border-2 border-dashed px-4 py-2.5 transition-all duration-300 min-h-[56px]
        ${isOver ? 'border-accent-400 bg-steel-50/50 shadow-steel' : 'border-clinical-400/40 bg-clinical-100/50'}
      `}
    >
      <p className="text-[10px] font-display font-500 uppercase tracking-[0.15em] text-slate-300 mb-1.5">
        Banco de fatores — arraste para os pratos
      </p>
      {factors.length === 0 ? (
        <p className="text-sm font-body italic text-clinical-600 text-center py-1">Adicione fatores acima</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {factors.map((factor) => (
            <FactorCard key={factor.id} factor={factor} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  )
}
