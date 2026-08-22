import { Link } from 'react-router-dom'
import { FiX, FiArrowRight } from 'react-icons/fi'
import { useCompare } from '../../context/CompareContext.jsx'
import { properties } from '../../data/properties.js'
import './CompareBar.css'

export default function CompareBar() {
  const { ids, count, max, toggleCompare, clearCompare } = useCompare()
  const items = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean)

  if (count === 0) return null

  return (
    <div className="compare-bar show">
      <div className="inner">
        <span className="label">Comparing {count}/{max}</span>
        <div className="slots">
          {items.map((p) => (
            <div className="slot" key={p.id}>
              <img src={p.images.exterior} alt={p.title} />
              <span className="name">{p.title}</span>
              <button className="rm" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.title}`}>
                <FiX size={14} />
              </button>
            </div>
          ))}
          {Array.from({ length: max - count }).map((_, i) => (
            <div className="slot empty" key={`e-${i}`}>+ Add</div>
          ))}
        </div>
        <Link to="/compare" className="btn-elan btn-elan-light">
          Compare <FiArrowRight size={14} />
        </Link>
        <button className="clear" onClick={clearCompare}>Clear</button>
      </div>
    </div>
  )
}
