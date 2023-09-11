import { FieldValues, useController } from 'react-hook-form'
import {
  BaseAutocompleteProps,
  CustomMuiProps,
  MultiAutocomplete,
} from './MultiAutocomplete'
import { RHFProps } from '../../types/RHFProps'
import { useMemo } from 'react'

export type RHFMultiAutocomplete<
  T extends FieldValues,
  TValue = unknown,
  TOptionExtra = unknown,
> =
  // RHFProps: RHFの型のまとまり
  RHFProps<T> &
    // BaseAutocompleteProps: mui関連以外の型のまとまり
    // errorMessageはuseControllerから受け取るためOmitします
    Omit<BaseAutocompleteProps<TValue>, 'errorMessage'> &
    // CustomMuiProps: mui関連の型のまとまり
    Pick<
      CustomMuiProps<TValue, TOptionExtra>,
      | 'options'
      | 'renderOption'
      | 'sx'
      | 'getOptionLabel'
      | 'isOptionEqualToValue'
      | 'filterOptions'
      | 'noOptionsText'
      | 'disabled'
    >

/**
 * MUI based Autocomplete
 *
 * */

export const RHFMultiAutocomplete = <
  T extends FieldValues,
  // オプションの値の型
  TValue = unknown,
  // オプションの追加情報の型(オプションの値以外の型)
  TOptionExtra = unknown,
>({
  name,
  control,
  options,
  ...props
}: RHFMultiAutocomplete<T, TValue, TOptionExtra>) => {
  const {
    // 複数選択フォームのためuseControllerの返り値のvalueは配列となるため、valuesと再命名しています
    field: { ref, value: values, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  const errorMessage = errors?.[name]?.message as string

  // valuesの値を元に、選択されているオプションを抽出
  const selectedOptions = useMemo(
    () => options.filter((option) => values?.includes(option.value)),
    [options, values],
  )

  return (
    <MultiAutocomplete
      {...props}
      {...rest}
      options={options}
      // 現在選択されているオプションのみをvaluesに渡す
      values={selectedOptions}
      inputRef={ref}
      errorMessage={errorMessage}
    />
  )
}
