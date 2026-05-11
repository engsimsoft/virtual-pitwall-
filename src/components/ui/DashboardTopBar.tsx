import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export function DashboardTopBar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1 text-[11px]">
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-500 transition-colors hover:text-tms-orange"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span>На главную</span>
      </Link>
      <span className="font-mono uppercase tracking-wider text-gray-400">
        TMS Telos · UI Prototype
      </span>
    </div>
  )
}
