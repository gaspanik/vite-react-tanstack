import { createFileRoute, Link } from '@tanstack/react-router'
import { SquareCode } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-[95vh]">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <SquareCode className="w-6 h-6" />
          <h1 className="font-medium text-gray-900 text-xl">
            Vite: React + Tanstack Router w/ Tailwind v4
          </h1>
        </div>
        <p className="mt-3 mb-1 text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p className="text-gray-00 text-sm">
          <span className="font-bold">Explore sample buttons:</span>{' '}
          <Link to="/button-cn" className="text-blue-600 hover:underline">
            button-cn
          </Link>{' '}
          and{' '}
          <Link to="/button-cva" className="text-blue-600 hover:underline">
            button-cva
          </Link>
        </p>
      </div>
    </div>
  )
}
