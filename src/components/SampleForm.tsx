import useSampleForm from '../hooks/useSampleForm'
import { Box, Button } from '@mui/material'
import RHFTextField from './RHFTextField'
import RHFSelect from './RHFSelect'

const SampleForm = () => {
  const {
    form: { control, handleSubmit, onSubmit },
  } = useSampleForm()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width={'1000px'}
      margin={'50px auto'}
      bgcolor="#E5E5E5"
      p={3}
      borderRadius={5}
    >
      <RHFTextField name="name" control={control} label="必須入力" />
      <RHFTextField name="nullableName" control={control} label="任意入力" />
      <RHFSelect name="selectedValue" control={control} label="必須選択" />
      <RHFSelect
        name="nullableSelectedValue"
        control={control}
        label="任意選択"
      />
      <Button type="submit" variant="outlined" sx={{ mt: 2, width: 200 }}>
        検索
      </Button>
    </Box>
  )
}

export default SampleForm
