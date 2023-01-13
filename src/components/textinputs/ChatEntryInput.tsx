import { useState } from "react"
import FlexContainer from "../ui/flex/FlexContainer"
import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useTheme, Button } from "react-native-paper"
import { CustomThemeProps } from "../../themes/CustomTheme"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useSocketActions from "../../hooks/useSocketActions"
import useChatStore from "../../store/useChatStore"
import { Message } from "../../models/Message.model"

const ChatEntryInput = () => {
  const [text, setText] = useState('')
  const theme = useTheme<CustomThemeProps>()
  const { createMessage } = useSocketActions()
  const { currentChannel } = useChatStore()

  const changeTextHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text)
  }

  const clickSendMessageHandler = async () => {
    createMessage({
      text: text.trim(),
      channel: currentChannel,
    } as Message)
    setText('')
  }

  return (
    <FlexContainer style={style.container}>
      <TextInput
        focusable
        onChange={changeTextHandler}
        value={text}
        style={[style.textInput]}
        placeholder="Write a message..."
        cursorColor={theme.colors.surface}
      />
      <Button
        style={[style.button]}
        onPress={clickSendMessageHandler}
      >
        <MaterialCommunityIcons name="send-outline" size={22} />
      </Button>
    </FlexContainer>
  )
}
export default ChatEntryInput

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  textInput: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    justifyContent: 'center',
  }
})