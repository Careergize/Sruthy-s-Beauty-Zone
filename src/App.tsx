import { useEffect, useState, type FormEvent } from 'react'
import { categories, photos, services, type ServiceCategory } from './services'
import './App.css'
import './Reference.css'

const navItems = [['Home', 'home'], ['About', 'about'], ['Services', 'services'], ['Bridal', 'bridal'], ['Gallery', 'gallery'], ['Contact', 'contact']] as const
const heroSlides = [
  { image: '/images/makeup-artistry.png', alt: 'A makeup artist carefully applying eye makeup', script: 'Discover Your Beauty', title: 'A little care.', finish: 'A beautiful you.', copy: 'Makeup, skin care and beauty rituals, made personal.', category: 'Skin & Facials' },
  { image: '/images/bridal-makeup.png', alt: 'A bride wearing traditional gold jewellery and bridal makeup', script: 'Your Moment to Shine', title: 'For your day.', finish: 'For every memory.', copy: 'Bridal makeup and occasion styling for your special moments.', category: 'Bridal & Makeup' },
  { image: '/images/hair-styling2.png', alt: 'Professional hairstyling in a beauty salon', script: 'Find Your Signature Style', title: 'Beautiful hair.', finish: 'Beautiful confidence.', copy: 'Fresh cuts, thoughtful hair care and a finish that feels like you.', category: 'Hair & Styling' },
] as const
const categoryCopy: Record<ServiceCategory, string> = {
  'Skin & Facials': 'Thoughtful skin care, facial rituals and everyday grooming.',
  'Hair & Styling': 'A fresh shape, a smooth blowout or a style for every day.',
  'Nails & Feet': 'Hand, nail and foot care with the details you like.',
  'Bridal & Makeup': 'Beauty preparation for celebrations, weddings and events.',
  'Body Care & Wellness': 'Body care and moments to slow down, including brow threading.',
  'At-Home Beauty': 'Ask about arranging selected salon services at your location.',
}
const faqItems = [
  { question: 'How can I explore the full service menu?', answer: 'Choose one of the six categories in the service directory. Each category lists the services available to enquire about.' },
  { question: 'What if I am not sure which service to select?', answer: 'Choose the closest option and use the message field to describe what you have in mind or ask a question.' },
  { question: 'Can I enquire about bridal or event preparation?', answer: 'Yes. Choose Bridal Services or Wedding & Event Preparation, then share any helpful occasion details in your message.' },
  { question: 'Does the enquiry form contact the parlour?', answer: 'No. This website is a frontend demonstration. The confirmation is only shown on this page; nothing is sent and no appointment is booked.' },
]

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</p>
}

