import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { fetchClient } from '@/lib/fetchClient';
import { type GachaGameDetail, type GachaGameListing, gachaGameDetailSchema, gachaGameListingSchema } from '@/schemas/gachaGames';

export const fetchGachaGames = async (): Promise<GachaGameListing[]> => {
  const response = await fetchClient('/api/gacha-games', {
    method: 'GET',
    schema: z.array(gachaGameListingSchema),
  });
  return response.toSorted((a, b) => Date.parse(b.release) - Date.parse(a.release));
};

export const allGachaGamesQueryOptions = () =>
  queryOptions({
    queryKey: ['gacha-games'],
    queryFn: fetchGachaGames,
  });

export const fetchGachaGameDetail = async (gameId: string): Promise<GachaGameDetail> => {
  const response = await fetchClient(`/api/gacha-games/${gameId}`, {
    method: 'GET',
    schema: gachaGameDetailSchema,
  });
  return response;
};

export const gachaGameDetailQueryOptions = (gameId: string) =>
  queryOptions({
    queryKey: ['gachaGameDetail', gameId],
    queryFn: () => fetchGachaGameDetail(gameId),
  });
