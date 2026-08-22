import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="elan-footer">
      <div className="container-fluid-elan">
        <div className="footer-top">
          <div className="brand-block">
            <div className="brand">
              Élan<span className="accent"> Estates</span>
            </div>
            <p className="tagline">Places worth living for.</p>
          </div>
          <div className="col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/locations">Locations</Link></li>
              <li><Link to="/agents">Agents</Link></li>
              <li><Link to="/journal">Journal</Link></li>
            </ul>
          </div>
          <div className="col">
            <h4>Studio</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/saved">Saved</Link></li>
              <li><Link to="/compare">Compare</Link></li>
            </ul>
          </div>
          <div className="col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@elanestates.eg">hello@elanestates.eg</a></li>
              <li><a href="tel:+202100000000">+20 100 000 0000</a></li>
              <li>New Cairo, Egypt</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Élan Estates</span>
          <div className="meta">
            <span>Collection 01</span>
            <span>Cairo · Egypt</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
