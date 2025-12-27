import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({
  component: PlayGround,
})

function PlayGround() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-[90vh]">
      <div className="flex flex-col items-start gap-1 mx-8 md:max-w-4xl md:text-jusutify text-left">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-gray-900 text-xl">
            Playground &#x1F93D;
          </h1>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Paste code below</span>
        </div>
        <hr />
        <div>
          <p className="mb-3 text-gray-500 text-sm/relaxed sm:text-base/[1.7]">
            Tempora omnis a dolorum laboriosam esse quisquam.Iure et placeat
            saepe. Ut debitis nemo doloremque praesentium officiis sed. Nam
            maxime quibusdam veritatis sunt iste.{' '}
            <span className="text-blue-800 text-lg">Libero inventore</span> et
            dolorum id. Et ex iure ut facilis. Voluptates deleniti eos non ex.
            Aperiam eos iure eum voluptas ut placeat praesentium quo molestiae.
            Consequatur sequi est sint mollitia sunt et. Ut quia ut illum et
            fugit velit aut odio quis. Qui perferendis dolor maiores sit odit.
          </p>
        </div>
      </div>
    </div>
  )
}
