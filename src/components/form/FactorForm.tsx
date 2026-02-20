import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-end rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex-1 w-full">
        <label className="block text-xs font-medium text-stone-500 mb-1">Fator</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ex: Salário, Família, Aventura…"
          className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
        />
      </div>
      <div className="w-full sm:w-48">
        <label className="block text-xs font-medium text-stone-500 mb-1">
          Peso: <span className="font-semibold text-stone-700">{weight}</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={weight}
          onChange={e => setWeight(Number(e.target.value))}
          className="w-full accent-stone-600"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 active:bg-stone-900 transition-colors whitespace-nowrap"
      >
        <PlusCircle size={16} />
        Adicionar
      </button>
    </form>
  )
}
