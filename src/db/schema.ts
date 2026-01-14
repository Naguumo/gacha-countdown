import * as p from 'drizzle-orm/pg-core';

export const profilesTable = p.pgTable.withRLS('profiles', {
  id: p
    .uuid('id')
    .primaryKey()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

// DO NOT CHANGE THIS TABLE, IT IS MANAGED BY SUPABASE AUTH
const authSchema = p.pgSchema('auth').existing();
export const usersTable = authSchema.table('users', {
  id: p.uuid('id').primaryKey().notNull(),
});
