export interface Factor {
  id: string
  name: string
  weight: number
}

export type PanSide = 'italy' | 'brazil'

export interface ScaleState {
  bank: Factor[]
  italy: Factor[]
  brazil: Factor[]
}
