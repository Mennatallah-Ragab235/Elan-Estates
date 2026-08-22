import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import { images as I } from '../../data/images.js'
import '../../styles/pages.css'

const articles = [
  {
    cat: 'Guides',
    title: 'How to Choose the Right Home for Your Lifestyle',
    excerpt: 'Before square footage and price, begin with a simpler question: what does an ordinary Tuesday look like here? The answer tells you more than any brochure.',
    meta: '08 min read · March 2026',
    img: I.JOURNAL_1,
  },
  {
    cat: 'Neighborhoods',
    title: "Inside New Cairo's Most Desired Neighborhoods",
    excerpt: 'From Katameya to Mountain View, a quiet tour of the districts that have come to define upscale living on Cairo\'s eastern edge.',
    meta: '06 min read · February 2026',
    img: I.JOURNAL_2,
  },
  {
    cat: 'Buying',
    title: '5 Things to Consider Before Buying Your First Villa',
    excerpt: 'Orientation, privacy, the slope of the land, the quality of the developer\'s previous work — and the one detail almost everyone overlooks.',
    meta: '10 min read · January 2026',
    img: I.JOURNAL_3,
  },
  {
    cat: 'Architecture',
    title: 'The Quiet Luxury of Natural Light',
    excerpt: 'Why the best architects obsess over where the sun enters at 4pm — and how to read a floor plan for light before you ever visit.',
    meta: '07 min read · January 2026',
    img: I.JOURNAL_4,
  },
  {
    cat: 'Coastal',
    title: 'A Season on the North Coast: What to Know Before You Buy',
    excerpt: 'First line, second line, and the plots that catch the western light. A grounded guide to buying on the Mediterranean.',
    meta: '09 min read · December 2025',
    img: I.COAST_A,
  },
  {
    cat: 'Investment',
    title: 'Off-Plan in the New Capital: Risks and Realities',
    excerpt: 'Early-stage pricing can be attractive, but the contract matters more than the render. Here is what to read carefully.',
    meta: '11 min read · December 2025',
    img: I.PORTRAIT_B,
  },
]

export default function Journal() {
  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs"><Link to="/">Élan</Link> / <span>Journal</span></div>
          <div className="eyebrow"><span className="line" /><span>Reading</span></div>
          <h1>The Élan <em>Journal.</em></h1>
          <p className="lede">
            Essays on architecture, neighbourhoods and the quiet details that turn a house into a home.
          </p>
        </div>
      </section>

      <section className="journal-page">
        <div className="container-fluid-elan">
          <div className="articles-grid">
            {articles.map((a, i) => (
              <Reveal className="article" key={i} delay={(i % 3) * 80}>
                <article>
                  <div className="img-wrap img-zoom">
                    <img src={a.img} alt={a.title} loading="lazy" />
                  </div>
                  <div className="cat">{a.cat}</div>
                  <h3>{a.title}</h3>
                  <p className="excerpt">{a.excerpt}</p>
                  <div className="meta">{a.meta}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
