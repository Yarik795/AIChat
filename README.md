# OpenRouter Chat Web App

Веб-приложение с интерфейсом в стиле OpenAI для работы с OpenRouter API. Flask бэкенд + React фронтенд с темным дизайном.

## Особенности

- 🎨 Современный темный дизайн в стиле ChatGPT
- 🤖 Поддержка множества моделей через OpenRouter
- 💬 Чат без сохранения истории (каждое сообщение независимо)
- 🚀 Готово к деплою на Amvera

## Технологии

- **Backend**: Flask (Python)
- **Frontend**: React + Vite
- **API**: OpenRouter

## Установка и запуск локально

### Предварительные требования

- Python 3.11+
- Node.js 18+
- npm или yarn

### Шаг 1: Установка зависимостей Backend

```bash
pip install -r requirements.txt
```

### Шаг 2: Установка зависимостей Frontend

```bash
cd frontend
npm install
```

### Шаг 3: Настройка переменных окружения

Создайте файл `.env` в корне проекта (опционально для локальной разработки):

```env
OPENROUTER_API_KEY=your_api_key_here
HTTP_REFERER=http://localhost:5000
```

Или экспортируйте переменные:

```bash
# Windows PowerShell
$env:OPENROUTER_API_KEY="your_api_key_here"

# Linux/Mac
export OPENROUTER_API_KEY="your_api_key_here"
```

### Шаг 4: Сборка Frontend

```bash
cd frontend
npm run build
```

Это создаст собранные файлы в `app/static/`

### Шаг 5: Запуск Backend

```bash
# Из корня проекта
python -m app.main

# Или с Flask CLI
export FLASK_APP=app.main
flask run
```

Приложение будет доступно по адресу: http://localhost:5000

## Разработка

### Режим разработки Frontend

Для разработки с hot-reload:

```bash
cd frontend
npm run dev
```

Frontend будет доступен на http://localhost:5173 и автоматически проксирует запросы `/api/*` на backend (порт 5000).

### Режим разработки Backend

```bash
export FLASK_APP=app.main
export FLASK_ENV=development
flask run
```

## Деплой на Amvera

### Предварительные требования

1. Аккаунт на [Amvera.ru](https://amvera.ru)
2. Репозиторий на GitHub (или другом Git-сервисе)
3. API ключ OpenRouter

### Шаг 1: Подготовка проекта

1. Убедитесь, что `amvera.yaml` создан в корне проекта
2. Соберите frontend: `cd frontend && npm run build`
3. Проверьте, что файлы появились в `app/static/`

### Шаг 2: Создание проекта на Amvera

1. Войдите в [панель управления Amvera](https://console.amvera.ru)
2. Нажмите **"Создать проект"**
3. Выберите тип проекта: **"Из Git-репозитория"**
4. Подключите ваш репозиторий

### Шаг 3: Настройка переменных окружения

В разделе **"Настройки" → "Переменные окружения"** добавьте:

- `OPENROUTER_API_KEY` - ваш API ключ OpenRouter
- `HTTP_REFERER` - URL вашего сайта (опционально)

### Шаг 4: Настройка вебхука (опционально)

Для автоматического деплоя при каждом push:

1. В панели Amvera перейдите на вкладку **"Репозиторий"**
2. Скопируйте **URL вебхука**
3. В GitHub: Settings → Webhooks → Add webhook
4. Вставьте URL вебхука, выберите `Just the push event`

### Шаг 5: Деплой

```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

Amvera автоматически установит зависимости и запустит приложение.

## Структура проекта

```
AISigma/
├── app/
│   ├── api/
│   │   └── routes.py          # API endpoints
│   ├── static/                # Собранные файлы React
│   ├── templates/
│   │   └── index.html         # HTML шаблон
│   └── main.py                # Flask приложение
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Главный компонент
│   │   ├── Chat.jsx           # Компонент чата
│   │   ├── Message.jsx        # Компонент сообщения
│   │   ├── ModelSelector.jsx  # Выбор модели
│   │   └── styles/
│   │       └── App.css        # Стили
│   ├── package.json
│   └── vite.config.js
├── amvera.yaml                # Конфигурация Amvera
├── requirements.txt           # Python зависимости
└── README.md
```

## API Endpoints

### POST /api/chat

Отправляет запрос к OpenRouter API.

**Request:**
```json
{
  "message": "Привет!",
  "model": "openai/gpt-3.5-turbo"
}
```

**Response:**
```json
{
  "content": "Привет! Как дела?",
  "model": "openai/gpt-3.5-turbo"
}
```

## Доступные модели

- `openai/gpt-4` - GPT-4
- `openai/gpt-3.5-turbo` - GPT-3.5 Turbo
- `anthropic/claude-3-opus` - Claude 3 Opus
- `anthropic/claude-3-sonnet` - Claude 3 Sonnet
- `anthropic/claude-3-haiku` - Claude 3 Haiku
- `google/gemini-pro` - Gemini Pro
- `meta-llama/llama-3-70b-instruct` - Llama 3 70B
- `mistralai/mistral-large` - Mistral Large

Полный список моделей доступен на [OpenRouter Models](https://openrouter.ai/models)

## Troubleshooting

### Ошибка "API ключ не настроен"

Убедитесь, что переменная окружения `OPENROUTER_API_KEY` установлена:
- Локально: проверьте `.env` или экспортированные переменные
- На Amvera: проверьте настройки в панели управления

### Frontend не собирается

```bash
cd frontend
rm -rf node_modules
npm install
npm run build
```

### Flask не запускается

Проверьте, что все зависимости установлены:
```bash
pip install -r requirements.txt
```

Проверьте, что порт 5000 свободен или измените порт в `app/main.py`

## Лицензия

MIT

