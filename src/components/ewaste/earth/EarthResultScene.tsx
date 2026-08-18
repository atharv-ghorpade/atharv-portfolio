"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Loader } from "@react-three/drei"
import { EarthModel } from "./EarthModel"
import { motion } from "framer-motion"

interface EarthResultSceneProps {
  score: number
}

export function EarthResultScene({ score }: EarthResultSceneProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="w-full h-[50vh] md:h-[80vh] min-h-[400px] relative pointer-events-auto"
    >
      <Canvas 
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.1} />
        {/* Sun-like directional light */}
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" castShadow />
        {/* Soft fill light */}
        <directionalLight position={[-5, -3, -5]} intensity={0.2} color="#4b91f5" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <React.Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <EarthModel score={score} scale={1} />
          </group>
        </React.Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={false} // Custom rotation handled in useFrame inside EarthModel
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </motion.div>
  )
}
