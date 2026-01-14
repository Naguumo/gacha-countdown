import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useMediaBreakPoint } from '@/hooks/useMediaBreakpoint';
import { allGachaGamesQueryOptions, type GachaGameListing } from '@/queries/gachaGames';
import { allGamePlatformsQueryOptions, type GamePlatform } from '@/queries/platforms';
import { allGameStatusesQueryOptions, type GameStatus } from '@/queries/statuses';
import { FilterGroup } from '../components/FilterGroup';
import { GameList } from '../components/GameList';
import { SearchBar } from '../components/SearchBar';

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(allGamePlatformsQueryOptions());
    await context.queryClient.ensureQueryData(allGameStatusesQueryOptions());
    await context.queryClient.ensureQueryData(allGachaGamesQueryOptions());
  },
  component: Home,
});

const filterGames = (games: GachaGameListing[], search: string, selectedPlatforms: GamePlatform['id'][], selectedStatuses: GameStatus['id'][]) => {
  return games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.some((p) => game.platforms.some((platform) => platform.id === p));
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some((s) => game.status.id === s);
    return matchesSearch && matchesPlatform && matchesStatus;
  });
};

function Home() {
  const { data: platforms } = useSuspenseQuery(allGamePlatformsQueryOptions());
  const platformOptions = platforms.map((platform) => ({
    label: platform.label,
    value: platform.id,
  }));
  const { data: statuses } = useSuspenseQuery(allGameStatusesQueryOptions());
  const statusOptions = statuses.map((status) => ({
    label: status.label,
    value: status.id,
  }));
  const { data: gachaGames } = useSuspenseQuery(allGachaGamesQueryOptions());

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<GamePlatform['id'][]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<GameStatus['id'][]>([]);

  const filteredGames = filterGames(gachaGames, searchQuery, selectedPlatforms, selectedStatuses);

  const isMDBreakpoint = useMediaBreakPoint('md', true);

  return (
    <main className='grid grid-cols-1 md:grid-cols-[max-content_auto] grid-rows-[max-content_auto] gap-8' suppressHydrationWarning>
      <div className='md:order-2 space-y-2'>
        <div className='relative group'>
          <div className='absolute -inset-0.5 bg-linear-to-r from-primary/40 via-accent/40 to-primary/40 rounded-xl blur opacity-20 group-hover:opacity-40 transition-all duration-500'></div>
          <div className='relative'>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder='Search gacha games...' className='md:order-2' />
          </div>
        </div>
        <div className='flex items-center justify-between text-sm text-muted-foreground px-1'>
          <span>
            Found {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
          </span>
          {(selectedPlatforms.length > 0 || selectedStatuses.length > 0 || searchQuery) && (
            <button
              type='button'
              onClick={() => {
                setSearchQuery('');
                setSelectedPlatforms([]);
                setSelectedStatuses([]);
              }}
              className='text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline'>
              Clear all filters
            </button>
          )}
        </div>
      </div>
      <aside className='md:w-80 space-y-6 row-span-2'>
        <div className='sticky top-8 space-y-6'>
          <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4'>
            <div className='h-px bg-border flex-1'></div>
            <span className='px-2'>Filters</span>
            <div className='h-px bg-border flex-1'></div>
          </div>
          <FilterGroup
            title='Platforms'
            options={platformOptions}
            selectedValues={selectedPlatforms}
            onChange={setSelectedPlatforms}
            initiallyOpen={isMDBreakpoint}
            key={`platforms-${isMDBreakpoint}`}
          />
          <FilterGroup
            title='Status'
            options={statusOptions}
            selectedValues={selectedStatuses}
            onChange={setSelectedStatuses}
            initiallyOpen={isMDBreakpoint}
            key={`status-${isMDBreakpoint}`}
          />
        </div>
      </aside>
      <GameList games={filteredGames} className='md:order-3' />
    </main>
  );
}
