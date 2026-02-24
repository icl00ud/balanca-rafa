import { useEffect, useState } from 'react'
import type { Factor, PanSide, ScaleState } from '../types/scale.types'

const STORAGE_KEY = 'decisao_balanca'

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, val))
}

function loadState(): ScaleState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ScaleState
  } catch {
    // ignore parse errors
  }
  return { bank: [], italy: [], brazil: [] }
}

export function useScaleState() {
  const [state, setState] = useState<ScaleState>(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const italyTotal = state.italy.reduce((sum, f) => sum + f.weight, 0)
  const brazilTotal = state.brazil.reduce((sum, f) => sum + f.weight, 0)
  // Positive rotation = Brazil heavier (right side dips)
  const rotationDeg = clamp(-30, (brazilTotal - italyTotal) * 2.5, 30)

  function addFactor(factor: Factor) {
    setState((prev) => ({ ...prev, bank: [...prev.bank, factor] }))
  }

  function moveFactor(id: string, destination: PanSide | 'bank') {
    setState((prev) => {
      const allFactors = [...prev.bank, ...prev.italy, ...prev.brazil]
      const factor = allFactors.find((f) => f.id === id)
      if (!factor) return prev

      const bank = prev.bank.filter((f) => f.id !== id)
      const italy = prev.italy.filter((f) => f.id !== id)
      const brazil = prev.brazil.filter((f) => f.id !== id)

      if (destination === 'bank') return { bank: [...bank, factor], italy, brazil }
      if (destination === 'italy') return { bank, italy: [...italy, factor], brazil }
      return { bank, italy, brazil: [...brazil, factor] }
    })
  }

  function removeFactor(id: string) {
    setState((prev) => ({
      bank: prev.bank.filter((f) => f.id !== id),
      italy: prev.italy.filter((f) => f.id !== id),
      brazil: prev.brazil.filter((f) => f.id !== id),
    }))
  }

  function reset() {
    setState({ bank: [], italy: [], brazil: [] })
  }

  return { state, addFactor, moveFactor, removeFactor, reset, italyTotal, brazilTotal, rotationDeg }
}
