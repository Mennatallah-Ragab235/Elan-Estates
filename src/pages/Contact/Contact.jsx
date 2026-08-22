import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import Navbar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import { locations, propertyTypes } from '../../data/properties.js'
import '../../styles/pages.css'

const initial = {
  name: '',
  email: '',
  phone: '',
  location: '',
  type: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (!form.email.trim()) e.email = 'An email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email does not look right.'
    if (!form.phone.trim()) e.phone = 'A phone number helps us reach you.'
    else if (!/^[+\d][\d\s-]{6,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number.'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'A few words about what you are looking for would help.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setForm(initial)
    }
  }

  return (
    <>
      <Navbar />
      <section className="page-header">
        <div className="container-fluid-elan">
          <div className="crumbs"><Link to="/">Élan</Link> / <span>Contact</span></div>
          <div className="eyebrow"><span className="line" /><span>Begin</span></div>
          <h1>Let's find <em>your place.</em></h1>
          <p className="lede">
            Tell us how you want to live. We'll listen first, then match you with residences that fit —
            quietly, and at the pace a decision like this deserves.
          </p>
        </div>
      </section>

      <section className="contact-page">
        <div className="container-fluid-elan">
          <div className="contact-grid">
            <Reveal className="contact-info">
              <h2>Speak with a <em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>specialist.</em></h2>
              <p>
                Every enquiry is read by a person, not a queue. You'll hear back within one working day
                from the consultant who covers the region you're interested in.
              </p>
              <div className="info-rows">
                <div className="ir">
                  <div className="k">Studio</div>
                  <div className="v">New Cairo, Egypt</div>
                </div>
                <div className="ir">
                  <div className="k">Email</div>
                  <div className="v">hello@elanestates.eg</div>
                </div>
                <div className="ir">
                  <div className="k">Telephone</div>
                  <div className="v">+20 100 000 0000</div>
                </div>
                <div className="ir">
                  <div className="k">Hours</div>
                  <div className="v" style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>Sunday – Thursday · 10:00 – 18:00</div>
                </div>
              </div>
            </Reveal>

            <Reveal className="contact-form">
              {submitted && (
                <div className="success">
                  <FiCheck size={16} style={{ marginRight: '0.5rem', verticalAlign: '-2px' }} />
                  Thank you — your message is on its way. A consultant will be in touch shortly.
                </div>
              )}
              <form onSubmit={onSubmit} noValidate>
                <div className="form-grid">
                  <div className={`field ${form.name ? 'filled' : ''} ${errors.name ? 'has-error' : ''}`}>
                    <input
                      id="cf-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder=" "
                      aria-label="Your name"
                      aria-invalid={!!errors.name}
                    />
                    <label htmlFor="cf-name">Name</label>
                    <div className="err">{errors.name}</div>
                  </div>
                  <div className={`field ${form.email ? 'filled' : ''} ${errors.email ? 'has-error' : ''}`}>
                    <input
                      id="cf-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder=" "
                      aria-label="Email"
                      aria-invalid={!!errors.email}
                    />
                    <label htmlFor="cf-email">Email</label>
                    <div className="err">{errors.email}</div>
                  </div>
                  <div className={`field ${form.phone ? 'filled' : ''} ${errors.phone ? 'has-error' : ''}`}>
                    <input
                      id="cf-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder=" "
                      aria-label="Phone"
                      aria-invalid={!!errors.phone}
                    />
                    <label htmlFor="cf-phone">Phone</label>
                    <div className="err">{errors.phone}</div>
                  </div>
                  <div className="field filled">
                    <select
                      id="cf-location"
                      value={form.location}
                      onChange={(e) => update('location', e.target.value)}
                      aria-label="Preferred location"
                    >
                      <option value="">Any location</option>
                      {locations.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                    <label htmlFor="cf-location">Preferred Location</label>
                  </div>
                  <div className="field filled full">
                    <select
                      id="cf-type"
                      value={form.type}
                      onChange={(e) => update('type', e.target.value)}
                      aria-label="Property type"
                    >
                      <option value="">Any type</option>
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <label htmlFor="cf-type">Property Type</label>
                  </div>
                  <div className={`field full ${form.message ? 'filled' : ''} ${errors.message ? 'has-error' : ''}`}>
                    <textarea
                      id="cf-message"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder=" "
                      aria-label="Message"
                      aria-invalid={!!errors.message}
                      rows={4}
                    />
                    <label htmlFor="cf-message">Message</label>
                    <div className="err">{errors.message}</div>
                  </div>
                </div>
                <div className="submit-row">
                  <button type="submit" className="btn-elan btn-elan-fill">
                    Start a conversation <FiArrowRight size={14} className="arrow" />
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
