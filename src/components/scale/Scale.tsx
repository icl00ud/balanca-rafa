import type { Factor } from '../../types/scale.types'
import { ScaleBeam } from './ScaleBeam'
import { ScalePan } from './ScalePan'
import { ScalePillar } from './ScalePillar'

interface ScaleProps {
  italyFactors: Factor[]
  brazilFactors: Factor[]
  italyTotal: number
  brazilTotal: number
  rotationDeg: number
  onRemove: (id: string) => void
}

export function Scale({ italyFactors, brazilFactors, italyTotal, brazilTotal, rotationDeg, onRemove }: ScaleProps) {
  const italyPan = (
    <ScalePan side="italy" factors={italyFactors} total={italyTotal} rotationDeg={rotationDeg} onRemove={onRemove} />
  )

  const brazilPan = (
    <ScalePan side="brazil" factors={brazilFactors} total={brazilTotal} rotationDeg={rotationDeg} onRemove={onRemove} />
  )

  return (
    <div className="relative">
      {/* Pillar — absolutely positioned behind the beam, capital aligned to pivot */}
      <div
        className="absolute z-0 left-1/2"
        style={{ top: 4, transform: 'translateX(-50%)' }}
      >
        <ScalePillar />
      </div>

      {/* Beam (includes chains + pans) — sits on top of pillar */}
      <div className="relative z-10">
        <ScaleBeam rotationDeg={rotationDeg} leftSlot={italyPan} rightSlot={brazilPan} />
      </div>
    </div>
  )
}
