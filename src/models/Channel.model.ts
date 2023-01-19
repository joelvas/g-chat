import { User } from './User.model'
import { Message } from './Message.model'

export interface Channel {
  id: string
  name: string
  description: string
  members?: User[]
  messages?: Message[]
  private: boolean
  password?: string
  created_at: Date
}
