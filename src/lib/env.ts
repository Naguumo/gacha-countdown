import { config } from '@dotenvx/dotenvx';
import z from 'zod';

const envValidationSchema = z.object({
  SUPABASE_URL: z.string(),
  ZAI_API_KEY: z.string(),
});

const getEnv = () => {
  if (typeof window !== 'undefined') {
    throw new Error('ENV should only be initialized on the server side.');
  }

  const rawEnv = config({
    convention: 'nextjs',
    quiet: true,
  });
  if (!rawEnv.error) throw rawEnv.error;

  return envValidationSchema.parse(process.env);
};

export const env = getEnv();
