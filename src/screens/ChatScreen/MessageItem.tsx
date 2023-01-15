import { useRef, useEffect, useState } from "react"
import FlexItem from "../../components/ui/flex/FlexItem"
import { formatDistance, subDays } from "date-fns"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Image, Animated } from 'react-native'
import { Text, Card, useTheme, Button } from 'react-native-paper'
import { CustomThemeProps } from "../../themes/CustomTheme"
import { Message } from "../../models/Message.model"
import useAuthStore from "../../store/useAuthStore"
import { getRandomAvatar } from "../../util/defaultValues"
import FlexContainer from "../../components/ui/flex/FlexContainer"
import useSocketActions from "../../hooks/useSocketActions"

interface Props {
  message: Message
}
const MessageItem = ({ message }: Props) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const { user } = useAuthStore()
  const { deleteMessage } = useSocketActions()
  const messageOwner = message.user.id === user.id
  const theme = useTheme<CustomThemeProps>()
  const [messageSelected, setMessageSelected] = useState(false)
  const cardStyle = {
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexShrink: 1
  }
  const avatarImage = getRandomAvatar(message.user.name)

  const distanceDate = formatDistance(subDays(new Date(Number(message.created_at)), 0), new Date(), { addSuffix: true })

  const pressDeleteHandler = async () => {
    setIsLoadingDelete(true)
    await deleteMessage(message)
    setIsLoadingDelete(false)
  }

  return (
    <Card
      mode={'contained'}
      style={{ backgroundColor: 'transparent' }}
      onLongPress={() => setMessageSelected(true)}
      onPress={() => setMessageSelected(false)}>
      <FlexContainer style={{ backgroundColor: messageSelected && messageOwner ? '#F8E0E0' : 'transparent' }}>
        <FlexContainer style={[style.container]}>
          {
            messageSelected && messageOwner && (
              <FlexContainer style={{
                flexGrow: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10,
                marginVertical: 1,
              }}  >
                <Button
                  mode={'text'}
                  buttonColor={theme.colors.error}
                  textColor={theme.colors.white}
                  disabled={isLoadingDelete}
                  loading={isLoadingDelete}
                  compact
                  onPress={pressDeleteHandler}
                >
                  {!isLoadingDelete && <MaterialCommunityIcons name="trash-can" size={22} />}
                </Button>
              </FlexContainer>
            )
          }
          <Card
            mode={'contained'}
            style={[cardStyle, messageOwner ? style.ownMessageCard : style.card]}
          >
            <FlexContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
              {
                !messageOwner && (
                  <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: avatarImage }} />
                )
              }
              <FlexContainer style={{ marginLeft: 7 }}>
                <Text>{message.text}</Text>
                <Text variant="labelSmall" style={{ color: '#6c757d' }}>{distanceDate}</Text>
              </FlexContainer>
            </FlexContainer>
          </Card>
        </FlexContainer>
      </FlexContainer>
    </Card>
  )
}
export default MessageItem

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  selected: {
    shadowColor: "red",
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  card: {
    marginRight: "auto",
    backgroundColor: 'white',
  },
  ownMessageCard: {
    marginLeft: "auto",
    backgroundColor: '#dde1e6'

  }
})

  // const animatedValue = useRef(new Animated.Value(0)).current
  // const opacityInterpolation = animatedValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0.4, 1]
  // })
  // const startAnimation = () => {
  //   Animated.spring(animatedValue, {
  //     toValue: 1,
  //     useNativeDriver: true
  //   } )
  // }
  // const stopAnimation = () => {
  //   Animated.spring(animatedValue, {
  //     toValue: 0,
  //     useNativeDriver: true
  //   } )
  // }
  // const animatedStyles = {
  //   opacity: opacityInterpolation
  // }

  // useEffect(()=>{
  //   startAnimation()
  // },[])