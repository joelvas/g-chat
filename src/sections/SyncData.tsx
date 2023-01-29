import useChatStore from "../store/useChatStore"
import { useEffect } from "react"
import useLocalNotification from '../hooks/useLocalNotification'
import useSocketStore from "../store/useSocketStore"
import useAuthStore from "../store/useAuthStore"
import { Message } from "../models/Message.model"
import { User } from "../models/User.model"
import useStatusStore from "../store/useStatusStore"
import { getAllMessages } from "../services/Message.service"

const SyncData = () => {
  const { subscriptionsList, addMessage, addMember, removeMember,
    removeMessage, setMessages, channelsList, currentChannel } = useChatStore()
  const { socket } = useSocketStore()
  const { showNewMessageNotification } = useLocalNotification()
  const { user } = useAuthStore()
  const { isOpenChat } = useStatusStore()

  useEffect(() => {
    subscriptionsList.map(async (sub) => {
      const channelId = sub.channel.id
      socket.on(`${channelId}/new-message`, async(payload: Message) => {
        addMessage(payload, channelId)
        if (user.id !== payload.user.id && !isOpenChat) {
          console.log('showing notification...')
          await showNewMessageNotification(payload)
        }
      })

      socket.on(`${channelId}/remove-message`, (payload: Message) => {
        removeMessage(payload, channelId)
      })

      socket.on(`${channelId}/new-member`, (payload: User) => {
        addMember(payload, channelId)
      })

      socket.on(`${channelId}/remove-member`, (payload: User) => {
        removeMember(payload, channelId)
      })

    })
  }, [subscriptionsList])

  useEffect(() => {
    if (currentChannel && currentChannel.id) {
      const channelId = currentChannel.id
      const foundChannel = channelsList.find((channel) => channel.id == channelId ? true : false)
      console.log('has messages: ' + !!foundChannel?.messages)
      console.log('messages number: ' + foundChannel?.messages?.length || 0)
      if (!foundChannel?.messages || foundChannel?.messages?.length === 0) {

        getAllMessages({ channelId })
          .then(async (res) => {
            setMessages(res as Message[] || [], channelId)
          }).catch((err) => {
            console.log({ err })
          })
      }
    }
  }, [currentChannel])

  return null
}
export default SyncData