import { z } from 'zod'
import { fallback } from './fallback'

// zodのpreprocessを使って、値が空文字の場合はnullに変換する
const castToValOrNull = <T extends Parameters<typeof z.preprocess>[1]>(
  schema: T,
) =>
  z.preprocess((val) => {
    if (typeof val === 'string') {
      const trimmedVal = val.trim()
      return trimmedVal.length > 0 ? trimmedVal : null
    }
    if (typeof val === 'number') {
      return val
    }
    return null
  }, schema)

// フォームのsubmit時に走るschema
export const sampleFormStrictSchema = z.object({
  name: castToValOrNull(z.string().nonempty()),
  nullableName: castToValOrNull(z.string().nullable()),
  selectedValue: castToValOrNull(z.number().nullable()),
  nullableSelectedValue: castToValOrNull(z.number().nullable()),
})

// parseしても失敗しないスキーマ：デフォルト値の作成に用いる
// 値が存在する必要のあるフィールド(parseに失敗するフィールド)のみfallbackを実装する
export const sampleFormSafeSchema = sampleFormStrictSchema.extend({
  name: sampleFormStrictSchema.shape.name.or(fallback(null)),
  selectedValue: sampleFormStrictSchema.shape.nullableName.or(fallback(null)),
})

export type SampleFormStrictSchema = z.infer<typeof sampleFormStrictSchema>
export type SampleFormSafeSchema = z.infer<typeof sampleFormSafeSchema>
