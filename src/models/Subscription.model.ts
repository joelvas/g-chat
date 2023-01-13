import { User } from './User.model'
import { Channel } from './Channel.model'

export interface Subscription {
  id: string
  user: User
  channel: Channel
  created_at: Date
}
