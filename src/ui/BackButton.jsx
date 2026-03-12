import React from 'react'
import useGameStore from '../store/gameStore'

export default function BackButton() {
  const view = useGameStore(s => s.view)
  const exitBuilding = useGameStore(s => s.exitBuilding)
  const activeProjectId = useGameStore(s => s.activeProjectId)
  const projects = useGameStore(s => s.projects)

  if (view !== 'office') return null

  const project = projects.find(p => p.id === activeProjectId)

  return (
    <>
      {/* Back button */}
      <button
        onClick={exitBuilding}
        style={{
          position: 'fixed',
          bottom: 12,
          left: 12,
          zIndex: 20,
          background: 'rgba(124,58,237,0.9)',
          border: 'none',
          borderRadius: 6,
          padding: '8px 16px',
          color: '#ffffff',
          fontFamily: "'Press Start 2P', cursive",
          fontSize: 9,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 2px 10px rgba(124,58,237,0.4)',
          transition: 'all 0.15s ease',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'rgba(124,58,237,1)'
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'rgba(124,58,237,0.9)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        ← BACK
      </button>

      {/* Office view label */}
      <div style={{
        position: 'fixed',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        color: '#94a3b8',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 8,
        letterSpacing: 2,
        pointerEvents: 'none',
      }}>
        OFFICE VIEW
      </div>

      {/* Project name */}
      <div style={{
        position: 'fixed',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        color: '#e2e8f0',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 10,
        pointerEvents: 'none',
      }}>
        {project?.name || ''}
      </div>
    </>
  )
}
