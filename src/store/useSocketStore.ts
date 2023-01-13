import create from 'zustand'
import { Socket } from 'socket.io-client'

export interface SocketStoreProps {
  socket: Socket | null
  setSocket: (socket: Socket) => void
}
const useSocketStore = create<SocketStoreProps>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => {
    set((state) => {
      return { ...state, socket }
    })
  }
}))

export default useSocketStore
