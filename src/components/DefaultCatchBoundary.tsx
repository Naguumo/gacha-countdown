import type { ErrorComponentProps } from '@tanstack/react-router';
import { createLink, ErrorComponent, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const ButtonLink = createLink(Button);

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error(error);

  return (
    <div className='min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6'>
      <ErrorComponent error={error} />
      <div className='flex gap-2 items-center flex-wrap'>
        <Button variant='default' onClick={() => router.invalidate()}>
          Try Again
        </Button>
        {isRoot ? (
          <ButtonLink variant='default' to='/'>
            Home
          </ButtonLink>
        ) : (
          <ButtonLink
            to='/'
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            variant='default'>
            Go Back
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
