import Reveal from '../Reveal/Reveal.jsx'
import './SectionHead.css'

export default function SectionHead({ num, title, intro, align = 'row' }) {
  return (
    <Reveal className="section-head">
      <div className="left">
        {num && (
          <div className="num-row">
            <span className="line" />
            <span className="section-num">{num}</span>
          </div>
        )}
        <h2>{title}</h2>
      </div>
      {intro && <p className="right">{intro}</p>}
    </Reveal>
  )
}
