import { StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import FlexContainer from "../../components/ui/flex/FlexContainer"
import { useNavigation } from "@react-navigation/native";
import useChatStore from "../../store/useChatStore"
import Lottie from 'lottie-react-native';
import ChatBox from "./ChatBox";

const ChatScreen = () => {
  const { isLoadingMessages } = useChatStore()

  const navigation = useNavigation()
  
  useLayoutEffect(() => {
    let parentNav = navigation.getParent();
    parentNav.setOptions({
      tabBarStyle: { display: 'flex' },
    });
  }, [])

  if (isLoadingMessages) {
    return (
      <FlexContainer style={style.container}>
        <Lottie source={require('../../../assets/animations/loading-animation.json')} style={{ width: 80 }} autoPlay loop />
      </FlexContainer>
    )
  }
  return (
    <FlexContainer style={{ flexGrow: 1}}>
      <ChatBox />
    </FlexContainer>
  )
}
export default ChatScreen

const style = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
})