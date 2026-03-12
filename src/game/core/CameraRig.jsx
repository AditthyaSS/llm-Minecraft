import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import useGameStore from '../../store/gameStore'

export default function CameraRig() {
  const controlsRef = useRef()
  const { camera } = useThree()
  const view = useGameStore(s => s.view)
  const prevView = useRef(view)

  useEffect(() => {
    if (view === prevView.current) return
    prevView.current = view

    if (view === 'town') {
      gsap.to(camera.position, {
        x: 28, y: 22, z: 28,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0, y: 0, z: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })
      }
    } else if (view === 'office') {
      gsap.to(camera.position, {
        x: 0, y: 8, z: 12,
        duration: 1.2,
        ease: 'power2.inOut',
      })
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0, y: 1, z: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })
      }
    }
  }, [view, camera])

  return (
    <OrbitControls
      ref={controlsRef}
      enableRotate={true}
      enableZoom={true}
      enablePan={true}
      minDistance={10}
      maxDistance={60}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2.1}
      target={[0, 0, 0]}
      rotateSpeed={0.8}
      zoomSpeed={1.2}
      panSpeed={1.0}
    />
  )
}
