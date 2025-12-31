import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { allGachaGamesQueryOptions } from '@/queries/gachaGames';
import { allGamePlatformsQueryOptions, type GamePlatform } from '@/queries/platforms';
import { allGameStatusesQueryOptions, type GameStatus } from '@/queries/statuses';
import { FilterGroup } from '../components/FilterGroup';
import { GameList } from '../components/GameList';
import { SearchBar } from '../components/SearchBar';

export const Route = createFileRoute('/')({
  component: Home,
});

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

  const filteredGames = gachaGames.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.some((p) => game.platforms.some((platform) => platform.id === p));
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some((s) => game.status.id === s);
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <header className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Gacha Games Countdown</h1>
          <p className='text-gray-600'>Discover upcoming and released gacha games</p>
        </header>

        <div className='mb-8'>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder='Search gacha games...' />
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          <aside className='lg:w-80 space-y-6'>
            <FilterGroup title='Platforms' options={platformOptions} selectedValues={selectedPlatforms} onChange={setSelectedPlatforms} />
            <FilterGroup title='Status' options={statusOptions} selectedValues={selectedStatuses} onChange={setSelectedStatuses} />
          </aside>

          <main className='flex-1'>
            <GameList games={filteredGames} />
          </main>
        </div>
      </div>
    </div>
  );
}
