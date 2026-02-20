import { useDraggable } from '@dnd-kit/core'
import { X } from 'lucide-react'
import type { Factor } from '../../types/scale.types'
import { WeightBadge } from './WeightBadge'

interface FactorCardProps {
  factor: Factor
  onRemove?: (id: string) => void
  isDragOverlay?: boolean
}

export function FactorCard({ factor, onRemove, isDragOverlay = false }: FactorCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: factor.id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 shadow-sm cursor-grab active:cursor-grabbing select-none transition-opacity ${
        isDragging && !isDragOverlay ? 'opacity-30' : 'opacity-100'
      }`}
    >
      <span className="flex-1 text-sm font-medium text-stone-700 truncate">{factor.name}</span>
      <WeightBadge weight={factor.weight} />
      {onRemove && (
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => {
            e.stopPropagation()
            onRemove(factor.id)
          }}
          className="ml-1 rounded p-0.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
          aria-label="Remover"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
