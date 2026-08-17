import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Apply from './pages/Apply'
import Updates from './pages/Updates'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
