import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'
import CompareBar from './components/CompareBar/CompareBar.jsx'
import Home from './pages/Home/Home.jsx'
import Properties from './pages/Properties/Properties.jsx'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails.jsx'
import Saved from './pages/Saved/Saved.jsx'
import Compare from './pages/Compare/Compare.jsx'
import Agents from './pages/Agents/Agents.jsx'
import Journal from './pages/Journal/Journal.jsx'
import Locations from './pages/Locations/Locations.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'

function PropertyDetailsWithKey() {
  const { id } = useParams()
  return <PropertyDetails key={id} />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetailsWithKey />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:id" element={<Agents />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CompareBar />
    </>
  )
}
