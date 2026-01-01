import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

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

        await gatherGachaData(params.gacha);
        return new Response('Gacha data scraped successfully!', {
          status: 200,
        });
      },
    },
  },
});

const paramsSchema = z.object({
  gacha: z.string(),
});

function extractParamsFromUrl<S extends z.ZodType>(urlRaw: string, schema: S): z.infer<S> {
  const url = new URL(urlRaw);
  const params: Record<string, unknown> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const parsed = schema.parse(params);
  return parsed;
}

async function gatherGachaData(searchStr: string) {
  throw new Error('Function not implemented.');
}
