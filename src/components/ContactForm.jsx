import { useState } from 'react'
import { profile } from '../data/resumeData'

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'Recruiter'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    )

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="card contact-card">
      <h2>📬 Contact Kaushal</h2>
      <p>
        Send a message directly to <strong>{profile.email}</strong>
      </p>

      <form className="contact-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={onChange('name')}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={onChange('email')}
          required
        />
        <textarea
          rows={4}
          placeholder="Your message"
          value={form.message}
          onChange={onChange('message')}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </section>
  )
}
