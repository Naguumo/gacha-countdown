import { clsx } from 'clsx';
import type { GachaGameListing } from '@/queries/gachaGames';

export interface GameListProps {
  games: GachaGameListing[];
  loading?: boolean;
  className?: string;
}

export function GameList({ games, loading = false, className }: GameListProps) {
  if (loading) {
    return (
      <div className={clsx('space-y-4', className)}>
        {[...Array(3)].map((_, i) => (
          <div key={`skeleton-${Date.now()}-${i}`} className='bg-white rounded-lg shadow-md p-6 animate-pulse'>
            <div className='flex flex-col md:flex-row'>
              <div className='md:w-48 h-48 md:h-auto bg-gray-200 rounded'></div>
              <div className='flex-1 p-6 space-y-3'>
                <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-2/3'></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className='text-gray-500 text-lg'>No games found</p>
        <p className='text-gray-400 mt-2'>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {games.map((game) => (
        <div key={game.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'>
          <div className='flex flex-col md:flex-row'>
            {game.imageUrl && (
              <div className='md:w-48 h-48 md:h-auto'>
                <img src={game.imageUrl} alt={game.title} className='w-full h-full object-cover' />
              </div>
            )}
            <div className='flex-1 p-6'>
              <div className='flex items-start justify-between mb-2'>
                <h3 className='text-xl font-bold text-gray-900'>{game.title}</h3>
                <span
                  className={clsx(
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    game.status.id === 'upcoming' && 'bg-blue-100 text-blue-800',
                    game.status.id === 'released' && 'bg-green-100 text-green-800',
                    game.status.id === 'beta' && 'bg-yellow-100 text-yellow-800'
                  )}>
                  {game.status.label}
                </span>
              </div>
              <p className='text-gray-600 mb-2'>by {game.developer}</p>
              {game.description && <p className='text-gray-700 mb-4 line-clamp-2'>{game.description}</p>}
              <div className='flex flex-wrap gap-2 mb-3'>
                {game.platforms.map((platform) => (
                  <span key={platform.id} className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>
                    {platform.label}
                  </span>
                ))}
              </div>
              <p className='text-sm text-gray-500'>Release: {new Date(game.releaseDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
