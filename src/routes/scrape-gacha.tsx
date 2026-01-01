import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { extractParamsFromUrl } from '@/lib/extractParamsFromUrl';
import { scrapeGachaRadar } from '@/lib/gachaDataScraping/scrapeGachaRadar';
import { scrapeReddit } from '@/lib/gachaDataScraping/scrapeReddit';

const paramsSchema = z.object({
  gacha: z.string(),
});

export const Route = createFileRoute('/scrape-gacha')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        let params: z.Infer<typeof paramsSchema>;
        try {
          params = extractParamsFromUrl(request.url, paramsSchema);
        } catch (e) {
          if (e instanceof z.ZodError) {
            const msg = z.prettifyError(e);
            return new Response(msg, {
              status: 400,
            });
          }
          return new Response('Internal Server Error', {
            status: 500,
          });
        }

        try {
          const data = await gatherGachaData(params.gacha);
          return new Response(JSON.stringify(data, null, 2), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (e) {
          if (e instanceof z.ZodError) {
            const msg = z.prettifyError(e);
            return new Response(msg, {
              status: 500,
            });
          }
          return new Response('Internal Server Error', {
            status: 500,
          });
        }
      },
    },
  },
});

async function gatherGachaData(searchStr: string) {
  const scrapePromises = [
    // scrapeReddit(searchStr),
    scrapeGachaRadar(searchStr),
  ];

  const results = await Promise.allSettled(scrapePromises);

  const allData = results.map((result) => {
    if (result.status === 'fulfilled') {
      return {
        source: result.value.source,
        data: result.value.data,
      };
    }
    return {
      error: result.reason,
    };
  });

  return allData;
}
