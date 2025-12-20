import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'
import { SquareCode } from 'lucide-react'


const RootLayout = () => (
  <>
    <div className="top-0 z-10 sticky flex gap-2 bg-white p-2 border-slate-100 border-b font-light text-xs">
      <SquareCode className="-mr-1 w-4 h-4" />
      <Link to="/" className="[&.active]:font-bold [&.active]:text-blue-600">
        Tanstack Router Home
      </Link>{' '}
      <Link
        to="/playground"
        className="[&.active]:font-bold [&.active]:text-blue-600"
      >
        Playground
      </Link>
      <Link
        to="/button-cn"
        className="[&.active]:font-bold [&.active]:text-blue-600"
      >
        Button w/ cn
      </Link>
      <Link
        to="/button-cva"
        className="[&.active]:font-bold [&.active]:text-blue-600"
      >
        Button w/ cva
      </Link>
    </div>
    <Outlet />
    <TanStackRouterDevtools position="bottom-right" />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
