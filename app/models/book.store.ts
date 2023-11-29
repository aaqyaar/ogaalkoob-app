import { create } from "zustand"
import { zustandStorage } from "app/utils/storage/storage"
import { Book } from "types"
import { createJSONStorage, persist } from "zustand/middleware"
import { BaseResponse, api } from "app/services/api"
import { StoreStatus } from "."

interface BookStore {
  books: BaseResponse<Book> | null
  status: StoreStatus
  setStatus: (status: StoreStatus) => void
  fetchBooks: (params: {
    page?: number
    limit?: number
    query?: string
  }) => Promise<BaseResponse<Book>>
  fetchBook: (id: string) => Promise<Book>
}

export const useBookStore = create(
  persist<BookStore>(
    (set) => ({
      books: null,
      status: "idle",
      setStatus: (status: StoreStatus) => set({ status }),
      fetchBooks: async ({ page = 1, limit = 5, query = "" }) => {
        try {
          set({ status: "pending" })
          const response = await api.get<BaseResponse<Book>>(
            `/books?page=${page}&limit=${limit}&q=${query}`,
          )
          set({ books: response, status: "done" })
          return response
        } catch (error) {
          set({ status: "fail" })
          throw error
        }
      },
      fetchBook: async (id: string) => {
        try {
          set({ status: "pending" })
          const response = await api.get<Book>(`/books/${id}`)
          set({ status: "done" })
          return response
        } catch (error) {
          set({ status: "fail" })
          throw error
        }
      },
    }),
    {
      name: "bookStore",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
