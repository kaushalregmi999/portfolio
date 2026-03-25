import { motion } from 'framer-motion'
import { experiences, internship, profile, skills } from '../data/resumeData'

const stars = (level) => '★'.repeat(level) + '☆'.repeat(5 - level)

export function ResumePanels({ projects, selectedProjectId, onProjectSelect }) {
  return (
    <section className="resume-grid">
      <article className="card projects-card">
        <h2>🌍 Project Planets</h2>
        <div className="project-list">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`project-item-wrap ${selectedProjectId === project.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className={`project-item ${selectedProjectId === project.id ? 'active' : ''}`}
                onClick={() => onProjectSelect(project.id)}
              >
                <strong>{project.name}</strong>
                <span>{project.stack.join(' • ')}</span>
                {project.github && (
                  <small>
                    ⭐ {project.github.stars} • Forks {project.github.forks}
                  </small>
                )}
              </button>

              {selectedProjectId === project.id && (
                <div className="project-accordion">
                  <p>{project.description}</p>
                  <ul>
                    {(project.achievements ?? []).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noreferrer">
                        Visit Link
                      </a>
                    )}
                    {project.github?.url && (
                      <a href={project.github.url} target="_blank" rel="noreferrer">
                        GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </article>

      <article className="card">
        <h2>💼 Experience Orbit</h2>
        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <h3>
              {exp.role} · {exp.company}
            </h3>
            <small>{exp.period}</small>
            <ul>
              {exp.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </article>

      <article className="card">
        <h2>🚀 Internship Launchpad</h2>
        <h3>{internship.title}</h3>
        <small>
          {internship.org} · {internship.period}
        </small>
        <p>{internship.summary}</p>
        <p className="stack-inline">{internship.stack.join(' • ')}</p>
      </article>

      <article className="card">
        <h2>📡 Skills Satellites</h2>
        <p>
          {profile.location} · {profile.phone}
        </p>
        <div className="skills-list">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-row">
              <span>{skill.name}</span>
              <span>{stars(skill.level)}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
