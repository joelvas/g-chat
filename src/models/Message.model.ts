import { User } from './User.model'
import { Channel } from './Channel.model'

export interface Message {
  id: string
  text: string
  user?: User
  user_id?: number
  channel_id?: number
  channel?: Channel
  created_at?: Date 
}