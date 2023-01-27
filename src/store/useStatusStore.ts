import { create } from 'zustand'

export interface StatusStoreProps {
  isLoadingChannelsList: boolean
  isLoadingMessages: boolean
  isOpenChat: boolean
  setIsLoadingChannelsList: (isLoadingChannelsList: boolean) => void
  setIsLoadingMessages: (isLoadingMessages: boolean) => void
  setIsOpenChat: (isOpenChat: boolean) => void
}
const useStatusStore = create<StatusStoreProps>((set) => ({
  isLoadingChannelsList: false,
  isLoadingMessages: false,
  isOpenChat: false,
  setIsLoadingChannelsList: (isLoadingChannelsList: boolean) => {
    set((state) => {
      return { ...state, isLoadingChannelsList }
    })
  },
  setIsLoadingMessages: (isLoadingMessages: boolean) => {
    set((state) => {
      return { ...state, isLoadingMessages }
    })
  },
  setIsOpenChat: (isOpenChat: boolean) => {
    set((state) => {
      return { ...state, isOpenChat }
    })
  }
}))

export default useStatusStore
