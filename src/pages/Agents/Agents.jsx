import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiMail } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHead from '../../components/SectionHead/SectionHead.jsx'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'
import { agents } from '../../data/agents.js'
import { properties } from '../../data/properties.js'
import '../../styles/pages.css'

export default function Agents() {
  const { id } = useParams()
  const agent = id ? agents.find((a) => a.id === id) : null

  if (id && !agent) {
    return (
      <>
        <Navbar />
        <section className="page-header">
          <div className="container-fluid-elan">
            <h1>Specialist not found.</h1>
            <Link to="/agents" className="btn-elan" style={{ marginTop: '1.5rem' }}>
              Back to all specialists <FiArrowRight size={14} className="arrow" />
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  if (agent) {
    const listings = properties.filter((p) => p.agentId === agent.id)
    return (
      <>
        <Navbar />
        <section className="page-header dark">
          <div className="container-fluid-elan">
            <div className="crumbs" style={{ color: 'var(--stone)' }}>
              <Link to="/agents">Specialists</Link> / <span>{agent.name}</span>
            </div>
            <div className="eyebrow"><span className="line" /><span>{agent.title}</span></div>
            <h1 style={{ color: 'var(--ivory)' }}>{agent.name}</h1>
            <p className="lede">{agent.about}</p>
          </div>
        </section>

        <section className="agents-page">
          <div className="container-fluid-elan">
            <div className="agent-detail-grid">
              <Reveal className="portrait" img style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <img src={agent.portrait} alt={agent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Reveal>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.2rem' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.4rem' }}>Specialization</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>{agent.specialization}</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.2rem' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.4rem' }}>Region</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>{agent.location}</div>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '1.2rem' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '0.4rem' }}>Active listings</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem' }}>{agent.listings}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <a href={`tel:${agent.phone}`} className="btn-elan"><FiPhone size={14} /> Call</a>
                    <a href={`mailto:${agent.email}`} className="btn-elan"><FiMail size={14} /> Email</a>
                  </div>
                </div>
              </div>
            </div>

            <SectionHead num="Listings" title={<>Residences by <em>{agent.name.split(' ')[0]}</em></>} />
            <div className="grid">
              {listings.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs"><Link to="/">Élan</Link> / <span>Specialists</span></div>
          <div className="eyebrow"><span className="line" /><span>The team</span></div>
          <h1>Meet your <em>property specialist.</em></h1>
          <p className="lede">
            Each consultant covers a single region. They know the streets, the developers and the
            back-street details that never make it into a listing.
          </p>
        </div>
      </section>

      <section className="agents-page">
        <div className="container-fluid-elan">
          <div className="grid">
            {agents.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <Link to={`/agents/${a.id}`} className="agent" style={{ display: 'block' }}>
                  <div className="portrait" style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: '1.4rem' }}>
                    <img src={a.portrait} alt={a.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)', transition: 'all 1.6s var(--ease)' }} />
                  </div>
                  <div className="role" style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--bronze)' }}>{a.title}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.6rem', margin: '0.5rem 0 0.8rem' }}>{a.name}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--charcoal-soft)', marginBottom: '1rem' }}>{a.specialization}</div>
                  <div className="stats" style={{ display: 'flex', gap: '2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--line)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--stone)' }}>
                    <div><span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--charcoal)', display: 'block', letterSpacing: 0 }}>{a.listings}</span>Listings</div>
                    <div><span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--charcoal)', display: 'block', letterSpacing: 0 }}>{a.location}</span>Region</div>
                  </div>
                  <span className="link-arrow" style={{ marginTop: '1.2rem', display: 'inline-flex' }}>View profile <span className="arrow">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
