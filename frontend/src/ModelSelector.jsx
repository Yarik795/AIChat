import { useState } from 'react'

const MODELS = [
  { value: 'openai/gpt-4', label: 'GPT-4' },
  { value: 'openai/gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'anthropic/claude-3-sonnet', label: 'Claude 3 Sonnet' },
  { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku' },
  { value: 'google/gemini-pro', label: 'Gemini Pro' },
  { value: 'meta-llama/llama-3-70b-instruct', label: 'Llama 3 70B' },
  { value: 'mistralai/mistral-large', label: 'Mistral Large' },
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

