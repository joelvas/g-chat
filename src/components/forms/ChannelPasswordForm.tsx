import { useState } from "react"
import FlexContainer from "../ui/flex/FlexContainer"
import { Text, Button } from 'react-native-paper'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import FormTextInput from "../ui/form/FormTextInput"
import FlexItem from "../ui/flex/FlexItem"
import { ApiResponse } from "../../models/Response.model"

const defaultValues = {
  password: ''
}
interface Props {
  onSubmit: (data: typeof defaultValues) => Promise<ApiResponse>
}
const ChannelPasswordForm = ({ onSubmit }: Props) => {
  const [loading, setLoading] = useState(false)
  const validation = Yup.object({
    password: Yup.string().trim().min(5, 'Password too short').required()
  })

  const formContext = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(validation) })

  const submitHandler = async (data: typeof defaultValues) => {
    setLoading(true)
    await onSubmit(data).then((res) => {
      setLoading(false)
    }).catch((err: ApiResponse) => {
      formContext.setError('password', { message: 'Incorrect password or there was an error ' })
      setLoading(false)
    })
  }
  
  return (
    <FlexContainer style={{ paddingTop: 10 }}>
      <Text variant="titleLarge"> Private Room</Text>
      <FormProvider {...formContext}>
        <FlexItem style={{ paddingVertical: 10 }}>
          <FormTextInput name="password" label="Password" />
        </FlexItem>
        <FlexItem style={{ paddingVertical: 10 }}>
          <Button loading={loading} disabled={loading} mode="contained" onPress={formContext.handleSubmit(submitHandler)}>Join room</Button>
        </FlexItem>
      </FormProvider>
    </FlexContainer>
  )
}
export default ChannelPasswordForm