export function ScalePillar() {
  return (
    <div className="flex flex-col items-center pointer-events-none select-none">
      {/* Cap */}
      <div
        className="bg-stone-400 rounded-sm"
        style={{ width: 56, height: 10, clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)' }}
      />
      {/* Column */}
      <div className="bg-stone-300 rounded" style={{ width: 16, height: 120 }} />
      {/* Base */}
      <div
        className="bg-stone-400 rounded-sm"
        style={{ width: 80, height: 12, clipPath: 'polygon(0% 0%, 100% 0%, 94% 100%, 6% 100%)' }}
      />
    </div>
  )
}
