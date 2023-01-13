import { User } from './User.model'
import { Channel } from './Channel.model'

export interface Message {
  id: string
  text: string
  user?: User
  channel?: Channel
  created_at?: Date 
}