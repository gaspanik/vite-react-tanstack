import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/CardTv'

export const Route = createFileRoute('/card-tv')({
  component: CardTv,
})

function CardTv() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-[95vh]">
      <div className="flex flex-col items-start gap-1 mx-8 md:max-w-4xl md:text-jusutify text-left">
        <h1 className="font-medium text-gray-900 text-xl">
          Card component w/ tailwind-variants
        </h1>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {/* 1. Default Mode: 何も指定しないと tone="default" */}
          <Card
            title="Standard Plan"
            imageUrl="https://picsum.photos/id/10/800/600"
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="mt-4">
              <span className="text-gray-500 text-sm">$10</span>
            </p>
          </Card>

          {/* 2. Primary Mode */}
          <Card
            tone="primary"
            title="Professional Plan"
            imageUrl="https://picsum.photos/id/42/800/600"
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="mt-4">
              <span className="font-medium text-blue-800">$29</span>
            </p>
          </Card>

          {/* 3. Dark Mode: */}
          <Card
            tone="dark"
            title="Enterprise Plan"
            imageUrl="https://picsum.photos/id/20/800/600"
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p className="mt-4">
              <span className="font-medium text-slate-300">
                Ask for Pricing
              </span>
            </p>
          </Card>

          {/* 4. className で回転 */}
          <div className="flex justify-center md:col-span-3 mt-6">
            <Card
              title="Special Offer (Rotated)"
              className="border-4 border-yellow-400 max-w-lg -rotate-1 hover:rotate-0 transition-transform duration-300"
            >
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
