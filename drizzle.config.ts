import { defineConfig } from 'drizzle-kit';
import { env } from '@/lib/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials: {
    url: env.SUPABASE_URL,
  },
  entities: {
    roles: {
      provider: 'supabase',
    },
  },
  casing: 'snake_case',
  introspect: {
    casing: 'camel',
  },
  strict: false,
});
