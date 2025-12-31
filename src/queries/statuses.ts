import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

export const gameStatusSchema = z.object({
  id: z.string(),
  label: z.string(),
  gameCount: z.number().min(0),
});
export type GameStatus = z.infer<typeof gameStatusSchema>;

const getAllGameStatuses = (): GameStatus[] => {
  const mockStatuses = [
    { label: 'Upcoming', id: 'upcoming', gameCount: 9 },
    { label: 'Beta', id: 'beta', gameCount: 1 },
    { label: 'Released', id: 'released', gameCount: 0 },
  ];
  return z.array(gameStatusSchema).parse(mockStatuses);
};

export const allGameStatusesQueryOptions = () =>
  queryOptions({
    queryKey: ['statuses'],
    queryFn: async () => getAllGameStatuses(),
  });
