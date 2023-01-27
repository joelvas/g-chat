import { create } from 'zustand'
import { Channel } from '../models/Channel.model'
import { User } from '../models/User.model'
import { Message } from '../models/Message.model'
import { Subscription } from '../models/Subscription.model'

export interface ChatStoreProps {
  channelsList: Channel[]
  subscriptionsList: Subscription[]
  currentChannel: Channel | null
  currentMembers: User[]
  currentMessages: Message[]
  setChannelsList: (channelsList: Channel[]) => void
  setSubscriptionsList: (subscriptionsList: Subscription[]) => void
  setCurrentChannel: (currentChannel: Channel) => void
  setCurrentMembers: (members: User[]) => void
  setCurrentMessages: (currentMessages: Message[]) => void
  addChannel: (newChannel: Channel) => void
  addMember: (newMember: User) => void
  addMessage: (newMessage: Message) => void
  removeMember: (removedMember: User) => void
  removeMessage: (removedMessage: Message) => void
  updateMessageId: (updatedMessage: Message) => void
  removeChannel: (removedChannel: Channel) => void
  updateChannel: (updatedChannel: Channel) => void
}
const useChatStore = create<ChatStoreProps>((set) => ({
  channelsList: [],
  subscriptionsList: [],
  currentChannel: null,
  currentMembers: [],
  currentMessages: [],
  setChannelsList: (channelsList: Channel[]) => {
    set((state) => {
      return { ...state, channelsList }
    })
  },
  setSubscriptionsList: (subscriptionsList: Subscription[]) => {
    set((state) => {
      return { ...state, subscriptionsList }
    })
  },
  setCurrentChannel: (currentChannel: Channel) => {
    set((state) => {
      return { ...state, currentChannel }
    })
  },
  setCurrentMembers: (members: User[]) => {
    set((state) => {
      return { ...state, members }
    })
  },
  setCurrentMessages: (currentMessages: Message[]) => {
    set((state) => {
      return {
        ...state,
        currentMessages: !!currentMessages ? currentMessages : []
      }
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
  updateMessageId: (updatedMessage: Message) => {
    set((state) => {
      const newMessagesList = state.currentMessages.map((c) => {
        if (c.id === '0') return updatedMessage
        return c
      })
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
  }
}))

export default useChatStore
