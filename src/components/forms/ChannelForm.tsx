import { useState } from "react"
import FlexContainer from "../ui/flex/FlexContainer"
import { Text, Button } from 'react-native-paper'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import FormTextInput from "../ui/form/FormTextInput"
import FlexItem from "../ui/flex/FlexItem"
import { ApiResponse } from "../../models/Response.model"
import { Channel } from "../../models/Channel.model"

const defaultValues = {
  name: '',
  description: ''
}
interface Props {
  onSubmit: (data: typeof defaultValues) => Promise<Channel | ApiResponse>
}
const ChannelForm = ({ onSubmit }: Props) => {
  const [loading, setLoading] = useState(false)
  const validation = Yup.object({
    name: Yup.string().trim().min(6, 'Name too short').required('Name is required'),
    description: Yup.string()
  })

  const formContext = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(validation) })

  const submitHandler = async (data: typeof defaultValues) => {
    setLoading(true)
    await onSubmit(data)
    setLoading(false)
  }
  return (
    <FlexContainer style={{ paddingTop: 10 }}>
      <Text variant="titleLarge"> New Room</Text>
      <FormProvider {...formContext}>
        <FlexItem style={{ paddingVertical: 10 }}>
          <FormTextInput name="name" label="Room name" />
        </FlexItem>
        <FlexItem style={{ paddingVertical: 5 }}>
          <FormTextInput name="description" label="Description" multiline numberOfLines={3} />
        </FlexItem>
        <FlexItem style={{ paddingTop: 15 }}>
          <Button loading={loading} disabled={loading} mode="contained" onPress={formContext.handleSubmit(submitHandler)}>Create room</Button>
        </FlexItem>
      </FormProvider>
    </FlexContainer>
  )
}
export default ChannelForm