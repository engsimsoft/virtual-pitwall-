import { AppShell } from '@/components/layout/AppShell'

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
