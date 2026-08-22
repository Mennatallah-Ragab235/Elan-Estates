import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMaximize2, FiX, FiHeart, FiColumns, FiPhone, FiMail } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHead from '../../components/SectionHead/SectionHead.jsx'
import MortgageCalculator from '../../components/MortgageCalculator/MortgageCalculator.jsx'
import { properties } from '../../data/properties.js'
import { agents } from '../../data/agents.js'
import { formatPriceFull, formatArea } from '../../utils/format.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { useCompare } from '../../context/CompareContext.jsx'
import '../../styles/pages.css'

const galleryOrder = [
  { key: 'exterior', label: 'Exterior' },
  { key: 'living', label: 'Living Room' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'garden', label: 'Garden' },
]

export default function PropertyDetails() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)
  const [activeImg, setActiveImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [floorIdx, setFloorIdx] = useState(0)
  const [activeRoom, setActiveRoom] = useState(0)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { inCompare, toggleCompare, canAdd } = useCompare()

  if (!property) {
    return (
      <>
        <Navbar />
        <section className="page-header">
          <div className="container-fluid-elan">
            <h1>Residence not found.</h1>
            <p className="lede">This property may have left the collection.</p>
            <Link to="/properties" className="btn-elan" style={{ marginTop: '1.5rem' }}>
              Back to all residences <FiArrowRight size={14} className="arrow" />
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  const gallery = galleryOrder.map((g) => ({ ...g, src: property.images[g.key] }))
  const agent = agents.find((a) => a.id === property.agentId)
  const floor = property.floors[floorIdx]
  const fav = isFavorite(property.id)
  const cmp = inCompare(property.id)
  const cmpDisabled = !cmp && !canAdd

  const prevImg = () => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length)
  const nextImg = () => setActiveImg((i) => (i + 1) % gallery.length)

  return (
    <>
      <Navbar />
      <div className="detail-page">
        {/* ---------- HEADER ---------- */}
        <section className="detail-hero">
          <div className="container-fluid-elan">
            <div className="crumbs" style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)', marginBottom: '1.6rem' }}>
              <Link to="/properties">All residences</Link> / <span>{property.title}</span>
            </div>
            <div className="head-row">
              <div>
                <div className="loc">{property.location}, Egypt</div>
                <h1>{property.title}</h1>
              </div>
              <div className="price-block">
                <div className="lbl">Asking price</div>
                <div className="v">{formatPriceFull(property.price)}</div>
                <span className="status">{property.status}</span>
              </div>
            </div>

            {/* ---------- GALLERY ---------- */}
            <div className="gallery-main" onClick={() => setLightbox(true)}>
              <img src={gallery[activeImg].src} alt={`${property.title} — ${gallery[activeImg].label}`} />
              <button className="nav-btn prev" onClick={(e) => { e.stopPropagation(); prevImg() }} aria-label="Previous image">
                <FiChevronLeft size={20} />
              </button>
              <button className="nav-btn next" onClick={(e) => { e.stopPropagation(); nextImg() }} aria-label="Next image">
                <FiChevronRight size={20} />
              </button>
              <button className="fullscreen-btn" onClick={(e) => { e.stopPropagation(); setLightbox(true) }}>
                <FiMaximize2 size={13} /> Fullscreen
              </button>
              <div className="counter">{String(activeImg + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</div>
            </div>
            <div className="gallery-thumbs">
              {gallery.map((g, i) => (
                <button
                  key={g.key}
                  className={i === activeImg ? 'active' : ''}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View ${g.label}`}
                >
                  <img src={g.src} alt={g.label} loading="lazy" />
                  <span className="label">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- OVERVIEW ---------- */}
        <section className="detail-body">
          <div className="container-fluid-elan">
            <div className="overview-grid">
              <Reveal className="desc">
                <h2>A home built around light and proportion.</h2>
                <p>{property.description}</p>
                <ul className="features">
                  {property.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Reveal>

              <div className="facts-panel">
                <h3>Key facts</h3>
                <div className="fact-row"><span className="k">Area</span><span className="v">{formatArea(property.area)}</span></div>
                <div className="fact-row"><span className="k">Bedrooms</span><span className="v">{property.bedrooms}</span></div>
                <div className="fact-row"><span className="k">Bathrooms</span><span className="v">{property.bathrooms}</span></div>
                <div className="fact-row"><span className="k">Parking</span><span className="v">{property.parking}</span></div>
                <div className="fact-row"><span className="k">Type</span><span className="v">{property.type}</span></div>
                <div className="fact-row"><span className="k">Status</span><span className="v">{property.status}</span></div>
                <div className="actions">
                  <button
                    className={`btn-elan ${fav ? 'btn-elan-fill' : ''}`}
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <FiHeart size={14} fill={fav ? 'currentColor' : 'none'} /> {fav ? 'Saved' : 'Save residence'}
                  </button>
                  <button
                    className={`btn-elan ${cmp ? 'btn-elan-fill' : ''} ${cmpDisabled ? 'disabled' : ''}`}
                    onClick={() => !cmpDisabled && toggleCompare(property.id)}
                    style={cmpDisabled && !cmp ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                  >
                    <FiColumns size={14} /> {cmp ? 'Comparing' : cmpDisabled ? 'Compare full' : 'Add to compare'}
                  </button>
                </div>
                {agent && (
                  <div className="agent-mini">
                    <div className="av">
                      <img src={agent.portrait} alt={agent.name} />
                    </div>
                    <div className="info">
                      <div className="role">Your consultant</div>
                      <div className="name">{agent.name}</div>
                    </div>
                    <Link to={`/agents/${agent.id}`} style={{ marginLeft: 'auto', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bronze)' }}>
                      Profile →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- THE SPACE / FLOOR PLAN ---------- */}
        <section className="the-space">
          <div className="container-fluid-elan">
            <SectionHead
              num="The Space"
              title={<>The <em>architecture</em>, floor by floor.</>}
              intro="Select a level, then a room, to understand how the residence is organized."
            />
            <div className="plan-grid">
              <Reveal className="plan-visual" img>
                <FloorPlanSvg floor={floor} activeRoom={activeRoom} onSelect={setActiveRoom} />
              </Reveal>
              <div className="plan-side">
                <div className="floor-tabs">
                  {property.floors.map((f, i) => (
                    <button
                      key={f.name}
                      className={i === floorIdx ? 'active' : ''}
                      onClick={() => { setFloorIdx(i); setActiveRoom(0) }}
                    >
                      {f.name} · {formatArea(f.area)}
                    </button>
                  ))}
                </div>
                <h3>{floor.name}</h3>
                <div style={{ color: 'var(--stone-light)', fontSize: '13px', marginBottom: '1.5rem' }}>
                  {formatArea(floor.area)} · {floor.rooms.length} rooms
                </div>
                <div className="room-list">
                  {floor.rooms.map((r, i) => (
                    <button
                      key={r}
                      className={i === activeRoom ? 'active' : ''}
                      onClick={() => setActiveRoom(i)}
                    >
                      <span>{r}</span>
                      <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  ))}
                </div>
                <div className="room-detail">
                  <div className="rn">{floor.rooms[activeRoom]}</div>
                  <div className="meta">Part of {floor.name} · {formatArea(floor.area)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- LOCATION ---------- */}
        <section className="location-section">
          <div className="container-fluid-elan">
            <SectionHead
              num="Location"
              title={<>Where you'll <em>be.</em></>}
              intro={`${property.location} — a district chosen for its balance of access, privacy and light.`}
            />
            <div className="loc-grid">
              <Reveal className="map-visual" img>
                <LocationMapSvg nearby={property.nearby} />
              </Reveal>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.6rem', margin: '0 0 0.4rem' }}>
                  {property.location}
                </h3>
                <p style={{ color: 'var(--charcoal-soft)', fontSize: '15px', lineHeight: 1.7, margin: '0 0 1rem' }}>
                  Driving times from the residence to nearby landmarks. Distances are indicative and measured
                  at off-peak hours.
                </p>
                <ul className="nearby-list">
                  {property.nearby.map((n) => (
                    <li key={n.name}>
                      <span className="name">{n.name}</span>
                      <span className="time">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- MORTGAGE ---------- */}
        <section className="mortgage">
          <div className="container-fluid-elan">
            <SectionHead
              num="Finance"
              title={<>Estimate your <em>monthly payment.</em></>}
              intro="Adjust the price, down payment, term and rate to see an indicative monthly figure."
            />
            <MortgageCalculator defaultPrice={property.price} />
          </div>
        </section>
      </div>

      {lightbox && (
        <Lightbox
          gallery={gallery}
          index={activeImg}
          onClose={() => setLightbox(false)}
          onPrev={prevImg}
          onNext={nextImg}
        />
      )}

      <Footer />
    </>
  )
}

/* ---------- Floor plan SVG ---------- */
function FloorPlanSvg({ floor, activeRoom, onSelect }) {
  const rooms = floor.rooms
  const cols = Math.ceil(Math.sqrt(rooms.length))
  const cellW = 100 / cols
  const rows = Math.ceil(rooms.length / cols)
  const cellH = 100 / rows
  return (
    <svg viewBox="0 0 100 75" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <rect x="2" y="2" width="96" height="71" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
      {rooms.map((r, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = 2 + col * cellW * 0.96 + 1
        const y = 2 + row * cellH * 0.94 + 1
        const w = cellW * 0.96 - 1.5
        const h = cellH * 0.94 - 1.5
        const active = i === activeRoom
        return (
          <g key={r} onClick={() => onSelect(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(i) } }} tabIndex={0} role="button" aria-label={`Room: ${r}${active ? ' (selected)' : ''}`} style={{ cursor: 'pointer', outline: active ? '2px solid var(--bronze)' : 'none' }}>
            <rect
              x={x} y={y} width={w} height={h}
              fill={active ? 'rgba(154,128,100,0.5)' : 'rgba(255,255,255,0.06)'}
              stroke={active ? 'var(--bronze)' : 'rgba(255,255,255,0.18)'}
              strokeWidth="0.3"
              style={{ transition: 'fill 0.4s var(--ease)' }}
            />
            <text
              x={x + w / 2} y={y + h / 2}
              fill={active ? '#fff' : 'rgba(245,241,234,0.7)'}
              fontSize="2.1" fontFamily="Inter, sans-serif" textAnchor="middle"
              style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              {r.length > 12 ? r.slice(0, 11) + '…' : r}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Location map SVG ---------- */
function LocationMapSvg({ nearby }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      <rect x="0" y="0" width="100" height="100" fill="#ece5d8" />
      {/* grid lines */}
      {[20, 40, 60, 80].map((p) => (
        <g key={p}>
          <line x1={p} y1="0" x2={p} y2="100" stroke="#d6cec2" strokeWidth="0.3" />
          <line x1="0" y1={p} x2="100" y2={p} stroke="#d6cec2" strokeWidth="0.3" />
        </g>
      ))}
      {/* roads */}
      <path d="M 0 55 Q 30 50 50 55 T 100 50" stroke="#a69d91" strokeWidth="1.4" fill="none" />
      <path d="M 45 0 L 50 40 L 55 100" stroke="#a69d91" strokeWidth="1.2" fill="none" />
      <path d="M 0 30 L 100 35" stroke="#c4bcae" strokeWidth="0.8" fill="none" />
      <path d="M 70 0 L 68 100" stroke="#c4bcae" strokeWidth="0.8" fill="none" />
      {/* residence marker */}
      <g>
        <circle cx="50" cy="52" r="3.5" fill="#9a8064" />
        <circle cx="50" cy="52" r="1.4" fill="#fff" />
        <text x="50" y="46" fontSize="3" fontFamily="Cormorant Garamond, serif" textAnchor="middle" fill="#1d1d1b">Residence</text>
      </g>
      {/* nearby markers */}
      {nearby.slice(0, 4).map((n, i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = 50 + Math.cos(angle) * 28
        const y = 52 + Math.sin(angle) * 28
        return (
          <g key={n.name}>
            <line x1="50" y1="52" x2={x} y2={y} stroke="#a69d91" strokeWidth="0.4" strokeDasharray="1.5 1.5" />
            <circle cx={x} cy={y} r="2" fill="#1d1d1b" />
            <text x={x} y={y - 3} fontSize="2.4" fontFamily="Inter, sans-serif" textAnchor="middle" fill="#1d1d1b" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {n.name.length > 14 ? n.name.slice(0, 13) + '…' : n.name}
            </text>
            <text x={x} y={y + 5} fontSize="2.2" fontFamily="Inter, sans-serif" textAnchor="middle" fill="#9a8064">
              {n.time}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Lightbox ---------- */
function Lightbox({ gallery, index, onClose, onPrev, onNext }) {
  useEffectKeydown(onClose, onPrev, onNext)
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="close" onClick={onClose}><FiX size={16} /> Close</button>
      <button className="nav prev" onClick={(e) => { e.stopPropagation(); onPrev() }}><FiChevronLeft size={28} /></button>
      <div className="img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={gallery[index].src} alt={gallery[index].label} />
      </div>
      <button className="nav next" onClick={(e) => { e.stopPropagation(); onNext() }}><FiChevronRight size={28} /></button>
      <div className="cap">{gallery[index].label} · {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</div>
    </div>
  )
}

function useEffectKeydown(onClose, onPrev, onNext) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])
}
