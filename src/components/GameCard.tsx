import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface GameCardProps {
  title: string;
  developer: string;
  releaseDate: string;
  platforms: string[];
  imageUrl?: string;
  description?: string;
  status?: 'upcoming' | 'released' | 'beta';
  className?: string;
}

export function GameCard({ title, developer, releaseDate, platforms, imageUrl, description, status = 'upcoming', className }: GameCardProps) {
  return (
    <Card className={cn('overflow-hidden hover:shadow-md transition-shadow duration-200', className)}>
      <div className='flex flex-col md:flex-row'>
        {imageUrl && (
          <div className='md:w-48 h-48 md:h-auto'>
            <img src={imageUrl} alt={title} className='w-full h-full object-cover' />
          </div>
        )}
        <CardContent className='flex-1 p-6'>
          <div className='flex items-start justify-between mb-2'>
            <h3 className='text-xl font-bold'>{title}</h3>
            <Badge variant={status === 'released' ? 'default' : status === 'beta' ? 'secondary' : 'outline'}>{status}</Badge>
          </div>
          <p className='text-muted-foreground mb-2'>by {developer}</p>
          {description && <p className='text-sm mb-4 line-clamp-2'>{description}</p>}
          <div className='flex flex-wrap gap-2 mb-3'>
            {platforms.map((platform) => (
              <Badge key={platform} variant='secondary' className='text-xs'>
                {platform}
              </Badge>
            ))}
          </div>
          <p className='text-sm text-muted-foreground'>Release: {new Date(releaseDate).toLocaleDateString()}</p>
        </CardContent>
      </div>
    </Card>
  );
}
