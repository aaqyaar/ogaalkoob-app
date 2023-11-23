import { create } from "zustand"
import { api } from "app/services/api"
import { persist, createJSONStorage } from "zustand/middleware"
import { zustandStorage } from "app/utils/storage/zustandStorage"
import {
  IForgotPasswordResponse,
  ILoginResponse,
  IUser,
  IVerifyCodeResponse,
  IResetPasswordResponse,
} from "types/auth"

type AuthStore = {
  token: string
  profile: IUser
  isAuthenticated: boolean
  status: "idle" | "pending" | "done" | "fail"
  setStatus: (status: "idle" | "pending" | "done" | "fail") => void
  login: (email: string, password: string) => Promise<ILoginResponse>
  register: (name: string, email: string, password: string) => Promise<ILoginResponse>
  forgotPassword: (email: string) => Promise<IForgotPasswordResponse>
  verifyCode: (code: string, email: string) => Promise<IVerifyCodeResponse>
  resetPassword: (password: string, userId: string) => Promise<IResetPasswordResponse>

  logout: () => void
  getMe: () => Promise<IUser>
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: "",
      status: "idle",
      profile: {} as IUser,
      isAuthenticated: false,

      setStatus: (status: "idle" | "pending" | "done" | "fail") => set({ status }),

      login: async (email: string, password: string) => {
        set({ status: "pending" })
        const { token } = await api.post<ILoginResponse>("/auth/login", {
          email,
          password,
        })

        set({ token, status: "done", isAuthenticated: true })
        return { token }
      },

      register: async (name: string, email: string, password: string) => {
        set({ status: "pending" })

        const { token } = await api.post<ILoginResponse>("/auth/register", {
          name,
          email,
          password,
        })

        set({ token, status: "done", isAuthenticated: true })
        return { token }
      },

      forgotPassword: async (email: string) => {
        set({ status: "pending" })

        const { message } = await api.post<IForgotPasswordResponse>("/auth/password/reset", {
          email,
        })

        set({ status: "done" })
        return { message }
      },

      verifyCode: async (code: string, email: string) => {
        set({ status: "pending" })

        const data = await api.post<IVerifyCodeResponse>("/auth/password/verify", {
          code,
          email,
        })
        set({ status: "done" })
        return { ...data }
      },

      resetPassword: async (password: string, userId: string) => {
        set({ status: "pending" })

        const data = await api.put<IResetPasswordResponse>(`/auth/password/reset/${userId}`, {
          password,
        })
        console.log(data)
        set({ status: "done" })
        return data
      },

      getMe: async () => {
        const data = await api.get<IUser>("/auth/me")
        set({ profile: data })
        return data
      },
      logout: () => set({ token: "", profile: {} as IUser, isAuthenticated: false }),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
)
