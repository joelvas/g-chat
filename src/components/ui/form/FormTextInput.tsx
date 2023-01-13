import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { TextInput, Text } from 'react-native-paper'
import FlexContainer from '../flex/FlexContainer'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

type Props = React.ComponentProps<typeof TextInput> & {
  name: string
  defaultValue?: string
}
const FormTextInput = ({ name, defaultValue, label, ...props }: Props) => {
  const { field, fieldState } = useController({ name, defaultValue })
  const formContext = useFormContext()
  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined'
    console.error(msg)
    return null
  }

  const changeInputHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const value = e.nativeEvent.text
    field.onChange(value)
  }
  return (
    <FlexContainer>
      <TextInput
        onChange={changeInputHandler}
        value={`${field.value}`}
        mode="outlined"
        label={label}
        dense
        error={!!fieldState.error}
        theme={{ roundness: 16 }}
        {...props}
      />
      {!!fieldState.error && (
        <Text style={{ color: 'red' }}>{fieldState.error.message}</Text>
      )}
    </FlexContainer>
  )
}

export default FormTextInput
