import useSampleForm from '../hooks/useSampleForm'
import { Box, Button } from '@mui/material'
import RHFTextField from './RHFTextField'
import RHFSelect, { SelectOptions } from './RHFSelect'

const SampleForm = () => {
  const {
    form: { control, handleSubmit, onSubmit },
  } = useSampleForm()

  return (
    <Box
      component="form"
      // handleSubmitはvalidationが通った時のみ実行されます
      // ドキュメント：This function will receive the form data if form validation is successful.
      // https://react-hook-form.com/docs/useform/handlesubmit
      onSubmit={handleSubmit(onSubmit)}
      width={'1000px'}
      margin={'50px auto'}
      bgcolor="#E5E5E5"
      p={3}
      borderRadius={5}
    >
      <RHFTextField name="name" control={control} label="必須入力" />
      <RHFTextField name="nullableName" control={control} label="任意入力" />
      <RHFSelect
        name="selectedValue"
        label="必須選択"
        control={control}
        options={options}
      />
      <RHFSelect
        name="nullableSelectedValue"
        label="任意選択"
        control={control}
        options={options}
      />
      <Button type="submit" variant="outlined" sx={{ mt: 2, width: 200 }}>
        検索
      </Button>
    </Box>
  )
}

export default SampleForm

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
