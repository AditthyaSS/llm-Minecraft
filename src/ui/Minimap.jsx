import React, { useRef, useEffect } from 'react'
import useGameStore from '../store/gameStore'

export default function Minimap() {
  const canvasRef = useRef()
  const projects = useGameStore(s => s.projects)
  const animals = useGameStore(s => s.animals)
  const view = useGameStore(s => s.view)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      ctx.fillStyle = '#1a1a2e'
      ctx.fillRect(0, 0, 160, 160)

      // Ground grid
      for (let x = 0; x < 20; x++) {
        for (let z = 0; z < 20; z++) {
          ctx.fillStyle = (x + z) % 2 === 0 ? '#2d4a1a' : '#253d15'
          ctx.fillRect(x * 8, z * 8, 7, 7)
        }
      }

      // Buildings
      projects.forEach(p => {
        const mx = (p.position.x + 10) * 8
        const mz = (p.position.z + 10) * 8
        ctx.fillStyle = p.isRunning ? '#7c3aed' : '#4a2a8a'
        ctx.fillRect(mx - 5, mz - 5, 10, 10)
        ctx.strokeStyle = '#a78bfa'
        ctx.lineWidth = 0.5
        ctx.strokeRect(mx - 5, mz - 5, 10, 10)
      })

      // Animals
      animals.forEach(a => {
        const mx = (a.position.x + 10) * 8
        const mz = (a.position.z + 10) * 8
        ctx.fillStyle = a.type === 'pig' ? '#f4a7b9' : a.type === 'sheep' ? '#e0e0e0' : '#c87137'
        ctx.beginPath()
        ctx.arc(mx, mz, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Camera viewport indicator
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'
      ctx.lineWidth = 1
      ctx.strokeRect(40, 40, 80, 80)
    }

    draw()
    const interval = setInterval(draw, 500)
    return () => clearInterval(interval)
  }, [projects, animals])

  if (view !== 'town') return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      zIndex: 20,
      border: '1px solid #2a2a3e',
      borderRadius: 6,
      overflow: 'hidden',
      background: '#0d0d1f',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    }}>
      <div style={{
        padding: '3px 8px',
        background: 'rgba(13,13,31,0.95)',
        borderBottom: '1px solid #2a2a3e',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: 6,
        color: '#64748b',
        textAlign: 'center',
        letterSpacing: 1,
      }}>
        MAP
      </div>
      <canvas ref={canvasRef} width={160} height={160} />
    </div>
  )
}
