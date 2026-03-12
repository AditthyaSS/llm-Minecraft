import React, { useMemo } from 'react'
import useGameStore from '../../store/gameStore'
import OfficeRoom from '../office/OfficeRoom'
import AgentDesk from '../office/AgentDesk'
import Wire from '../office/Wire'

// Grid layout: desks arranged in rows like in the reference
function getDeskPositions(count) {
  const positions = []
  const cols = Math.min(count, 3) // max 3 per row
  const rows = Math.ceil(count / cols)

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols)
    const col = i % cols
    const colsInRow = Math.min(cols, count - row * cols)
    const totalWidth = (colsInRow - 1) * 3.5
    const x = -totalWidth / 2 + col * 3.5
    const z = 1 + row * 3.5
    positions.push([x, 0, z])
  }
  return positions
}

export default function OfficeScene() {
  const activeProjectId = useGameStore(s => s.activeProjectId)
  const projects = useGameStore(s => s.projects)
  const agents = useGameStore(s => s.agents)
  const connections = useGameStore(s => s.connections)
  const selectedAgentId = useGameStore(s => s.selectedAgentId)
  const selectAgent = useGameStore(s => s.selectAgent)

  const project = projects.find(p => p.id === activeProjectId)
  if (!project) return null

  const projectAgents = project.agentIds.map(id => agents[id]).filter(Boolean)

  const deskPositions = useMemo(() => {
    const positions = getDeskPositions(projectAgents.length)
    const map = {}
    projectAgents.forEach((agent, i) => {
      map[agent.id] = positions[i] || [0, 0, 0]
    })
    return map
  }, [projectAgents.length])

  const projectConnections = connections.filter(c =>
    project.agentIds.includes(c.fromAgentId) && project.agentIds.includes(c.toAgentId)
  )

  return (
    <group>
      <OfficeRoom />

      {projectAgents.map((agent) => (
        <AgentDesk
          key={agent.id}
          agent={agent}
          position={deskPositions[agent.id] || [0, 0, 0]}
          isSelected={selectedAgentId === agent.id}
          onClick={() => selectAgent(agent.id)}
        />
      ))}

      {projectConnections.map((conn) => {
        const fromPos = deskPositions[conn.fromAgentId]
        const toPos = deskPositions[conn.toAgentId]
        if (!fromPos || !toPos) return null

        return (
          <Wire
            key={conn.id}
            fromPosition={[fromPos[0] + 1.25, fromPos[1] + 1.0, fromPos[2]]}
            toPosition={[toPos[0] - 1.25, toPos[1] + 1.0, toPos[2]]}
            isActive={project.isRunning}
          />
        )
      })}
    </group>
  )
}
