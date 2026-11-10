import { useState } from 'react'
import { contactDetails } from '../data/contactDetails.js'
import { servicePillars } from '../data/services.js'

const projectTypes = servicePillars.flatMap((pillar) => pillar.services.map(([name]) => name))

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [draftHref, setDraftHref] = useState(contactDetails.emailHref)
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (!endpoint) {
      const subject = `Project inquiry: ${data.get('projectType') || 'Let’s talk'}`
      const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('projectType') || 'Not selected'}\n\n${data.get('message')}`
      setDraftHref(`${contactDetails.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      setStatus('draft-ready')
      return
    }

    try {
      setStatus('sending')
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Your name<input name="name" required autoComplete="name" maxLength={120} placeholder="What should we call you?" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@example.com" /></label>
      <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select a service</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label>Tell us about the project<textarea name="message" rows="5" required maxLength={5000} placeholder="Your idea, goals, and any timeline you have in mind…" /></label>
      {!endpoint && <p className="form-footnote">Prepare an email with your project details, then send it from your email app.</p>}
      <button className="button-primary" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : endpoint ? 'Send inquiry' : 'Prepare project email'} <span aria-hidden="true">→</span></button>
      <p className="form-status" role="status" aria-live="polite">{status === 'success' && 'Thanks — your message was sent.'}{status === 'error' && <>The form could not send. Please use <a href={contactDetails.emailHref}>email</a> or <a href={contactDetails.whatsappHref}>WhatsApp</a>.</>}{status === 'draft-ready' && <>Your draft is ready. <a href={draftHref}>Open your project email</a> to review and send. Prefer another option? <a href={contactDetails.whatsappHref}>Chat on WhatsApp</a>.</>}{status === 'sending' && 'Sending your inquiry…'}</p>
    </form>
  )
}
