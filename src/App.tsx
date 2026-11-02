import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ComingSoon from './components/ComingSoon'
import NotFound from './components/NotFound'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Lesson from './pages/Lesson'
import Vocabulary from './pages/Vocabulary'
import Grammar from './pages/Grammar'
import GrammarTopic from './pages/GrammarTopic'
import { useLang } from './i18n/LangContext'

export default function App() {
  const { t } = useLang()
  const soon = (k: 'listening' | 'practice' | 'progress') => <ComingSoon title={t(k)} />
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<Lesson />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/grammar/:id" element={<GrammarTopic />} />
        <Route path="/listening" element={soon('listening')} />
        <Route path="/practice" element={soon('practice')} />
        <Route path="/progress" element={soon('progress')} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
