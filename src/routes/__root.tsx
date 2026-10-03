import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
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
        title: "NexPay | Sending money should be as easy as sending a message.",
      },
      {
        name: 'description',
        content:
          "Payment Orchestration & Money Transfer Platform for Africa",
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

/** Barre de progression fine en haut de page pendant chaque navigation */
function NavProgressBar() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={`h-full bg-primary shadow-[0_0_8px_2px] shadow-primary/60 transition-all ease-in-out ${
          isLoading ? 'w-[85%] opacity-100' : 'w-full opacity-0'
        }`}
        style={{ transitionDuration: isLoading ? '2000ms' : '150ms' }}
      />
    </div>
  )
}

function RootComponent() {
  return (
    <>
      <NavProgressBar />
      <Outlet />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="bumblebee">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
