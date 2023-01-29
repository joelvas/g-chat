import { useState } from "react"
import FlexContainer from "../ui/flex/FlexContainer"
import { Image } from "react-native"
import { Text, Button, useTheme } from "react-native-paper"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useAuthentication from "../../hooks/useAuthentication"
import BasicModal from "../ui/basics/BasicModal"
import ChannelForm from "../forms/ChannelForm"
import useSocketActions from "../../hooks/useSocketActions"
import { Channel } from "../../models/Channel.model"
import { ApiResponse } from "../../models/Response.model"
import { useNavigation } from "@react-navigation/native"

const StartScreenHeader = () => {
  const theme = useTheme()
  const [newChannelModalVisible, setNewChanneModalVisible] = useState(false)
  const { removeAuthentication } = useAuthentication()
  const { createChannel } = useSocketActions()
  const { navigate } = useNavigation()
  const pressLogOutHandler = () => {
    removeAuthentication()
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
    <FlexContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image style={{ width: 30, height: 30, marginRight: 10 }} source={require('../../../assets/icon.png')} />
      <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onSurface }}>Rooms</Text>
      <Button mode="text" onPress={() => setNewChanneModalVisible(true)} style={{ marginLeft: 'auto' }}>
        <MaterialCommunityIcons name="plus" size={22} />
      </Button>
      <Button mode="text" onPress={pressLogOutHandler}>
        <MaterialCommunityIcons name="logout" size={22} />
      </Button>
      <BasicModal visible={newChannelModalVisible} onDismiss={() => setNewChanneModalVisible(false)}>
        <ChannelForm onSubmit={submitNewRoomHandler} />
      </BasicModal>
    </FlexContainer>
  )
}
export default StartScreenHeader