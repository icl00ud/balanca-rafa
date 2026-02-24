import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { ItemBank } from './components/bank/ItemBank'
import { FactorForm } from './components/form/FactorForm'
import { Scale } from './components/scale/Scale'
import { FactorCard } from './components/ui/FactorCard'
import { useScaleState } from './hooks/useScaleState'
import type { Factor, PanSide } from './types/scale.types'

const VALID_DESTINATIONS = new Set<string>(['bank', 'italy', 'brazil'])

export default function App() {
  const { state, addFactor, moveFactor, removeFactor, reset, italyTotal, brazilTotal, rotationDeg } = useScaleState()
  const [activeFactorId, setActiveFactorId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const allFactors = [...state.bank, ...state.italy, ...state.brazil]
  const activeFactor: Factor | undefined = allFactors.find((f) => f.id === activeFactorId)

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

  const diff = Math.abs(italyTotal - brazilTotal)
  const hasWeights = italyTotal > 0 || brazilTotal > 0

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="clinical-overlay h-screen flex flex-col overflow-hidden">
        {/* ──── Header ──── */}
        <header className="flex-shrink-0 relative border-b border-clinical-300/60 bg-white px-6 py-3">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Medical cross + scale icon */}
              <svg width="36" height="36" viewBox="0 0 36 36" className="flex-shrink-0" aria-hidden="true">
                <defs>
                  <linearGradient id="icon-steel" x1="0" y1="0" x2="0.7" y2="1">
                    <stop offset="0%" stopColor="#A8BDD6" />
                    <stop offset="50%" stopColor="#4E6E94" />
                    <stop offset="100%" stopColor="#263B54" />
                  </linearGradient>
                </defs>
                <rect x="16.5" y="10" width="3" height="18" rx="1" fill="url(#icon-steel)" />
                <rect x="12" y="26" width="12" height="3" rx="1" fill="url(#icon-steel)" />
                <line x1="5" y1="12" x2="31" y2="12" stroke="url(#icon-steel)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="18" cy="12" r="3" fill="url(#icon-steel)" />
                <path d="M3 12 L6 22 L10 22 L7 12" fill="url(#icon-steel)" opacity="0.7" />
                <path d="M33 12 L30 22 L26 22 L29 12" fill="url(#icon-steel)" opacity="0.7" />
              </svg>
              <div>
                <h1 className="text-xl font-display font-700 text-slate-800 leading-none tracking-tight">
                  Balanca de Decisoes
                </h1>
                <p className="text-xs font-body text-slate-400 mt-1 tracking-wide">
                  <span className="inline-block">🇮🇹 Medicina na Italia</span>
                  <span className="mx-2 text-steel-500">⚖</span>
                  <span className="inline-block">🇧🇷 Oftalmologia no Brasil</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="
                flex items-center gap-1.5 rounded-xl px-3 py-2
                text-xs font-display font-500 text-slate-400
                border border-clinical-400/50
                hover:bg-clinical-100 hover:text-slate-600 hover:border-clinical-500/60
                active:bg-clinical-200
                transition-all duration-200
              "
            >
              <RotateCcw size={13} />
              Resetar
            </button>
          </div>
        </header>

        {/* ──── Main ──── */}
        <main className="flex-1 min-h-0 mx-auto w-full max-w-4xl px-4 py-4 flex flex-col gap-3 overflow-hidden">
          {/* Form + Bank */}
          <div className="flex-shrink-0 flex flex-col gap-2">
            <FactorForm onAdd={addFactor} />
            <ItemBank factors={state.bank} onRemove={removeFactor} />
          </div>

          {/* Scale */}
          <div className="flex-1 min-h-0 rounded-3xl border border-clinical-300/40 bg-white shadow-clinical-lg p-4 overflow-hidden flex items-center justify-center">
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
          {hasWeights && (
            <div className="flex-shrink-0 rounded-2xl border border-clinical-300/40 bg-white shadow-clinical py-3 px-6 text-center">
              {italyTotal === brazilTotal ? (
                <p className="font-display font-500 text-slate-500 text-lg">
                  <span className="text-steel-600">⚖</span> Empate perfeito — adicione mais fatores para decidir
                </p>
              ) : italyTotal > brazilTotal ? (
                <div>
                  <p className="font-display font-600 text-italy-700 text-lg">🇮🇹 Italia pesa mais</p>
                  <p className="font-body text-sm text-slate-400 mt-1">
                    Vantagem de <span className="font-display font-700 text-italy-600">{diff}</span>{' '}
                    {diff === 1 ? 'ponto' : 'pontos'}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-display font-600 text-brazil-700 text-lg">🇧🇷 Brasil pesa mais</p>
                  <p className="font-body text-sm text-slate-400 mt-1">
                    Vantagem de <span className="font-display font-700 text-brazil-600">{diff}</span>{' '}
                    {diff === 1 ? 'ponto' : 'pontos'}
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ──── Footer ──── */}
        <footer className="flex-shrink-0 border-t border-clinical-300/40 py-2 text-center">
          <p className="font-display text-[11px] italic text-slate-300 tracking-wide">
            Built for Rafa — you're welcome
          </p>
        </footer>
      </div>

      <DragOverlay>{activeFactor ? <FactorCard factor={activeFactor} isDragOverlay /> : null}</DragOverlay>
    </DndContext>
  )
}
