'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uMouseX;
  uniform float uMouseY;
  uniform float uMouseSpeed;

  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);

    float d =
      sin(position.x * 2.8 + uTime * 1.8)  * 0.072
    + sin(position.y * 3.5 + uTime * 1.3)  * 0.065
    + sin(position.z * 3.1 + uTime * 2.1)  * 0.060
    + sin(position.x * 1.8 + position.y * 2.2 + uTime * 1.45) * 0.055
    + sin(position.y * 2.6 + position.z * 1.9 + uTime * 2.2)  * 0.048
    + sin(position.x * 4.2 + position.z * 2.4 + uTime * 1.0)  * 0.042
    + cos(position.x * 2.1 + position.y * 3.3 + uTime * 1.8)  * 0.036
    + cos(position.z * 1.6 + position.x * 3.8 + uTime * 1.55) * 0.030;

    vec3 mouseDir = normalize(vec3(uMouseX * 1.6, uMouseY * 1.6, 1.5));
    float facing = dot(normalize(position), mouseDir);
    float cursorBulge = smoothstep(-0.2, 1.0, facing) * (0.14 + uMouseSpeed * 0.32);

    float totalDisp = clamp(d + cursorBulge, -0.28, 0.40);
    vec3 newPos = position + normal * totalDisp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`

const fragmentShader = `
  varying vec3 vNormal;

  void main() {
    vec3 light = normalize(vec3(1.3, 1.0, 0.9));
    float d = dot(vNormal, light) * 0.5 + 0.5;

    vec3 dark   = vec3(0.12, 0.01, 0.01);
    vec3 mid    = vec3(1.0,  0.231, 0.122);
    vec3 bright = vec3(1.0,  0.58,  0.18);

    vec3 color = mix(dark, mid, smoothstep(0.0, 0.55, d));
        color  = mix(color, bright, smoothstep(0.55, 1.0, d));

    gl_FragColor = vec4(color, 1.0);
  }
`

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const speedRef = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uMouseX:     { value: 0 },
    uMouseY:     { value: 0 },
    uMouseSpeed: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial

    const dx = mouse.current.x - mat.uniforms.uMouseX.value
    const dy = mouse.current.y - mat.uniforms.uMouseY.value
    const rawSpeed = Math.sqrt(dx * dx + dy * dy)
    speedRef.current += (rawSpeed - speedRef.current) * 0.1

    mat.uniforms.uTime.value       = clock.elapsedTime
    mat.uniforms.uMouseX.value    += dx * 0.05
    mat.uniforms.uMouseY.value    += dy * 0.05
    mat.uniforms.uMouseSpeed.value = speedRef.current
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.05, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function HeroOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <OrbMesh />
    </Canvas>
  )
}
