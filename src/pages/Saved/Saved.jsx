import { Link } from 'react-router-dom'
import { FiArrowRight, FiHeart } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { properties } from '../../data/properties.js'
import '../../styles/pages.css'

export default function Saved() {
  const { ids, clearFavorites } = useFavorites()
  const saved = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs"><Link to="/">Élan</Link> / <span>Saved</span></div>
          <div className="eyebrow"><span className="line" /><span>Your collection</span></div>
          <h1>Saved <em>residences.</em></h1>
          <p className="lede">
            The homes you've set aside. Saved to this device — return any time, and they'll still be here.
          </p>
        </div>
      </section>

      <section className="saved-page">
        <div className="container-fluid-elan">
          {saved.length > 0 ? (
            <>
              <div className="toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div className="count" style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)' }}>
                  <span style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-serif)', fontSize: '16px' }}>{saved.length}</span> saved
                </div>
                <button className="btn-elan" onClick={clearFavorites}>Clear all</button>
              </div>
              <div className="grid">
                {saved.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <FiHeart size={28} style={{ color: 'var(--stone)', marginBottom: '1rem' }} />
              <h3>No saved residences yet.</h3>
              <p>Tap the heart on any property to keep it here for later.</p>
              <Link to="/properties" className="btn-elan">
                Browse residences <FiArrowRight size={14} className="arrow" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
