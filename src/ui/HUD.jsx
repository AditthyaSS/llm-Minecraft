import React from 'react'
import useGameStore from '../store/gameStore'

const TOOLBAR_MODES = [
  { id: 'select',  icon: '🖱️', label: 'Select' },
  { id: 'move',    icon: '✋', label: 'Move' },
  { id: 'place',   icon: '🏗️', label: 'Place' },
  { id: 'flag',    icon: '🚩', label: 'Flag' },
  { id: 'build',   icon: '🟩', label: 'Build' },
  { id: 'wrench',  icon: '🔧', label: 'Config' },
]

export default function HUD() {
  const toolMode = useGameStore(s => s.toolMode)
  const setToolMode = useGameStore(s => s.setToolMode)
  const sessionCost = useGameStore(s => s.sessionCost)
  const sessionCalls = useGameStore(s => s.sessionCalls)
  const todayCalls = useGameStore(s => s.todayCalls)
  const zoom = useGameStore(s => s.zoom)
  const projects = useGameStore(s => s.projects)
  const clearAllProjects = useGameStore(s => s.clearAllProjects)

  const activeCount = projects.filter(p => p.isRunning).length

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20, pointerEvents: 'none' }}>
      {/* LEFT: Active units */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        color: '#e2e8f0', fontFamily: "'Press Start 2P', cursive", fontSize: 9,
        background: 'rgba(13,13,31,0.85)', border: '1px solid #2a2a3e',
        borderRadius: 6, padding: '6px 10px', pointerEvents: 'auto',
      }}>
        ACTIVE UNITS ({activeCount})
      </div>

      {/* CENTER: Mode toolbar */}
      <div style={{
        position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 4, background: 'rgba(13,13,31,0.9)',
        border: '1px solid #2a2a3e', borderRadius: 8, padding: '4px 8px',
        pointerEvents: 'auto',
      }}>
        {TOOLBAR_MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => setToolMode(mode.id)}
            title={mode.label}
            style={{
              width: 32, height: 32, borderRadius: 6,
              background: toolMode === mode.id ? '#7c3aed' : 'transparent',
              border: '1px solid',
              borderColor: toolMode === mode.id ? '#7c3aed' : '#2a2a3e',
              color: '#e2e8f0', fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
          >
            {mode.icon}
          </button>
        ))}
      </div>

      {/* RIGHT: Stats + Clear */}
      <div style={{
        position: 'absolute', top: 6, right: 8,
        display: 'flex', alignItems: 'center', gap: 8,
        pointerEvents: 'auto',
      }}>
        {/* Gold cost */}
        <div style={{
          background: 'rgba(13,13,31,0.9)', border: '1px solid #2a2a3e',
          borderRadius: 6, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: '#f59e0b', fontSize: 12 }}>🟡</span>
          <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: 12, fontWeight: 'bold' }}>
            ${sessionCost}
          </span>
        </div>

        {/* Session dots */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          background: 'rgba(13,13,31,0.9)', border: '1px solid #2a2a3e',
          borderRadius: 6, padding: '3px 8px',
        }}>
          <span style={{ color: '#64748b', fontSize: 7, fontFamily: 'monospace', letterSpacing: 1 }}>SESSION</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {Array(10).fill(0).map((_, i) => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i < sessionCalls ? '#7c3aed' : '#2a2a3e',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        {/* Today dots */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          background: 'rgba(13,13,31,0.9)', border: '1px solid #2a2a3e',
          borderRadius: 6, padding: '3px 8px',
        }}>
          <span style={{ color: '#64748b', fontSize: 7, fontFamily: 'monospace', letterSpacing: 1 }}>TODAY</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {Array(5).fill(0).map((_, i) => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i < todayCalls ? '#2ecc71' : '#2a2a3e',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        {/* Clear button */}
        <button
          onClick={clearAllProjects}
          style={{
            background: '#c0392b', border: 'none', borderRadius: 6,
            padding: '6px 14px', color: 'white', fontFamily: 'monospace',
            fontSize: 11, cursor: 'pointer', transition: 'background 0.15s ease',
          }}
          onMouseOver={e => e.target.style.background = '#e74c3c'}
          onMouseOut={e => e.target.style.background = '#c0392b'}
        >
          🗑 CLEAR
        </button>

        {/* Zoom */}
        <div style={{
          color: '#64748b', fontFamily: 'monospace', fontSize: 11,
          background: 'rgba(13,13,31,0.9)', border: '1px solid #2a2a3e',
          borderRadius: 6, padding: '6px 8px',
        }}>
          🔍 {Math.round(zoom * 100)}%
        </div>
      </div>
    </div>
  )
}
