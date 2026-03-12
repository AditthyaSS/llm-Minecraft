import React, { useRef, useEffect, useState } from 'react'
import useGameStore from '../store/gameStore'

export default function AgentPanel() {
  const selectedAgentId = useGameStore(s => s.selectedAgentId)
  const agents = useGameStore(s => s.agents)
  const view = useGameStore(s => s.view)
  const activeProjectId = useGameStore(s => s.activeProjectId)
  const projects = useGameStore(s => s.projects)
  const runMockPipelineAction = useGameStore(s => s.runMockPipelineAction)
  const addAgent = useGameStore(s => s.addAgent)
  const clearAgentOutput = useGameStore(s => s.clearAgentOutput)
  const outputRef = useRef(null)
  const [chatInput, setChatInput] = useState('')

  const agent = selectedAgentId ? agents[selectedAgentId] : null
  const project = projects.find(p => p.id === activeProjectId)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [agent?.output])

  if (view !== 'office') return null

  const statusColors = {
    idle: '#888888',
    thinking: '#3498db',
    done: '#2ecc71',
    error: '#e74c3c',
  }

  const statusLabels = {
    idle: 'STANDING BY',
    thinking: 'THINKING...',
    done: 'COMPLETED',
    error: 'ERROR',
  }

  const handleAddAgent = () => {
    if (!activeProjectId) return
    const names = ['Researcher', 'Worker', 'Critic', 'Writer', 'Lead']
    const models = ['claude-3-5-sonnet', 'gpt-4o', 'gemini-pro']
    addAgent(activeProjectId, {
      name: names[Math.floor(Math.random() * names.length)],
      model: models[Math.floor(Math.random() * models.length)],
      systemPrompt: 'You are a helpful AI assistant.',
    })
  }

  return (
    <div style={{
      position: 'fixed',
      top: 50,
      right: 8,
      bottom: 16,
      width: 320,
      zIndex: 20,
      background: 'rgba(13,13,31,0.95)',
      border: '1px solid #2a2a3e',
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      {/* ═══ HEADER ═══ */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #2a2a3e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(26,26,46,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 9, color: '#e2e8f0',
          }}>
            {agent ? `AGENT ${project?.agentIds.indexOf(selectedAgentId) + 1}` : '🤖 AGENTS'}
          </span>
          {agent && (
            <>
              {/* Edit & Delete buttons like reference */}
              <button style={{
                background: '#2a2a3e', border: 'none', borderRadius: 3,
                padding: '2px 6px', color: '#94a3b8', fontSize: 10, cursor: 'pointer',
              }}>✏️</button>
              <button style={{
                background: '#2a2a3e', border: 'none', borderRadius: 3,
                padding: '2px 6px', color: '#e74c3c', fontSize: 10, cursor: 'pointer',
              }}>🗑️</button>
            </>
          )}
        </div>
        {agent && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: statusColors[agent.status],
              boxShadow: `0 0 4px ${statusColors[agent.status]}`,
            }} />
            <span style={{
              color: statusColors[agent.status],
              fontSize: 8,
              fontFamily: "'Press Start 2P', cursive",
              letterSpacing: 0.5,
            }}>
              {statusLabels[agent.status]}
            </span>
          </div>
        )}
      </div>

      {/* ═══ MODEL SELECTOR ═══ */}
      {agent && (
        <div style={{
          padding: '6px 14px',
          borderBottom: '1px solid #1a1a2e',
          display: 'flex', gap: 4,
        }}>
          {['claude-3-5-sonnet', 'gpt-4o', 'gemini-pro'].map(model => (
            <div key={model} style={{
              padding: '3px 8px',
              borderRadius: 4,
              fontSize: 9,
              fontFamily: 'monospace',
              background: agent.model === model ? '#7c3aed' : '#1a1a2e',
              color: agent.model === model ? '#fff' : '#64748b',
              border: `1px solid ${agent.model === model ? '#7c3aed' : '#2a2a3e'}`,
              cursor: 'pointer',
            }}>
              {model.split('-').pop()}
            </div>
          ))}
        </div>
      )}

      {/* ═══ CHAT / OUTPUT ═══ */}
      {agent ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Agent info */}
          <div style={{
            padding: '8px 14px',
            borderBottom: '1px solid rgba(42,42,62,0.5)',
          }}>
            <div style={{ color: '#94a3b8', fontSize: 9, fontFamily: 'monospace', marginBottom: 3 }}>
              ROLE
            </div>
            <div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 600 }}>
              ({agent.name})
            </div>
          </div>

          {/* Chat output area */}
          <div
            ref={outputRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px 14px',
            }}
          >
            {agent.output ? (
              <div style={{
                display: 'flex',
                gap: 8,
                marginBottom: 8,
              }}>
                {/* Agent avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: 4,
                  background: '#7c3aed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, flexShrink: 0,
                }}>
                  🤖
                </div>
                {/* Message bubble */}
                <div style={{
                  background: '#1a1a2e',
                  borderRadius: '4px 10px 10px 10px',
                  padding: '8px 12px',
                  color: '#e2e8f0',
                  fontSize: 12,
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  flex: 1,
                }}>
                  {agent.output}
                  {agent.status === 'thinking' && (
                    <span style={{ color: '#3498db', animation: 'pulse-glow 1s ease-in-out infinite' }}>▌</span>
                  )}
                </div>
              </div>
            ) : (
              <div style={{
                color: '#2a2a3e', fontSize: 11, fontFamily: 'monospace',
                textAlign: 'center', padding: '30px 0',
              }}>
                No output yet
              </div>
            )}
          </div>

          {/* ═══ CHAT INPUT ═══ */}
          <div style={{
            padding: '8px 10px',
            borderTop: '1px solid #2a2a3e',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <input
              type="text"
              placeholder="Ask the agent to do something..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              style={{
                flex: 1,
                background: '#1a1a2e',
                border: '1px solid #2a2a3e',
                borderRadius: 6,
                padding: '8px 12px',
                color: '#e2e8f0',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
              }}
            />
            {/* Action buttons */}
            <button style={{
              background: 'transparent', border: 'none', fontSize: 14,
              cursor: 'pointer', color: '#64748b', padding: '4px',
            }}>👍</button>
            <button style={{
              background: 'transparent', border: 'none', fontSize: 14,
              cursor: 'pointer', color: '#64748b', padding: '4px',
            }}>👎</button>
            <button style={{
              background: 'transparent', border: 'none', fontSize: 14,
              cursor: 'pointer', color: '#64748b', padding: '4px',
            }}>🔄</button>
            <button style={{
              background: 'transparent', border: 'none', fontSize: 14,
              cursor: 'pointer', color: '#64748b', padding: '4px',
            }}>💬</button>
            <button
              onClick={() => activeProjectId && runMockPipelineAction(activeProjectId)}
              style={{
                background: '#7c3aed', border: 'none', borderRadius: 6,
                width: 32, height: 32, display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', fontSize: 14,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 20, textAlign: 'center', gap: 12,
        }}>
          <span style={{ color: '#2a2a3e', fontSize: 30 }}>🤖</span>
          <span style={{ color: '#3a3a5e', fontSize: 11, fontFamily: 'monospace' }}>
            Click a desk to select an agent
          </span>
        </div>
      )}

      {/* ═══ BOTTOM ACTIONS ═══ */}
      <div style={{
        padding: '8px 10px',
        borderTop: '1px solid #2a2a3e',
        display: 'flex', gap: 6,
      }}>
        <button
          onClick={handleAddAgent}
          style={{
            flex: 1,
            background: 'rgba(124,58,237,0.2)',
            border: '1px dashed #7c3aed',
            borderRadius: 6, padding: '6px 0',
            color: '#a78bfa', fontSize: 9,
            fontFamily: "'Press Start 2P', cursive",
            cursor: 'pointer',
          }}
        >
          + ADD AGENT
        </button>
        <button
          onClick={() => activeProjectId && runMockPipelineAction(activeProjectId)}
          disabled={project?.isRunning}
          style={{
            flex: 1,
            background: project?.isRunning ? '#1a1a2e' : 'rgba(46,204,113,0.2)',
            border: `1px solid ${project?.isRunning ? '#2a2a3e' : '#2ecc71'}`,
            borderRadius: 6, padding: '6px 0',
            color: project?.isRunning ? '#64748b' : '#2ecc71',
            fontSize: 9,
            fontFamily: "'Press Start 2P', cursive",
            cursor: project?.isRunning ? 'default' : 'pointer',
          }}
        >
          {project?.isRunning ? '⏳ RUNNING' : '▶ RUN ALL'}
        </button>
      </div>
    </div>
  )
}
