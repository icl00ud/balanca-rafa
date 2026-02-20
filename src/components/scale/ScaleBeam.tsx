import { useSpring, motion } from 'framer-motion'
import { useEffect } from 'react'

interface ScaleBeamProps {
  rotationDeg: number
  leftSlot: React.ReactNode
  rightSlot: React.ReactNode
}

export function ScaleBeam({ rotationDeg, leftSlot, rightSlot }: ScaleBeamProps) {
  const rotate = useSpring(rotationDeg, { stiffness: 100, damping: 15 })

  useEffect(() => {
    rotate.set(rotationDeg)
  }, [rotationDeg, rotate])

  return (
    <div className="relative flex items-center justify-center" style={{ height: 200 }}>
      <motion.div
        style={{
          rotate,
          transformOrigin: '50% 50%',
          width: 560,
          height: 12,
          position: 'relative',
        }}
        className="rounded-full bg-stone-400 shadow flex items-center"
      >
        {/* Center pivot dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-stone-600 border-2 border-stone-200 z-10" />

        {/* Left chain + pan */}
        <div className="absolute left-0 top-0 flex flex-col items-center" style={{ transform: 'translateX(-50%)' }}>
          <div className="w-px bg-stone-300" style={{ height: 48 }} />
          <div>{leftSlot}</div>
        </div>

        {/* Right chain + pan */}
        <div className="absolute right-0 top-0 flex flex-col items-center" style={{ transform: 'translateX(50%)' }}>
          <div className="w-px bg-stone-300" style={{ height: 48 }} />
          <div>{rightSlot}</div>
        </div>
      </motion.div>
    </div>
  )
}
