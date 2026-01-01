import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { gamePlatformSchema } from './platforms';
import { gameStatusSchema } from './statuses';

const gachaGameListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  developer: z.string(),
  releaseDate: z.string(),
  platforms: z.array(gamePlatformSchema),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  status: gameStatusSchema,
});
export type GachaGameListing = z.infer<typeof gachaGameListingSchema>;

const mockGames: GachaGameListing[] = [
  {
    id: 'dragon-traveler',
    title: 'Dragon Traveler',
    developer: 'HongKong GameTree LIMITED',
    releaseDate: '2025-01-15',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fdragon-traveler.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Fantasy adventure RPG with dragon companions and strategic combat.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'arknights-endfield',
    title: 'Arknights Endfield',
    developer: 'Hypergryph',
    releaseDate: '2025-02-28',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
      { id: 'Console', label: 'Console', gameCount: 3 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Farknights-endfield.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Strategic RPG from the creators of Arknights with enhanced combat mechanics.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'seven-deadly-sins-origin',
    title: 'The Seven Deadly Sins: Origin',
    developer: 'Netmarble',
    releaseDate: '2025-03-20',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fthe-seven-deadly-sins-origin.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Epic RPG based on the popular anime series with gacha mechanics.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'mongil-star-dive',
    title: 'MONGIL: Star Dive',
    developer: 'Netmarble Monster Inc',
    releaseDate: '2025-04-10',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fmongil-star-dive.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Space-themed gacha with unique character collection and battle system.',
    status: { id: 'beta', label: 'Beta', gameCount: 1 },
  },
  {
    id: 'stoneage-pet-world',
    title: 'StoneAge: Pet World',
    developer: 'Netmarble',
    releaseDate: '2025-05-01',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fstone-age-pet-world.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Prehistoric pet collection game with RPG elements.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'azur-promilia',
    title: 'Azur Promilia',
    developer: 'Manjuu',
    releaseDate: '2025-06-15',
    platforms: [
      { id: 'PC', label: 'PC', gameCount: 7 },
      { id: 'Console', label: 'Console', gameCount: 3 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fazur-promilia.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Naval combat gacha from the creators of Azur Lane.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'neverness-to-everness',
    title: 'Neverness to Everness',
    developer: 'Hotta Studio',
    releaseDate: '2025-07-20',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
      { id: 'Console', label: 'Console', gameCount: 3 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fneverness-to-everness.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Urban fantasy RPG with stylish combat and character collection.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'petit-planet',
    title: 'Petit Planet',
    developer: 'miHoYo',
    releaseDate: '2025-08-10',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fpetit-planet.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Cute planet management game with gacha characters from miHoYo.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'solo-leveling-karma',
    title: 'Solo Leveling: KARMA',
    developer: 'Netmarble',
    releaseDate: '2025-09-05',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fsolo-leveling-karma.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Action RPG based on the popular Solo Leveling webtoon series.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
  {
    id: 'suikoden-star-leap',
    title: 'Suikoden STAR LEAP',
    developer: 'Mythril',
    releaseDate: '2025-10-15',
    platforms: [
      { id: 'iOS', label: 'iOS', gameCount: 7 },
      { id: 'Android', label: 'Android', gameCount: 7 },
      { id: 'PC', label: 'PC', gameCount: 7 },
    ],
    imageUrl: 'https://gacharadar.com/_next/image?url=%2Fimages%2Fsuikoden-star-leap.webp%3Fv%3D2025-09-30-001&w=300&q=75',
    description: 'Modern take on the classic Suikoden series with 108 collectible characters.',
    status: { id: 'upcoming', label: 'Upcoming', gameCount: 9 },
  },
];

export const fetchGachaGames = async (): Promise<GachaGameListing[]> => {
  const parsed = z.array(gachaGameListingSchema).parse(mockGames);
  return parsed.toSorted((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));
};

export const allGachaGamesQueryOptions = () =>
  queryOptions({
    queryKey: ['gachaGames'],
    queryFn: fetchGachaGames,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
