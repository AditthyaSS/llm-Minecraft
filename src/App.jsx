import React from 'react'
import Engine from './game/core/Engine'
import CameraRig from './game/core/CameraRig'
import TownScene from './game/scenes/TownScene'
import OfficeScene from './game/scenes/OfficeScene'
import HUD from './ui/HUD'
import Sidebar from './ui/Sidebar'
import AgentPanel from './ui/AgentPanel'
import Minimap from './ui/Minimap'
import BackButton from './ui/BackButton'
import Toast from './ui/Toast'
import useGameStore from './store/gameStore'

export default function App() {
  const view = useGameStore(s => s.view)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas */}
      <Engine>
        <CameraRig />
        {view === 'town' && <TownScene />}
        {view === 'office' && <OfficeScene />}
      </Engine>

      {/* UI Overlays */}
      {view === 'town' && (
        <>
          <HUD />
          <Sidebar />
          <Minimap />
        </>
      )}
      {view === 'office' && (
        <>
          <BackButton />
          <AgentPanel />
        </>
      )}
      <Toast />
    </div>
  )
}
