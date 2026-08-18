"use client"

import * as React from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const COLOR_MAP_URL = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
const NORMAL_MAP_URL = "https://unpkg.com/three-globe/example/img/earth-topology.png"
const SPECULAR_MAP_URL = "https://unpkg.com/three-globe/example/img/earth-water.png"
const CLOUDS_MAP_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"

interface EarthModelProps {
  score: number
  scale?: number
}

// Simple Fresnel Shader for atmospheric glow
const AtmosphereShader = {
  uniforms: {
    c: { type: "f", value: 0.6 },
    p: { type: "f", value: 4.0 },
    glowColor: { type: "c", value: new THREE.Color(0x4b91f5) },
    viewVector: { type: "v3", value: new THREE.Vector3(0, 0, 1) }
  },
  vertexShader: `
    uniform vec3 viewVector;
    uniform float c;
    uniform float p;
    varying float intensity;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormel = normalize(normalMatrix * viewVector);
      intensity = pow(c - dot(vNormal, vNormel), p);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    varying float intensity;
    void main() {
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4(glow, intensity);
    }
  `
}

export function EarthModel({ score, scale = 1 }: EarthModelProps) {
  const earthRef = React.useRef<THREE.Group>(null)
  const cloudsRef = React.useRef<THREE.Mesh>(null)

  // Determine atmospheric color based on score
  const getAtmosphereColor = (score: number) => {
    if (score <= 1.5) return "#4b91f5" // Vibrant blue
    if (score <= 3.5) return "#f5b94b" // Warmer
    if (score <= 6.5) return "#f57c4b" // Orange
    return "#f54b4b" // Red
  }
  
  const glowColor = React.useMemo(() => new THREE.Color(getAtmosphereColor(score)), [score])

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    COLOR_MAP_URL,
    NORMAL_MAP_URL,
    SPECULAR_MAP_URL,
    CLOUDS_MAP_URL
  ])

  // Custom shader material for the atmosphere
  const atmosphereMaterial = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        ...AtmosphereShader.uniforms,
        glowColor: { value: glowColor }
      },
      vertexShader: AtmosphereShader.vertexShader,
      fragmentShader: AtmosphereShader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    })
  }, [glowColor])

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.06 // Clouds rotate slightly faster
    }
    
    // Update view vector for fresnel
    atmosphereMaterial.uniforms.viewVector.value = new THREE.Vector3().subVectors(state.camera.position, earthRef.current!.position)
  })

  return (
    <group ref={earthRef} scale={scale}>
      
      {/* Base Earth Sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          shininess={15}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef} scale={1.01}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmospheric Fresnel Glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>

    </group>
  )
}
