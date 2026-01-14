import { config } from '@dotenvx/dotenvx';
import z from 'zod';

const rawEnv = config({
  convention: 'nextjs',
  quiet: true,
});
if (!rawEnv.error) throw rawEnv.error;

const envValidationSchema = z.object({
  SUPABASE_URL: z.string(),
  ZAI_API_KEY: z.string(),
});

export const env = envValidationSchema.parse(process.env);
