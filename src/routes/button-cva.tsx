import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ButtonCva'
import { CheckSquare2, Square } from 'lucide-react'

export const Route = createFileRoute('/button-cva')({
  component: ButtonCva,
})

function ButtonCva() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-[95vh]">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-gray-900 text-xl">
            cva: class-variance-authority button.
          </h1>
        </div>
        <p className="mb-3 text-gray-600 text-sm">
          Uses `cn` utility and `cva` module for conditional class names.
        </p>
        <div className="my-1">
          <Button className="" size="sm">
            <CheckSquare2 className="mr-1 w-4 h-4" />
            Button w/ active
          </Button>
          {` `}
          <Button className="" intent="secondary" size="sm" disabled>
            <Square className="mr-1 w-4 h-4" />
            Button w/o active
          </Button>
        </div>
      </div>
    </div>
  )
}
