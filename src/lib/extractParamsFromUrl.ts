import type { z } from 'zod';

export function extractParamsFromUrl<S extends z.ZodType>(urlRaw: string, schema: S): z.infer<S> {
  const url = new URL(urlRaw);
  const params: Record<string, unknown> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const parsed = schema.parse(params);
  return parsed;
}
