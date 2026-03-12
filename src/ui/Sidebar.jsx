import React from 'react'
import useGameStore from '../store/gameStore'

export default function Sidebar() {
  const projects = useGameStore(s => s.projects)
  const agents = useGameStore(s => s.agents)
  const view = useGameStore(s => s.view)
  const enterBuilding = useGameStore(s => s.enterBuilding)
  const addProject = useGameStore(s => s.addProject)

  if (view !== 'town') return null

  const handleAddProject = () => {
    const name = 'PROJECT ' + (projects.length + 1)
    const x = Math.floor(Math.random() * 6 - 3)
    const z = Math.floor(Math.random() * 4 + 2)
    addProject(name, { x, z })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 50,
      left: 8,
      bottom: 16,
      width: 220,
      zIndex: 20,
      background: 'rgba(13,13,31,0.92)',
      border: '1px solid #2a2a3e',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 12px',
        borderBottom: '1px solid #2a2a3e',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 8,
        color: '#94a3b8',
        letterSpacing: 1,
      }}>
        📁 PROJECTS
      </div>

      {/* Project list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
        {projects.map(project => {
          const agentCount = project.agentIds.length
          return (
            <div
              key={project.id}
              onClick={() => enterBuilding(project.id)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: '1px solid rgba(42,42,62,0.5)',
                transition: 'background 0.15s ease',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(124,58,237,0.15)'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Status dot */}
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: project.isRunning ? '#2ecc71' : '#64748b',
                boxShadow: project.isRunning ? '0 0 6px #2ecc71' : 'none',
                flexShrink: 0,
              }} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  color: '#e2e8f0',
                  fontSize: 11,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {project.name}
                </div>
                <div style={{
                  color: '#64748b',
                  fontSize: 9,
                  fontFamily: 'monospace',
                  marginTop: 2,
                }}>
                  {agentCount} agent{agentCount !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Color bar */}
              <div style={{
                width: 3, height: 24, borderRadius: 2,
                background: project.color,
                flexShrink: 0,
              }} />
            </div>
          )
        })}
      </div>

      {/* Add project button */}
      <div style={{
        padding: '8px 12px',
        borderTop: '1px solid #2a2a3e',
      }}>
        <button
          onClick={handleAddProject}
          style={{
            width: '100%',
            padding: '8px 0',
            background: 'rgba(124,58,237,0.2)',
            border: '1px dashed #7c3aed',
            borderRadius: 6,
            color: '#a78bfa',
            fontSize: 10,
            fontFamily: "'Press Start 2P', cursive",
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={e => { e.target.style.background = 'rgba(124,58,237,0.35)' }}
          onMouseOut={e => { e.target.style.background = 'rgba(124,58,237,0.2)' }}
        >
          + NEW PROJECT
        </button>
      </div>
    </div>
  )
}
