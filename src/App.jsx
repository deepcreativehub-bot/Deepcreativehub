import { useEffect, useRef, useState } from 'react'
import './App.css'
import ContactForm from './components/ContactForm.jsx'
import { contactDetails, whatsappHrefFor } from './data/contactDetails.js'
import { servicePillars } from './data/services.js'
import { projects } from './data/projects.js'

const nav = ['Home', 'About', 'Services', 'Projects', 'Skills', 'Why Us', 'Process', 'Contact']
const services = servicePillars.flatMap((pillar) => pillar.services.map(([title, description, icon]) => ({ pillar: pillar.name, title, description, icon })))
const skills = [
  'Web development', 'Visual design', 'Digital strategy', 'Content and motion', 'Accessible UI', 'Responsive front-end',
]

function Arrow({ diagonal = false }) {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M7 17 17 7M7 7h10v10' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function ServiceIcon({ name }) {
  const paths = {
    website: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13h8M8 16h5" /></>,
    frontend: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18m4 4-3 3 3 3m10-6 3 3-3 3" /></>,
    backend: <><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01m4-10h4m-4 10h4" /></>,
    design: <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" /><path d="m14 7 3 3M4 20l5-1" /></>,
    content: <><path d="M6 3h8l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v5h5M8 12h7m-7 4h7" /></>,
    marketing: <><path d="M4 19V5m0 14h17" /><path d="m7 15 4-4 3 2 6-7" /><path d="M16 6h4v4" /></>,
    technical: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9L16 20h-8l-.3-1.2a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9L8 4h8l.3 1.2a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.8l1.4 1.1" /></>,
    consulting: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.5-.8L4 20l1.3-3.5A7.2 7.2 0 0 1 4 12a7.5 7.5 0 0 1 8-7.5 7.5 7.5 0 0 1 8 7Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function ProjectMockup({ project }) {
  return (
    <div className={`concept-screen ${project.visual}`} aria-hidden="true">
      <div className="mockup-window">
        <div className="mockup-browser"><span></span><span></span><span></span><i>{project.name} / concept</i></div>
        <div className="mockup-nav"><strong>{project.name}</strong><span>ABOUT&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT</span></div>
        <div className="mockup-body">
          <div className="mockup-copy"><small>INDEPENDENT CONCEPT / {project.number}</small><h3>{project.headline}</h3><span className="mockup-link">EXPLORE THE IDEA&nbsp; ↗</span></div>
          <div className="mockup-art"><span className="mockup-art-label">{project.category}</span><span className="mockup-art-shape"></span><span className="mockup-art-dot"></span></div>
        </div>
        <div className="mockup-footer"><span>BUILT WITH INTENTION</span><span>SCROLL TO EXPLORE ↓</span></div>
      </div>
    </div>
  )
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || !window.IntersectionObserver) { elements.forEach((el) => el.classList.add('visible')); return undefined }
    document.documentElement.classList.add('has-reveal')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    elements.forEach((el) => observer.observe(el))
    return () => { observer.disconnect(); document.documentElement.classList.remove("has-reveal") }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButtonRef.current?.focus() }
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)')
    const resetMenu = () => { if (desktop.matches) setMenuOpen(false) }
    desktop.addEventListener('change', resetMenu)
    return () => desktop.removeEventListener('change', resetMenu)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  return (
    <div className="site-shell" id="home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="DeepCreativeHub home"><span className="brand-mark">d<span>.</span></span><span>{contactDetails.businessName}</span></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="primary-navigation" ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)}><span/><span/></button>
        <nav id="primary-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{nav.map((item) => <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={closeMenu}>{item}</a>)}          <a className="mobile-nav-cta" href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Start a project <Arrow diagonal /></a>
        </nav>
        <a className="nav-cta" href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer">Let&apos;s Talk <Arrow diagonal /></a>
      </header>

      <main id="main-content">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot"/> BRAND STRATEGY <span className="eyebrow-divider">|</span> DESIGN & DIGITAL</div>
            <h1>Creative Digital<br/><span className="gradient-text">Solutions</span> for a<br/><span className="hero-last">Stronger Online Presence.</span></h1>
            <p className="hero-intro">We help businesses and individuals build professional digital experiences through web development, creative design, digital marketing, and innovative technology solutions.</p>
            <div className="hero-actions"><a href="#services" className="button-primary">Explore Our Services <Arrow /></a><a href="#contact" className="button-secondary">Start Your Project <Arrow diagonal /></a></div>
            <div className="hero-proof"><p>Web Development · Brand Visuals · Digital Strategy</p></div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-image"><img src="/hero-art.svg" alt="Abstract DeepCreativeHub artwork in purple and blue" width="900" height="1050" loading="eager" fetchPriority="high" decoding="async"/><div className="art-overlay"/></div>
            <div className="floating-note note-top"><span>+</span><div>BRAND<br/><strong>NEW THINKING</strong></div></div><div className="floating-note note-bottom"><span className="note-spark">*</span><div>GOOD IDEAS<br/>LIVE HERE<span className="note-dot">.</span></div></div><div className="art-caption">A little left of ordinary <span>-&gt;</span></div>
          </div>
          <a className="scroll-cue" href="#about"><span/> SCROLL TO EXPLORE <span className="scroll-line"/></a>
          <div className="hero-coordinates">INDEPENDENT CREATIVE STUDIO<br/>DESIGN · DEVELOPMENT · DIGITAL</div>
        </section>

        <section id="about" className="about section-wrap section-pad">
          <div className="section-label reveal"><span>01 / A LITTLE ABOUT US</span><span className="label-rule"/></div>
          <div className="about-grid"><h2 className="section-title reveal">Good thinking.<br/><span className="gradient-text">Better design.</span></h2><div className="about-copy reveal"><p className="lead">DeepCreativeHub helps people and teams turn good ideas into useful digital experiences. We listen first, get clear on what matters, then bring design and development together with care and open communication.</p><a className="underlined-link" href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer">Start a conversation <Arrow /></a></div></div>
          <div className="studio-pillars reveal"><span>CLARITY BEFORE CLUTTER</span><span>THOUGHTFUL BY DESIGN</span><span>MADE TO MOVE YOU FORWARD</span></div>
        </section>

        <section id="services" className="services section-wrap section-pad">
          <div className="section-label reveal"><span>02 / WHAT WE DO</span><span className="label-rule"/></div><div className="services-heading reveal"><h2 className="section-title">A good idea<br/>needs <span className="gradient-text">good people.</span></h2><p>We bring the right mix of imagination and intention to every challenge.</p></div>
          <div className="services-grid">{services.map((service, index) => <article className="service-tile reveal" key={service.title}><div className="service-tile-top"><span>{String(index + 1).padStart(2, '0')}</span><span>{service.pillar}</span></div><span className="service-icon"><ServiceIcon name={service.icon} /></span><h3>{service.title}</h3><p>{service.description}</p><a className="service-tile-link" href={whatsappHrefFor(`Hi DeepCreativeHub, I would like to ask about ${service.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${service.title} on WhatsApp`}>Let&apos;s talk <Arrow diagonal /></a></article>)}</div>
        </section>

        <section id="projects" className="projects section-wrap section-pad">
          <div className="section-label reveal"><span>03 / CONCEPT PROJECTS</span><span className="label-rule"/></div><div className="projects-heading reveal"><h2 className="section-title">Made with<br/><span className="gradient-text">intention.</span></h2><p>Self-initiated concept work, created to demonstrate possible design and development approaches. No client engagements or results are implied.</p></div>
          <div className="project-grid">{projects.map((project) => <article className={`project-card ${project.visual} reveal`} key={project.id}><div className="project-image"><ProjectMockup project={project}/><span className="project-image-index">DEMO PROJECT / SELF-INITIATED</span></div><div className="project-meta"><div><span>DEMO PROJECT · {project.category}</span><h3>{project.name}</h3><p>{project.context}</p></div><span className="project-index">{project.number} <Arrow diagonal /></span></div><details className="project-details"><summary>Explore the concept</summary><div className="project-story"><p><strong>Challenge</strong>{project.challenge}</p><p><strong>Contribution</strong>{project.contribution}</p><p><strong>Features</strong>{project.features.join(' · ')}</p><p><strong>Technology</strong>{project.stack.join(' · ')}</p><p><strong>Design goals</strong>{project.designGoals}</p></div></details><a className="project-contact" href={whatsappHrefFor(`Hi DeepCreativeHub, I would like to discuss a project like ${project.name}.`)} target="_blank" rel="noopener noreferrer">Discuss a similar project <Arrow /></a></article>)}</div>
          <a className="all-work-link" href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer">Have a project in mind? <strong>Message us on WhatsApp <Arrow /></strong></a>
        </section>

        <section id="skills" className="skills section-wrap section-pad"><div className="section-label reveal"><span>04 / OUR TOOLKIT</span><span className="label-rule"/></div><div className="skills-grid"><div className="reveal"><h2 className="section-title">Curious minds.<br/><span className="gradient-text">Capable hands.</span></h2><p className="skills-intro">A thoughtful mix of strategy, craft, and practical digital skills, brought to the needs of each project.</p><div className="tool-tags"><span>FIGMA</span><span>ADOBE CC</span><span>WEBFLOW</span><span>FRAMER</span><span>NOTION</span></div></div><ul className="skill-list reveal" aria-label="Core capabilities">{skills.map((skill) => <li className="skill-chip" key={skill}>{skill}</li>)}</ul></div></section>

        <section id="why-us" className="why-us section-wrap section-pad"><div className="section-label reveal"><span>05 / WHY DEEPCREATIVEHUB</span><span className="label-rule"/></div><div className="process-heading reveal"><h2 className="section-title">Good work starts<br/><span className="gradient-text">with good thinking.</span></h2><p>A grounded way of working that keeps the work clear, considered, and connected to your goals.</p></div><div className="why-grid"><article className="why-item reveal"><span>01</span><h3>Clarity before clutter</h3><p>We get to the heart of your message before adding more noise to the screen.</p></article><article className="why-item reveal"><span>02</span><h3>Designed for real people</h3><p>We consider how your audience will read, navigate, and use what we create.</p></article><article className="why-item reveal"><span>03</span><h3>Thoughtful collaboration</h3><p>We share direction, invite useful feedback, and keep decisions understandable.</p></article><article className="why-item reveal"><span>04</span><h3>Built with purpose</h3><p>We focus on the details that help your digital presence work better for you.</p></article></div></section>

        <section id="process" className="process section-wrap section-pad"><div className="section-label reveal"><span>06 / HOW WE WORK</span><span className="label-rule"/></div><div className="process-heading reveal"><h2 className="section-title">Good work,<br/><span className="gradient-text">made together.</span></h2><p>A clear, collaborative path from the first conversation to the final detail.</p></div><div className="process-grid">{[["01","Listen","We learn about your goals, audience, and what success means to you."],["02","Find the idea","We shape the strategy and creative direction that give the project focus."],["03","Make it real","We design, refine, and build the work together, with thoughtful feedback at every step."],["04","Send it out","We deliver the final work and help you put it to use in the world."]].map(([number,title,description])=><article className="process-card reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

        <section className="quote-section section-wrap reveal"><div className="quote-mark">&ldquo;</div><blockquote>Great design makes you <span className="gradient-text">feel something.</span><br/>Great partnerships make it possible.</blockquote><p>THE THING WE BELIEVE IN MOST</p><div className="quote-spark">+</div></section>

        <section id="contact" className="contact section-wrap section-pad">
          <div className="section-label reveal"><span>07 / GET IN TOUCH</span><span className="label-rule"/></div>
          <div className="contact-grid">
            <div className="contact-copy reveal">
              <span className="contact-kicker">LET US START A CONVERSATION</span>
              <h2 className="section-title">Have an idea?<br/><span className="gradient-text">Let us talk.</span></h2>
              <p>Whether you have a clear brief or are still shaping the idea, we would love to hear from you. Tell us what you are working on and we can take it from there.</p>
            </div>
            <div className="contact-panel reveal">
              <div className="contact-options" role="group" aria-label="Direct contact options">
                <a className="contact-option" href={contactDetails.emailHref}><span>Email</span><strong>{contactDetails.email}</strong><Arrow diagonal /></a>
                <a className="contact-option" href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><strong>{contactDetails.whatsappDisplay}</strong><Arrow diagonal /></a>
                <a className="contact-option" href={contactDetails.linkedinHref} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><strong>DeepCreativeHub</strong><Arrow diagonal /></a>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="footer section-wrap">
        <a className="wordmark" href="#home" aria-label="DeepCreativeHub home"><span className="brand-mark">d<span>.</span></span><span>{contactDetails.businessName}</span></a>
        <span>© 2026 DEEPCREATIVEHUB</span>
        <div className="footer-links"><a href={contactDetails.emailHref}>EMAIL</a><a href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer">WHATSAPP</a><a href={contactDetails.linkedinHref} target="_blank" rel="noopener noreferrer">LINKEDIN</a></div>
      </footer>
    </div>
  )
}

export default App
