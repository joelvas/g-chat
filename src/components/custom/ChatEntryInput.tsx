import { useState } from "react"
import FlexContainer from "../ui/flex/FlexContainer"
import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import { useTheme, IconButton } from "react-native-paper"
import { CustomThemeProps } from "../../themes/CustomTheme"
import useSocketActions from "../../hooks/useSocketActions"
import useChatStore from "../../store/useChatStore"
import EmojiPicker from 'rn-emoji-keyboard'
import { EmojiType } from 'rn-emoji-keyboard/lib/typescript/types'
import { Message } from "../../models/Message.model"

const ChatEntryInput = () => {
  const [isSendingLike, setIsSendingLike] = useState(false)
  const [isEmojiKeyboardOpen, setIsEmojiKeyboardOpen] = useState(false)
  const [text, setText] = useState('')
  const theme = useTheme<CustomThemeProps>()
  const { createMessage } = useSocketActions()
  const { currentChannel } = useChatStore()

  const changeTextHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text)
  }

  const clickSendMessageHandler = async () => {
    try {
      setText('')
      await createMessage({
        text: text.trim(),
        channel: currentChannel,
      } as Message)
    } catch (err) {
      console.log(err)
    }
  }

  const pressSendLikeHandler = async () => {
    try {
      setIsSendingLike(true)
      setText('')
      await createMessage({
        text: `👍`,
        channel: currentChannel,
      } as Message)
      setIsSendingLike(false)
    } catch (err) {
      console.log(err)
    }
  }

  const selectEmojiHandler = (emojiObject: EmojiType) => {
    setText((value) => `${value}${emojiObject.emoji}`)
  }

  return (
    <FlexContainer style={style.container}>
      <EmojiPicker
        hideHeader
        expandable={false}
        theme={{ backdrop: '' }}
        onEmojiSelected={selectEmojiHandler}
        open={isEmojiKeyboardOpen}
        onClose={() => setIsEmojiKeyboardOpen(false)}
        categoryPosition={"bottom"}
      />
      {/* <IconButton
        style={[style.emojiButton]}
        icon='emoticon-outline'
        iconColor={theme.colors.primary}
        onPress={() => setIsEmojiKeyboardOpen(true)} /> */}
      <TextInput
        blurOnSubmit={false}
        onChange={changeTextHandler}
        value={text}
        style={[style.textInput]}
        placeholder="Write a message..."
        multiline
        cursorColor={theme.colors.surface}
        returnKeyType="send"
        onSubmitEditing={clickSendMessageHandler}
        keyboardType="default"

      />
      {text == '' ? (
        <IconButton
          style={[style.likeButton]}
          icon='thumb-up-outline'
          iconColor={theme.colors.primary}
          onPress={() => isSendingLike ? () => { } : pressSendLikeHandler()} />
      ) : (
        <IconButton
          style={[style.likeButton]}
          icon='send-outline'
          iconColor={theme.colors.primary}
          onPress={clickSendMessageHandler} />
      )}
    </FlexContainer>
  )
}
export default ChatEntryInput

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    flexShrink: 1,
    flexGrow: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 10,
    paddingLeft: 15,
    fontSize: 15,
  },
  likeButton: {
    backgroundColor: 'transparent',
    borderRadius: 15,
    justifyContent: 'center',
  },
  emojiButton: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    justifyContent: 'center',
  }
})