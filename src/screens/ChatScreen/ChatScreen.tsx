import { StyleSheet } from "react-native";
import { useEffect } from "react";
import FlexContainer from "../../components/ui/flex/FlexContainer"
import useStatusStore from "../../store/useStatusStore"
import Lottie from 'lottie-react-native';
import ChatBox from "./ChatBox";
import useRemoveBottomTab from "../../util/useRemoveBottomTab";

const ChatScreen = () => {
  const { isLoadingMessages, setIsOpenChat } = useStatusStore()

  useRemoveBottomTab()

  useEffect(() => {
    setIsOpenChat(true)
    return () => {
      setIsOpenChat(false)
    }
  }, [])

  if (isLoadingMessages) {
    return (
      <FlexContainer style={style.container}>
        <Lottie source={require('../../../assets/animations/loading-animation.json')} style={{ width: 80 }} autoPlay loop />
      </FlexContainer>
    )
  }
  return (
    <FlexContainer style={{ flexGrow: 1 }}>
      <ChatBox />
    </FlexContainer>
  )
}
export default ChatScreen

const style = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
})