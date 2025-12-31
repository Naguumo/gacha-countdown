/// <reference types="vite/client" />

import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { ReactNode } from 'react';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary';
import { NotFound } from '@/components/NotFound';
import appCss from '../styles/app.css?url';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Gacha Games Countdown',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),

  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position='bottom-right' />
        <ReactQueryDevtools buttonPosition='bottom-left' />
        <Scripts />
      </body>
    </html>
  );
}
