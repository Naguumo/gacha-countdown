import { createFileRoute } from '@tanstack/react-router';
import { db } from '@/db/database';
import { gachaGamesTable } from '@/db/schema';
import type { GachaGameListing } from '@/schemas/gachaGames';

export const Route = createFileRoute('/api/gacha-games/')({
  server: {
    handlers: {
      GET: async () => {
        const dbResponse: GachaGameListing[] = await db
          .select({
            id: gachaGamesTable.id,
            title: gachaGamesTable.title,
            developer: gachaGamesTable.developer,
            release: gachaGamesTable.release,
            platforms: gachaGamesTable.platforms,
            imageUrl: gachaGamesTable.imageUrl,
            description: gachaGamesTable.description,
            status: gachaGamesTable.status,
          })
          .from(gachaGamesTable);

        return new Response(JSON.stringify(dbResponse), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
    },
  },
});
