import { create } from 'zustand'
import { User } from '../models/User.model'

export interface AuthStoreProps {
  token: string
  setToken: (token: string) => void
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useAuthStore = create<AuthStoreProps>((set) => ({
  token: '',
  setToken: (token: string) => {
    set((state) => {
      return { ...state, token }
    })
  },
  user: null,
  setUser: (user: User) => {
    set((state) => {
      return { ...state, user }
    })
  },
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set((state) => {
      return { ...state, isAuthenticated }
    })
  }
}))

export default useAuthStore
