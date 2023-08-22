import { useForm, useWatch } from 'react-hook-form'
import {
  SampleFormSafeSchema,
  sampleFormSafeSchema,
  sampleFormStrictSchema,
} from '../ schema/sample-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'

const useSampleForm = () => {
  // フォームのデフォルト値：safeSchemaをparseした結果を使う
  const defaultValues = sampleFormSafeSchema.parse({})

  const {
    control,
    handleSubmit,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<SampleFormSafeSchema>({
    // modeをonBlurにすることで、初回validation時を検索ボタンが押されたタイミングに設定できる
    mode: 'onSubmit',
    // reValidateModeをonBlurにすることで、入力値が変更された時にresolverに指定されたvalidationが走る
    reValidateMode: 'onBlur',
    defaultValues,
    // zodResolverの引数にonSubmit時に走るschemaを渡す
    resolver: zodResolver(sampleFormStrictSchema),
  })

  const watchedInput = useWatch({ control })
  // フォームのエラー状況
  console.log('errors', errors)
  // フォームの入力値
  console.log('watchedInput', watchedInput)

  // zodの値変換+型チェックを通過した場合のみonSubmitが呼ばれる
  // 実際の型はSampleFormStrictSchema
  const onSubmit = (data: SampleFormSafeSchema) => {
    // zodの値変換+型チェックを通過した値
    console.log('data', data)
  }

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
    },
  }
}

export default useSampleForm
