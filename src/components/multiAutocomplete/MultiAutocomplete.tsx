import { RefCallBack } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as OriginalMuiAutocompleteProps,
  TextField,
  TextFieldProps,
  Typography,
  Stack,
  Box,
} from '@mui/material'
import { RHFProps } from '../../types/RHFProps'

// mui関連以外の型のまとまり
export type BaseAutocompleteProps<TOptionValue = unknown> = {
  errorMessage?: string
  inputRef?: RefCallBack
  // onChangeはRHFのonChangeを利用したいため外部から渡す
  onChange?: (value: TOptionValue[] | undefined) => void
} & Pick<TextFieldProps, 'placeholder'> &
  Pick<RHFProps, 'label'>

// muiの型のまとまり
export type MuiAutocompleteProps<
  TOptionValue = unknown,
  TOptionExtra = unknown,
> = OriginalMuiAutocompleteProps<
  // ・ジェネリクスについて
  // 第一引数： Optionの型を渡す
  // * @param {Value} option The option to render.
  // 第二引数：multipleかtrueかどうか→trueを渡す
  {
    value: TOptionValue
    label: string
  } & TOptionExtra,
  true,
  false,
  false
>

// mui関連の型のまとまり
export type CustomMuiProps<
  TOptionValue = unknown,
  TOptionExtra = unknown,
> = Omit<
  MuiAutocompleteProps<TOptionValue, TOptionExtra>,
  // renderInput: このコンポーネント内で定義するため不要
  // onChange: RHFのonChangeをこのコンポーネントに渡すため不要
  // multiple: 複数選択前提のコンポーネントのため不要
  // value: valuesと命名して定義するためここではOmit
  'renderInput' | 'onChange' | 'multiple' | 'value'
> & {
  // 複数選択のため、valueは配列となる→配列として扱いやすくするためvalueをvaluesと命名して定義
  values: Pick<
    MuiAutocompleteProps<TOptionValue, TOptionExtra>,
    'value'
  >['value']
}

// mui関連 + その他の型を連結させた型
export type MultiAutocompleteProps<TValue, TOptionExtra> =
  BaseAutocompleteProps<TValue> & CustomMuiProps<TValue, TOptionExtra>

/* TValue: オプションの値の型
 * TOptionValue: オプションの追加情報の型(オプションの値以外の型) */
// RHFなしで単体で使用するためのコンポーネント
export const MultiAutocomplete = <TValue = unknown, TOptionExtra = unknown>({
  errorMessage,
  options,
  values,
  inputRef,
  placeholder = '選択してください',
  onChange,
  label,
  ...props
}: MultiAutocompleteProps<TValue, TOptionExtra>) => {
  return (
    <Box>
      <FormControl error={!!errorMessage}>
        <Stack direction="row" alignItems="center" m={2}>
          <Typography variant="body1" mr={2}>
            {label}:
          </Typography>
          <MuiAutocomplete
            {...props}
            multiple={true}
            disableCloseOnSelect={true}
            onChange={(_, selectedOptions) => {
              // optionのvalueのみを取り出す
              const values =
                selectedOptions?.map((option) => option.value) ?? []
              // values(valueの型の配列)をRHFで管理している値に渡す
              onChange?.(values)
            }}
            disablePortal
            options={options}
            // MUIのvalueは配列になる(OriginalMuiAutocompletePropsのジェネリクスの第二引数を配列にした為)
            // valuesがundefinedの場合は空の配列を渡す
            value={values ?? []}
            sx={{
              width: 300,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errorMessage}
                inputRef={inputRef}
                placeholder={placeholder}
              />
            )}
          />
          {!!errorMessage && (
            <FormHelperText>{errorMessage as string}</FormHelperText>
          )}
        </Stack>
      </FormControl>
    </Box>
  )
}
