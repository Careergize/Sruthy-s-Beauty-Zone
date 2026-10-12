import { useState, type FormEvent } from 'react'
import { categories, photos, services, type ServiceCategory } from './services'
import './App.css'

const navItems = [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Bridal', 'bridal'], ['Gallery', 'gallery'], ['Contact', 'contact']] as const

function App() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [confirmation, setConfirmation] = useState(false)
  const [formError, setFormError] = useState('')
  const today = new Date().toLocaleDateString('en-CA')
  const visibleServices = activeCategory === 'All' ? services : services.filter((service) => service.category === activeCategory)

  function chooseService(serviceName: string) {
    setSelectedService(serviceName)
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' })
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const missing = [
      ['name', 'full name'], ['phone', 'phone number'], ['service', 'service'],
      ['date', 'preferred date'], ['time', 'preferred time'],
    ].filter(([key]) => !String(data.get(key) ?? '').trim()).map(([, label]) => label)
    if (missing.length) {
      setFormError(`Please add your ${missing.join(', ')} to prepare an enquiry preview.`)
      setConfirmation(false)
      return
    }
    const email = String(data.get('email') ?? '').trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address, or leave the optional field blank.')
      setConfirmation(false)
      return
    }
    if (String(data.get('date')) < today) {
      setFormError('Please choose a date from today onward.')
      setConfirmation(false)
      return
    }
    setConfirmation(true)
    setFormError('')
    form.reset()
    setSelectedService('')
  }

  return <>
    <header className="site-header" id="home">
      <a className="wordmark" href="#home" aria-label="Sruthy Lakshmi’s Beauty Zone home"><span className="wordmark-name">Sruthy Lakshmi’s</span><span className="wordmark-sub">BEAUTY ZONE</span></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span></button>
      <nav id="primary-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {navItems.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#appointment" onClick={() => setMenuOpen(false)}>Book an Appointment <span aria-hidden="true">↗</span></a>
      </nav>
    </header>

    <main>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span></span> BEAUTY · CARE · CONFIDENCE</p><h1 id="hero-title">Feel beautiful.<br /><em>Feel like you.</em></h1><p className="hero-intro">Thoughtful beauty care, beautiful details, and personalised services to help you feel your best.</p><div className="hero-actions"><a className="button button-gold" href="#services">Explore our services <span aria-hidden="true">↗</span></a><a className="text-link" href="#appointment">Book an appointment <span aria-hidden="true">→</span></a></div><p className="hero-note">A little time for yourself, beautifully spent.</p></div>
        <div className="hero-image-wrap"><img className="hero-image" src={photos.hero.src} alt={photos.hero.alt} /><div className="image-caption"><span>YOUR MOMENT OF CARE</span><span>01 — 06</span></div><span className="hero-vertical">SRUTHY LAKSHMI’S BEAUTY ZONE</span></div>
      </section>

      <section className="intro-section section-light" id="about"><div className="intro-photo"><img src={photos.about.src} alt={photos.about.alt} /><span className="photo-index">A PLACE TO FEEL YOURSELF</span></div><div className="intro-copy"><p className="eyebrow eyebrow-dark">A PERSONAL APPROACH</p><h2>Beauty care,<br /><em>with a personal touch.</em></h2><p>Sruthy Lakshmi’s Beauty Zone brings haircare, skincare, bridal beauty, makeup, nail care and wellness together in one welcoming place.</p><p>Whether you’re getting ready for a special day or simply making space for yourself, we’re here to help you find the care that feels right.</p><a className="text-link text-link-dark" href="#services">Get to know our services <span aria-hidden="true">→</span></a></div></section>

      <section className="services-section section-ivory" id="services"><div className="section-heading"><div><p className="eyebrow eyebrow-dark">A LITTLE SOMETHING FOR YOU</p><h2>Care for every<br /><em>side of you.</em></h2></div><p className="section-aside">From everyday essentials to those special-occasion details, explore the services available at our salon.</p></div><div className="filter-list" role="group" aria-label="Filter services by category"><button className={activeCategory === 'All' ? 'filter active' : 'filter'} onClick={() => setActiveCategory('All')}>All services <span>{services.length.toString().padStart(2, '0')}</span></button>{categories.map((category) => <button className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}</div><div className="service-grid">{visibleServices.map((service) => <article className="service-item" key={service.name}><span className="service-number">{(services.indexOf(service) + 1).toString().padStart(2, '0')}</span><div><p className="service-category">{service.category}</p><h3>{service.name}</h3><p className="service-description">{service.description}</p><button className="service-enquire" onClick={() => chooseService(service.name)}>Enquire <span aria-hidden="true">↗</span></button></div><span className="service-rule" aria-hidden="true"></span></article>)}</div><p className="service-footnote">Not sure where to start? Send us an enquiry and we’ll help you find the right service.</p></section>

      <section className="bridal-section" id="bridal"><div className="bridal-image"><img src={photos.bridal.src} alt={photos.bridal.alt} /><span className="photo-index">FOR THE DAYS THAT MATTER</span></div><div className="bridal-copy"><p className="eyebrow">A DAY TO REMEMBER</p><h2>For your most<br /><em>special days.</em></h2><p>From bridal makeup and wedding hairstyles to pre-bridal skincare and event preparation, we’ll help you plan the beauty details around your day.</p><p>Tell us what you have in mind and we can talk through the services that feel right for you.</p><button className="button button-outline" onClick={() => chooseService('Bridal Services')}>Enquire about bridal services <span aria-hidden="true">↗</span></button><span className="bridal-mark">S<span>✳</span>L</span></div></section>

      <section className="gallery-section section-light" id="gallery"><div className="section-heading gallery-heading"><div><p className="eyebrow eyebrow-dark">A FEW DETAILS</p><h2>Beauty in the<br /><em>little things.</em></h2></div><p className="section-aside">An inspiration board for your next visit. These are reference photographs, not verified images of our salon or clients.</p></div><div className="gallery-grid">{photos.gallery.map((photo, index) => <figure className={`gallery-tile tile-${index + 1}`} key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption><span>0{index + 1}</span>{['Bridal beauty', 'Hair, softly styled', 'Nail care', 'Skin rituals', 'A fresh cut', 'Time to unwind'][index]}</figcaption></figure>)}</div></section>

      <section className="visit-section"><div className="visit-title"><p className="eyebrow">A GOOD REASON TO MAKE TIME</p><h2>A little care<br /><em>goes a long way.</em></h2></div><div className="visit-points"><article><span>01</span><div><h3>More to choose from</h3><p>Hair, skin, nails, bridal beauty and wellness, all in one place.</p></div></article><article><span>02</span><div><h3>Care that feels personal</h3><p>Tell us what you’re looking for and we’ll help you explore your options.</p></div></article><article><span>03</span><div><h3>Easy to get in touch</h3><p>Share your preferred service and timing through a simple enquiry.</p></div></article></div></section>

      <section className="appointment-section section-ivory" id="appointment"><div className="appointment-intro"><p className="eyebrow eyebrow-dark">LET’S PLAN YOUR VISIT</p><h2>Make a little<br /><em>time for you.</em></h2><p>Tell us what you’re interested in and when you’d prefer to visit. We’ll have your enquiry ready to follow up on.</p><div className="demo-note"><span aria-hidden="true">✳</span><p><strong>A note about this form</strong><br />This is a website demo. Submitting shows an enquiry preview on this page; it does not contact the salon or book an appointment.</p></div></div><form className="appointment-form" noValidate onSubmit={submitEnquiry} onChange={() => { setConfirmation(false); setFormError('') }}><div className="form-row"><label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" /></label><label>Phone number <span>*</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label></div><div className="form-row"><label>Email address <small>Optional</small><input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Service <span>*</span><select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)}><option value="">Choose a service</option>{services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}</select></label></div><div className="form-row"><label>Preferred date <span>*</span><input name="date" type="date" min={today} /></label><label>Preferred time <span>*</span><select name="time" defaultValue=""><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option></select></label></div><label>Anything you’d like us to know? <small>Optional</small><textarea name="message" rows={3} placeholder="Add a note (optional)"></textarea></label>{formError && <p className="form-error" role="alert">{formError}</p>}{confirmation && <div className="form-confirmation" role="status"><strong>Your enquiry preview is ready.</strong><span>This demo has not sent your details or booked an appointment.</span></div>}<button className="button button-dark" type="submit">Prepare enquiry preview <span aria-hidden="true">↗</span></button><p className="form-privacy">Your details stay in this page and are not stored or sent anywhere.</p></form></section>

      <section className="contact-section" id="contact"><div className="contact-main"><p className="eyebrow">COME SAY HELLO</p><h2>We’d love to<br /><em>hear from you.</em></h2><p>For service questions or to plan your visit, get in touch using the details below.</p><a href="#appointment" className="text-link">Send an enquiry <span aria-hidden="true">→</span></a></div><div className="contact-details"><div><span>VISIT</span><p>Salon address<br /><small>[Address to be added]</small></p></div><div><span>CALL</span><p>Phone<br /><small>[Phone number to be added]</small></p></div><div><span>WRITE</span><p>Email<br /><small>[Email address to be added]</small></p></div><div><span>HOURS</span><p>Business hours<br /><small>[Hours to be added]</small></p></div><div><span>FOLLOW</span><p>Instagram & social<br /><small>[Social links to be added]</small></p></div></div></section>
    </main>

    <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><a className="wordmark" href="#home"><span className="wordmark-name">Sruthy Lakshmi’s</span><span className="wordmark-sub">BEAUTY ZONE</span></a><p>Thoughtful beauty care and a little more time for yourself.</p></div><div><h2>Explore</h2><div className="footer-links">{navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div></div><div><h2>Popular services</h2><div className="footer-links">{['Haircuts & Blowouts', 'Facials', 'Bridal Services', 'Manicure'].map((name) => <button key={name} onClick={() => chooseService(name)}>{name}</button>)}</div></div><div><h2>Get in touch</h2><p className="footer-placeholder">[Phone number to be added]<br />[Email address to be added]<br />[Salon address to be added]</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Sruthy Lakshmi’s Beauty Zone</span><span>Made with care, for your moments of care.</span></div></footer>
  </>
}

export default App
