import { clsx } from 'clsx';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
          <Card key={`skeleton-${Date.now()}-${i}`} className='p-6 animate-pulse'>
            <CardContent className='p-0'>
              <div className='flex flex-col md:flex-row'>
                <div className='md:w-48 h-48 md:h-auto bg-muted rounded'></div>
                <div className='flex-1 p-6 space-y-3'>
                  <div className='h-6 bg-muted rounded w-3/4'></div>
                  <div className='h-4 bg-muted rounded w-1/2'></div>
                  <div className='h-4 bg-muted rounded w-full'></div>
                  <div className='h-4 bg-muted rounded w-2/3'></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className={clsx('text-center py-12', className)}>
        <p className='text-muted-foreground text-lg'>No games found</p>
        <p className='text-muted-foreground/70 mt-2'>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {games.map((game) => (
        <Card key={game.id} className='overflow-hidden hover:shadow-md transition-shadow duration-200'>
          <CardContent className='p-0'>
            <div className='flex flex-col md:flex-row'>
              {game.imageUrl && (
                <div className='md:w-48 h-48 md:h-auto'>
                  <img src={game.imageUrl} alt={game.title} className='w-full h-full object-cover' />
                </div>
              )}
              <div className='flex-1 p-6'>
                <div className='flex items-start justify-between mb-2'>
                  <h3 className='text-xl font-bold'>{game.title}</h3>
                  <Badge variant={game.status.id === 'released' ? 'default' : game.status.id === 'beta' ? 'secondary' : 'outline'}>{game.status.label}</Badge>
                </div>
                <p className='text-muted-foreground mb-2'>by {game.developer}</p>
                {game.description && <p className='text-sm mb-4 line-clamp-2'>{game.description}</p>}
                <div className='flex flex-wrap gap-2 mb-3'>
                  {game.platforms.map((platform) => (
                    <Badge key={platform.id} variant='secondary' className='text-xs'>
                      {platform.label}
                    </Badge>
                  ))}
                </div>
                <p className='text-sm text-muted-foreground'>Release: {new Date(game.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
