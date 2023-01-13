export interface Channel {
  id: string
  name: string
  description: string
  private: boolean
  password?: string
  created_at: Date
}
