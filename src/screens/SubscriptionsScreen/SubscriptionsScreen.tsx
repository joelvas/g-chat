import { useMemo } from "react"
import FlexContainer from "../../components/ui/flex/FlexContainer"
import StartScreenHeader from "../../components/headers/StartScreenHeader"
import ChannelList from "../../components/lists/ChannelsList"
import useChatStore from "../../store/useChatStore"
import FlexItem from "../../components/ui/flex/FlexItem"
import { Text } from "react-native-paper"

const SubscriptionsScreen = () => {
  const { subscriptionsList } = useChatStore()
  const channelsList = useMemo(() => {
    return subscriptionsList.map((sub) => sub.channel)
  }, [subscriptionsList])
  return (
    <FlexContainer style={{
      paddingHorizontal: 15,
      paddingTop: 20,
      height: '100%',
      flexGrow: 1
    }}>
      <StartScreenHeader />
      <FlexItem>
        <Text variant="titleLarge" style={{paddingVertical: 10, fontWeight: "700"}}>Subscriptions</Text></FlexItem>
      <ChannelList channelsList={channelsList} />
    </FlexContainer>
  )
}

export default SubscriptionsScreen