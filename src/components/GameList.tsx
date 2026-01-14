
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { GachaGameListing } from '@/queries/gachaGames';

export interface GameListProps {
  games: GachaGameListing[];
  loading?: boolean;
  className?: string;
}

export function GameList({ games, loading = false, className }: GameListProps) {
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
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
      <div className={cn('text-center py-16', className)}>
        <div className='max-w-md mx-auto'>
          <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center'>
            <svg className='w-12 h-12 text-muted-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
          <p className='text-muted-foreground text-xl font-medium mb-2'>No games found</p>
          <p className='text-muted-foreground/70'>Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {games.map((game) => (
        <Card
          key={game.id}
          className='overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-linear-to-br from-card to-card/50 backdrop-blur-sm group'>
          <CardContent className='p-0'>
            <div className='flex flex-col md:flex-row'>
              {game.imageUrl && (
                <div className='md:w-48 h-48 md:h-auto relative overflow-hidden'>
                  <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <img src={game.imageUrl} alt={game.title} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' />
                </div>
              )}
              <div className='flex-1 p-6'>
                <div className='flex items-start justify-between mb-3'>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300'>{game.title}</h3>
                    <p className='text-muted-foreground text-sm font-medium'>by {game.developer}</p>
                  </div>
                  <Badge
                    variant={game.status.id === 'released' ? 'default' : game.status.id === 'beta' ? 'secondary' : 'outline'}
                    className='shrink-0 ml-4 text-xs font-semibold px-3 py-1 rounded-full border-2'>
                    {game.status.label}
                  </Badge>
                </div>
                {game.description && <p className='text-sm mb-4 line-clamp-2 text-muted-foreground leading-relaxed'>{game.description}</p>}
                <div className='flex flex-wrap gap-2 mb-3'>
                  {game.platforms.map((platform) => (
                    <Badge key={platform.id} variant='secondary' className='text-xs font-medium px-2 py-1 bg-muted/50 hover:bg-muted/70 transition-colors'>
                      {platform.label}
                    </Badge>
                  ))}
                </div>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <svg className='w-4 h-4 mr-2 opacity-50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Release:{' '}
                  {new Date(game.releaseDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
