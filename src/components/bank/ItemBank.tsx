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
      className={`rounded-xl border-2 border-dashed p-4 transition-colors min-h-[80px] ${
        isOver
          ? 'border-stone-400 bg-stone-100'
          : 'border-stone-200 bg-stone-50'
      }`}
    >
      <p className="text-xs font-medium text-stone-400 mb-3">Banco de fatores — arraste para os pratos</p>
      {factors.length === 0 ? (
        <p className="text-sm text-stone-300 text-center py-2">Adicione fatores acima</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {factors.map(factor => (
            <FactorCard key={factor.id} factor={factor} onRemove={onRemove} />
          ))}
        </div>
      )}
    </div>
  )
}
