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
    <ScalePan
      side="italy"
      factors={italyFactors}
      total={italyTotal}
      rotationDeg={rotationDeg}
      onRemove={onRemove}
    />
  )

  const brazilPan = (
    <ScalePan
      side="brazil"
      factors={brazilFactors}
      total={brazilTotal}
      rotationDeg={rotationDeg}
      onRemove={onRemove}
    />
  )

  return (
    <div className="flex flex-col items-center gap-0 overflow-x-auto">
      <ScaleBeam rotationDeg={rotationDeg} leftSlot={italyPan} rightSlot={brazilPan} />
      <ScalePillar />
    </div>
  )
}
