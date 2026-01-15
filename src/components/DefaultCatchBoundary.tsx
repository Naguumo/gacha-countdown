import type { ErrorComponentProps } from '@tanstack/react-router';
import { createLink, rootRouteId, useMatch, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { prettifyError, ZodError } from 'zod';
import { Button } from '@/components/ui/button';

const ButtonLink = createLink(Button);

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

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

function ErrorComponent({ error }: Pick<ErrorComponentProps, 'error'>) {
  const [show, setShow] = useState(process.env.NODE_ENV !== 'production');

  return (
    <div className='p-2 max-w-full flex flex-col'>
      <div className='flex items-center content-center gap-2 place-content-center'>
        <strong className='text-base'>Something went wrong!</strong>
        <button type='button' className='border-current border font-bold rounded px-1 py-0.5 text-[0.6em]' onClick={() => setShow((d) => !d)}>
          {show ? 'Hide Error' : 'Show Error'}
        </button>
      </div>
      {show ? (
        <div className='pt-4'>
          <pre className='text-base border border-red-500 rounded p-1 text-red-500 overflow-y-auto overflow-x-hidden text-wrap'>
            {error.message ? <code>{error.message}</code> : null}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
