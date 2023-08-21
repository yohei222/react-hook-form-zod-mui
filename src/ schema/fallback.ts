import { z } from "zod"

/**
 * Create a schema matches anything and returns a value. Use it with `or`:
 *
 * @see https://github.com/colinhacks/zod/issues/316#issuecomment-850906479
 *
 * const schema = zod.number();
 * const tolerant = schema.or(fallback(-1));
 *
 * schema.parse('foo')      // => ZodError
 * tolerant.parse('foo')    // -1
 */
export function fallback<T = null>(value: T) {
  return z.any().transform(() => value)
}
