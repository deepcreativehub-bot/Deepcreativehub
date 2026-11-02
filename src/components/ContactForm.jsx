import { useState } from 'react'
import { contactDetails } from '../data/contactDetails.js'
import { servicePillars } from '../data/services.js'

const projectTypes = servicePillars.flatMap((pillar) => pillar.services.map(([name]) => name))

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  async function handleSubmit(event) {
    event.preventDefault()
    if (!endpoint) {
      setStatus('not-configured')
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
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
      <label>Your name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select a service</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label>Tell us about the project<textarea name="message" rows="5" required /></label>
      <button className="button-primary" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending…' : 'Send inquiry'} <span aria-hidden="true">→</span></button>
      <p className="form-status" aria-live="polite">{status === 'success' && 'Thanks — your message was sent.'}{status === 'error' && <>The form could not send. Please use <a href={contactDetails.emailHref}>email</a> or <a href={contactDetails.whatsappHref}>WhatsApp</a>.</>}{status === 'not-configured' && <>Online form delivery is not configured yet. Please use <a href={contactDetails.emailHref}>email</a> or <a href={contactDetails.whatsappHref}>WhatsApp</a>.</>}{status === 'sending' && 'Sending your inquiry…'}</p>
    </form>
  )
}