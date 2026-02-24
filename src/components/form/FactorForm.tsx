import { Plus } from 'lucide-react'
import { useState } from 'react'
import type { Factor } from '../../types/scale.types'

interface FactorFormProps {
  onAdd: (factor: Factor) => void
}

export function FactorForm({ onAdd }: FactorFormProps) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(5)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd({ id: crypto.randomUUID(), name: trimmed, weight })
    setName('')
    setWeight(5)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-end rounded-2xl border border-clinical-300/50 bg-white px-4 py-3 shadow-clinical-md"
    >
      <div className="flex-1 w-full">
        <label className="block text-[11px] font-display font-500 uppercase tracking-widest text-slate-400 mb-1.5">
          Fator
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Salario, Familia, Aventura..."
          className="
            w-full rounded-xl border border-clinical-400/50 bg-clinical-50/80
            px-4 py-2.5 text-sm font-body text-slate-700
            placeholder:text-slate-300
            focus:outline-none focus:ring-2 focus:ring-accent-400/30 focus:border-accent-400/50
            transition-all
          "
        />
      </div>

      <div className="w-full sm:w-52">
        <label className="flex items-baseline justify-between text-[11px] font-display font-500 uppercase tracking-widest text-slate-400 mb-1.5">
          <span>Peso</span>
          <span className="text-base font-700 text-steel-700 tracking-normal tabular-nums normal-case">{weight}</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="clinical-slider"
        />
      </div>

      <button
        type="submit"
        className="
          flex items-center justify-center gap-2 rounded-xl px-5 py-2.5
          text-sm font-display font-600 text-white whitespace-nowrap
          bg-gradient-to-b from-steel-600 to-steel-800
          border border-steel-900/20
          shadow-steel
          hover:from-steel-500 hover:to-steel-700 hover:shadow-steel-lg
          active:from-steel-700 active:to-steel-900
          transition-all duration-200
        "
      >
        <Plus size={16} strokeWidth={2.5} />
        Adicionar
      </button>
    </form>
  )
}
