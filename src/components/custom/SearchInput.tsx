import FlexContainer from '../ui/flex/FlexContainer'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import { useState, useEffect } from 'react'
import FlexItem from '../ui/flex/FlexItem'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextInput } from 'react-native-paper'
import useChatStore from '../../store/useChatStore'
import * as Yup from 'yup'
import { useGetChannelList } from '../../services/Channel.service'

const defaultValues = {
  text: '',
}
const SearchInput = () => {
  const { setChannelsList } = useChatStore()
  const [textQuery, setTextQuery] = useState('')

  const validation = Yup.object({
    text: Yup.string()
  })

  const methods = useForm({ defaultValues, resolver: yupResolver(validation), mode: 'onSubmit' })

  const { data, isLoading } = useGetChannelList({ text: methods.watch('text') })

  useEffect(() => {
    if (data) {
      setChannelsList(data)
    }
  }, [data])

  useEffect(() => {
    const timer = setTimeout(() => {
      methods.setValue('text', textQuery)
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [textQuery])

  const changeTextInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTextQuery(e.nativeEvent.text)
  }

  return (
    <FormProvider {...methods}>
      <FlexContainer style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <FlexItem style={{ flex: 1 }}>
          <TextInput
            placeholder="Search channels..."
            label="Search..."
            mode='outlined'
            dense={true}
            onChange={changeTextInput}
            theme={{ roundness: 15 }}
            style={{ paddingRight: 80 }}
            left={
              <TextInput.Icon
                size={30}
                icon="magnify" />
            } />
        </FlexItem>
        <FlexItem style={{ paddingLeft: 10, position: 'absolute', top: 7, right: 0 }}>
          <Button
            mode='text'
            loading={isLoading}
            disabled={isLoading}>
          </Button>
        </FlexItem>
      </FlexContainer>
    </FormProvider>)
}
export default SearchInput
