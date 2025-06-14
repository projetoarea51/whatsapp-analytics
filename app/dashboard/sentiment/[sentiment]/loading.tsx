import LoadingSkeleton from "@/_components/LoadingSkeleton"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <LoadingSkeleton height={40} width={300} />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <LoadingSkeleton key={i} height={120} />
        ))}
      </div>
    </div>
  )
}
