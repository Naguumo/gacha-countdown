import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { env } from '@/lib/env';
import { extractParamsFromUrl } from '@/lib/extractParamsFromUrl';
import type { ScrapeResults } from '@/lib/gachaDataScraping/common';
import { scrapeGachaRadar } from '@/lib/gachaDataScraping/scrapeGachaRadar';
import { scrapeReddit } from '@/lib/gachaDataScraping/scrapeReddit';

const paramsSchema = z.object({
  gacha: z.string(),
});

export const Route = createFileRoute('/api/scrape-gacha')({
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

let tempCache: (ScrapeResults<unknown> | { error: unknown })[] | undefined;

async function gatherGachaData(searchStr: string) {
  let allData = tempCache;
  if (!allData) {
    const scrapePromises = [scrapeReddit(searchStr), scrapeGachaRadar(searchStr)];

    const results = await Promise.allSettled(scrapePromises);

    allData = results.map((result) => {
      if (result.status === 'fulfilled') {
        return {
          source: result.value.source,
          data: result.value.data,
        } as ScrapeResults<unknown>;
      }
      return {
        error: result.reason,
      };
    });
  }

  const aiData = await resolveDataWithAI(allData.filter((v): v is ScrapeResults => 'data' in v));
  allData.push(aiData);

  return allData;
}

const aiResponseSchema = z.object({
  choices: z.array(
    z.object({
      finish_reason: z.string(),
      message: z.object({
        content: z.string(),
        reasoning_content: z.string().optional(),
      }),
    })
  ),
});

async function resolveDataWithAI(scrapedData: ScrapeResults[]): Promise<ScrapeResults<unknown>> {
  const result = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en-US,en',
      Authorization: `Bearer ${env.ZAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'GLM-4.6V-Flash',
      messages: [
        {
          role: 'system',
          content: `          You are an expert data aggregator. You receive data from multiple sources about new gacha games. Your task is to analyze the data, resolve any conflicts, and produce a single, coherent summary of the upcoming gacha. The summary should be in the format:
          {
               title: string;
               developer: string;
               release: string;
               platforms: string[];
               status: string;
               imageUrl?: string | undefined;
               description?: string | undefined;
           }`,
        },
        {
          role: 'user',
          content: `Here is the data collected from various sources about a gacha banner:\n\n${JSON.stringify(scrapedData, null, 2)}\n\nPlease analyze this data, resolve any discrepancies, and provide a unified summary of the gacha banner information.`,
        },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  const parsed = aiResponseSchema.parse(await result.json());
  console.log('[AI Response]', JSON.stringify(parsed, null, 2));
  const generatedContent = parsed.choices.find((v) => v.finish_reason === 'stop')?.message.content;
  const data = generatedContent ? JSON.parse(generatedContent) : null;

  return {
    source: 'AI Generated',
    data,
  };
}
