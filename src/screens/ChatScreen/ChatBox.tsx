
import FlexContainer from "../../components/ui/flex/FlexContainer"
import ChatHistory from "./MessagesList"
import ChatEntry from "./ChatEntry"

const ChatBox = () => {

  return (
    <FlexContainer style={{ maxHeight: '100%' }}>
      <ChatHistory />
      <ChatEntry />
    </FlexContainer>
  )
}
export default ChatBox
