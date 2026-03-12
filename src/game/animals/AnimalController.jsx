import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useGameStore from '../../store/gameStore'
import Pig from './Pig'
import Sheep from './Sheep'
import Cat from './Cat'

const BOUNDS = 8

function randomTarget() {
  return {
    x: (Math.random() - 0.5) * BOUNDS * 2,
    z: (Math.random() - 0.5) * BOUNDS * 2,
  }
}

const AnimalComponent = { pig: Pig, sheep: Sheep, cat: Cat }

export default function AnimalController() {
  const animals = useGameStore(s => s.animals)
  const animalsRef = useRef(
    animals.map(a => ({
      ...a,
      pos: { x: a.position.x, z: a.position.z },
      tgt: { x: a.target.x, z: a.target.z },
      idle: a.idleTimer,
      rot: a.rotation || 0,
    }))
  )

  useFrame((_, delta) => {
    // Clamp delta to avoid huge jumps
    const dt = Math.min(delta, 0.1)

    animalsRef.current.forEach((animal) => {
      if (animal.idle > 0) {
        animal.idle -= dt
        return
      }

      const dx = animal.tgt.x - animal.pos.x
      const dz = animal.tgt.z - animal.pos.z
      const dist = Math.sqrt(dx * dx + dz * dz)

      if (dist < 0.2) {
        animal.tgt = randomTarget()
        animal.idle = 1 + Math.random() * 2
      } else {
        const nx = dx / dist
        const nz = dz / dist
        animal.pos.x += nx * animal.speed * dt
        animal.pos.z += nz * animal.speed * dt
        animal.rot = Math.atan2(nx, nz)
      }
    })
  })

  return (
    <>
      {animalsRef.current.map((animal) => {
        const Component = AnimalComponent[animal.type]
        if (!Component) return null
        return (
          <AnimalRenderer key={animal.id} animal={animal} Component={Component} />
        )
      })}
    </>
  )
}

function AnimalRenderer({ animal, Component }) {
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = animal.pos.x
      groupRef.current.position.z = animal.pos.z
      groupRef.current.rotation.y = animal.rot
    }
  })

  return (
    <group ref={groupRef} position={[animal.pos.x, 0, animal.pos.z]} rotation={[0, animal.rot, 0]}>
      <Component position={{ x: 0, z: 0 }} rotation={0} />
    </group>
  )
}
