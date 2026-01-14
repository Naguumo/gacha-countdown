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
      <div className={cn('space-y-6', className)}>
        {[...Array(3)].map((_, i) => (
          <Card key={`skeleton-${Date.now()}-${i}`} className='overflow-hidden border-0 bg-linear-to-br from-card to-card/50 backdrop-blur-sm animate-pulse'>
            <CardContent className='p-0'>
              <div className='flex flex-col md:flex-row'>
                <div className='md:w-48 h-48 md:h-auto bg-muted/30 rounded animate-pulse'></div>
                <div className='flex-1 p-4 space-y-3'>
                  <div className='h-6 bg-muted/30 rounded w-3/4 animate-pulse' style={{ animationDelay: '0.1s' }}></div>
                  <div className='h-4 bg-muted/20 rounded w-1/2 animate-pulse' style={{ animationDelay: '0.2s' }}></div>
                  <div className='h-4 bg-muted/20 rounded w-full animate-pulse' style={{ animationDelay: '0.3s' }}></div>
                  <div className='h-4 bg-muted/20 rounded w-2/3 animate-pulse' style={{ animationDelay: '0.4s' }}></div>
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
      <div className={cn('text-center py-12', className)}>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center transition-transform duration-300 hover:scale-105'>
            <svg className='w-10 h-10 text-muted-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
          <p className='text-muted-foreground text-lg font-medium mb-1'>No games found</p>
          <p className='text-muted-foreground/60 text-sm'>Try adjusting your filters or search terms</p>
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
              <div className='flex-1 p-4'>
                <div className='flex items-start justify-between mb-2'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300'>{game.title}</h3>
                    <p className='text-muted-foreground text-sm font-medium'>by {game.developer}</p>
                  </div>
                  <Badge
                    variant={game.status.id === 'released' ? 'default' : game.status.id === 'beta' ? 'secondary' : 'outline'}
                    className='shrink-0 ml-3 text-xs font-semibold px-2 py-1 rounded-full border-2'>
                    {game.status.label}
                  </Badge>
                </div>
                {game.description && <p className='text-sm mb-3 line-clamp-2 text-muted-foreground/80 leading-relaxed'>{game.description}</p>}
                <div className='flex flex-wrap gap-1.5 mb-3'>
                  {game.platforms.map((platform) => (
                    <Badge key={platform.id} variant='secondary' className='text-xs font-medium px-2 py-0.5 bg-muted/30 hover:bg-muted/50 transition-colors'>
                      {platform.label}
                    </Badge>
                  ))}
                </div>
                <div className='flex items-center text-sm text-muted-foreground/70'>
                  <svg className='w-4 h-4 mr-1.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
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
