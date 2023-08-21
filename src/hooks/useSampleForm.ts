import { useForm, useWatch } from 'react-hook-form'
import {
  SampleFormSafeSchema,
  sampleFormSafeSchema,
  sampleFormStrictSchema,
} from '../ schema/sample-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'

const useSampleForm = () => {
  const defaultValues = sampleFormSafeSchema.parse({})

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SampleFormSafeSchema>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: zodResolver(sampleFormStrictSchema),
  })

  const watchedInput = useWatch({ control })
  // フォームのエラー状況
  console.log('errors', errors)
  // フォームの入力値
  console.log('watchedInput', watchedInput)

  const onSubmit = (data: SampleFormSafeSchema) => {
    console.log('data', data)
  }

  return {
    form: {
      control,
      handleSubmit,
      setValue,
      reset,
      onSubmit,
    },
  }
}

export default useSampleForm
