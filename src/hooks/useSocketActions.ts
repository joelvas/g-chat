import { SocketResponse } from './../models/Response.model'
import { Channel } from './../models/Channel.model'
import { Message } from './../models/Message.model'
import useSocketStore from '../store/useSocketStore'
import useAuthStore from '../store/useAuthStore'
import useChatStore from '../store/useChatStore'
import { v4 as uuidv4 } from 'uuid'

const useSocketActions = () => {
  const { socket } = useSocketStore()
  const { user } = useAuthStore()
  const {
    setCurrentChannel,
    addMessage,
    currentChannel,
    removeMessage,
    updateMessageId
  } = useChatStore()

  const createMessage = (message: Message) => {
    const temporalId = uuidv4()
    const temporalMessage = {
      user,
      channel: currentChannel,
      created_at: new Date(),
      id: temporalId,
      text: message.text
    } as Message

    const newMessage = {
      channel: message.channel.id,
      text: message.text
    }
    addMessage(temporalMessage, currentChannel.id)
    console.log('sending message...')
    return new Promise((resolve, reject) => {
      socket.emit(
        'create-message',
        newMessage,
        (payload: SocketResponse | Message) => {
          const message = payload as Message
          if (message?.id) {
            updateMessageId(message, temporalId, currentChannel.id)
            console.log({ message })
            resolve(message)
          } else {
            removeMessage(message, currentChannel.id)
            reject(payload as SocketResponse)
          }
        }
      )
    })
  }

  const deleteMessage = (message: Message) => {
    return new Promise((resolve, reject) => {
      socket.emit('delete-message', message, (payload: SocketResponse) => {
        if (payload.success) {
          removeMessage(message, currentChannel.id)
          resolve(payload)
        } else {
          reject(payload)
        }
      })
    })
  }

  const joinChannel = (channel: Channel): Promise<SocketResponse> => {
    return new Promise((resolve, reject) => {
      socket.emit('join-channel', channel, (payload: Channel) => {
        if (payload) {
          resolve({
            success: true,
            message: 'You joined channel successfully'
          } as SocketResponse)
        } else {
          reject({
            success: false,
            message: 'Incorrect password or there was an error'
          } as SocketResponse)
        }
      })
    })
  }

  const createChannel = (
    channel: Channel
  ): Promise<Channel | SocketResponse> => {
    return new Promise((resolve, reject) => {
      socket.emit('create-channel', channel, (payload: Channel) => {
        if (payload && payload.id) {
          setCurrentChannel(payload)
          resolve(payload)
        } else {
          reject({
            success: false,
            message: 'There was an error'
          } as SocketResponse)
        }
      })
    })
  }

  const subscribeChannel = (channel: Channel): Promise<SocketResponse> => {
    return new Promise((resolve, reject) => {
      socket.emit('subscribe-channel', channel, (payload) => {
        if (payload.success) {
          resolve({
            success: true,
            message: 'You subscribed channel successfully'
          } as SocketResponse)
        } else {
          reject({
            success: false,
            message: 'Incorrect password or there was an error'
          } as SocketResponse)
        }
      })
    })
  }

  return {
    createMessage,
    joinChannel,
    createChannel,
    deleteMessage,
    subscribeChannel
  }
}
export default useSocketActions
