import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Portfolio } from './pages/Portfolio'
import { Process } from './pages/Process'
import { Testimonials } from './pages/Testimonials'
import { Faqs } from './pages/Faqs'
import { Contact } from './pages/Contact'
import { Quote } from './pages/Quote'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/process" element={<Process />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
