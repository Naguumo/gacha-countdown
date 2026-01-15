import z from 'zod';

export const gamePlatformSchema = z.enum(['ios', 'android', 'pc', 'console']);
export type GamePlatform = z.infer<typeof gamePlatformSchema>;

export const gameStatusSchema = z.enum(['upcoming', 'beta', 'released', 'end_of_service']);
export type GameStatus = z.infer<typeof gameStatusSchema>;

export const gachaGameListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  developer: z.string(),
  release: z.string(),
  platforms: z.array(gamePlatformSchema),
  imageUrl: z.string().nullable(),
  description: z.string().nullable(),
  status: gameStatusSchema,
});
export type GachaGameListing = z.infer<typeof gachaGameListingSchema>;

export const gachaGameDetailSchema = gachaGameListingSchema.extend({});
export type GachaGameDetail = z.infer<typeof gachaGameDetailSchema>;
