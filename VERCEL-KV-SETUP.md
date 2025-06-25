# 🗄️ Настройка Vercel KV для системы комментариев

> **Важно**: Эта настройка нужна для синхронизации комментариев между всеми пользователями в продакшене.

---

## 🎯 Что делаем

Переводим систему комментариев с `localStorage` (локально) на **Vercel KV** (серверное хранилище Redis).

### ✅ Уже сделано в коде:
- Установлен `@vercel/kv`
- Созданы API routes: `/api/comments`, `/api/comments/status`, `/api/comments/migrate`
- Обновлен `CommentSystem.tsx` для работы с сервером
- Добавлена автоматическая миграция localStorage комментариев

---

## 🚀 Настройка Vercel KV

### 1. **Создание KV Store в Vercel Dashboard**

1. Открой [Vercel Dashboard](https://vercel.com/dashboard)
2. Выбери проект **Virtual Pitwall**
3. Перейди в раздел **Storage**
4. Нажми **Create Database**
5. Выбери **KV (Redis)**
6. Назови базу: `pitwall-comments`
7. Нажми **Create**

### 2. **Подключение к проекту**

1. В созданной KV базе нажми **Connect Project**
2. Выбери **Virtual Pitwall**
3. Нажми **Connect**

Vercel автоматически добавит переменные окружения:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN` 
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`

### 3. **Проверка переменных**

В разделе **Settings → Environment Variables** должны появиться:
```
KV_REST_API_URL=https://xxx.kv.vercel-storage.com
KV_REST_API_TOKEN=xxx
KV_REST_API_READ_ONLY_TOKEN=xxx
KV_URL=redis://xxx
```

---

## 🧪 Тестирование

### Локально (разработка):
```bash
# Создай .env.local файл с переменными из Vercel
echo "KV_REST_API_URL=твой_url" >> .env.local
echo "KV_REST_API_TOKEN=твой_token" >> .env.local

# Запусти dev сервер
npm run dev
```

### В продакшене:
После деплоя комментарии будут автоматически синхронизироваться между всеми пользователями.

---

## 🔄 Автоматическая миграция

При первом открытии системы комментариев:

1. **Есть localStorage комментарии** → появится синий баннер "Синхронизировать"
2. **Нажми кнопку** → комментарии перенесутся на сервер
3. **localStorage очистится** → больше никаких дубликатов

---

## 📊 Структура данных в KV

```javascript
// Ключ: comments:pageId (например: comments:about)
// Значение: массив комментариев
[
  {
    id: "1706347200000",
    author: "Алексей",
    content: "Отличная система!",
    category: "ui",
    status: "new", 
    timestamp: "2025-01-27T10:00:00.000Z",
    page: "about"
  }
]
```

---

## 💰 Лимиты Vercel KV (бесплатный план)

- **30,000 команд/месяц** (чтение + запись)
- **256 MB хранилища**
- **Автоматическое масштабирование**

Для системы комментариев этого более чем достаточно.

---

## 🛠️ API Endpoints

### GET /api/comments?pageId=xxx
Получить все комментарии для страницы

### POST /api/comments
Добавить новый комментарий
```json
{
  "pageId": "about",
  "author": "Имя пользователя", 
  "content": "Текст комментария",
  "category": "ui" // ui | functionality | technical
}
```

### PUT /api/comments/status  
Обновить статус комментария (для админов)
```json
{
  "pageId": "about",
  "commentId": "1706347200000",
  "status": "completed" // new | in_progress | completed | rejected
}
```

### POST /api/comments/migrate
Мигрировать localStorage комментарии
```json
{
  "pageId": "about", 
  "comments": [/* массив комментариев */]
}
```

---

## ✅ Готово!

После настройки Vercel KV:
- ✅ Комментарии синхронизируются между всеми пользователями
- ✅ Автоматическая миграция localStorage данных
- ✅ Real-time обновления (при перезагрузке страницы)
- ✅ Админские функции работают глобально
- ✅ Никаких изменений в UI для пользователей

**Система комментариев теперь полноценно работает в продакшене!** 🎉 