import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { LangProvider } from './i18n/LangContext'
import { validateVocabulary } from './data/vocabulary'
import './index.css'

const vocabProblems = validateVocabulary()
if (vocabProblems.length) console.error('Vocabulary dataset problems:', vocabProblems)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LangProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </LangProvider>
  </React.StrictMode>
)
