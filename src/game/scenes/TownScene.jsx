import React from 'react'
import useGameStore from '../../store/gameStore'
import Ground from '../world/Ground'
import Building from '../world/Building'
import Billboard from '../world/Billboard'
import Tree from '../world/Tree'
import Fence from '../world/Fence'
import Lamp from '../world/Lamp'
import AnimalController from '../animals/AnimalController'
import { FlowerPatch } from '../world/FlowerPatch'
import { EdgeBlocks } from '../world/EdgeBlocks'

const TREE_POSITIONS = [
  [-8, 0, -7], [-10, 0, -3], [8, 0, -6], [10, 0, -1],
  [-9, 0, 3], [9, 0, 4], [-7, 0, 6], [7, 0, 7],
  [-3, 0, 5], [3, 0, 6], [-6, 0, 2], [6, 0, 3],
  [-11, 0, 5], [11, 0, -5], [0, 0, 7],
  [-5, 0, -7], [5, 0, -7], [-8, 0, -1],
]

const LAMP_POSITIONS = [
  [-5, 0, -2], [5, 0, -2], [-1, 0, 2], [3, 0, 2],
]

export default function TownScene() {
  const projects = useGameStore(s => s.projects)
  const enterBuilding = useGameStore(s => s.enterBuilding)

  return (
    <group>
      {/* Ground plane */}
      <Ground />

      {/* Buildings + Billboards */}
      {projects.map((project) => (
        <React.Fragment key={project.id}>
          {/* Building */}
          <Building
            project={project}
            position={[project.position.x * 2, 0, project.position.z * 2]}
            onClick={() => enterBuilding(project.id)}
          />

          {/* Billboard next to building */}
          <Billboard
            name={project.name}
            agentCount={project.agentIds.length}
            position={[project.position.x * 2 + 3, 0, project.position.z * 2]}
          />
        </React.Fragment>
      ))}

      {/* Trees */}
      {TREE_POSITIONS.map((pos, i) => (
        <Tree
          key={`tree-${i}`}
          position={pos}
          scale={0.6 + Math.random() * 0.5}
        />
      ))}

      {/* Street Lamps */}
      {LAMP_POSITIONS.map((pos, i) => (
        <Lamp key={`lamp-${i}`} position={pos} />
      ))}

      {/* Fences along edges */}
      <Fence start={[-12, 0, -12]} end={[12, 0, -12]} segments={12} />
      <Fence start={[-12, 0, 12]} end={[12, 0, 12]} segments={12} />
      <Fence start={[-12, 0, -12]} end={[-12, 0, 12]} segments={12} />
      <Fence start={[12, 0, -12]} end={[12, 0, 12]} segments={12} />

      {/* Animals */}
      <AnimalController />

      {/* ── EDGE GRASS BLOCKS ── */}
      <EdgeBlocks />

      {/* ── FLOWER PATCHES ── */}
      <FlowerPatch position={[2, 0, 8]} count={5} spread={0.7} />
      <FlowerPatch position={[-2, 0, 8]} count={6} spread={0.8} />
      <FlowerPatch position={[6, 0, 6]} count={4} spread={0.6} />
      <FlowerPatch position={[-6, 0, 6]} count={5} spread={0.7} />
      <FlowerPatch position={[10, 0, 4]} count={7} spread={0.9} />
      <FlowerPatch position={[-10, 0, 4]} count={5} spread={0.8} />
      <FlowerPatch position={[4, 0, 10]} count={6} spread={0.8} />
      <FlowerPatch position={[-4, 0, 10]} count={5} spread={0.7} />
      <FlowerPatch position={[0, 0, 12]} count={8} spread={1.0} />
      <FlowerPatch position={[-8, 0, 8]} count={4} spread={0.6} />
      <FlowerPatch position={[8, 0, 8]} count={5} spread={0.7} />

    </group>
  )
}