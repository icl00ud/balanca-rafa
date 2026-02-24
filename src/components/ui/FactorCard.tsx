import { useDraggable } from '@dnd-kit/core'
import { X } from 'lucide-react'
import type { Factor } from '../../types/scale.types'
import { WeightBadge } from './WeightBadge'

interface FactorCardProps {
  factor: Factor
  onRemove?: (id: string) => void
  isDragOverlay?: boolean
  compact?: boolean
}

export function FactorCard({ factor, onRemove, isDragOverlay = false, compact = false }: FactorCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: factor.id,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        group flex items-center gap-2 rounded-lg border select-none
        transition-all duration-200 ease-out
        bg-white
        border-clinical-300/50
        shadow-clinical
        cursor-grab active:cursor-grabbing
        hover:shadow-clinical-md hover:border-steel-300/50 hover:-translate-y-px
        ${compact ? 'px-2 py-1.5' : 'px-3 py-2'}
        ${isDragging && !isDragOverlay ? 'opacity-20 scale-95' : 'opacity-100'}
        ${isDragOverlay ? 'shadow-clinical-lg ring-2 ring-accent-400/30 rotate-2' : ''}
      `}
    >
      <span className={`flex-1 font-body font-medium text-slate-700 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
        {factor.name}
      </span>
      <WeightBadge weight={factor.weight} />
      {onRemove && (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            onRemove(factor.id)
          }}
          className="ml-0.5 rounded-full p-0.5 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-clinical-200 hover:text-slate-600 transition-all"
          aria-label="Remover"
        >
          <X size={compact ? 12 : 14} />
        </button>
      )}
    </div>
  )
}
