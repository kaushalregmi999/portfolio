import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import './App.css'
import { profile, projects } from './data/resumeData'
import { useGithubUniverse } from './hooks/useGithubUniverse'
import { useGalaxyStore } from './store/useGalaxyStore'
import { RecruiterAssistant } from './components/RecruiterAssistant'
import { ResumePanels } from './components/ResumePanels'
import { ContactForm } from './components/ContactForm'

const GalaxyScene = lazy(() => import('./components/GalaxyScene').then((m) => ({ default: m.GalaxyScene })))
const SelectedPlanetView = lazy(() =>
  import('./components/SelectedPlanetView').then((m) => ({ default: m.SelectedPlanetView })),
)

const planetPalette = [
  '#b1b1b1',
  '#d5a06b',
  '#4f93d2',
  '#c1440e',
  '#d9c08a',
  '#d8c89a',
  '#7fb3d5',
  '#4f78ff',
  '#b78cff',
]

function App() {
  const titleRef = useRef(null)
  const [sceneMode, setSceneMode] = useState('galaxy')
  const [is3DEnabled, setIs3DEnabled] = useState(
    typeof window !== 'undefined' ? window.innerWidth > 900 : true,
  )
  const { selectedProjectId, setSelectedProject } = useGalaxyStore()
  const github = useGithubUniverse(profile.githubUsername)

  const projectMetrics = useMemo(
    () =>
      projects.map((project, index) => {
        const repo = github.findRepoByProjectName(project.name)

        return {
          ...project,
          planetColor: planetPalette[index % planetPalette.length],
          github: repo
            ? {
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updatedAt: repo.updated_at,
                url: repo.html_url,
              }
            : null,
        }
      }),
    [github.dataUpdatedAt],
  )

  const selectedProject = useMemo(
    () => projectMetrics.find((item) => item.id === selectedProjectId) ?? projectMetrics[0] ?? null,
    [projectMetrics, selectedProjectId],
  )

  const selectedPlanetColor = useMemo(() => {
    return selectedProject?.planetColor ?? planetPalette[0]
  }, [selectedProject])

  useEffect(() => {
    if (!titleRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.title-glow',
        { opacity: 0.45 },
        { opacity: 1, duration: 1.7, repeat: -1, yoyo: true, ease: 'sine.inOut' },
      )
    }, titleRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!selectedProjectId && projectMetrics.length > 0) {
      setSelectedProject(projectMetrics[0].id)
    }
  }, [selectedProjectId, projectMetrics, setSelectedProject])

  const handlePlanetSelect = (projectId) => {
    setSelectedProject(projectId)
    setSceneMode('selected')
  }

  return (
    <main className="app-shell">
      <header className="topbar" ref={titleRef}>
        <div>
          <h1 className="title-glow">{profile.name} • Project Galaxy</h1>
          <p>{profile.title}</p>
        </div>
        <div className="live-badge">
          <span className={github.isError ? 'error' : 'ok'}>
            {github.isError ? 'GitHub sync offline' : 'GitHub sync live'}
          </span>
          {!github.isError && <small>{github.user?.public_repos ?? 0} repos tracked</small>}
          <a
            className="github-profile-link"
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noreferrer"
          >
            GitHub @{profile.githubUsername}
          </a>
        </div>
      </header>

      <section className="galaxy-and-guide">
        <motion.div
          className="galaxy-wrap"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          {is3DEnabled ? (
            <>
              <div className="scene-toolbar">
                {sceneMode === 'galaxy' ? (
                  <button
                    onClick={() => selectedProject && setSceneMode('selected')}
                    disabled={!selectedProject}
                  >
                    Go to Selected Planet
                  </button>
                ) : (
                  <button onClick={() => setSceneMode('galaxy')}>Warp to Galaxy</button>
                )}
              </div>

              <Suspense fallback={<div className="scene-loading">Loading scene...</div>}>
                {sceneMode === 'galaxy' ? (
                  <GalaxyScene
                    projects={projectMetrics}
                    selectedProjectId={selectedProjectId}
                    onSelect={handlePlanetSelect}
                  />
                ) : (
                  <SelectedPlanetView project={selectedProject} selectedColor={selectedPlanetColor} />
                )}
              </Suspense>
            </>
          ) : (
            <div className="mobile-lite-mode">
              <h3>Performance Mode Active</h3>
              <p>
                3D scene is paused on mobile for faster loading. Enable it anytime to explore the galaxy.
              </p>
              <button onClick={() => setIs3DEnabled(true)}>Enable 3D Galaxy</button>
            </div>
          )}
        </motion.div>

        <RecruiterAssistant projects={projectMetrics} github={github} />
      </section>

      <ResumePanels
        projects={projectMetrics}
        selectedProjectId={selectedProjectId}
        github={github}
        onProjectSelect={setSelectedProject}
      />

      <ContactForm />
    </main>
  )
}

export default App
