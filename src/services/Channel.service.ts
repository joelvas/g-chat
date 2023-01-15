import axios from 'axios'
import { useState, useEffect } from 'react'
import { Channel } from '../models/Channel.model'
import { ApiResponse } from '../models/Response.model'
import useNotificacionStore from '../store/useNotificationStore'

interface GetListParams {
  text?: string
}
export const useGetChannelList = ({ text }: GetListParams) => {
  const path = text === '' ? `/channels` : `/channels/search/${text}`
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetch = async () => {
    setIsLoading(true)
    await axios
      .get(path)
      .then((res) => {
        setData(res.data || [])
        setIsLoading(false)
        return res.data
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err.response.data)
      })
  }

  useEffect(() => {
    fetch()
  }, [text])

  return { data, refetch: fetch, isLoading }
}

const useChannelActions = () => {
  const { notifyError } = useNotificacionStore()

  const search = async (search: string): Promise<Channel[] | ApiResponse> => {
    return await axios
      .get(`/channels/search/${search}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err.response.data.message)
        notifyError({ message: err.response.data.message })
        return err.response.data
      })
  }
  const fetchAll = async (): Promise<Channel[] | ApiResponse> => {
    return await axios
      .get(`/channels`)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err.response.data)
        notifyError({ message: err.response.data.message })
        return err.response.data
      })
  }
  return { search, fetchAll }
}
export { useChannelActions }
