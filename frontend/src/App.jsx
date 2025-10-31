import { useState, useEffect } from 'react'
import Chat from './Chat'
import ModelSelector from './ModelSelector'

function App() {
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-sonnet-4.5')
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app">
      <div className="header">
        <h1>OpenRouter Chat</h1>
        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? '??????????? ?? ??????? ????' : '??????????? ?? ?????? ????'}
            title={theme === 'dark' ? '??????? ????' : '?????? ????'}
          >
            {theme === 'dark' ? '??' : '??'}
          </button>
          <ModelSelector 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
          />
        </div>
      </div>
      <Chat selectedModel={selectedModel} />
    </div>
  )
}

export default App

