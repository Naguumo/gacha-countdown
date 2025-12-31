import { clsx } from 'clsx';

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
    <div className={clsx('bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200', className)}>
      <div className='flex flex-col md:flex-row'>
        {imageUrl && (
          <div className='md:w-48 h-48 md:h-auto'>
            <img src={imageUrl} alt={title} className='w-full h-full object-cover' />
          </div>
        )}
        <div className='flex-1 p-6'>
          <div className='flex items-start justify-between mb-2'>
            <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
            <span
              className={clsx(
                'px-2 py-1 text-xs font-semibold rounded-full',
                status === 'upcoming' && 'bg-blue-100 text-blue-800',
                status === 'released' && 'bg-green-100 text-green-800',
                status === 'beta' && 'bg-yellow-100 text-yellow-800'
              )}>
              {status}
            </span>
          </div>
          <p className='text-gray-600 mb-2'>by {developer}</p>
          {description && <p className='text-gray-700 mb-4 line-clamp-2'>{description}</p>}
          <div className='flex flex-wrap gap-2 mb-3'>
            {platforms.map((platform) => (
              <span key={platform} className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>
                {platform}
              </span>
            ))}
          </div>
          <p className='text-sm text-gray-500'>Release: {new Date(releaseDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
