import { useState } from "react"
import FlexContainer from "../ui/flex/FlexContainer"
import { Button, useTheme } from 'react-native-paper'
import useSocketActions from "../../hooks/useSocketActions"
import useChatStore from "../../store/useChatStore"

const SubscribeButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const { currentChannel } = useChatStore()
  const { subscribeChannel } = useSocketActions()
  const pressSubscribeButtonHandler = async () => {
    setIsLoading(true)
    await subscribeChannel(currentChannel)
    setIsLoading(false)
  }
  return <FlexContainer>
    <Button
      mode="contained"
      loading={isLoading}
      disabled={isLoading}
      style={{ borderRadius: 0, borderColor: theme.colors.primary }}
      onPress={pressSubscribeButtonHandler}>
      SUBSCRIBE
    </Button>
  </FlexContainer>
}
export default SubscribeButton

