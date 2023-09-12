import { useForm, useWatch } from 'react-hook-form'
import {
  SampleFormSchema,
  sampleFormSchema,
} from '../schema/sample-form-schema'
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
    // デフォルト状態はフォーム要素全てが未定義(undefined)の状態として取り扱う
    defaultValues: undefined,
    // zodResolverの引数にonSubmit時に走るschemaを渡す
    resolver: zodResolver(sampleFormSchema),
  })

  const watchedInput = useWatch({ control })
  // フォームのエラー状況
  console.log('errors', errors)
  // フォームの入力値
  console.log('watchedInput', watchedInput)

  // zodの値変換+型チェックを通過した場合のみonSubmitが呼ばれる
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
    options: {
      options,
      optionsWithColor,
    },
  }
}

export default useSampleForm

const options = [
  {
    value: '候補1',
    label: '候補1',
  },
  {
    value: '候補2',
    label: '候補2',
  },
  {
    value: '候補3',
    label: '候補3',
  },
] as const satisfies SelectOptions

const optionsWithColor = [
  {
    value: '赤',
    label: 'あか',
    color: 'red',
  },
  {
    value: '青',
    label: 'あお',
    color: 'blue',
  },
  {
    value: '緑',
    label: 'みどり',
    color: 'green',
  },
] as const
