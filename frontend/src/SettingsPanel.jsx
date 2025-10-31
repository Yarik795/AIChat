import { useState, useEffect } from 'react'

const DEFAULT_SETTINGS = {
  temperature: 1.0,
  max_tokens: 1000,
  verbosity: 'medium',
  frequency_penalty: 0.0,
  top_p: 1.0
}

const PARAMETER_HINTS = {
  temperature: "Контролирует креативность ответов. Низкие значения = более предсказуемые ответы, высокие = более креативные",
  max_tokens: "Максимальное количество токенов в ответе. Больше токенов = длиннее ответ (выше стоимость)",
  verbosity: "Детальность ответа. Low = кратко, Medium = сбалансированно, High = подробно",
  frequency_penalty: "Штраф за повторение слов. Положительные значения уменьшают повторения, отрицательные - увеличивают",
  top_p: "Ограничивает выбор токенов. Низкие значения = более предсказуемые ответы, 1.0 = полный выбор"
}

function SettingsPanel({ isOpen, onClose, settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings)
  const [tooltipKey, setTooltipKey] = useState(null)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  useEffect(() => {
    if (isOpen) {
      // Загружаем сохраненные настройки из localStorage
      const saved = localStorage.getItem('chatSettings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setLocalSettings({ ...DEFAULT_SETTINGS, ...parsed })
          onSettingsChange({ ...DEFAULT_SETTINGS, ...parsed })
        } catch (e) {
          console.error('Ошибка загрузки настроек:', e)
        }
      }
    }
  }, [isOpen])

  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
    // Сохраняем в localStorage
    localStorage.setItem('chatSettings', JSON.stringify(newSettings))
  }

  const handleReset = () => {
    setLocalSettings(DEFAULT_SETTINGS)
    onSettingsChange(DEFAULT_SETTINGS)
    localStorage.setItem('chatSettings', JSON.stringify(DEFAULT_SETTINGS))
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="settings-overlay" onClick={handleOverlayClick}></div>
      <div className="settings-panel">
        <div className="settings-header">
          <h2>Настройки генерации</h2>
          <button className="settings-close-button" onClick={onClose} aria-label="Закрыть">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="settings-content">
          {/* Основные настройки */}
          <div className="settings-section">
            <h3>Основные настройки</h3>

            {/* Temperature */}
            <div className="setting-item">
              <div className="setting-label">
                <label htmlFor="temperature">Креативность (Temperature)</label>
                <div className="tooltip-container">
                  <button
                    className="tooltip-icon"
                    onMouseEnter={() => setTooltipKey('temperature')}
                    onMouseLeave={() => setTooltipKey(null)}
                    aria-label="Подсказка"
                  >
                    ?
                  </button>
                  {tooltipKey === 'temperature' && (
                    <div className="tooltip">{PARAMETER_HINTS.temperature}</div>
                  )}
                </div>
              </div>
              <div className="setting-control">
                <input
                  type="range"
                  id="temperature"
                  min="0"
                  max="2"
                  step="0.1"
                  value={localSettings.temperature}
                  onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                />
                <span className="setting-value">{localSettings.temperature.toFixed(1)}</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div className="setting-item">
              <div className="setting-label">
                <label htmlFor="max_tokens">Максимальная длина (Max Tokens)</label>
                <div className="tooltip-container">
                  <button
                    className="tooltip-icon"
                    onMouseEnter={() => setTooltipKey('max_tokens')}
                    onMouseLeave={() => setTooltipKey(null)}
                    aria-label="Подсказка"
                  >
                    ?
                  </button>
                  {tooltipKey === 'max_tokens' && (
                    <div className="tooltip">{PARAMETER_HINTS.max_tokens}</div>
                  )}
                </div>
              </div>
              <div className="setting-control">
                <input
                  type="number"
                  id="max_tokens"
                  min="50"
                  max="4000"
                  step="50"
                  value={localSettings.max_tokens}
                  onChange={(e) => handleChange('max_tokens', parseInt(e.target.value) || 1000)}
                />
              </div>
            </div>

            {/* Verbosity */}
            <div className="setting-item">
              <div className="setting-label">
                <label htmlFor="verbosity">Детальность (Verbosity)</label>
                <div className="tooltip-container">
                  <button
                    className="tooltip-icon"
                    onMouseEnter={() => setTooltipKey('verbosity')}
                    onMouseLeave={() => setTooltipKey(null)}
                    aria-label="Подсказка"
                  >
                    ?
                  </button>
                  {tooltipKey === 'verbosity' && (
                    <div className="tooltip">{PARAMETER_HINTS.verbosity}</div>
                  )}
                </div>
              </div>
              <div className="setting-control">
                <select
                  id="verbosity"
                  value={localSettings.verbosity}
                  onChange={(e) => handleChange('verbosity', e.target.value)}
                >
                  <option value="low">Low (Кратко)</option>
                  <option value="medium">Medium (Сбалансированно)</option>
                  <option value="high">High (Подробно)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Дополнительные настройки */}
          <div className="settings-section">
            <h3>Дополнительные настройки</h3>

            {/* Frequency Penalty */}
            <div className="setting-item">
              <div className="setting-label">
                <label htmlFor="frequency_penalty">Штраф за повторения (Frequency Penalty)</label>
                <div className="tooltip-container">
                  <button
                    className="tooltip-icon"
                    onMouseEnter={() => setTooltipKey('frequency_penalty')}
                    onMouseLeave={() => setTooltipKey(null)}
                    aria-label="Подсказка"
                  >
                    ?
                  </button>
                  {tooltipKey === 'frequency_penalty' && (
                    <div className="tooltip">{PARAMETER_HINTS.frequency_penalty}</div>
                  )}
                </div>
              </div>
              <div className="setting-control">
                <input
                  type="range"
                  id="frequency_penalty"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={localSettings.frequency_penalty}
                  onChange={(e) => handleChange('frequency_penalty', parseFloat(e.target.value))}
                />
                <span className="setting-value">{localSettings.frequency_penalty.toFixed(1)}</span>
              </div>
            </div>

            {/* Top P */}
            <div className="setting-item">
              <div className="setting-label">
                <label htmlFor="top_p">Разнообразие выбора (Top P)</label>
                <div className="tooltip-container">
                  <button
                    className="tooltip-icon"
                    onMouseEnter={() => setTooltipKey('top_p')}
                    onMouseLeave={() => setTooltipKey(null)}
                    aria-label="Подсказка"
                  >
                    ?
                  </button>
                  {tooltipKey === 'top_p' && (
                    <div className="tooltip">{PARAMETER_HINTS.top_p}</div>
                  )}
                </div>
              </div>
              <div className="setting-control">
                <input
                  type="range"
                  id="top_p"
                  min="0"
                  max="1"
                  step="0.05"
                  value={localSettings.top_p}
                  onChange={(e) => handleChange('top_p', parseFloat(e.target.value))}
                />
                <span className="setting-value">{localSettings.top_p.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Кнопка сброса */}
          <div className="settings-footer">
            <button className="settings-reset-button" onClick={handleReset}>
              Сбросить к умолчаниям
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPanel

