import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

export function NotFound({ children }: { children?: ReactNode }) {
  return (
    <div className='space-y-2 p-2'>
      <div className='text-muted-foreground'>{children || <p>The page you are looking for does not exist.</p>}</div>
      <p className='flex items-center gap-2 flex-wrap'>
        <Button variant='secondary' onClick={() => window.history.back()}>
          Go back
        </Button>
        <Link to='/'>
          <Button variant='default'>Start Over</Button>
        </Link>
      </p>
    </div>
  );
}
