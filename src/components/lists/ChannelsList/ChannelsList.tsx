import { FlatList, ListRenderItemInfo } from 'react-native'
import ChannelItem from './ChannelItem'
import { Channel } from '../../../models/Channel.model'
import FlexContainer from '../../ui/flex/FlexContainer'

interface Props {
  channelsList: Channel[]
}
const ChannelList = ({ channelsList }: Props) => {
  return (
    <FlexContainer style={{ flexShrink: 2 }}>
      <FlatList
        style={{ flexGrow: 2 }}
        data={channelsList}
        ItemSeparatorComponent={() => <></>}
        renderItem={({ item }: ListRenderItemInfo<Channel>) => (
          <ChannelItem
            key={item.id}
            channel={item}
          />
        )}
      />
    </FlexContainer>
  )
}
export default ChannelList