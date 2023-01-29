import { useEffect } from 'react'
import useSocketStore from '../store/useSocketStore'
import io from 'socket.io-client'
import useAuthStore from '../store/useAuthStore'
import useChatStore from '../store/useChatStore'
import { Channel } from '../models/Channel.model'
import { Subscription } from '../models/Subscription.model'
import { v4 as uuidv4 } from 'uuid'
import { SOCKET_URL } from '../../config'

const SocketInit = () => {
  const { setSocket } = useSocketStore()
  const { token, user } = useAuthStore()
  const {
    setChannelsList,
    setCurrentChannel,
    addChannel,
    setSubscriptionsList,
    addSubscription,
    subscriptionsList

  } = useChatStore()

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      extraHeaders: { 'x-token': token }
    })

    socket.on('channels-list', (payload) => {
      setChannelsList(payload)
    })

    socket.on('subscriptions-list', (payload: Subscription[]) => {
      setSubscriptionsList(payload)
    })

    socket.on('current-channel', async (payload: Channel) => {
      const foundSub = subscriptionsList.find((sub) => sub.channel.id === payload.id ? true : false)
      if (!foundSub) addSubscription({
        id: uuidv4(),
        channel: payload,
        user: user,
        created_at: new Date()
      } as Subscription)
      setCurrentChannel(payload)
    })

    socket.on('new-channel', (payload) => {
      addChannel(payload)
    })

    socket.on('connect', () => {
      console.info('Socket connected')
    })

    socket.on('disconnect', () => {
      console.info('Socket disconnected')
    })

    setSocket(socket)
  }, [token])

  return null
}
export default SocketInit
