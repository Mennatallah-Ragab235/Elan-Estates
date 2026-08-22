import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHead from '../../components/SectionHead/SectionHead.jsx'
import { images as I } from '../../data/images.js'
import '../../styles/pages.css'

const principles = [
  { num: '01', title: 'Curate, do not list', body: 'We turn down more residences than we accept. A home enters the collection only when its architecture, setting and light meet a standard we would defend in conversation.' },
  { num: '02', title: 'Listen before you pitch', body: 'The first meeting is a question, not a presentation. We learn how you live — mornings, weekends, the way you use a kitchen — before we suggest a single address.' },
  { num: '03', title: 'One region per consultant', body: 'A specialist who covers everything knows nothing deeply. Each of our consultants owns a single district, so the advice comes from someone who walks those streets.' },
  { num: '04', title: 'Time, not pressure', body: 'A home is the largest decision most people will make. We move at your pace, and we have yet to meet a deadline that justified a rushed view.' },
  { num: '05', title: 'Architecture first', body: 'We read floor plans the way a designer reads a section. Orientation, proportion, the path of the sun — these matter more than the brochure.' },
  { num: '06', title: 'After the sale', body: 'The relationship does not end at the contract. We stay close for renovations, rentals and the next move, whenever it comes.' },
]

export default function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        {/* ---------- INTRO ---------- */}
        <section className="about-intro">
          <div className="container-fluid-elan">
            <div className="grid">
              <Reveal>
                <div className="num-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--bronze)', marginBottom: '1.8rem' }}>
                  <span style={{ flex: '0 0 48px', height: '1px', background: 'var(--bronze)' }} />
                  <span className="section-num">The Studio</span>
                </div>
                <h2>A real-estate studio, <em>not</em> an agency.</h2>
              </Reveal>
              <Reveal className="body" delay={80}>
                <p>
                  Élan Estates was founded in Cairo on a simple belief: that buying a home should feel
                  less like a transaction and more like a curatorial decision. We treat each residence
                  as a piece of architecture first, and as an asset second.
                </p>
                <p>
                  We work across five districts — New Cairo, Sheikh Zayed, the North Coast, Ain Sokhna
                  and the New Capital — and we deliberately keep the collection small. A larger inventory
                  would dilute the standard, and the standard is the only thing that makes the work worth doing.
                </p>
                <p>
                  What you see on this site is not everything available in Egypt. It is everything we
                  would be willing to put our name to.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- IMAGE ---------- */}
        <section className="about-image">
          <div className="container-fluid-elan">
            <Reveal className="frame" img>
              <img src={I.VILLA_F} alt="Contemporary luxury villa" loading="lazy" />
            </Reveal>
          </div>
        </section>

        {/* ---------- PRINCIPLES ---------- */}
        <section className="principles">
          <div className="container-fluid-elan">
            <SectionHead
              num="What we believe"
              title={<>Six principles <em>we won't bend.</em></>}
              intro="The rules we apply to every residence, every client and every conversation."
            />
            <div className="plist">
              {principles.map((p, i) => (
                <Reveal className="p-item" key={p.num} delay={(i % 3) * 80}>
                  <div className="num">{p.num}</div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="cta-strip">
          <div className="container-fluid-elan">
            <Reveal>
              <h2>Begin with a <em>conversation.</em></h2>
              <p>
                No forms to fill, no commitments. Just tell us how you want to live, and we'll take it from there.
              </p>
              <Link to="/contact" className="btn-elan btn-elan-light">
                Start a conversation <FiArrowRight size={14} className="arrow" />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
