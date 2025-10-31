import { useState } from 'react'
import Chat from './Chat'
import ModelSelector from './ModelSelector'

function App() {
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-sonnet-4.5')

  return (
    <div className="app">
      <div className="header">
        <h1>OpenRouter Chat</h1>
        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel} 
        />
      </div>
      <Chat selectedModel={selectedModel} />
    </div>
  )
}

export default App

