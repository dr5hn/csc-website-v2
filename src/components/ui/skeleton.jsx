import { cn } from "@/lib/utils";

/**
 * Skeleton component for loading states.
 * Provides visual placeholder while content loads.
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-light/60",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton variants for common use cases.
 */
function SkeletonText({ className, lines = 1, ...props }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

function SkeletonCircle({ className, size = "md", ...props }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <Skeleton
      className={cn("rounded-full", sizes[size], className)}
      {...props}
    />
  );
}

function SkeletonCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-light/50 bg-white/50 p-6",
        className
      )}
      {...props}
    >
      <Skeleton className="h-12 w-12 rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard };
