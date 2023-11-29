import { create } from "zustand"
import { zustandStorage } from "app/utils/storage/storage"
import { Genre } from "types"
import { createJSONStorage, persist } from "zustand/middleware"
import { api } from "app/services/api"
import { StoreStatus } from "."

interface GenreStore {
  genres: Genre[] | null
  fetchGenres: () => Promise<Genre[]>
  status: StoreStatus
  setStatus: (status: StoreStatus) => void
  fetchGenre: (id: string) => Promise<Genre>
}

export const useGenreStore = create(
  persist<GenreStore>(
    (set) => ({
      genres: null,
      status: "idle",

      setStatus: (status: StoreStatus) => set({ status }),

      fetchGenres: async () => {
        try {
          set({ status: "pending" })
          const response = await api.get<Genre[]>("/genre/all")
          set({ genres: response, status: "done" })
          return response
        } catch (error) {
          set({ status: "fail" })
          throw error
        }
      },
      fetchGenre: async (id: string) => {
        try {
          set({ status: "pending" })
          const response = await api.get<Genre>(`/genre/${id}`)
          set({ status: "done" })
          return response
        } catch (error) {
          set({ status: "fail" })
          throw error
        }
      },
    }),
    {
      name: "genreStore",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
