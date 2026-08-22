import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import { images as I } from '../../data/images.js'
import { properties } from '../../data/properties.js'
import '../../styles/pages.css'

const locData = [
  { name: 'New Cairo', desc: 'Gated communities, golf courses and the city\'s widest plots — the eastern edge of Cairo, planned and green.', img: I.VILLA_E, query: 'New Cairo' },
  { name: 'Sheikh Zayed', desc: 'West Cairo\'s orderly counterpart: wide boulevards, family compounds and quick access to the 6th of October corridor.', img: I.VILLA_B, query: 'Sheikh Zayed' },
  { name: 'North Coast', desc: 'The Mediterranean escape. First-line villas and chalets from Marassi to Hacienda, built for long summers.', img: I.COAST_A, query: 'North Coast' },
  { name: 'Ain Sokhna', desc: 'Red Sea weekends, an hour from the capital. Sea-view villas organized around courtyards and lap pools.', img: I.VILLA_C, query: 'Ain Sokhna' },
  { name: 'New Capital', desc: 'High-rise living on the CBD and the Green River — apartments and penthouses in the city being built from scratch.', img: I.PORTRAIT_B, query: 'New Capital' },
]

export default function Locations() {
  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs"><Link to="/">Élan</Link> / <span>Locations</span></div>
          <div className="eyebrow"><span className="line" /><span>Where we work</span></div>
          <h1>Five <em>districts,</em> one standard.</h1>
          <p className="lede">
            We focus on the regions we know intimately — every street, developer and micro-market.
            Choose a district to see the residences within it.
          </p>
        </div>
      </section>

      <section className="locations-page">
        <div className="container-fluid-elan">
          <div className="loc-cards">
            {locData.map((l, i) => {
              const count = properties.filter((p) => p.location === l.name).length
              return (
                <Reveal key={l.name} delay={(i % 2) * 80}>
                  <Link to={`/properties?location=${encodeURIComponent(l.query)}`} className="loc-card">
                    <img src={l.img} alt={l.name} loading="lazy" />
                    <div className="body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span className="count">{count} residences</span>
                        <span className="count">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <h3>{l.name}</h3>
                        <p className="desc">{l.desc}</p>
                        <span className="link-arrow light" style={{ marginTop: '0.8rem' }}>
                          Explore <span className="arrow">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
