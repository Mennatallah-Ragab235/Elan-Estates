import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiSearch, FiHeart, FiArrowUpRight } from 'react-icons/fi'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { useCompare } from '../../context/CompareContext.jsx'
import './Navbar.css'

const links = [
  { to: '/properties', label: 'Properties' },
  { to: '/locations', label: 'Locations' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'About' },
]

export default function Navbar({ light = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count } = useFavorites()
  const { count: compareCount } = useCompare()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const lightClass = light && !scrolled ? 'is-light' : ''
  const scrolledClass = scrolled ? 'is-scrolled' : ''

  return (
    <>
      <header className={`elan-nav ${lightClass} ${scrolledClass}`}>
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Élan Estates home">
            Élan<span className="accent"> Estates</span>
          </Link>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="nav-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link to="/properties" className="nav-action desktop-only">
              <FiSearch size={14} />
              <span>Search</span>
            </Link>
            <Link to="/saved" className="nav-action desktop-only">
              <FiHeart size={14} />
              <span>Saved</span>
              <span className={`badge ${count === 0 ? 'empty' : ''}`}>{count}</span>
            </Link>
            <Link to="/contact" className="nav-action desktop-only">
              <span>Contact</span>
            </Link>
            <button
              className={`burger ${open ? 'open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mm-meta">
          <span>Élan Estates</span>
          <span>Collection 01 / 2026</span>
        </div>
        <ul className="mm-links">
          {links.map((l, i) => (
            <li key={l.to}>
              <Link to={l.to}>
                <span>{l.label}</span>
                <span className="idx">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mm-actions">
          <Link to="/saved">
            <span>Saved Residences ({count})</span>
            <FiArrowUpRight />
          </Link>
          <Link to="/compare">
            <span>Compare ({compareCount})</span>
            <FiArrowUpRight />
          </Link>
          <Link to="/contact">
            <span>Start a Conversation</span>
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </>
  )
}
