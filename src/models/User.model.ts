export interface User {
  id: string
  name: string
  bio: string
  email: string
  phone: string
  google: boolean
  img: string
  status: true
  role: Role
  created_at: Date
}

export enum Role {
  ADMIN_ROLE = 'ADMIN_ROLE',
  USER_ROLE = 'USER_ROLE'
}
