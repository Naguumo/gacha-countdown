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

const redditResponseSchema = z.object({
  data: z.object({
    children: z.array(redditPostSchema),
  }),
});

export async function scrapeReddit(searchStr: string): Promise<ScrapeResults> {
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

  const data = validated.data.children.map((post) => ({
    title: post.data.title,
    description: post.data.selftext || post.data.title,
    author: post.data.author,
    url: post.data.url,
    thumbnail: post.data.thumbnail && post.data.thumbnail !== 'self' ? post.data.thumbnail : undefined,
    createdAt: new Date(post.data.created_utc * 1000).toISOString(),
    upvotes: post.data.ups || 0,
    comments: post.data.num_comments || 0,
    redditUrl: `https://reddit.com${post.data.url}` || post.data.url,
  }));

  return {
    source: 'Reddit - r/gachagaming',
    data,
  };
}
