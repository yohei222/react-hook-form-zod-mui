import { z } from 'zod'

// zodのpreprocessを使って、値が空文字の場合はnullに変換する
const castToValOrNull = <T extends Parameters<typeof z.preprocess>[1]>(
  schema: T,
) =>
  z.preprocess((val) => {
    if (typeof val === 'string') {
      const trimmedVal = val.trim()
      return trimmedVal.length > 0 ? trimmedVal : null
    }
    return null
  }, schema)

// フォームのsubmit時に走るschema
export const sampleFormSchema = z.object({
  name: castToValOrNull(z.string()),
  nullableName: castToValOrNull(z.string().nullable()),
  selectedValue: castToValOrNull(z.string()),
  nullableSelectedValue: castToValOrNull(z.string().nullable()),
})

export type SampleFormSchema = z.infer<typeof sampleFormSchema>
