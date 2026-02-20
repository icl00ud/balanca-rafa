interface WeightBadgeProps {
  weight: number
}

function badgeColor(weight: number) {
  if (weight <= 3) return 'bg-stone-200 text-stone-700'
  if (weight <= 6) return 'bg-amber-200 text-amber-800'
  return 'bg-red-200 text-red-800'
}

export function WeightBadge({ weight }: WeightBadgeProps) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColor(weight)}`}>
      {weight}
    </span>
  )
}
