import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

export const gamePlatformSchema = z.object({
  id: z.string(),
  label: z.string(),
  gameCount: z.number().min(0),
});
export type GamePlatform = z.infer<typeof gamePlatformSchema>;

const getAllGamePlatforms = (): GamePlatform[] => {
  const mockPlatforms: GamePlatform[] = [
    { label: 'iOS', id: 'iOS', gameCount: 7 },
    { label: 'Android', id: 'Android', gameCount: 7 },
    { label: 'PC', id: 'PC', gameCount: 7 },
    { label: 'Console', id: 'Console', gameCount: 3 },
  ];
  return z.array(gamePlatformSchema).parse(mockPlatforms);
};

export const allGamePlatformsQueryOptions = () =>
  queryOptions({
    queryKey: ['platforms'],
    queryFn: () => getAllGamePlatforms(),
  });
