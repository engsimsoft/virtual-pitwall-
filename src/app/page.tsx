import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowRight,
  FileText,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import Navigation from '@/components/Navigation'

interface ScreenCard {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

const SCREENS: ScreenCard[] = [
  {
    title: 'Live Session',
    description:
      'Один мотор в реальном времени: двойной RPM, boost cross-check, GPS-трек, IMU, температуры.',
    icon: Activity,
    href: '/demos/live-session',
  },
  {
    title: 'Anti-Cheat Replay',
    description:
      'Replay инцидента: scrubbable timeline, расхождение каналов CAN vs Gen, момент превышения, криптоподпись лога.',
    icon: ShieldCheck,
    href: '/demos/anti-cheat-replay',
  },
  {
    title: 'Fleet',
    description:
      'Парк моторов TMS, heartbeat, активные сессии, недавние алерты по всему парку.',
    icon: Server,
    href: '/demos/fleet',
  },
  {
    title: 'Engine Passport',
    description:
      'Цифровой паспорт мотора: история, наработка, дайно-кривая, журналы сессий, обслуживания и инцидентов.',
    icon: FileText,
    href: '/demos/engine-passport',
  },
  {
    title: 'Incidents',
    description:
      'Журнал push-алертов парка с фильтрами по severity и kind, deep-link в момент сессии.',
    icon: AlertTriangle,
    href: '/demos/incidents',
  },
  {
    title: 'Black Box',
    description:
      'Viewer криптоцепочки записи: детали блоков, верификация хешей, экспорт доказательной выгрузки в JSON.',
    icon: Archive,
    href: '/demos/black-box',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-10">
          <div className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">
            TMS Telos · UI Prototype
          </div>
          <h1 className="mb-3 text-2xl font-semibold text-tms-graphite">
            Облачная часть системы Telos
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-gray-600">
            Интерактивный мокап веб-интерфейса, через который TMS-инженер,
            клиент-арендатор и гонщик работают с данными прибора Telos:
            live-телеметрия, anti-cheat доказательная цепочка, паспорт мотора,
            журнал инцидентов и юридический экспорт записи. Полностью на
            mock-data, без серверной части.
          </p>
        </section>

        <section>
          <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-gray-200 pb-3">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-wider text-gray-500">
                Экраны прототипа
              </div>
              <div className="text-base font-semibold text-gray-900">
                6 экранов · 3 уровня доступа
              </div>
            </div>
            <div className="hidden max-w-md text-right text-xs text-gray-500 sm:block">
              Доступы каскадные: TMS-инженер видит всё, клиент — свой парк,
              гонщик — свои сессии. Переключатель ролей — следующий шаг
              прототипа.
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SCREENS.map((screen) => (
              <ScreenLink key={screen.href} {...screen} />
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500 sm:hidden">
            Доступы каскадные: TMS-инженер видит всё, клиент — свой парк,
            гонщик — свои сессии.
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-gray-500 sm:px-6 lg:px-8">
          © 2026 TMS Telos UI Prototype
        </div>
      </footer>
    </div>
  )
}

function ScreenLink({ title, description, icon: Icon, href }: ScreenCard) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 transition-colors hover:border-tms-orange"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-tms-graphite transition-colors group-hover:bg-tms-orange/10 group-hover:text-tms-orange">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-tms-orange" />
      </div>
      <div>
        <div className="mb-1 text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-xs leading-relaxed text-gray-600">
          {description}
        </div>
      </div>
      <div className="mt-auto pt-1 font-mono text-[10px] uppercase tracking-wider text-gray-400">
        {href}
      </div>
    </Link>
  )
}
