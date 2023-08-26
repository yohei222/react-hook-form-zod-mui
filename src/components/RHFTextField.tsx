// useController: https://react-hook-form.com/docs/usecontroller
import { Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FieldValues, useController } from 'react-hook-form'
import { RHFProps } from '../types/RHFProps'

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  label,
}: RHFProps<T>) => {
  // 入力フォームを共通化したいので、RHFのControllerの代わりにuseControllerを使用しています
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
        // 値がundefinedの場合は空文字に変換する
        value={field.value ?? ''}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
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
