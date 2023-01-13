import { Text, Chip } from "react-native-paper"
import { Image, TouchableOpacity } from "react-native"
import FlexItem from "../../components/ui/flex/FlexItem"
import { Channel } from "../../models/Channel.model"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useSocketActions from "../../hooks/useSocketActions"
import useChatStore from "../../store/useChatStore"
import { useNavigation } from '@react-navigation/native'

interface Props {
  channel: Channel
}
const ChannelItem = (props: Props) => {
  const { channel } = props
  const { joinChannel } = useSocketActions()
  const { setCurrentChannel, setIsLoadingMessages, currentChannel } = useChatStore()
  const { navigate } = useNavigation()

  const getRandomImg = (name: string): string => {
    return (
      'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
    )
  }

  const pressItemHandler = () => {
    joinChannelHandler()
  }
  const joinChannelHandler = async () => {
    if (channel.id === currentChannel?.id) {
      navigate('Chat' as never, {} as never)
      return
    }
    if (channel.private) {
      navigate('Start' as never, { openPasswordForm: true, channel } as never)
      return
    }
    if (channel.id !== currentChannel?.id) {
      setIsLoadingMessages(true)
      navigate('Chat' as never, {} as never)

      await joinChannel(channel).then(() => {
        setCurrentChannel(channel)
      }).catch(() => {
        navigate('Start' as never, { openPasswordForm: true, channel } as never)
      }).finally(() => {
        setIsLoadingMessages(false)
      })

    }
  }

  return (
    <TouchableOpacity onPress={pressItemHandler}>
      <FlexItem style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <Image style={{ width: 45, height: 45, marginRight: 10, borderRadius: 30 }} source={{ uri: getRandomImg(channel.name) }} />
        <Text style={{ flexGrow: 1 }}>{channel.name}</Text>
        {
          channel.private && (
            <Chip compact style={{ height: 35 }}>
              <MaterialCommunityIcons name="lock" />
            </Chip>
          )
        }
      </FlexItem>
    </TouchableOpacity>
  )
}
export default ChannelItem