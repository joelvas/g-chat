
import FlexContainer from "../../components/ui/flex/FlexContainer"
import ChatHistory from "./MessagesList"
import ChatEntry from "./ChatEntry"
import useChatStore from "../../store/useChatStore"
import SubscribeButton from "../../components/custom/SubscribeButton"

const ChatBox = () => {

  const { subscriptionsList, currentChannel } = useChatStore()
  const subscriptionExists = subscriptionsList.find((sub) => {
    return sub.channel?.id === currentChannel.id
  })

  return (
    <FlexContainer style={{ maxHeight: '100%' }}>
      <ChatHistory />
      {
        !!subscriptionExists ? <ChatEntry /> : <SubscribeButton />
      }

    </FlexContainer>
  )
}
export default ChatBox
