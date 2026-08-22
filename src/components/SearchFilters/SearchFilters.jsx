import './SearchFilters.css'

const priceBands = ['', '5000000', '10000000', '15000000', '20000000']
const priceLabels = ['', 'up to 5M', 'up to 10M', 'up to 15M', 'up to 20M']
const areaBands = ['', '150', '250', '350', '450']
const areaLabels = ['', '150 m²+', '250 m²+', '350 m²+', '450 m²+']

export default function SearchFilters({ values, onChange, onReset, compact = false }) {
  const update = (key, val) => onChange({ ...values, [key]: val })

  const fields = [
    { key: 'location', label: 'Location', options: ['', 'New Cairo', 'Sheikh Zayed', 'North Coast', 'Ain Sokhna', 'New Capital'] },
    { key: 'type', label: 'Property Type', options: ['', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Chalet'] },
    { key: 'bedrooms', label: 'Bedrooms', options: ['', '2', '3', '4', '5'] },
    { key: 'status', label: 'Status', options: ['', 'For Sale', 'Off-Plan'] },
  ]

  return (
    <div className={`search-filters ${compact ? 'compact' : ''}`}>
      <div className="filter-grid">
        {fields.map((f) => (
          <div className="field filled" key={f.key}>
            <select
              value={values[f.key] || ''}
              onChange={(e) => update(f.key, e.target.value)}
              aria-label={f.label}
            >
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o === '' ? `Any ${f.label}` : o}
                </option>
              ))}
            </select>
            <label>{f.label}</label>
          </div>
        ))}

        <div className="field filled">
          <select
            value={values.maxPrice || ''}
            onChange={(e) => update('maxPrice', e.target.value)}
            aria-label="Maximum price"
          >
            {priceBands.map((p, i) => (
              <option key={p} value={p}>
                {priceLabels[i] === '' ? 'Any Price' : priceLabels[i]}
              </option>
            ))}
          </select>
          <label>Price</label>
        </div>

        <div className="field filled">
          <select
            value={values.minArea || ''}
            onChange={(e) => update('minArea', e.target.value)}
            aria-label="Minimum area"
          >
            {areaBands.map((a, i) => (
              <option key={a} value={a}>
                {areaLabels[i] === '' ? 'Any Area' : areaLabels[i]}
              </option>
            ))}
          </select>
          <label>Area</label>
        </div>

        <div className="field filled">
          <select
            value={values.sort || ''}
            onChange={(e) => update('sort', e.target.value)}
            aria-label="Sort"
          >
            <option value="">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="area">Area</option>
          </select>
          <label>Sort</label>
        </div>

        <div className="actions">
          <button className="btn-elan" type="button" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
