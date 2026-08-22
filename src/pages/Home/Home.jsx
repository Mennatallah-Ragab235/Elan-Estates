import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHead from '../../components/SectionHead/SectionHead.jsx'
import SearchFilters from '../../components/SearchFilters/SearchFilters.jsx'
import { featuredProperties, properties } from '../../data/properties.js'
import { agents } from '../../data/agents.js'
import { images as I } from '../../data/images.js'
import { formatPrice, formatArea } from '../../utils/format.js'
import { emptyFilters } from '../../hooks/usePropertyFilters.js'
import '../../styles/pages.css'

const journalExcerpts = [
  {
    cat: 'Guides',
    title: 'How to Choose the Right Home for Your Lifestyle',
    meta: '08 min read · 2026',
    img: I.JOURNAL_1,
  },
  {
    cat: 'Neighborhoods',
    title: "Inside New Cairo's Most Desired Neighborhoods",
    meta: '06 min read · 2026',
    img: I.JOURNAL_2,
  },
  {
    cat: 'Buying',
    title: '5 Things to Consider Before Buying Your First Villa',
    meta: '10 min read · 2026',
    img: I.JOURNAL_3,
  },
]

const lifestyles = [
  { key: 'c1', num: '01', label: 'Lifestyle', title: 'City', desc: 'For those who want everything close — restaurants, schools, and the energy of a district that never empties.', img: I.PORTRAIT_A, link: '/properties?location=New+Cairo' },
  { key: 'c2', num: '02', label: 'Lifestyle', title: 'Coast', desc: 'Slow mornings. Endless blue. A house that opens straight onto the sand.', img: I.COAST_A, link: '/properties?location=North+Coast' },
  { key: 'c3', num: '03', label: 'Lifestyle', title: 'Quiet', desc: 'Space to breathe, and the privacy of a wall you do not share.', img: I.VILLA_C, link: '/properties?location=Sheikh+Zayed' },
  { key: 'c4', num: '04', label: 'Lifestyle', title: 'Family', desc: 'Made for growing together — gardens, room to run, and streets built for bicycles.', img: I.GARDEN_A, link: '/properties?type=Villa' },
]

