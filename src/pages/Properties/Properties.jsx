import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import SearchFilters from '../../components/SearchFilters/SearchFilters.jsx'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import { usePropertyFilters, emptyFilters } from '../../hooks/usePropertyFilters.js'
import '../../styles/pages.css'

export default function Properties() {
  const [params] = useSearchParams()
  const initial = useMemo(() => {
    const f = { ...emptyFilters }
    const loc = params.get('location')
    const type = params.get('type')
    const bedrooms = params.get('bedrooms')
    const status = params.get('status')
    const maxPrice = params.get('maxPrice')
    const minArea = params.get('minArea')
    const sort = params.get('sort')
    if (loc) f.location = loc.replace(/\+/g, ' ')
    if (type) f.type = type
    if (bedrooms) f.bedrooms = bedrooms
    if (status) f.status = status
    if (maxPrice) f.maxPrice = maxPrice
    if (minArea) f.minArea = minArea
    if (sort) f.sort = sort
    return f
  }, [params])

  const [filters, setFilters] = useState(initial)
  const results = usePropertyFilters(filters)

  useEffect(() => {
    setFilters(initial)
  }, [initial])

  const onChange = (next) => setFilters(next)
  const onReset = () => setFilters({ ...emptyFilters })

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs">
            <Link to="/">Élan</Link> / <span>Properties</span>
          </div>
          <div className="eyebrow">
            <span className="line" />
            <span>The Collection</span>
          </div>
          <h1>Every <em>residence</em>, in one place.</h1>
          <p className="lede">
            {results.length} homes across New Cairo, Sheikh Zayed, the North Coast, Ain Sokhna and the New Capital — filtered, sorted and ready to explore.
          </p>
        </div>
      </section>

      <section className="properties-page">
        <div className="container-fluid-elan">
          <Reveal>
            <SearchFilters values={filters} onChange={onChange} onReset={onReset} />
          </Reveal>

          <div className="toolbar">
            <div className="count">
              <span className="v">{results.length}</span> residences match your search
            </div>
            <div className="count">
              {filters.sort ? `Sorted: ${filters.sort === 'newest' ? 'Newest first' : filters.sort === 'price-asc' ? 'Price low to high' : filters.sort === 'price-desc' ? 'Price high to low' : filters.sort === 'area' ? 'Largest area' : filters.sort}` : 'Sorted by featured'}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 70}>
                  <PropertyCard property={p} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No residences match this search.</h3>
              <p>Try widening your filters — remove a location or raise the budget.</p>
              <button className="btn-elan" onClick={onReset}>
                Reset filters <FiArrowRight size={14} className="arrow" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
