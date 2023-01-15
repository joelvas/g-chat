import { useEffect } from 'react'
import useSocketStore from '../store/useSocketStore'
import io from 'socket.io-client'
import useAuthStore from '../store/useAuthStore'
import useLocalNotification from '../hooks/useLocalNotification'
import useChatStore from '../store/useChatStore'
import { Message } from '../models/Message.model'

const SocketInit = () => {
  const { triggerNewMessageNotification } = useLocalNotification()
  const { setSocket } = useSocketStore()
  const { token, SOCKET_URL, user } = useAuthStore()
  const {
    setChannelsList,
    setCurrentChannel,
    setCurrentMessages,
    setCurrentMembers,
    addChannel,
    addMember,
    removeMember,
    addMessage,
    removeChannel,
    updateChannel,
    isOpenChat
  } = useChatStore()

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15,
      extraHeaders: { 'x-token': token }
    })

    //sockets started
    socket.on('channels-list', (payload) => {
      setChannelsList(payload)
    })

    socket.on('current-channel', (payload) => {
      setCurrentChannel(payload)
    })

    socket.on('current-members', (payload) => {
      setCurrentMembers(payload)
    })

    socket.on('current-messages', (payload) => {
      setCurrentMessages(payload)
    })

    //sockets updates
    socket.on('new-channel', (payload) => {
      addChannel(payload)
    })

    socket.on('new-member', (payload) => {
      addMember(payload)
    })

    socket.on('remove-member', (payload) => {
      removeMember(payload)
    })

    socket.on('new-message', (payload: Message) => {
      addMessage(payload)
      if (user.id !== payload.user.id && !isOpenChat) {
        triggerNewMessageNotification({
          title: `${payload.channel?.name}`,
          subtitle: `${payload.channel?.name}`,
          message: `${payload.user?.name}: ${payload.text}`,
        })
      }
    })

    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    setSocket(socket)
  }, [token])

  return null
}
export default SocketInit
