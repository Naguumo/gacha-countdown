import z from 'zod';
import type { ScrapeResults } from './common';

const redditPostSchema = z.object({
  data: z.object({
    name: z.string(),
    title: z.string(),
    selftext: z.string().nullish(),
    selftext_html: z.string().nullish(),
    author: z.string(),
    created_utc: z.number(),
    url: z.string(),
    thumbnail: z.string(),
    num_comments: z.number(),
    ups: z.number(),
    downs: z.number(),
    permalink: z.string(),
    media: z.unknown(),
  }),
});
type RedditPost = z.infer<typeof redditPostSchema>['data'];

const redditResponseSchema = z.object({
  data: z.object({
    children: z.array(redditPostSchema),
  }),
});

export async function scrapeReddit(searchStr: string): Promise<ScrapeResults<RedditPost[]>> {
  const userAgent = 'GachaGamesBot/1.0';
  const searchUrl = `https://www.reddit.com/r/gachagaming/search.json?q=${encodeURIComponent(searchStr)}&restrict_sr=1&sort=new&limit=10`;

  const response = await fetch(searchUrl, {
    headers: {
      'User-Agent': userAgent,
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit API returned ${response.status}: ${response.statusText}`);
  }

  const rawJson = await response.json();
  const validated = redditResponseSchema.parse(rawJson);

  const data = validated.data.children.map((post) => post.data);

  return {
    source: 'Reddit - r/gachagaming',
    data,
  };
}
