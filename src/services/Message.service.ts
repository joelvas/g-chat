import { Message } from './../models/Message.model'
import { ApiResponse } from './../models/Response.model'
import axios from 'axios'

interface MessagesChannelParams {
  channelId?: string
  lastDate?: number
  firstDate?: number
}
const getAllMessages = async (
  params: MessagesChannelParams
): Promise<Message[] | ApiResponse> => {
  return await axios
    .get<Message[]>(`/messages`, { params })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

export { getAllMessages }
