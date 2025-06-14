import LoadingSkeleton from "@/_components/LoadingSkeleton"

export default function Loading() {
  return (
    <div className="container py-10 space-y-6">
      <LoadingSkeleton height={50} />
      <div className="grid gap-6 md:grid-cols-2">
        <LoadingSkeleton height={300} />
        <LoadingSkeleton height={300} />
      </div>
      <LoadingSkeleton height={400} />
    </div>
  )
}
