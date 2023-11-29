import { IUser } from "types/auth"

export interface AuthState {
  isAuthenticated: boolean
  profile: IUser
  status: string
  token: string
}

export interface RootState<T> {
  state: T
  version: number
}

export type StoreStatus = "idle" | "pending" | "done" | "fail"

export * from "./auth.store"
