import { create } from 'zustand'

type OrderProps = {
  order: number
  getSaved: () => void
  incr: (max: number) => number
  decr: () => number
  setZero: () => void
}

export const order = create<OrderProps>((set) => ({
  order: -1,
  getSaved: () => {
    const getOrder = localStorage.getItem('order')
    set({ order: Number(getOrder) })
  },
  incr: (max) => {
    let index = 0 
    set((state) => {
      if(state.order >= max){
        index = max
        return { order: max }
      } 
      index = state.order + 1
      localStorage.setItem('order', String(state.order + 1))
      return { order: state.order + 1 }
    })
    return index
  },
  decr: () => {
    let index = 0
    set((state) => {
      if(state.order === 0) return { order: 0 }
      index = state.order - 1
      localStorage.setItem('order', String(state.order - 1))
      return { order: state.order - 1 }
    })
    return index
  },
  setZero: () => {
    localStorage.setItem('order', '-1')
    set({ order: -1 })
  }
}))