import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { Purchase, PurchaseCreationDTO } from "types"
import { zustandStorage } from "app/utils/storage"
import { api } from "app/services/api"
import { StoreStatus } from "."

interface PurchaseStore {
  status: StoreStatus
  setStatus: (status: StoreStatus) => void

  createPurchase: (purchase: PurchaseCreationDTO) => Promise<{
    message: string
    data: Purchase
  }>

  isUserAlreadyPurchased: (data: Purchase[], userId: string, bookId: string) => boolean
}

export const usePurchaseStore = create(
  persist<PurchaseStore>(
    (set) => ({
      status: "idle",

      setStatus: (status: StoreStatus) => set({ status }),

      createPurchase: async (purchase: PurchaseCreationDTO) => {
        try {
          set({ status: "pending" })
          const response = await api.post<{
            message: string
            data: Purchase
          }>("/purchases", purchase)
          set({ status: "done" })
          return response
        } catch (error) {
          set({ status: "fail" })
          throw error
        }
      },

      isUserAlreadyPurchased: (data: Purchase[], userId: string, bookId: string) => {
        const userPurchases = data?.filter((purchase) => purchase.userId === userId)
        const userPurchasedBooks = userPurchases?.map((purchase) => purchase.books).flat()
        return userPurchasedBooks?.filter((book) => book.id === bookId).length > 0
      },
    }),
    {
      name: "purchase-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
