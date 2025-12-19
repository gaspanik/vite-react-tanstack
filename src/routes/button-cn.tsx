import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ButtonCn'
import { CheckSquare2, Square } from 'lucide-react'

export const Route = createFileRoute('/button-cn')({
  component: ButtonCn,
})

function ButtonCn() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-[95vh]">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-gray-900 text-xl">
            cn: clsx and tailwind-merge function button.
          </h1>
        </div>
        <p className="mb-3 text-gray-600 text-sm">
          shadcn/ui `cn` utility function to conditionally join classNames.
        </p>
        <div className="my-1">
          <Button className="" active>
            <CheckSquare2 className="mr-1 w-4 h-4" />
            Button w/ active
          </Button>
          {` `}
          <Button className="" disabled>
            <Square className="mr-1 w-4 h-4" />
            Button w/o active
          </Button>
        </div>
      </div>
    </div>
  )
}
