import { useState } from 'react'

const MODELS = [
  { value: 'anthropic/claude-sonnet-4.5', label: 'Claude Sonnet 4.5' },
  { value: 'google/gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  { value: 'x-ai/grok-4-fast', label: 'Grok 4 Fast' },
  { value: 'deepseek/deepseek-chat-v3-0324', label: 'DeepSeek Chat v3' },
  { value: 'qwen/qwen3-235b-a22b-2507', label: 'Qwen3 235B' },
]

function ModelSelector({ selectedModel, onModelChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedLabel = MODELS.find(m => m.value === selectedModel)?.label || selectedModel

  return (
    <div className="model-selector">
      <button 
        className="model-selector-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="model-dropdown">
          {MODELS.map(model => (
            <button
              key={model.value}
              className={`model-option ${selectedModel === model.value ? 'active' : ''}`}
              onClick={() => {
                onModelChange(model.value)
                setIsOpen(false)
              }}
            >
              {model.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ModelSelector

