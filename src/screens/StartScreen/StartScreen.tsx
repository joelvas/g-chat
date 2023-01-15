import FlexContainer from "../../components/ui/flex/FlexContainer"
import { useState, useEffect } from "react"
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { Text, useTheme, Button } from "react-native-paper"
import { Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SearchInput from "../../components/textinputs/SearchInput"
import FlexItem from "../../components/ui/flex/FlexItem"
import ChannelList from "./ChannelsList"
import useAuthentication from "../../hooks/useAuthentication"
import BasicModal from "../../components/ui/basics/BasicModal"
import ChannelForm from "../../components/forms/ChannelForm"
import ChannelPasswordForm from "../../components/forms/ChannelPasswordForm"
import useSocketActions from "../../hooks/useSocketActions"
import { Channel } from "../../models/Channel.model"
import useChatStore from "../../store/useChatStore"
import { ApiResponse } from "../../models/Response.model"

const StartScreen = () => {
  const theme = useTheme()
  const [newChannelModalVisible, setNewChanneModalVisible] = useState(false)
  const [channelPasswordModalVisible, setChannelPasswordModalVisible] = useState(false)
  const { removeAuthentication } = useAuthentication()
  const pressLogOutHandler = () => {
    removeAuthentication()
  }
  const { setCurrentChannel } = useChatStore()
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
      <FlexItem style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('../../../assets/icon.png')} />
        <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onSurface }}>Rooms</Text>
        <Button mode="text" onPress={() => setNewChanneModalVisible(true)} style={{ marginLeft: 'auto' }}>
          <MaterialCommunityIcons name="plus" size={22} />
        </Button>
        <Button mode="text" onPress={pressLogOutHandler}>
          <MaterialCommunityIcons name="logout" size={22} />
        </Button>
      </FlexItem>
      <FlexItem style={{ paddingTop: 10 }}>
        <SearchInput />
      </FlexItem>
      <ChannelList />
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