import { zustandStorage } from "app/utils/storage"
import { Book } from "types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type CartStore = {
  items: Book[]
  getTotals: () => number
  addItem: (item: Book) => void
  removeItem: (item: string) => void
  isInCart: (item: string) => boolean
  resetCart: () => void
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: state.items.some((i) => i.id === item.id) ? state.items : [...state.items, item],
        })),
      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item),
        })),
      getTotals: () => get().items.reduce((acc, item) => acc + item.price, 0),
      isInCart: (item) => get().items.some((i) => i.id === item),

      resetCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
