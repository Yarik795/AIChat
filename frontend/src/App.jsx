import { useState } from 'react'
import Chat from './Chat'
import ModelSelector from './ModelSelector'

function App() {
  const [selectedModel, setSelectedModel] = useState('openai/gpt-3.5-turbo')

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

