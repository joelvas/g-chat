import { useRef, useEffect } from "react"
import FlexItem from "../../components/ui/flex/FlexItem"
import { formatDistance, subDays } from "date-fns"
import { StyleSheet, Image, Animated } from 'react-native'
import { Text, Card, useTheme } from 'react-native-paper'
import { CustomThemeProps } from "../../themes/CustomTheme"
import { Message } from "../../models/Message.model"
import useAuthStore from "../../store/useAuthStore"
import { getRandomAvatar } from "../../util/defaultValues"
import FlexContainer from "../../components/ui/flex/FlexContainer"

interface Props {
  message: Message
}
const MessageItem = ({ message }: Props) => {
  const { user } = useAuthStore()
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

  const theme = useTheme<CustomThemeProps>()
  const card = {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
  }
  const avatarImage = getRandomAvatar(message.user.name)

  const distanceDate = formatDistance(subDays(new Date(Number(message.created_at)), 0), new Date(), { addSuffix: true })

  return (
    <FlexContainer style={[style.container]}>
      <Card style={[card, message.user.id === user.id ? style.ownMessageCard : style.card]}>
        <FlexContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: avatarImage }} />
          <FlexContainer style={{ marginLeft: 7 }}>
            <Text>{message.text}</Text>
            <Text variant="labelSmall" style={{ color: '#6c757d' }}>{distanceDate}</Text>
          </FlexContainer>
        </FlexContainer>
      </Card>
    </FlexContainer>
  )
}
export default MessageItem

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5
  },
  card: {
    marginRight: "auto",
  },
  ownMessageCard: {
    marginLeft: "auto",
    backgroundColor: '#dde1e6'

  }
})