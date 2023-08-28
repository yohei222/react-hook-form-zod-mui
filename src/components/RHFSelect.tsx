import { FieldValues, useController } from 'react-hook-form'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { RHFProps } from '../types/RHFProps'

export type SelectOptions = Readonly<{ value: string; label: string }[]>

const RHFSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: RHFProps<T> & {
  options: SelectOptions
}) => {
  const {
    field: { value, ref, ...rest },
    formState: { errors },
  } = useController({ name, control })

  const errorMessage = errors?.[name]?.message as string

  return (
    <Stack direction="row" alignItems="center" m={2}>
      <Typography variant="body1" mr={2}>
        {label}:
      </Typography>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          // 値がundefinedの場合は空文字に変換する
          value={value ?? ''}
          inputRef={ref}
          {...rest}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option, i) => (
            <MenuItem key={`${option.value}-${i}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorMessage && (
        <Typography variant="body1" ml={3} color="red">
          {errorMessage}
        </Typography>
      )}
    </Stack>
  )
}

export default RHFSelect
