import React from 'react'
import useGameStore from '../store/gameStore'

const NODE_TYPES = [
  { id: 'researcher', name: 'Researcher', icon: '🔍', model: 'claude-3-5-sonnet', desc: 'Analyzes data and provides insights' },
  { id: 'lead',       name: 'Lead',       icon: '👑', model: 'claude-3-5-sonnet', desc: 'Coordinates and reviews work' },
  { id: 'worker',     name: 'Worker',     icon: '⚙️', model: 'gpt-4o',           desc: 'Executes tasks efficiently' },
  { id: 'critic',     name: 'Critic',     icon: '🎯', model: 'claude-3-5-sonnet', desc: 'Reviews and finds issues' },
  { id: 'writer',     name: 'Writer',     icon: '✍️', model: 'gpt-4o',           desc: 'Creates documentation' },
]

export default function BuildMenu({ projectId, onClose }) {
  const addAgent = useGameStore(s => s.addAgent)

  if (!projectId) return null

  const handleSelect = (nodeType) => {
    addAgent(projectId, {
      name: nodeType.name,
      model: nodeType.model,
      systemPrompt: `You are a ${nodeType.name.toLowerCase()} agent. ${nodeType.desc}.`,
    })
    onClose?.()
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 30,
      background: 'rgba(13,13,31,0.96)',
      border: '1px solid #2a2a3e',
      borderRadius: 12,
      padding: 16,
      minWidth: 280,
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    }}>
      <div style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 9, color: '#94a3b8', letterSpacing: 1,
        marginBottom: 12, textAlign: 'center',
      }}>
        🧩 SELECT AGENT TYPE
      </div>

      {NODE_TYPES.map(type => (
        <div
          key={type.id}
          onClick={() => handleSelect(type)}
          style={{
            padding: '10px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 4,
            border: '1px solid transparent',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(124,58,237,0.15)'
            e.currentTarget.style.borderColor = '#7c3aed'
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'transparent'
          }}
        >
          <span style={{ fontSize: 18 }}>{type.icon}</span>
          <div>
            <div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 600 }}>{type.name}</div>
            <div style={{ color: '#64748b', fontSize: 9, fontFamily: 'monospace' }}>{type.desc}</div>
          </div>
        </div>
      ))}

      <button
        onClick={onClose}
        style={{
          width: '100%', marginTop: 8, padding: '6px 0',
          background: 'transparent', border: '1px solid #2a2a3e',
          borderRadius: 4, color: '#64748b', fontSize: 10,
          fontFamily: 'monospace', cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  )
}
