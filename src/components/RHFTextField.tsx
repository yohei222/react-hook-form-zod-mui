// 参考: https://react-hook-form.com/docs/usecontroller

import { Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FieldValues, useController } from 'react-hook-form'
import { RHFProps } from '../types/RHFProps'

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  label,
}: RHFProps<T>) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control })

  const errorMessage = errors?.[name]?.message as string

  return (
    <Stack direction="row" alignItems="center" m={2}>
      <Typography variant="body1" mr={2}>
        {label}:
      </Typography>
      <TextField
        name={field.name} // send down the input name
        // 値がnullの場合は空文字に変換する
        value={field.value ?? ''} // input value
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
      />
      {errorMessage && (
        <Typography variant="body1" ml={3} color="red">
          {errorMessage}
        </Typography>
      )}
    </Stack>
  )
}

export default RHFTextField