function App() {
  const isContactPage = /^\/contact(?:\.html)?\/?$/.test(window.location.pathname)
  const pageLink = (id: string) => id === 'contact' ? '/contact.html' : `${isContactPage ? '/' : ''}#${id}`
  const [heroSlide, setHeroSlide] = useState(0)
  const hero = heroSlides[heroSlide]
  useEffect(() => {
    const loader = document.getElementById('site-loader')
    if (!loader) return
    let revealTimer: number | undefined
    let removeTimer: number | undefined
    const reveal = () => {
      const minimumDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1400
      revealTimer = window.setTimeout(() => {
        loader.classList.add('is-finished')
        loader.setAttribute('aria-hidden', 'true')
        removeTimer = window.setTimeout(() => loader.remove(), 650)
      }, Math.max(0, minimumDuration - performance.now()))
    }
    if (document.readyState === 'complete') reveal()
    else window.addEventListener('load', reveal, { once: true })
    return () => {
      window.removeEventListener('load', reveal)
      window.clearTimeout(revealTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('Skin & Facials')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('service') ?? ''
    return services.some((service) => service.name === requested) ? requested : ''
  })
  const [formError, setFormError] = useState('')
  const [confirmation, setConfirmation] = useState(false)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [today] = useState(() => new Date().toLocaleDateString('en-CA'))
  const [year] = useState(() => new Date().getFullYear())
  const currentPhoto = activePhoto === null ? null : photos.gallery[activePhoto]

  useEffect(() => {
    if (activePhoto === null) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActivePhoto(null)
      if (event.key === 'ArrowRight') setActivePhoto((index) => index === null ? null : (index + 1) % photos.gallery.length)
      if (event.key === 'ArrowLeft') setActivePhoto((index) => index === null ? null : (index - 1 + photos.gallery.length) % photos.gallery.length)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('dialog-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('dialog-open')
    }
  }, [activePhoto])

  useEffect(() => {
    if (!menuOpen) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  function scrollToServices(category?: ServiceCategory) {
    if (category) setActiveCategory(category)
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    document.querySelector('#services')?.scrollIntoView({ behavior })
  }

  function chooseService(name = '') {
    window.location.assign(`/contact.html${name ? `?service=${encodeURIComponent(name)}` : ''}`)
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const service = String(data.get('service') ?? '').trim()
    const date = String(data.get('date') ?? '').trim()
    if (!name || !service || !date || (!email && !phone)) {
      setFormError('Please enter your name, a contact detail, a service and a preferred date.')
      setConfirmation(false)
      return
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Enter a valid email address, or clear the field and use your phone number.')
      setConfirmation(false)
      return
    }
    if (date < today) {
      setFormError('Please choose a date from today onward.')
      setConfirmation(false)
      return
    }
    setFormError('')
    setConfirmation(true)
    form.reset()
    setSelectedService('')
  }

  function closePhoto() {
    setActivePhoto(null)
  }

  return <>
    <div className={`header-overlay${isContactPage ? ' contact-header' : ''}`} id="home">
    <header className="site-header reference-header">
      <a className="wordmark" href={pageLink('home')} aria-label="Sruthy Lakshmi’s Beauty Zone home"><span className="nav-logo-emblem" aria-hidden="true"><img src="/images/beauty-zone-logo.png" alt="" /></span><span className="brand-name">Sruthy Lakshmi’s<b>Beauty Zone</b></span></a>
      <button className={`menu-toggle${menuOpen ? ' is-open' : ''}`} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      <nav id="primary-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
        {navItems.map(([label, id]) => <a href={pageLink(id)} key={id} aria-current={isContactPage && id === 'contact' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
    </header>
    </div>

    <main className="reference-content">
      {!isContactPage && <>
      <section className="hero-section sylin-hero" aria-labelledby="hero-title" aria-roledescription="carousel">
        <div className="hero-photo"><img key={hero.image} src={hero.image} alt={hero.alt} fetchPriority="high" /><div className="hero-shade" /></div>
        <div className="hero-copy" key={heroSlide}>
          <p className="hero-script eyebrow">{hero.script}</p>
          <h1 id="hero-title">{hero.title}<br />{hero.finish}</h1>
          <p>{hero.copy}</p>
          <div className="hero-actions"><button className="button hero-outline" onClick={() => scrollToServices(hero.category)}>Explore our services <span aria-hidden="true">→</span></button></div>
        </div>
        <button className="hero-arrow hero-prev" aria-label="Previous hero slide" onClick={() => setHeroSlide((heroSlide + heroSlides.length - 1) % heroSlides.length)}>‹</button>
        <button className="hero-arrow hero-next" aria-label="Next hero slide" onClick={() => setHeroSlide((heroSlide + 1) % heroSlides.length)}>›</button>
        <div className="hero-dots" role="group" aria-label="Choose hero slide">{heroSlides.map((slide, index) => <button key={slide.script} className={index === heroSlide ? 'active' : ''} aria-label={`Show ${slide.script}`} aria-pressed={index === heroSlide} onClick={() => setHeroSlide(index)} />)}</div>
        <span className="hero-caption">SRUTHY LAKSHMI’S BEAUTY ZONE <i /> BEAUTY FOR EVERY MOMENT</span>
        <span className="hero-counter">0{heroSlide + 1} <i /> 03</span>
      </section>

      <section className="experience-section reference-about" id="about" aria-labelledby="about-title">
        <div className="about-photo-stack">
          <img className="about-photo-main" src="/images/kerala-bride-saree.jpg" alt="Bride in a cream-and-red saree with traditional gold jewellery and jasmine flowers" loading="lazy" />
          <img className="about-photo-detail" src="/images/kerala-bride-portrait.jpg" alt="Smiling bride in a red saree wearing gold jewellery" loading="lazy" />
          <span className="about-photo-label">Beauty begins with you</span>
        </div>
        <div className="experience-copy">
          <p className="about-script">About Us</p>
          <h2 id="about-title">We understand<br />your style.</h2>
          <p>At Sruthy Lakshmi’s Beauty Zone, beauty is personal. From a fresh hairstyle and a relaxing facial to makeup for your special day, explore care that fits your style and your occasion.</p>
          <p>Take a moment for yourself. Discover our range of skin, hair, nail and bridal beauty services, all in one welcoming place.</p>
          <div className="about-highlights">
            <div><div><strong>{categories.length}</strong><p>Beauty categories</p></div></div>
            <div><div><strong>{services.length}</strong><p>Services to explore</p></div></div>
          </div>
          <a className="about-services-link" href={pageLink('services')}>Discover our services <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <section className="category-section" aria-labelledby="category-title"><div className="section-heading"><div><Eyebrow>Welcome</Eyebrow><h2 id="category-title">Explore our services</h2></div><p>From little everyday rituals to the moments you want to remember, find the care that feels right for you.</p></div><div className="category-tiles">
        <article className="category-tile skin-tile"><button className="tile-image" onClick={() => scrollToServices('Skin & Facials')} aria-label="Explore skin and beauty services"><img src={photos.skinTile.src} alt={photos.skinTile.alt} loading="lazy" /></button><div className="tile-caption"><span>01 / THE SKIN EDIT</span><h3>Skin & Beauty</h3><button onClick={() => scrollToServices('Skin & Facials')}>Explore <b aria-hidden="true">↗</b></button></div></article>
        <article className="category-tile hair-tile"><button className="tile-image" onClick={() => scrollToServices('Hair & Styling')} aria-label="Explore hair and styling services">
<img
  src="/images/hair-styling.png"
  alt="Elegant hairstyle with soft natural waves"
  loading="lazy"
/>
</button><div className="tile-caption"><span>02 / HAIR & FINISHING</span><h3>Hair & Styling</h3><button onClick={() => scrollToServices('Hair & Styling')}>Explore <b aria-hidden="true">↗</b></button></div></article>
        <article className="category-tile bridal-tile"><button className="tile-image" onClick={() => scrollToServices('Bridal & Makeup')} aria-label="Explore bridal and occasion services">
<img
src="/images/bridal-eye-makeup.png"
  alt="Bride in a red-and-gold saree having her eye makeup applied"
  loading="lazy"
/>
</button><div className="tile-caption"><span>03 / FOR YOUR OCCASION</span><h3>Bridal & Occasions</h3><button onClick={() => scrollToServices('Bridal & Makeup')}>Explore <b aria-hidden="true">↗</b></button></div></article>
      </div><div className="other-categories" aria-label="More beauty categories">{(['Nails & Feet', 'Body Care & Wellness', 'At-Home Beauty'] as ServiceCategory[]).map((category, index) => <button key={category} onClick={() => scrollToServices(category)}><span>0{index + 4}</span>{category}<b aria-hidden="true">↗</b></button>)}</div></section>



      <section className="occasion-section" id="bridal"><div className="occasion-copy"><Eyebrow>BRIDAL & SPECIAL MOMENTS</Eyebrow><h2>For the moments<br />that <em>matter.</em></h2><p>From bridal beauty to makeup and styling for special occasions, explore services for the days you want to feel especially confident.</p><button className="button button-raspberry" onClick={() => chooseService('Wedding & Event Preparation')}>Enquire about occasion services <span aria-hidden="true">↗</span></button><div className="occasion-labels"><span>BRIDAL BEAUTY</span><i /> <span>EVENT MAKEUP</span><i /> <span>HAIR & FINISHING</span></div></div><div className="occasion-photo"><img src="/images/bridal-makeup.png" alt={photos.occasion.alt} loading="lazy" /><span>FOR THE DAYS YOU WANT TO REMEMBER</span></div></section>

      <section className="services-section" id="services"><div className="section-heading service-heading"><div><Eyebrow>Beauty Menu</Eyebrow><h2>Care for every occasion</h2></div><p>Explore the services by category. Choose a service to add it to your enquiry.</p></div><div className="service-browser"><div className="service-categories" role="group" aria-label="Filter services by category">{categories.map((category, index) => <button key={category} className={activeCategory === category ? 'category-filter active' : 'category-filter'} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}><span>0{index + 1}</span>{category}<b aria-hidden="true">↗</b></button>)}</div><div className="service-content" aria-live="polite"><div className="service-intro"><div><span>{String(categories.indexOf(activeCategory) + 1).padStart(2, '0')} / SERVICE COLLECTION</span><h3>{activeCategory}</h3></div><p>{categoryCopy[activeCategory]}</p></div><div className="service-list">{services.filter((service) => service.category === activeCategory).map((service, index) => <article className="service-row" key={service.name}><span className="service-number">{String(index + 1).padStart(2, '0')}</span><div><h4>{service.name}</h4><p>{service.description}</p></div><button onClick={() => chooseService(service.name)} aria-label={`Enquire about ${service.name}`}>Add to enquiry <span aria-hidden="true">↗</span></button></article>)}</div><p className="service-note">No prices or treatment promises are listed. Ask about service details in your enquiry.</p></div></div></section>



      <section className="gallery-section" id="gallery"><div className="section-heading"><div><Eyebrow>Style & Beauty</Eyebrow><h2>Our beauty gallery</h2></div><p>Different rituals, different moments. These reference photographs are not images of this specific parlour or its clients.</p></div><div className="gallery-grid">{photos.gallery.map((photo, index) => <button className={`gallery-tile gallery-${index + 1}`} onClick={() => setActivePhoto(index)} key={photo.src} aria-label={`View ${photo.label}: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span><i>0{index + 1}</i>{photo.label}</span><b aria-hidden="true">↗</b></button>)}</div></section>

      <section className="why-section"><div className="why-title"><Eyebrow>WHY VISIT US</Eyebrow><h2>Beauty with<br /><em>room to choose.</em></h2></div><div className="why-list"><article><span>01</span><p>A range of beauty and personal-care services in one place.</p></article><article><span>02</span><p>Options for everyday care, self-care and special occasions.</p></article><article><span>03</span><p>An easy way to explore the menu and prepare an enquiry.</p></article></div></section>

      </>}
      {isContactPage && <><section className="contact-banner"><p>Contact Us</p><h1>Let’s plan your beauty visit.</h1><a href="/">Home</a><span> / Contact</span></section><section className="appointment-section" id="contact"><div className="appointment-copy"><Eyebrow>Contact Us</Eyebrow><h2>Let’s plan your<br /><em>beauty visit.</em></h2><p>Share what you’re interested in and how to reach you. This form gives a preview only.</p></div><form className="appointment-form" noValidate onSubmit={submitEnquiry} onChange={() => { setConfirmation(false); setFormError('') }}><div className="form-row"><label htmlFor="name">Full name <span>*</span><input id="name" name="name" autoComplete="name" placeholder="Your name" required /></label><label htmlFor="email">Email address <small>Enter email or phone</small><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label></div><div className="form-row"><label htmlFor="phone">Phone number <small>Enter phone or email</small><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label><label htmlFor="service">Requested service <span>*</span><select id="service" name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required><option value="">Choose a service</option>{services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}</select></label></div><div className="form-date-row"><label htmlFor="date">Preferred date <span>*</span><input id="date" name="date" type="date" min={today} required /></label></div><label className="message-field" htmlFor="message">Additional message <small>Optional</small><textarea id="message" name="message" rows={3} placeholder="Anything you’d like to ask or share?" /></label>{formError && <p className="form-error" role="alert">{formError}</p>}{confirmation && <div className="form-confirmation" role="status">Thank you for your interest. This is a frontend demonstration only. Your enquiry has not been sent to the parlour, and no appointment has been booked or confirmed.</div>}<button className="button button-raspberry" type="submit">Preview enquiry <span aria-hidden="true">↗</span></button><p className="form-privacy">Demo form · Your enquiry is not sent, and no appointment is booked or confirmed.</p></form></section>

      </>}
      <section className="faq-section"><div className="faq-title"><Eyebrow>GOOD TO KNOW</Eyebrow><h2>Questions, <em>answered.</em></h2><p>Something else on your mind? Add it to the enquiry form.</p></div><div className="faq-list">{faqItems.map((item, index) => <details key={item.question}><summary><span>0{index + 1}</span>{item.question}<b aria-hidden="true">+</b></summary><p>{item.answer}</p></details>)}</div></section>
    </main>

    <footer className="site-footer"><a className="wordmark" href={pageLink('home')}><span className="brand-name">Sruthy Lakshmi’s<b>Beauty Zone</b></span></a><nav aria-label="Footer navigation">{navItems.map(([label, id]) => <a href={pageLink(id)} key={id}>{label}</a>)}<a href={pageLink('services')}>Service menu</a></nav><p>© {year} Sruthy Lakshmi’s Beauty Zone</p><span className="footer-note">Beauty · Care · Special moments</span></footer>
    {currentPhoto && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Beauty gallery image viewer" onClick={closePhoto}><button className="lightbox-close" aria-label="Close image viewer" onClick={closePhoto}>×</button><button className="lightbox-previous" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto === null ? 0 : activePhoto - 1 + photos.gallery.length) % photos.gallery.length) }}>←</button><figure onClick={(event) => event.stopPropagation()}><img src={currentPhoto.src} alt={currentPhoto.alt} /><figcaption>{currentPhoto.label}</figcaption></figure><button className="lightbox-next" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto === null ? 0 : activePhoto + 1) % photos.gallery.length) }}>→</button></div>}
  </>
}

export default App



