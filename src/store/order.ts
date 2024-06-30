import { create } from 'zustand'

type OrderProps = {
  order: number
  getSaved: () => void
}

export const order = create<OrderProps>((set) => ({
  order: -1,
  getSaved: () => {
    const getOrder = localStorage.getItem('order')
    if (!getOrder) return -1

    set({ order: Number(getOrder) })
  },
  incr: () => {
    set((state) => {
      localStorage.setItem('order', String(state.order + 1))
      return { order: state.order + 1 }
    })
  },
  decr: () => {
    set((state) => {
      localStorage.setItem('order', String(state.order - 1))
      return { order: state.order - 1 }
    })
  }
}))
