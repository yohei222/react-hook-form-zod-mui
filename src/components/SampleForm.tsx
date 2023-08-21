import useSampleForm from '../hooks/useSampleForm'
import { Box, Button } from '@mui/material'
import RHFTextField from './RHFTextField'

const SampleForm = () => {
  const {
    form: { control, handleSubmit, onSubmit },
  } = useSampleForm()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: '1000px',
        margin: '30px auto',
      }}
    >
      <RHFTextField name="name" control={control} label="必須入力" />
      <RHFTextField name="nullableName" control={control} label="任意入力" />
      <Button type="submit" variant="outlined" sx={{ mt: 2, width: 200 }}>
        検索
      </Button>
    </Box>
  )
}

export default SampleForm
