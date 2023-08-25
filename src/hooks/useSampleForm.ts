import { useForm, useWatch } from 'react-hook-form'
import {
  SampleFormSchema,
  sampleFormSchema,
} from '../ schema/sample-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectOptions } from '../components/RHFSelect'

const useSampleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<SampleFormSchema>({
    // modeをonBlurにすることで、初回validation時を検索ボタンが押されたタイミングに設定できる
    mode: 'onSubmit',
    // reValidateModeをonBlurにすることで、入力値が変更された時にresolverに指定されたvalidationが走る
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      nullableName: null,
      selectedValue: 10,
      nullableSelectedValue: null,
    },
    // zodResolverの引数にonSubmit時に走るschemaを渡す
    resolver: zodResolver(sampleFormSchema),
  })

  const watchedInput = useWatch({ control })
  // フォームのエラー状況
  console.log('errors', errors)
  // フォームの入力値
  console.log('watchedInput', watchedInput)

  // zodの値変換+型チェックを通過した場合のみonSubmitが呼ばれる
  // 実際の型はSampleFormStrictSchema
  const onSubmit = (data: SampleFormSchema) => {
    // zodの値変換+型チェックを通過した値
    console.log('data', data)
  }

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
    },
    options,
  }
}

export default useSampleForm

const options = [
  {
    value: 10,
    label: 'Ten',
  },
  {
    value: 20,
    label: 'Twenty',
  },
  {
    value: 30,
    label: 'Thirty',
  },
] as const satisfies SelectOptions
