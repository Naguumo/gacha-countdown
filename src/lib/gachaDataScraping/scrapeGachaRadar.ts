import { z } from 'zod';
import type { ScrapeResults } from './common';

const gachaRadarGameSchema = z.object({
  id: z.string(),
  title: z.string(),
  developer: z.string(),
  releaseDate: z.string().optional(),
  platforms: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
    })
  ),
  description: z.string().optional(),
  status: z.object({
    id: z.string(),
    label: z.string(),
  }),
});
type GachaRadarGame = z.infer<typeof gachaRadarGameSchema>;

async function extractGameCards(html: string): Promise<GachaRadarGame[]> {
  const games: GachaRadarGame[] = [];

  const cardMatches = Array.from(html.matchAll(/<div[^>]*class="[^"]*GachaCard_card[^"]*"[^>]*id="([^"]+)"[\s\S]*?<\/div>(?=<\/div><\/div><\/div>|$)/gi));
  cardMatches.forEach((cardMatch) => {
    const cardHtml = cardMatch[0];
    const cardId = cardMatch[1];

    const titleMatch = cardHtml.match(/<h2[^>]*class="[^"]*mantine-Title-root[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
    const developerMatch = cardHtml.match(/Developer<\/p>[\s\S]*?<p[^>]*class="[^"]*mantine-Text-root[^"]*"[^>]*>([^<]+)<\/p>/i);
    const statusBadgeMatch = cardHtml.match(
      /<div[^>]*class="[^"]*mantine-Badge-root[^"]*"[^>]*style="[^"]*--badge-bg:#9F3232[^"]*"[\s\S]*?<span[^>]*class="[^"]*mantine-Badge-label[^"]*"[\s\S]*?>([\s\S]*?)<\/span>/i
    );
    const platformBadgeMatch = cardHtml.match(
      /<div[^>]*class="[^"]*mantine-Badge-root[^"]*"[^>]*style="[^"]*--badge-bg:var\(--mantine-color-blue-filled\)[^"]*"[\s\S]*?<span[^>]*class="[^"]*mantine-Badge-label[^"]*"[\s\S]*?>([^<]+)<\/span>/i
    );
    const dateMatch = cardHtml.match(/<time[^>]*datetime="([^"]+)">/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : null;
    const developer = developerMatch ? developerMatch[1].trim() : null;
    const statusAndDate = statusBadgeMatch
      ? statusBadgeMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/\s*-\s*<time[^>]*><\/time>/i, '')
          .trim()
      : null;
    const platform = platformBadgeMatch ? platformBadgeMatch[1].trim() : null;
    const dateStr = dateMatch ? dateMatch[1] : null;

    if (!title || !developer) return;

    let releaseDate = dateStr;
    if (dateStr) {
      const dateObj = new Date(dateStr);
      if (!Number.isNaN(dateObj.getTime())) {
        releaseDate = dateObj.toISOString().split('T')[0];
      }
    }

    const platformList = platform ? [{ id: platform.toLowerCase().replace(/\s+/g, '-'), label: platform }] : [];

    const statusLower = (statusAndDate || 'upcoming').toLowerCase();
    let status = { id: 'upcoming', label: 'Upcoming' };
    if (statusLower.includes('releas')) {
      status = { id: 'released', label: 'Released' };
    } else if (statusLower.includes('beta') || statusLower.includes('test')) {
      status = { id: 'beta', label: 'Beta' };
    }

    games.push({
      id: cardId,
      title,
      developer,
      releaseDate: releaseDate ?? undefined,
      platforms: platformList,
      description: undefined,
      status,
    });
  });
  return games;
}

let simplestHTMLCache: string | undefined;

export async function scrapeGachaRadar(searchStr: string): Promise<ScrapeResults<GachaRadarGame[]>> {
  const baseUrl = 'https://www.gacharadar.com';
  const url = `${baseUrl}/upcoming-gachas`;

  console.log('[scrapeGachaRadar] Starting scrape for:', searchStr);

  console.log('[simplestHTMLCache]', simplestHTMLCache?.length);
  let html = simplestHTMLCache;
  if (!html) {
    const userAgent = 'GachaGamesBot/1.0';
    const response = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    console.log('[scrapeGachaRadar] Response status:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`GachaRadar returned ${response.status}: ${response.statusText}`);
    }

    html = await response.text();
    simplestHTMLCache = html;
  }
  const data = await extractGameCards(html);

  console.log('[scrapeGachaRadar] Total games extracted:', data.length);

  const searchLower = searchStr.toLowerCase();
  const filteredData = data.filter((game) => game.title.toLowerCase().includes(searchLower) || game.developer.toLowerCase().includes(searchLower));

  console.log('[scrapeGachaRadar] Games after filter:', filteredData.length);

  return {
    source: url,
    data: filteredData,
  };
}
