'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'

// ── Martini Glass ────────────────────────────────────────────
function MartiniGlass() {
  const glassRef = useRef<THREE.Mesh>(null)
  const liquidRef = useRef<THREE.Mesh>(null)

  // Profile for LatheGeometry — traces half-silhouette of a martini glass
  const points = useMemo(() => [
    new THREE.Vector2(0.28, 0.00),
    new THREE.Vector2(0.30, 0.02),
    new THREE.Vector2(0.10, 0.08),
    new THREE.Vector2(0.04, 0.14),
    new THREE.Vector2(0.035, 0.50),
    new THREE.Vector2(0.04, 0.54),
    new THREE.Vector2(0.09, 0.58),
    new THREE.Vector2(0.22, 0.68),
    new THREE.Vector2(0.42, 0.82),
    new THREE.Vector2(0.60, 0.95),
    new THREE.Vector2(0.64, 1.00),
    new THREE.Vector2(0.66, 1.02),
  ], [])

  const glassGeometry = useMemo(() => new THREE.LatheGeometry(points, 64), [points])

  // Liquid fill (cocktail inside the bowl)
  const liquidPoints = useMemo(() => [
    new THREE.Vector2(0.00, 0.60),
    new THREE.Vector2(0.15, 0.68),
    new THREE.Vector2(0.34, 0.80),
    new THREE.Vector2(0.52, 0.91),
    new THREE.Vector2(0.00, 0.91),
  ], [])
  const liquidGeometry = useMemo(() => new THREE.LatheGeometry(liquidPoints, 64), [liquidPoints])

  useFrame(({ clock }) => {
    if (glassRef.current) {
      glassRef.current.rotation.y = clock.getElapsedTime() * 0.25
    }
    if (liquidRef.current) {
      liquidRef.current.rotation.y = clock.getElapsedTime() * 0.25
      // subtle liquid shimmer via emissiveIntensity
      const mat = liquidRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.3 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.6}>
      <group position={[0, -0.5, 0]} scale={1.4}>
        {/* Glass body */}
        <mesh ref={glassRef} geometry={glassGeometry} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.05}
            roughness={0.02}
            transmission={0.97}
            ior={1.52}
            chromaticAberration={0.04}
            anisotropy={0.1}
            color="#EEEEFF"
            distortionScale={0}
            temporalDistortion={0}
          />
        </mesh>

        {/* Liquid */}
        <mesh ref={liquidRef} geometry={liquidGeometry}>
          <meshStandardMaterial
            color="#E86A40"
            transparent
            opacity={0.82}
            roughness={0.1}
            metalness={0.05}
            emissive="#C94020"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Rim highlight ring */}
        <mesh position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.65, 0.008, 16, 100]} />
          <meshStandardMaterial color="#F0D58C" metalness={0.9} roughness={0.05} emissive="#C9A84C" emissiveIntensity={0.4} />
        </mesh>

        {/* Garnish — lemon twist */}
        <mesh position={[0.55, 1.0, 0.2]} rotation={[0.3, 0.5, 0.8]}>
          <torusGeometry args={[0.12, 0.03, 8, 32, Math.PI * 1.4]} />
          <meshStandardMaterial color="#FDD835" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

// ── Floating Particles ───────────────────────────────────────
function GoldParticles({ count = 180 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, sizes } = useMemo(() => {
    const pos  = new Float32Array(count * 3)
    const szs  = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.random() * Math.PI
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      szs[i] = Math.random() * 3 + 1
    }
    return { positions: pos, sizes: szs }
  }, [count])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        color="#C9A84C"
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  )
}

// ── Ambient rings ────────────────────────────────────────────
function AmbientRings() {
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  const r3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (r1.current) { r1.current.rotation.z = t * 0.15; r1.current.rotation.x = t * 0.08 }
    if (r2.current) { r2.current.rotation.z = -t * 0.1; r2.current.rotation.y = t * 0.12 }
    if (r3.current) { r3.current.rotation.x = t * 0.07; r3.current.rotation.z = t * 0.2 }
  })

  const ringMat = (
    <meshStandardMaterial
      color="#C9A84C"
      transparent
      opacity={0.15}
      metalness={0.8}
      roughness={0.2}
      side={THREE.DoubleSide}
    />
  )

  return (
    <>
      <mesh ref={r1}><torusGeometry args={[2.2, 0.006, 8, 200]} />{ringMat}</mesh>
      <mesh ref={r2}><torusGeometry args={[2.8, 0.004, 8, 200]} />{ringMat}</mesh>
      <mesh ref={r3}><torusGeometry args={[3.4, 0.003, 8, 200]} />{ringMat}</mesh>
    </>
  )
}

// ── Mouse Parallax Rig ──────────────────────────────────────
function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.8, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.4 + 0.2, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Scene Lights ─────────────────────────────────────────────
function Lights() {
  const light1 = useRef<THREE.PointLight>(null)
  const light2 = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.5) * 3
      light1.current.position.z = Math.cos(t * 0.5) * 3
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={light1} position={[3, 3, 2]} intensity={3} color="#C9A84C" distance={10} decay={2} />
      <pointLight ref={light2} position={[-2, 1, 2]} intensity={2} color="#FF8C5A" distance={8} decay={2} />
      <pointLight position={[0, 3, -3]} intensity={1.5} color="#8866FF" distance={8} decay={2} />
      <directionalLight position={[0, 5, 5]} intensity={0.5} color="#FFFFFF" />
    </>
  )
}

// ── Main Export ───────────────────────────────────────────────
export default function CocktailScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent' }}
    >
      <Lights />
      <CameraRig />
      <Suspense fallback={null}>
        <MartiniGlass />
        <GoldParticles />
        <AmbientRings />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
