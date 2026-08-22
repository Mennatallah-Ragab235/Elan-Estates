import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiColumns } from 'react-icons/fi'
import { formatPrice, formatArea } from '../../utils/format.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { useCompare } from '../../context/CompareContext.jsx'
import './PropertyCard.css'

export default function PropertyCard({ property, index, showActions = true, ratio = '4/5' }) {
  const [popped, setPopped] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { inCompare, toggleCompare, canAdd } = useCompare()

  const fav = isFavorite(property.id)
  const cmp = inCompare(property.id)
  const cmpDisabled = !cmp && !canAdd

  const onFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(property.id)
    setPopped(true)
    setTimeout(() => setPopped(false), 500)
  }
  const onCmp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (cmpDisabled) return
    toggleCompare(property.id)
  }

  const idx = String(index + 1).padStart(2, '0')

  return (
    <Link to={`/properties/${property.id}`} className="elan-card">
      <div className="media img-zoom" style={{ aspectRatio: ratio }}>
        <span className="tag">{property.type}</span>
        <img src={property.images.exterior} alt={property.title} loading="lazy" />
        <span className="index">{idx}</span>
        {showActions && (
          <div className="card-actions">
            <button
              className={`act ${fav ? 'active' : ''} ${popped ? 'pop' : ''}`}
              onClick={onFav}
              aria-label={fav ? 'Remove from saved' : 'Save residence'}
              title={fav ? 'Saved' : 'Save'}
            >
              <FiHeart size={15} fill={fav ? 'currentColor' : 'none'} />
            </button>
            <button
              className={`act ${cmp ? 'active' : ''} ${cmpDisabled ? 'disabled' : ''}`}
              onClick={onCmp}
              aria-label={cmp ? 'Remove from compare' : 'Add to compare'}
              title={cmp ? 'Comparing' : cmpDisabled ? 'Compare is full' : 'Compare'}
            >
              <FiColumns size={15} />
            </button>
          </div>
        )}
      </div>
      <div className="meta">
        <div className="loc">{property.location}</div>
        <h3>{property.title}</h3>
        <div className="specs">
          <span>{formatArea(property.area)}</span>
          <span>·</span>
          <span>{property.bedrooms} Bedrooms</span>
          <span>·</span>
          <span>{property.bathrooms} Baths</span>
        </div>
        <div className="price-row">
          <div className="price">
            <span className="cur">From</span>
            {formatPrice(property.price)}
          </div>
          <span className="view">
            View <span className="arrow">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
