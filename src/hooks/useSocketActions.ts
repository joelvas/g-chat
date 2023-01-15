import { SocketResponse } from './../models/Response.model'
import { ApiResponse } from '../models/Response.model'
import { Channel } from './../models/Channel.model'
import { Message } from './../models/Message.model'
import useSocketStore from '../store/useSocketStore'
import useAuthStore from '../store/useAuthStore'
import useChatStore from '../store/useChatStore'

const useSocketActions = () => {
  const { socket } = useSocketStore()
  const { user } = useAuthStore()
  const {
    setCurrentMembers,
    setCurrentChannel,
    addMessage,
    currentChannel,
    removeMessage
  } = useChatStore()

  const createMessage = (message: Message) => {
    const temporalMessage = {
      user,
      channel: currentChannel,
      created_at: new Date(),
      id: '0',
      text: message.text
    } as Message

    const newMessage = {
      channel: message.channel.id,
      text: message.text
    }
    addMessage(temporalMessage)
    socket.emit('create-message', newMessage, (payload) => {
      removeMessage(temporalMessage)
      if (payload.id) {
        addMessage(payload)
      }
    })
  }

  const deleteMessage = (message: Message) => {
    return new Promise((resolve, reject) => {
      socket.emit('delete-message', message, (payload: SocketResponse) => {
        if (payload.success) {
          removeMessage(message)
          resolve(payload)
        } else {
          reject(payload)
        }
      })
    })
  }

  const joinChannel = (channel: Channel): Promise<ApiResponse> => {
    return new Promise((resolve, reject) => {
      socket.emit('join-channel', channel, (payload) => {
        if (payload) {
          resolve({
            success: true,
            message: 'You joined channel successfully'
          } as ApiResponse)
        } else {
          reject({
            success: false,
            message: 'Incorrect password or there was an error'
          } as ApiResponse)
        }
      })
    })
  }

  const createChannel = (channel: Channel): Promise<Channel | ApiResponse> => {
    return new Promise((resolve, reject) => {
      socket.emit('create-channel', channel, (payload: Channel) => {
        if (payload && payload.id) {
          setCurrentChannel(payload)
          setCurrentMembers([user])
          resolve(payload)
        } else {
          reject({
            success: false,
            message: 'There was an error'
          } as ApiResponse)
        }
      })
    })
  }

  return { createMessage, joinChannel, createChannel, deleteMessage }
}
export default useSocketActions
