import { create } from 'zustand'
import { Channel } from '../models/Channel.model'
import { User } from '../models/User.model'
import { Message } from '../models/Message.model'

export interface ChatStoreProps {
  channelsList: Channel[]
  setChannelsList: (channelsList: Channel[]) => void
  isLoadingChannelsList: boolean
  setIsLoadingChannelsList: (isLoadingChannelsList: boolean) => void
  currentChannel: Channel | null
  setCurrentChannel: (currentChannel: Channel) => void
  currentMembers: User[]
  setCurrentMembers: (members: User[]) => void
  currentMessages: Message[]
  setCurrentMessages: (currentMessages: Message[]) => void
  isLoadingMessages: boolean
  setIsLoadingMessages: (isLoadingMessages: boolean) => void
  addChannel: (newChannel: Channel) => void
  addMember: (newMember: User) => void
  addMessage: (newMessage: Message) => void
  removeMember: (removedMember: User) => void
  removeMessage: (removedMessage: Message) => void
  removeChannel: (removedChannel: Channel) => void
  updateChannel: (updatedChannel: Channel) => void
  isOpenChat: boolean
  setIsOpenChat: (isOpenChat: boolean) => void
}
const useChatStore = create<ChatStoreProps>((set) => ({
  channelsList: [],
  setChannelsList: (channelsList: Channel[]) => {
    set((state) => {
      return { ...state, channelsList }
    })
  },
  currentChannel: null,
  setCurrentChannel: (currentChannel: Channel) => {
    set((state) => {
      return { ...state, currentChannel }
    })
  },
  isLoadingChannelsList: false,
  setIsLoadingChannelsList: (isLoadingChannelsList: boolean) => {
    set((state) => {
      return { ...state, isLoadingChannelsList }
    })
  },
  currentMembers: [],
  setCurrentMembers: (members: User[]) => {
    set((state) => {
      return { ...state, members }
    })
  },
  currentMessages: [],
  setCurrentMessages: (currentMessages: Message[]) => {
    set((state) => {
      return {
        ...state,
        currentMessages: !!currentMessages ? currentMessages : []
      }
    })
  },
  isLoadingMessages: false,
  setIsLoadingMessages: (isLoadingMessages: boolean) => {
    set((state) => {
      return { ...state, isLoadingMessages }
    })
  },
  addChannel: (newChannel: Channel) => {
    set((state) => {
      return { ...state, channelsList: [...state.channelsList, newChannel] }
    })
  },
  addMember: (newMember: User) => {
    set((state) => {
      return { ...state, currentMembers: [...state.currentMembers, newMember] }
    })
  },
  addMessage: (newMessage: Message) => {
    set((state) => {
      return {
        ...state,
        currentMessages: [newMessage, ...state.currentMessages]
      }
    })
  },
  removeMember: (removedMember: User) => {
    set((state) => {
      const newMembersList = state.currentMembers.filter(
        (m) => m.id !== removedMember.id
      )
      return { ...state, currentMembers: newMembersList }
    })
  },
  removeMessage: (removedMessage: Message) => {
    set((state) => {
      const newMessagesList = state.currentMessages.filter(
        (m) => m.id !== removedMessage.id
      )
      return { ...state, currentMessages: newMessagesList }
    })
  },
  removeChannel: (removedChannel: Channel) => {
    set((state) => {
      const newChannelsList = state.channelsList.filter(
        (c) => c.id !== removedChannel.id
      )
      return { ...state, channelsList: newChannelsList }
    })
  },
  updateChannel: (updatedChannel: Channel) => {
    set((state) => {
      const newChannelsList = state.channelsList.map((c) => {
        if (c.id === updatedChannel.id) return updatedChannel
        return c
      })
      return { ...state, channelsList: newChannelsList }
    })
  },
  isOpenChat: false,
  setIsOpenChat: (isOpenChat: boolean) => {
    set((state) => {
      return { ...state, isOpenChat }
    })
  }
}))

export default useChatStore
