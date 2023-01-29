import FlexContainer from "../../components/ui/flex/FlexContainer"
import { useState, useEffect } from "react"
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import SearchInput from "../../components/custom/SearchInput"
import FlexItem from "../../components/ui/flex/FlexItem"
import ChannelList from "../../components/lists/ChannelsList"
import BasicModal from "../../components/ui/basics/BasicModal"
import ChannelForm from "../../components/forms/ChannelForm"
import ChannelPasswordForm from "../../components/forms/ChannelPasswordForm"
import useSocketActions from "../../hooks/useSocketActions"
import { Channel } from "../../models/Channel.model"
import { ApiResponse } from "../../models/Response.model"
import StartScreenHeader from "../../components/headers/StartScreenHeader"
import useChatStore from "../../store/useChatStore"

const StartScreen = () => {
  const [newChannelModalVisible, setNewChanneModalVisible] = useState(false)
  const [channelPasswordModalVisible, setChannelPasswordModalVisible] = useState(false)
  const { setCurrentChannel, channelsList } = useChatStore()
  const { params } = useRoute() as RouteProp<{ params: { openPasswordForm: boolean, channel: Channel } }>
  const { navigate } = useNavigation()
  const { joinChannel, createChannel } = useSocketActions()

  useEffect(() => {
    setChannelPasswordModalVisible(!!params?.openPasswordForm)
  }, [params])

  const submitPasswordHandler = async ({ password }: any): Promise<ApiResponse> => {
    const channel = { ...params.channel, password }

    return await joinChannel(channel).then((res) => {
      setCurrentChannel(params.channel)
      navigate('Chat' as never, {} as never)
      setChannelPasswordModalVisible(false)
      return res
    }).catch((err) => {
      return err
    })

  }

  const submitNewRoomHandler = async (data: any): Promise<Channel | ApiResponse> => {
    return await createChannel(data).then((res: Channel) => {
      if (res.id) {
        setNewChanneModalVisible(false)
        navigate('Chat' as never, {} as never)
      }
      return res
    })
  }

  return (
    <FlexContainer style={{
      paddingHorizontal: 15,
      paddingTop: 20,
      height: '100%',
      flexGrow: 1
    }}>
      <StartScreenHeader />
      <FlexItem style={{ paddingTop: 10 }}>
        <SearchInput />
      </FlexItem>
      <ChannelList channelsList={channelsList} />
      <BasicModal visible={newChannelModalVisible} onDismiss={() => setNewChanneModalVisible(false)}>
        <ChannelForm onSubmit={submitNewRoomHandler} />
      </BasicModal>
      <BasicModal visible={channelPasswordModalVisible} onDismiss={() => setChannelPasswordModalVisible(false)}>
        <ChannelPasswordForm onSubmit={submitPasswordHandler} />
      </BasicModal>
    </FlexContainer>
  )
}
export default StartScreen