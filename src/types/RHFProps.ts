import { FieldValues, UseControllerProps } from "react-hook-form"

export type RHFProps<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'name' | 'control'
> & {
  label: string
}
