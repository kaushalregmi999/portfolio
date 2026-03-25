import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, OrbitControls, Text } from '@react-three/drei/core'
import { BackSide, CanvasTexture } from 'three'

const stackColors = {
  react: '#61dafb',
  'node.js': '#8cc84b',
  node: '#8cc84b',
  nextjs: '#e5e7eb',
  'next.js': '#e5e7eb',
  nestjs: '#ea2845',
  'nest js': '#ea2845',
  mongodb: '#00ed64',
  stripe: '#635bff',
  paypal: '#00a1e0',
  heroku: '#79589f',
}

const planetPalette = [
  '#b1b1b1', // Mercury
  '#d5a06b', // Venus
  '#4f93d2', // Earth
  '#c1440e', // Mars
  '#d9c08a', // Jupiter
  '#d8c89a', // Saturn
  '#7fb3d5', // Uranus
  '#4f78ff', // Neptune
  '#b78cff',
]

function createPlanetTexture(baseColor, seed = 1) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 512, 512)

  for (let i = 0; i < 22; i += 1) {
    const r = ((Math.sin(seed * 99 + i * 17.91) + 1) / 2) * 255
    const x = ((Math.sin(seed * 5.7 + i * 3.1) + 1) / 2) * 512
    const y = ((Math.sin(seed * 8.1 + i * 2.3) + 1) / 2) * 512
    const size = 18 + ((Math.sin(seed * 6.6 + i * 1.77) + 1) / 2) * 60

    ctx.fillStyle = `rgba(${Math.max(0, r - 45)}, ${Math.max(0, r - 65)}, ${Math.max(0, r - 85)}, 0.22)`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  for (let i = 0; i < 7; i += 1) {
    const y = 40 + i * 66 + ((Math.sin(seed + i) + 1) / 2) * 18
    ctx.fillStyle = 'rgba(255,255,255,0.07)'
    ctx.fillRect(0, y, 512, 12)
  }

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function SatelliteRing({ stack = [] }) {
  const ringRef = useRef()

  useFrame((_, delta) => {
    if (!ringRef.current) return
    ringRef.current.rotation.y += delta * 0.55
  })

  return (
    <group ref={ringRef}>
      {stack.slice(0, 6).map((tech, i) => {
        const angle = (i / Math.max(stack.length, 1)) * Math.PI * 2
        const x = Math.cos(angle) * 1.7
        const z = Math.sin(angle) * 1.7
        const key = tech.toLowerCase()

        return (
          <mesh key={`${tech}-${i}`} position={[x, 0, z]}>
            <sphereGeometry args={[0.13, 18, 18]} />
            <meshStandardMaterial color={stackColors[key] ?? '#a78bfa'} emissive="#111827" />
          </mesh>
        )
      })}
    </group>
  )
}

function Planet({ project, index, selected, onSelect }) {
  const ref = useRef()
  const ring = Math.floor(index / 5)
  const perRing = 5
  const withinRing = index % perRing
  const radius = 6 + ring * 4.2
  const angle = (withinRing / perRing) * Math.PI * 2 + ring * 0.3
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const baseColor = project.planetColor ?? planetPalette[index % planetPalette.length]
  const surfaceTexture = useMemo(() => createPlanetTexture(baseColor, index + 1), [baseColor, index])
  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += 0.003
  })

  return (
    <group ref={ref} position={[x, 0, z]} onClick={() => onSelect(project.id)}>
      <mesh>
        <sphereGeometry args={[selected ? 1.35 : 1.0, 36, 36]} />
        <meshStandardMaterial
          map={surfaceTexture}
          color={baseColor}
          emissive={selected ? '#334155' : '#1e293b'}
          emissiveIntensity={selected ? 0.45 : 0.2}
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[selected ? 1.46 : 1.08, 32, 32]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={selected ? 0.2 : 0.11} side={BackSide} />
      </mesh>

      <SatelliteRing stack={project.stack} />

      <Billboard position={[0, 2.3, 0]}>
        <Text
          fontSize={0.38}
          maxWidth={6}
          color="#ffffff"
          outlineColor="#020617"
          outlineWidth={0.06}
          anchorX="center"
          anchorY="middle"
        >
          {project.name}
        </Text>
      </Billboard>

    </group>
  )
}

function SceneContent({ projects, selectedProjectId, onSelect }) {
  const visibleProjects = useMemo(() => projects, [projects])

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={14} color="#f59e0b" />
      <pointLight position={[8, 5, 8]} intensity={2.2} color="#60a5fa" />

      <mesh>
        <sphereGeometry args={[2.1, 48, 48]} />
        <meshStandardMaterial color="#fbbf24" emissive="#78350f" emissiveIntensity={0.9} roughness={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.55, 40, 40]} />
        <meshBasicMaterial color="#fde68a" transparent opacity={0.2} side={BackSide} />
      </mesh>

      {visibleProjects.map((project, i) => (
        <Planet
          key={project.id}
          project={project}
          index={i}
          selected={selectedProjectId === project.id}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls makeDefault enablePan={false} minDistance={10} maxDistance={48} />

    </>
  )
}

export function GalaxyScene({ projects, selectedProjectId, onSelect }) {
  return (
    <Canvas camera={{ position: [0, 12, 32], fov: 48 }}>
      <Suspense fallback={null}>
        <SceneContent
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelect={onSelect}
        />
      </Suspense>
    </Canvas>
  )
}
