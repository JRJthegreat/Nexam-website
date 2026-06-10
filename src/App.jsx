import { Routes, Route } from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import RoutingLayers from './components/RoutingLayers'
import NetworkDiagram from './components/NetworkDiagram'
import ProcessTimeline from './components/ProcessTimeline'
import Comparison from './components/Comparison'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'

function HomePage() {
  return (
    <div className="bg-[#04070D] text-[#FAFAFA] min-h-screen overflow-x-hidden">
      <div className="radial-glow glow-top-left" />
      <div className="radial-glow glow-bottom-right" />
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <RoutingLayers />
        <NetworkDiagram />
        <ProcessTimeline />
        <Comparison />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}
