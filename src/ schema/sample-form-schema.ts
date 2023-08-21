import { z } from 'zod'
import { fallback } from './fallback'

const castToStringOrNull = <T extends Parameters<typeof z.preprocess>[1]>(
  schema: T,
) =>
  z.preprocess((val) => {
    if (typeof val === 'string') {
      const trimmedVal = val.trim()
      return trimmedVal.length > 0 ? trimmedVal : null
    }
    return null
  }, schema)

export const sampleFormStrictSchema = z.object({
  name: castToStringOrNull(z.string().nonempty()),
  nullableName: castToStringOrNull(z.string().nullable()),
})

export const sampleFormSafeSchema = z.object({
  name: sampleFormStrictSchema.shape.name.or(fallback(null)),
  nullableName: sampleFormStrictSchema.shape.nullableName.or(fallback(null)),
})

export type SampleFormStrictSchema = z.infer<typeof sampleFormStrictSchema>
export type SampleFormSafeSchema = z.infer<typeof sampleFormSafeSchema>
