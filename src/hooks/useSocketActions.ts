import { ApiResponse } from './../models/ErrorResponse.model'
import { Channel } from './../models/Channel.model'
import { Message } from './../models/Message.model'
import useSocketStore from '../store/useSocketStore'
import useAuthStore from '../store/useAuthStore'
import useChatStore from '../store/useChatStore'

const useSocketActions = () => {
  const { socket } = useSocketStore()
  const { user } = useAuthStore()
  const { setCurrentMembers, setCurrentChannel } = useChatStore()

  const createMessage = (message: Message) => {
    socket.emit('create-message', {
      channel: message.channel.id,
      text: message.text
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

  return { createMessage, joinChannel, createChannel }
}
export default useSocketActions
