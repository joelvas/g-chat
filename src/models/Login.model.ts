import { User } from './User.model'

export interface LoginRequest {
  email: string
  password: string
  name?: string
  password2?: string
}

export interface LoginResponse {
  token: string
  user: User
}
