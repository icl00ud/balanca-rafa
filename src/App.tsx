import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useScaleState } from './hooks/useScaleState'
import { FactorForm } from './components/form/FactorForm'
import { ItemBank } from './components/bank/ItemBank'
import { Scale } from './components/scale/Scale'
import { FactorCard } from './components/ui/FactorCard'
import type { Factor, PanSide } from './types/scale.types'
import { Scale as ScaleIcon, RotateCcw } from 'lucide-react'

const VALID_DESTINATIONS = new Set<string>(['bank', 'italy', 'brazil'])

export default function App() {
  const { state, addFactor, moveFactor, removeFactor, reset, italyTotal, brazilTotal, rotationDeg } = useScaleState()
  const [activeFactorId, setActiveFactorId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const allFactors = [...state.bank, ...state.italy, ...state.brazil]
  const activeFactor: Factor | undefined = allFactors.find(f => f.id === activeFactorId)

  function handleDragStart({ active }: DragStartEvent) {
    setActiveFactorId(active.id as string)
  }

  function handleDragOver(_event: DragOverEvent) {
    // isOver state is handled locally in droppables
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveFactorId(null)
    if (!over) return
    const destination = over.id as string
    if (!VALID_DESTINATIONS.has(destination)) return
    moveFactor(active.id as string, destination as PanSide | 'bank')
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ScaleIcon className="text-stone-600" size={24} />
              <div>
                <h1 className="text-lg font-bold text-stone-800 leading-none">Balança de Decisões</h1>
                <p className="text-xs text-stone-400 mt-0.5">🇮🇹 Medicina em Itália vs 🇧🇷 Oftalmologia no Brasil</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-700 transition-colors"
            >
              <RotateCcw size={13} />
              Resetar
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-6 flex flex-col gap-6">
          <FactorForm onAdd={addFactor} />
          <ItemBank factors={state.bank} onRemove={removeFactor} />

          <div className="rounded-xl border border-stone-100 bg-white shadow-sm p-4 overflow-x-auto">
            <Scale
              italyFactors={state.italy}
              brazilFactors={state.brazil}
              italyTotal={italyTotal}
              brazilTotal={brazilTotal}
              rotationDeg={rotationDeg}
              onRemove={removeFactor}
            />
          </div>

          {/* Verdict */}
          {(italyTotal > 0 || brazilTotal > 0) && (
            <div className="rounded-xl border border-stone-100 bg-white shadow-sm p-4 text-center">
              {italyTotal === brazilTotal ? (
                <p className="text-stone-500 font-medium">⚖️ Empate — adicione mais fatores para decidir</p>
              ) : italyTotal > brazilTotal ? (
                <p className="text-blue-700 font-semibold">🇮🇹 Itália está pesando mais (+{italyTotal - brazilTotal} pontos)</p>
              ) : (
                <p className="text-green-700 font-semibold">🇧🇷 Brasil está pesando mais (+{brazilTotal - italyTotal} pontos)</p>
              )}
            </div>
          )}
        </main>
      </div>

      <DragOverlay>
        {activeFactor ? <FactorCard factor={activeFactor} isDragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
