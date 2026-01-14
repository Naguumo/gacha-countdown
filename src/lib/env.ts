import { config } from '@dotenvx/dotenvx';
import z from 'zod';

const envValidationSchema = z.object({
  SUPABASE_URL: z.string(),
  ZAI_API_KEY: z.string(),
});

const getEnv = () => {
  const rawEnv = config({
    convention: 'nextjs',
    quiet: true,
  });
  if (!rawEnv.error) throw rawEnv.error;

  return envValidationSchema.parse(process.env);
};

export const env = getEnv();
