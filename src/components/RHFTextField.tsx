// 参考: https://react-hook-form.com/docs/usecontroller

import { Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

type Props<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'name' | 'control'
> & {
  label: string
}

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  label,
}: Props<T>) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control })

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor={'#ffcdd2'}
      p={2}
      my={3}
      borderRadius={2}
    >
      <Typography variant="body1" mr={2}>
        {label}:
      </Typography>
      <TextField
        name={field.name} // send down the input name
        value={field.value ?? ''} // input value
        onChange={field.onChange} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
      />
      {errors.name?.message && (
        <Typography variant="body1" ml={3}>
          {errors[name]?.message as string}
        </Typography>
      )}
    </Stack>
  )
}

export default RHFTextField