export default function Home() {
  const navigate = useNavigate()
  const [discoveryFilters, setDiscoveryFilters] = useState(emptyFilters)

  const onDiscoveryChange = (next) => {
    setDiscoveryFilters(next)
    const params = new URLSearchParams()
    if (next.location) params.set('location', next.location)
    if (next.type) params.set('type', next.type)
    if (next.bedrooms) params.set('bedrooms', next.bedrooms)
    if (next.status) params.set('status', next.status)
    if (next.maxPrice) params.set('maxPrice', next.maxPrice)
    if (next.minArea) params.set('minArea', next.minArea)
    if (next.sort) params.set('sort', next.sort)
    navigate(`/properties${params.toString() ? `?${params}` : ''}`)
  }
  const onDiscoveryReset = () => {
    setDiscoveryFilters({ ...emptyFilters })
    navigate('/properties')
  }

  return (
    <>
      <Navbar light />

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="bg" />
        <div className="scrim" />
        <div className="content">
          <div />
          <div className="center">
            <div className="eyebrow-row">
              <span>Élan Estates</span>
              <span className="dot" />
              <span>Collection 01</span>
              <span className="dot" />
              <span>2026</span>
            </div>
            <h1>
              <span className="line">A place worth</span>
              <span className="line"><span className="it">coming home to.</span></span>
            </h1>
            <p className="sub">
              Curated residences for those who appreciate the extraordinary —
              villas, penthouses and coastal retreats across Egypt's most considered addresses.
            </p>
            <div className="cta-row">
              <Link to="/properties" className="btn-elan btn-elan-light">
                Explore Residences <FiArrowRight size={14} className="arrow" />
              </Link>
              <Link to="/contact" className="link-arrow light">
                Speak to a consultant <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="bottom-bar">
            <div className="stat">
              <span className="v">{properties.length}</span>
              <span>Residences in collection</span>
            </div>
            <div className="stat">
              <span className="v">05</span>
              <span>Districts covered</span>
            </div>
            <div className="stat">
              <span className="v">2026</span>
              <span>Current collection</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="bar" />
        </div>
      </section>

      {/* ---------- INTRODUCTION ---------- */}
      <section className="intro">
        <div className="container-fluid-elan">
          <div className="grid">
            <Reveal className="text-col">
              <div className="num-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--bronze)' }}>
                <span style={{ flex: '0 0 48px', height: '1px', background: 'var(--bronze)' }} />
                <span className="section-num">01 / The Philosophy</span>
              </div>
              <h2>
                We don't just find <span className="it">addresses.</span>
                <br />
                We find places that become part of <span className="it">your story.</span>
              </h2>
              <p>
                Élan Estates began with a simple frustration: real estate in Egypt was being sold
                as inventory, not as a way of living. We curate residences the way a gallery curates
                a collection — each one chosen for its architecture, its light, and the life it makes possible.
              </p>
              <p>
                We do not list everything. We list what is worth listing.
              </p>
            </Reveal>
            <div className="img-col">
              <Reveal className="stack" img>
                <div className="frame">
                  <img src={I.VILLA_E} alt="Modern luxury villa exterior" loading="lazy" />
                  <div className="caption">
                    <span>The Courtyard Residence</span>
                    <span>New Cairo</span>
                  </div>
                </div>
                <div className="frame">
                  <img src={I.LIVING_C} alt="Minimalist living room" loading="lazy" />
                  <div className="caption">
                    <span>Living volume, Noor Penthouse</span>
                    <span>Interior</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEATURED RESIDENCES ---------- */}
      <section className="featured">
        <div className="container-fluid-elan">
          <SectionHead
            num="02 / Selected"
            title={<>Selected <em>Residences</em></>}
            intro="A small group of homes, hand-picked from this season's collection for their architecture, setting, and the way they hold the light."
          />
          <div className="asym-grid">
            <FeaturedCell property={featuredProperties[0]} index={0} size="big" />
            <FeaturedCell property={featuredProperties[1]} index={1} size="med" />
            <FeaturedCell property={featuredProperties[2]} index={2} size="wide" />
            <FeaturedCell property={properties.find((p) => p.id === 'cairo-courtyard')} index={3} size="tall" />
          </div>
          <div className="all-link">
            <Link to="/properties" className="btn-elan">
              View all residences <FiArrowRight size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- DISCOVERY ---------- */}
      <section className="discovery">
        <div className="container-fluid-elan">
          <SectionHead
            num="03 / Discovery"
            title={<>Find <em>your place</em></>}
            intro="Filter by location, type, size and budget. The collection updates as you refine — no page reloads, just the homes that fit."
          />
          <SearchFilters values={discoveryFilters} onChange={onDiscoveryChange} onReset={onDiscoveryReset} />
          <div className="result-row">
            <span>{properties.length} residences in the collection</span>
            <Link to="/properties" className="link-arrow light">
              Open full search <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- LIFESTYLES ---------- */}
      <section className="lifestyles">
        <div className="container-fluid-elan">
          <SectionHead
            num="04 / Way of living"
            title={<>Find your <em>way of living</em></>}
            intro="A residence is more than four walls. It is a daily rhythm. Begin with the life you want, and let the address follow."
          />
          <div className="life-grid">
            {lifestyles.map((l) => (
              <Link to={l.link} className={`life ${l.key}`} key={l.key}>
                <img src={l.img} alt={l.title} loading="lazy" />
                <div className="body">
                  <div className="top">
                    <span className="label">{l.label}</span>
                    <span className="num">{l.num}</span>
                  </div>
                  <div>
                    <h3>{l.title}</h3>
                    <p>{l.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- JOURNAL ---------- */}
      <section className="journal-home">
        <div className="container-fluid-elan">
          <SectionHead
            num="05 / Journal"
            title={<>The Élan <em>Journal</em></>}
            intro="Notes on architecture, neighbourhoods and the quiet details that make a house feel like home."
          />
          <div className="articles">
            {journalExcerpts.map((a, i) => (
              <Reveal className="article" key={i} delay={i * 80}>
                <Link to="/journal">
                  <div className="img-wrap img-zoom">
                    <img src={a.img} alt={a.title} loading="lazy" />
                  </div>
                  <div className="cat">{a.cat}</div>
                  <h3>{a.title}</h3>
                  <div className="meta">{a.meta}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AGENTS ---------- */}
      <section className="agents-home">
        <div className="container-fluid-elan">
          <SectionHead
            num="06 / Specialists"
            title={<>Meet your <em>property specialist</em></>}
            intro="Each consultant covers a single region, so the advice you get comes from someone who knows the streets by name."
          />
          <div className="agent-grid">
            {agents.map((a, i) => (
              <Reveal className="agent" key={a.id} delay={i * 80}>
                <Link to={`/agents/${a.id}`}>
                  <div className="portrait img-zoom">
                    <img src={a.portrait} alt={a.name} loading="lazy" />
                  </div>
                  <div className="role">{a.title}</div>
                  <h3>{a.name}</h3>
                  <div className="spec">{a.specialization}</div>
                  <div className="stats">
                    <div>
                      <span className="v">{a.listings}</span>
                      <span>Listings</span>
                    </div>
                    <div>
                      <span className="v">{a.location}</span>
                      <span>Region</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA STRIP ---------- */}
      <section className="cta-strip">
        <div className="container-fluid-elan">
          <Reveal>
            <h2>Let's find <em>your place.</em></h2>
            <p>
              Tell us how you want to live, and we'll match you with a residence
              that fits — quietly, without pressure, and with the time a decision like this deserves.
            </p>
            <Link to="/contact" className="btn-elan btn-elan-light">
              Start a conversation <FiArrowRight size={14} className="arrow" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}

function FeaturedCell({ property, index, size }) {
  if (!property) return null
  return (
    <Reveal className={`cell ${size}`} delay={index * 60}>
      <Link to={`/properties/${property.id}`}>
        <div className="media">
          <span className="tag">{property.type}</span>
          <img src={property.images.exterior} alt={property.title} loading="lazy" />
          <div className="overlay">
            <div className="loc">{property.location}</div>
            <h3>{property.title}</h3>
            <div className="specs">
              <span>{formatArea(property.area)}</span>
              <span>·</span>
              <span>{property.bedrooms} Beds</span>
              <span>·</span>
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="price">
              <span>{formatPrice(property.price)}</span>
              <span className="view">View residence →</span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
