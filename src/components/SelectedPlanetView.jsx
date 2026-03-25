import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Billboard, OrbitControls, Text } from '@react-three/drei/core'
import { BackSide, CanvasTexture, Color } from 'three'

function createPlanetTexture(baseColor, seed = 1) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 512, 512)

  for (let i = 0; i < 18; i += 1) {
    const x = ((Math.sin(seed * 2 + i * 0.9) + 1) / 2) * 512
    const y = ((Math.sin(seed * 3 + i * 1.7) + 1) / 2) * 512
    const size = 15 + ((Math.sin(seed * 5 + i * 0.7) + 1) / 2) * 45
    ctx.fillStyle = 'rgba(255,255,255,0.11)'
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function AchievementMiniPlanet({ text, index, total, color }) {
  const ref = useRef()
  const angle = (index / Math.max(total, 1)) * Math.PI * 2
  const radius = 4.1
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const texture = useMemo(() => createPlanetTexture(color, index + 20), [color, index])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.35
    ref.current.rotation.y += 0.01
  })

  return (
    <group ref={ref} position={[x, 0, z]}>
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial
          map={texture}
          color={color}
          emissive="#164e63"
          emissiveIntensity={0.35}
          roughness={0.85}
          metalness={0.08}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={BackSide} />
      </mesh>

      <Billboard position={[0, 0.9, 0]}>
        <Text
          fontSize={0.19}
          maxWidth={3}
          lineHeight={1.1}
          textAlign="center"
          color="#e2e8f0"
          outlineColor="#020617"
          outlineWidth={0.03}
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Billboard>
    </group>
  )
}

function SelectedSystem({ project, selectedColor = '#f472b6' }) {
  const items = useMemo(() => project?.achievements ?? [], [project])
  const variantColorByIndex = useMemo(() => {
    const c = new Color(selectedColor)
    const hsl = { h: 0, s: 0, l: 0 }
    c.getHSL(hsl)

    return (index) => {
      const s = Math.min(0.95, Math.max(0.35, hsl.s + (index % 2 === 0 ? 0.08 : -0.06)))
      const l = Math.min(0.72, Math.max(0.32, hsl.l + ((index % 3) - 1) * 0.08))
      return new Color().setHSL(hsl.h, s, l).getStyle()
    }
  }, [selectedColor])
  const mainTexture = useMemo(() => createPlanetTexture(selectedColor, 7), [selectedColor])

  if (!project) return null

  return (
    <>
      <ambientLight intensity={0.65} />
      <pointLight position={[0, 3, 0]} intensity={6} color="#f59e0b" />
      <pointLight position={[-5, 2, 3]} intensity={2.5} color="#60a5fa" />

      <mesh>
        <sphereGeometry args={[1.8, 48, 48]} />
        <meshStandardMaterial
          map={mainTexture}
          color={selectedColor}
          emissive="#831843"
          emissiveIntensity={0.4}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.95, 40, 40]} />
        <meshBasicMaterial color={selectedColor} transparent opacity={0.12} side={BackSide} />
      </mesh>

      <Billboard position={[0, 2.6, 0]}>
        <Text
          fontSize={0.52}
          maxWidth={7}
          textAlign="center"
          color="#ffffff"
          outlineColor="#020617"
          outlineWidth={0.05}
          anchorX="center"
          anchorY="middle"
        >
          {project.name}
        </Text>
      </Billboard>

      {items.map((item, index) => (
        <AchievementMiniPlanet
          key={`${project.id}-${index}`}
          text={item}
          index={index}
          total={items.length}
          color={variantColorByIndex(index)}
        />
      ))}

      <OrbitControls makeDefault enablePan={false} minDistance={6} maxDistance={16} />

    </>
  )
}

export function SelectedPlanetView({ project, selectedColor }) {
  return (
    <div className="selected-canvas selected-system">
      <Canvas camera={{ position: [0, 4, 9], fov: 48 }}>
        <SelectedSystem project={project} selectedColor={selectedColor} />
      </Canvas>

      {project && (
        <div className="selected-overlay">
          <h3>{project.name}</h3>
          <ul>
            {(project.achievements ?? []).map((item, index) => (
              <li key={`${project.id}-achievement-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
