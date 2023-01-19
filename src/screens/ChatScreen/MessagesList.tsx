import { useEffect, useRef, useState, useMemo } from 'react'
import { Button } from 'react-native-paper'
import { FlatList, ListRenderItemInfo, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import FlexContainer from "../../components/ui/flex/FlexContainer"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useChatStore from "../../store/useChatStore"
import MessageItem from './MessageItem'
import { Message } from '../../models/Message.model'

const MessagesList = () => {
  const { currentMessages } = useChatStore()
  const flatListRef = useRef<FlatList | null>(null)
  const [scrollY, setScrollY] = useState(0);
  const [hasNewMessages, setHasNewMessages] = useState(false)

  const onScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y)
  }

  const contentSizeChangeHandler = (width: number, height: number) => {
    if (flatListRef?.current && scrollY > 0) {
      setHasNewMessages(true)
    }
  }

  const pressNewMessagesHandler = () => {
    flatListRef?.current.scrollToIndex({ index: 0, animated: true });
    setHasNewMessages(false)
  }

  return (
    <FlexContainer style={{ flexShrink: 2, position: 'relative' }}>
      <FlatList
        ref={flatListRef}
        style={{ flexGrow: 2 }}
        inverted
        // onScroll={onScrollHandler}
        // onContentSizeChange={contentSizeChangeHandler}
        data={currentMessages || []}
        ItemSeparatorComponent={() => <></>}
        renderItem={({ item }: ListRenderItemInfo<Message>) => (
          <MessageItem
            key={item.id}
            message={item}
          />
        )}
      />
      {hasNewMessages && (
        <FlexContainer style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <Button mode='contained' style={{ alignItems: 'center', borderWidth: 1, borderColor: 'white' }} onPress={pressNewMessagesHandler}>
            <MaterialCommunityIcons name="arrow-down" size={20} />
            New messages
          </Button>
        </FlexContainer>
      )
      }
    </FlexContainer>
  )
}
export default MessagesList
