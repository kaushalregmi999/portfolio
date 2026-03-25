import { useMemo, useState } from 'react'
import { profile, experiences, skills } from '../data/resumeData'
import { useGalaxyStore } from '../store/useGalaxyStore'

function scoreFromKeywords(input, project) {
  const text = `${project.name} ${project.description} ${project.stack.join(' ')}`.toLowerCase()
  return input
    .toLowerCase()
    .split(/\s+/)
    .reduce((sum, token) => (token && text.includes(token) ? sum + 1 : sum), 0)
}

function buildReply(input, projects, github) {
  const lower = input.toLowerCase()

  if (lower.includes('skill') || lower.includes('stack')) {
    const top = skills.slice(0, 6).map((s) => s.name).join(', ')
    return `Top technical strengths: ${top}. He has strong depth in full-stack JavaScript architecture and production delivery.`
  }

  if (lower.includes('intern') || lower.includes('start')) {
    return 'Career started with E-sell internship project, delivering a full e-commerce platform from scratch using Java/Spring Boot + AngularJS.'
  }

  if (lower.includes('experience') || lower.includes('lead') || lower.includes('senior')) {
    const recent = experiences[0]
    return `Most recent role: ${recent.company} (${recent.period}). Impact includes reusable systems, critical problem solving, and performance optimization across multiple products.`
  }

  const ranked = [...projects]
    .map((p) => ({ project: p, score: scoreFromKeywords(lower, p) }))
    .sort((a, b) => b.score - a.score)

  const best = ranked[0]?.project
  if (best && ranked[0].score > 0) {
    return `Best match: ${best.name}. ${best.description} Stack: ${best.stack.join(', ')}.${best.github ? ` GitHub signal: ⭐ ${best.github.stars}, forks ${best.github.forks}.` : ''}`
  }

  return `Recruiter summary: ${profile.name} is a ${profile.title} with 8+ years of delivery in React/Node ecosystems, strong ownership, and cross-team execution. Ask me about a specific project for deeper fit analysis.`
}

export function RecruiterAssistant({ projects, github }) {
  const [input, setInput] = useState('')
  const { chat, pushMessage } = useGalaxyStore()

  const quickPrompts = useMemo(
    () => ['Best project for scale?', 'Core technical strengths?', 'Tell me about leadership impact'],
    [],
  )

  const sendMessage = (text) => {
    const value = text.trim()
    if (!value) return

    pushMessage({ id: `u-${Date.now()}`, role: 'user', content: value })
    const answer = buildReply(value, projects, github)
    pushMessage({ id: `a-${Date.now() + 1}`, role: 'assistant', content: answer })
    setInput('')
  }

  return (
    <aside className="assistant-panel">
      <h2>🤖 Recruiter Guide AI</h2>
      <p>Ask fit-based questions. The assistant uses resume + project + GitHub context.</p>

      <div className="chat-log">
        {chat.map((msg) => (
          <div key={msg.id} className={`bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="quick-prompts">
        {quickPrompts.map((prompt) => (
          <button key={prompt} onClick={() => sendMessage(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask: Which project proves real-time experience?"
        />
        <button onClick={() => sendMessage(input)}>Send</button>
      </div>
    </aside>
  )
}
