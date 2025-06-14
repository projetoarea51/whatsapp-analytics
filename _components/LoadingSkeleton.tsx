import { Skeleton } from "@/components/ui/skeleton"

type LoadingSkeletonProps = {
  height?: number
  width?: number
  className?: string
}

export default function LoadingSkeleton({ height = 200, width = "100%", className }: LoadingSkeletonProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <Skeleton
        className={className}
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          width: typeof width === "number" ? `${width}px` : width,
        }}
      />
    </div>
  )
}
