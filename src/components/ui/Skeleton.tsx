'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'block' | 'text' | 'circle'
}

export function Skeleton({ className, variant = 'block' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded-md',
        variant === 'circle' && 'rounded-full',
        className
      )}
    />
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2 rounded-md border border-border bg-surface p-3', className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex-1">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}

export function LiveSessionSkeleton() {
  return (
    <div className="flex h-full flex-col gap-2">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-6 w-full" />
      <div className="grid flex-1 grid-cols-1 gap-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2 lg:col-span-2">
          <SkeletonCard className="h-48" />
          <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonCard className="h-56" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
      <div className="grid h-[150px] grid-cols-1 gap-2 lg:grid-cols-[3fr_2fr]">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}

export function ReplaySkeleton() {
  return (
    <div className="flex h-full flex-col gap-2">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-6 w-full" />
      <div className="grid flex-1 grid-cols-1 gap-2 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-2">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

export function FleetSkeleton() {
  return (
    <div className="flex h-full flex-col gap-2">
      <Skeleton className="h-10 w-full" />
      <div className="grid flex-1 grid-cols-1 gap-2 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-16 w-full" />
          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        </div>
        <SkeletonCard />
      </div>
    </div>
  )
}

export function GenericSkeleton() {
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <Skeleton className="h-10 w-full" />
      <SkeletonCard className="flex-1" />
    </div>
  )
}
