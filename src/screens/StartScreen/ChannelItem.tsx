import { useMemo, memo } from "react"
import { Text, Chip } from "react-native-paper"
import { Image, TouchableOpacity } from "react-native"
import FlexItem from "../../components/ui/flex/FlexItem"
import { Channel } from "../../models/Channel.model"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useSocketActions from "../../hooks/useSocketActions"
import useStatusStore from "../../store/useStatusStore"
import useChatStore from "../../store/useChatStore"
import { useNavigation } from '@react-navigation/native'
import { getRandomImagePlaceholder } from "../../util/defaultValues"

interface Props {
  channel: Channel
}
const ChannelItem = (props: Props) => {
  const { channel } = props
  const { joinChannel } = useSocketActions()
  const { setCurrentChannel, currentChannel, subscriptionsList } = useChatStore()
  const { setIsLoadingMessages } = useStatusStore()
  const { navigate } = useNavigation()

  const subscribedChannel = useMemo(() => {
    return subscriptionsList.find((sub) => {
      return sub.channel.id === channel.id
    })
  }, [subscriptionsList])

  const pressItemHandler = () => {
    joinChannelHandler()
  }

  const joinChannelHandler = async () => {
    if (channel.id === currentChannel?.id) {
      navigate('Chat' as never, {} as never)
      return
    }
    if (channel.private && !subscribedChannel) {
      navigate('Start' as never, { openPasswordForm: true, channel } as never)
      return
    }
    if (channel.id !== currentChannel?.id) {
      setIsLoadingMessages(true)
      navigate('Chat' as never, {} as never)
      setCurrentChannel(channel)
      await joinChannel(channel).then(() => {
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
        <Image
          style={{ width: 45, height: 45, marginRight: 10, borderRadius: 30 }}
          source={{ uri: getRandomImagePlaceholder(channel.name) }}
        />
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
export default memo(ChannelItem)