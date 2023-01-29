import { create } from 'zustand'
import { Channel } from '../models/Channel.model'
import { User } from '../models/User.model'
import { Message } from '../models/Message.model'
import { Subscription } from '../models/Subscription.model'

export interface ChatStoreProps {
  channelsList: Channel[]
  subscriptionsList: Subscription[]
  currentChannel: Channel | null
  setMessages: (messages: Message[], channelId: string) => void
  setMembers: (members: User[], channelId: string) => void
  setChannelsList: (channelsList: Channel[]) => void
  setSubscriptionsList: (subscriptionsList: Subscription[]) => void
  addSubscription: (subscription: Subscription) => void
  setCurrentChannel: (currentChannel: Channel) => void
  addChannel: (newChannel: Channel) => void
  addMember: (newMember: User, channelId: string) => void
  addMessage: (newMessage: Message, channelId: string) => void
  removeMember: (removedMember: User, channelId: string) => void
  removeMessage: (removedMessage: Message, channelId: string) => void
  updateMessageId: (
    updatedMessage: Message,
    temporalId: string,
    channelId: string
  ) => void
  removeChannel: (removedChannel: Channel) => void
  updateChannel: (updatedChannel: Channel) => void
}
const useChatStore = create<ChatStoreProps>((set) => ({
  channelsList: [],
  subscriptionsList: [],
  currentChannel: null,
  setMessages: (messages: Message[], channelId: string) => {
    set((state) => {
      const newChannelsList = state.channelsList.map((channel) => {
        if (channelId === channel.id) {
          channel.messages = messages
        }
        return channel
      })
      return { ...state, channelsList: newChannelsList }
    })
  },
  setMembers: (members: User[], channelId: string) => {
    set((state) => {
      const newChannelsList = state.channelsList.map((channel) => {
        if (channelId === channel.id) {
          channel.members = members
        }
        return channel
      })
      return { ...state, channelsList: newChannelsList }
    })
  },
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
  addSubscription: (subscription: Subscription) => {
    set((state) => {
      return {
        ...state,
        subscriptionsList: [...state.subscriptionsList, subscription]
      }
    })
  },
  setCurrentChannel: (currentChannel: Channel) => {
    set((state) => {
      return { ...state, currentChannel }
    })
  },
  addChannel: (newChannel: Channel) => {
    set((state) => {
      return { ...state, channelsList: [...state.channelsList, newChannel] }
    })
  },
  addMember: (newMember: User, channelId: string) => {
    set((state) => {
      const newChannels = state.channelsList.map((channel) => {
        if (channel.id == channelId) {
          channel.members = [newMember, ...channel.members]
        }
        return channel
      })
      return { ...state, channelsList: newChannels }
    })
  },
  addMessage: (newMessage: Message, channelId: string) => {
    set((state) => {
      console.log('setting message...')
      const newChannels = state.channelsList.map((channel) => {
        if (channel.id == channelId) {
          console.log('saving message...')
          channel.messages = [newMessage, ...channel.messages]
        }
        return channel
      })
      return { ...state, channelsList: newChannels }
    })
  },
  removeMember: (removedMember: User, channelId: string) => {
    set((state) => {
      const newChannels = state.channelsList.map((channel) => {
        if (channel.id == channelId) {
          channel.members = channel.members.filter(
            (m) => m.id !== removedMember.id
          )
        }
        return channel
      })
      return { ...state, channelsList: newChannels }
    })
  },
  removeMessage: (removedMessage: Message, channelId: string) => {
    set((state) => {
      const newChannels = state.channelsList.map((channel) => {
        if (channel.id == channelId) {
          channel.messages = channel.messages.filter(
            (m) => m.id !== removedMessage.id
          )
        }
        return channel
      })
      return { ...state, channelsList: newChannels }
    })
  },
  updateMessageId: (
    updatedMessage: Message,
    temporalId: string,
    channelId: string
  ) => {
    set((state) => {
      const newChannels = state.channelsList.map((channel) => {
        if (channel.id == channelId) {
          channel.messages = channel.messages.map((c) => {
            if (c.id === temporalId) return updatedMessage
            return c
          })
        }
        return channel
      })
      return { ...state, channelsList: newChannels }
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
