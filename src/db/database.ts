import { createServerOnlyFn } from '@tanstack/react-start';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/lib/env';

const setupDatabase = createServerOnlyFn(() => {
  const connectionString = env.SUPABASE_URL;
  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(connectionString, { prepare: false });
  return drizzle({
    client,
  });
});

export const db = setupDatabase();
