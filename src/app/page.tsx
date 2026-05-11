'use client'

import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowRight,
  Bell,
  FileText,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'

interface ScreenCard {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

const SCREENS: ScreenCard[] = [
  {
    title: 'Live Session',
    description: 'Один мотор в реальном времени: двойной RPM, boost cross-check, GPS-трек, IMU, температуры.',
    icon: Activity,
    href: '/demos/live-session',
  },
  {
    title: 'Anti-Cheat Replay',
    description: 'Replay инцидента: scrubbable timeline, расхождение каналов CAN vs Gen, момент превышения, криптоподпись лога.',
    icon: ShieldCheck,
    href: '/demos/anti-cheat-replay',
  },
  {
    title: 'Fleet',
    description: 'Парк моторов TMS, heartbeat, активные сессии, недавние алерты по всему парку.',
    icon: Server,
    href: '/demos/fleet',
  },
  {
    title: 'Engine Passport',
    description: 'Цифровой паспорт мотора: история, наработка, дайно-кривая, журналы сессий, обслуживания и инцидентов.',
    icon: FileText,
    href: '/demos/engine-passport',
  },
  {
    title: 'Alarm Center',
    description: 'Real-time защита двигателя: алармы по RPM, давлению масла, температуре ОЖ и наддуву. Контрактные штрафы.',
    icon: Bell,
    href: '/demos/alarms',
  },
  {
    title: 'Incidents',
    description: 'Журнал push-алертов парка с фильтрами по severity и kind, deep-link в момент сессии.',
    icon: AlertTriangle,
    href: '/demos/incidents',
  },
  {
    title: 'Black Box',
    description: 'Viewer криптоцепочки записи: детали блоков, верификация хешей, экспорт доказательной выгрузки в JSON.',
    icon: Archive,
    href: '/demos/black-box',
  },
  {
    title: 'Drop Zone',
    description: 'Статус WiFi-инфраструктуры на Казань-Ринге: точка доступа, edge-сервер, LTE backup, очередь блоков в облако.',
    icon: Wifi,
    href: '/demos/drop-zone',
  },
  {
    title: 'Regulations',
    description: 'Лимиты RPM/boost/temp на контракт клиента с привязкой к связанным инцидентам по моторам клиента.',
    icon: SlidersHorizontal,
    href: '/demos/settings',
  },
]

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <section className="mb-8">
          <h1 className="mb-3 text-2xl font-semibold text-text-primary">
            Облачная часть системы Telos
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
            Интерактивный mockup веб-интерфейса, через который TMS-инженер,
            клиент-арендатор и гонщик работают с данными прибора Telos:
            live-телеметрия, anti-cheat доказательная цепочка, паспорт мотора,
            журнал инцидентов и юридический экспорт записи. Полностью на
            mock-data, без серверной части.
          </p>
        </section>

        <section>
          <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-3">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-text-muted">
                Экраны прототипа
              </div>
              <div className="text-base font-semibold text-text-primary">
                8 экранов · 3 уровня доступа
              </div>
            </div>
            <div className="hidden max-w-md text-right text-xs text-text-secondary sm:block">
              Доступы каскадные: TMS-инженер видит всё, клиент — свой парк,
              гонщик — свои сессии. Переключатель ролей — в боковой панели.
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SCREENS.map((screen) => (
              <ScreenLink key={screen.href} {...screen} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  )
}

function ScreenLink({ title, description, icon: Icon, href }: ScreenCard) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-md border border-border bg-surface p-4 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-elevated text-text-secondary transition-colors group-hover:bg-accent-dim group-hover:text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent" />
      </div>
      <div>
        <div className="mb-1 text-sm font-semibold text-text-primary">{title}</div>
        <div className="text-xs leading-relaxed text-text-secondary">
          {description}
        </div>
      </div>
      <div className="mt-auto pt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {href}
      </div>
    </Link>
  )
}
