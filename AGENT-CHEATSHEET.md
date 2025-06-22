# 🤖 Cursor Agent - Шпаргалка

## 🚀 Быстрый старт

### Запуск проекта:
```bash
npm run dev     # http://localhost:3000
```

### Создание бэкапа:
```bash
node scripts/backup/backup-content.js
```

## 📁 Структура проекта

```
Virtual Pitwall/
├── src/app/           # Страницы Next.js
│   ├── page.tsx      # Главная (готово)
│   └── features/     # Возможности (готово)
├── docs/             # Документация  
│   ├── public/       # Для заказчика
│   ├── internal/     # Для команды
│   └── specs/        # Техническая документация
├── scripts/backup/   # Система бэкапов
└── backups/         # Локальные бэкапы (не в Git)
```

## ⚡ Частые команды

### Разработка:
- `npm run dev` - запуск сервера
- `npm run build` - сборка для продакшена
- `npm run start` - запуск продакшен версии

### Бэкапы:
- `node scripts/backup/backup-content.js` - создать бэкап
- `dir backups` - посмотреть бэкапы

### Управление:
- Страницы: создавать в `src/app/имя-папки/page.tsx`
- Компоненты: в `src/components/`
- Утилиты: в `src/lib/`

## 🎯 Готовое

### ✅ Страницы:
- **/** - Главная с градиентным дизайном
- **/features** - Детальные возможности системы

### ✅ Системы:
- **Mock данные** (`src/lib/mockData.ts`) для демо
- **Бэкапы** работают и настроены
- **TypeScript + Tailwind** готовы к использованию

### ✅ Дизайн:
- Темная тема с purple/pink градиентами
- Адаптивный дизайн
- Lucide React иконки

## 📋 TODO

### 🔄 Следующие страницы:
- **/demo** - Интерактивное демо с графиками
- **/docs** - Техническая документация
- Система комментариев для feedback

### 💡 Идеи:
- ROI калькулятор
- Интерактивная карта трассы  
- Сравнение до/после
- WebSocket эмуляция для real-time

## 🎨 Стили

### Цвета:
- Primary: `from-purple-600 to-pink-600`
- Warning: `text-yellow-400`
- Success: `text-green-400` 
- Danger: `text-red-400`

### Компоненты:
- Gradient cards: `bg-gradient-to-br from-color-600/20 to-color-600/20`
- Borders: `border border-color-500/30`
- Backdrop: `bg-white/5 backdrop-blur-sm`

---

**🎯 Цель**: Сайт-шпаргалка + презентация системы телеметрии для заказчика 