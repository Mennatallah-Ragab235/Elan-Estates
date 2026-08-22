import { Link } from 'react-router-dom'
import { FiArrowRight, FiX } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { useCompare } from '../../context/CompareContext.jsx'
import { properties } from '../../data/properties.js'
import { formatPriceFull, formatArea } from '../../utils/format.js'
import '../../styles/pages.css'

const rows = [
  { key: 'price', label: 'Price', render: (p) => formatPriceFull(p.price) },
  { key: 'area', label: 'Area', render: (p) => formatArea(p.area) },
  { key: 'bedrooms', label: 'Bedrooms', render: (p) => p.bedrooms },
  { key: 'bathrooms', label: 'Bathrooms', render: (p) => p.bathrooms },
  { key: 'location', label: 'Location', render: (p) => p.location },
  { key: 'type', label: 'Property Type', render: (p) => p.type },
  { key: 'status', label: 'Status', render: (p) => p.status },
]

export default function Compare() {
  const { ids, count, max, toggleCompare, clearCompare } = useCompare()
  const items = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs"><Link to="/">Élan</Link> / <span>Compare</span></div>
          <div className="eyebrow"><span className="line" /><span>Side by side</span></div>
          <h1>Compare <em>residences.</em></h1>
          <p className="lede">
            Select up to {max} homes and weigh them against each other — price, size, rooms, location and status.
          </p>
        </div>
      </section>

      <section className="compare-page">
        <div className="container-fluid-elan">
          {count > 0 ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)' }}>
                  Comparing {count} of {max}
                </span>
                <button className="btn-elan" onClick={clearCompare}>Clear all</button>
              </div>
              <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="col-prop">Specification</th>
                    {items.map((p) => (
                      <th key={p.id} className="prop-cell">
                        <div className="prop-card">
                          <div className="img"><img src={p.images.exterior} alt={p.title} /></div>
                          <h3>{p.title}</h3>
                          <div className="loc">{p.location}</div>
                          <button className="rm" onClick={() => toggleCompare(p.id)}>Remove</button>
                        </div>
                      </th>
                    ))}
                    {Array.from({ length: max - count }).map((_, i) => (
                      <th key={`e-${i}`} className="prop-cell" style={{ color: 'var(--stone)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', verticalAlign: 'bottom' }}>
                        Empty slot
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.key}>
                      <td className="col-prop row-k">{r.label}</td>
                      {items.map((p) => (
                        <td key={p.id} className="row-v">{r.render(p)}</td>
                      ))}
                      {Array.from({ length: max - count }).map((_, i) => (
                        <td key={`e-${i}`} style={{ color: 'var(--stone)' }}>—</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/properties" className="btn-elan">
                  Add more residences <FiArrowRight size={14} className="arrow" />
                </Link>
              </div>
            </>
          ) : (
            <div className="compare-empty">
              <h3>Nothing to compare yet.</h3>
              <p>Open any residence and tap the compare icon to add it here.</p>
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
