import * as p from 'drizzle-orm/pg-core';

export const profilesTable = p.pgTable.withRLS('profiles', {
  id: p
    .uuid('id')
    .primaryKey()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const gameStatusEnum = p.pgEnum('game_status', ['upcoming', 'beta', 'released', 'end_of_service']);
export const gamePlatformEnum = p.pgEnum('game_platform', ['ios', 'android', 'pc', 'console']);
export const gachaGamesTable = p.pgTable.withRLS('gacha_games', {
  id: p.uuid('id').primaryKey().notNull().defaultRandom(),
  title: p.text('title').notNull(),
  description: p.text('description').notNull(),
  developer: p.text('developer').notNull(),
  release: p.text('release').notNull(),
  imageUrl: p.text('image_url'),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  status: gameStatusEnum('status').notNull().default('upcoming'),
  platforms: gamePlatformEnum('platforms').array().notNull().default([]),
});

// DO NOT CHANGE THIS TABLE, IT IS MANAGED BY SUPABASE AUTH
const authSchema = p.pgSchema('auth').existing();
export const usersTable = authSchema.table('users', {
  id: p.uuid('id').primaryKey().notNull(),
});
