interface WeightBadgeProps {
  weight: number
}

function badgeStyle(weight: number): string {
  if (weight <= 3) return 'bg-clinical-200 text-slate-500 border-clinical-400'
  if (weight <= 6) return 'bg-steel-100 text-steel-800 border-steel-300'
  return 'bg-accent-300/20 text-accent-500 border-accent-300'
}

export function WeightBadge({ weight }: WeightBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide font-display tabular-nums ${badgeStyle(weight)}`}
    >
      {weight}
    </span>
  )
}
