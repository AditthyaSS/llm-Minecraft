import { create } from 'zustand'
import { runMockPipeline } from '../game/utils/mockStream'

const useGameStore = create((set, get) => ({
  view: 'town',
  activeProjectId: null,
  toolMode: 'select',

  projects: [
    { id: 'p1', name: 'LANDING',       position: { x: -6, z: -4 }, agentIds: ['a1'],         isRunning: false, color: '#7c3aed' },
    { id: 'p2', name: 'WEB',           position: { x: -2, z: -4 }, agentIds: ['a2', 'a3'],   isRunning: false, color: '#3498db' },
    { id: 'p3', name: 'MOBILE',        position: { x: 2,  z: -4 }, agentIds: [],              isRunning: false, color: '#2ecc71' },
    { id: 'p4', name: 'DOCS',          position: { x: 6,  z: -4 }, agentIds: [],              isRunning: false, color: '#e67e22' },
    { id: 'p5', name: 'SIZZY LANDING', position: { x: -4, z: 0  }, agentIds: ['a4', 'a5'],   isRunning: true,  color: '#7c3aed' },
    { id: 'p6', name: 'SIZZY APP',     position: { x: 0,  z: 0  }, agentIds: ['a6'],         isRunning: false, color: '#7c3aed' },
    { id: 'p7', name: 'SIZZY PORTAL',  position: { x: 4,  z: 0  }, agentIds: ['a7', 'a8'],   isRunning: false, color: '#7c3aed' },
  ],

  agents: {
    'a1': { id: 'a1', name: 'Researcher', model: 'claude-3-5-sonnet', systemPrompt: 'You are a researcher agent. Analyze data and provide insights.', status: 'idle', output: '' },
    'a2': { id: 'a2', name: 'Lead',       model: 'claude-3-5-sonnet', systemPrompt: 'You are a lead developer. Coordinate and review work.',         status: 'idle', output: '' },
    'a3': { id: 'a3', name: 'Worker',     model: 'gpt-4o',            systemPrompt: 'You are a worker agent. Execute tasks efficiently.',             status: 'idle', output: '' },
    'a4': { id: 'a4', name: 'Lead',       model: 'claude-3-5-sonnet', systemPrompt: 'You are a lead developer. Coordinate and review work.',         status: 'thinking', output: 'we lost the plot for this project 👑 what\'s the current git status...' },
    'a5': { id: 'a5', name: 'Worker',     model: 'gpt-4o',            systemPrompt: 'You are a worker agent. Execute tasks efficiently.',             status: 'idle', output: '' },
    'a6': { id: 'a6', name: 'Critic',     model: 'claude-3-5-sonnet', systemPrompt: 'You are a code critic. Review and find issues.',                status: 'idle', output: '' },
    'a7': { id: 'a7', name: 'Writer',     model: 'gpt-4o',            systemPrompt: 'You are a technical writer. Create clear documentation.',       status: 'idle', output: '' },
    'a8': { id: 'a8', name: 'Researcher', model: 'claude-3-5-sonnet', systemPrompt: 'You are a researcher agent. Analyze data and provide insights.', status: 'idle', output: '' },
  },

  connections: [
    { id: 'c1', fromAgentId: 'a4', toAgentId: 'a5' },
    { id: 'c2', fromAgentId: 'a2', toAgentId: 'a3' },
    { id: 'c3', fromAgentId: 'a7', toAgentId: 'a8' },
  ],

  animals: [
    { id: 'anim1', type: 'pig',   position: { x: -2, z: 3 }, target: { x: 1, z: 2 },    speed: 0.5, idleTimer: 0, rotation: 0 },
    { id: 'anim2', type: 'pig',   position: { x: 0,  z: 4 }, target: { x: -3, z: 5 },   speed: 0.4, idleTimer: 1.2, rotation: 0 },
    { id: 'anim3', type: 'sheep', position: { x: 3,  z: 3 }, target: { x: 5, z: 1 },    speed: 0.3, idleTimer: 0, rotation: 0 },
    { id: 'anim4', type: 'sheep', position: { x: -4, z: 2 }, target: { x: -2, z: 4 },   speed: 0.45, idleTimer: 0.5, rotation: 0 },
    { id: 'anim5', type: 'cat',   position: { x: 5,  z: 5 }, target: { x: 3, z: 6 },    speed: 0.6, idleTimer: 0, rotation: 0 },
    { id: 'anim6', type: 'pig',   position: { x: -5, z: 5 }, target: { x: -3, z: 3 },   speed: 0.45, idleTimer: 0.8, rotation: 0 },
    { id: 'anim7', type: 'cat',   position: { x: 2,  z: 6 }, target: { x: 0, z: 4 },    speed: 0.55, idleTimer: 0, rotation: 0 },
  ],

  selectedAgentId: null,
  sessionCost: 1800,
  sessionCalls: 4,
  todayCalls: 3,
  zoom: 0.87,

  // Actions
  enterBuilding: (projectId) => set({ view: 'office', activeProjectId: projectId, selectedAgentId: null }),
  exitBuilding: () => set({ view: 'town', activeProjectId: null, selectedAgentId: null }),
  setToolMode: (mode) => set({ toolMode: mode }),

  addProject: (name, position) => {
    const id = 'p' + Date.now()
    set(s => ({
      projects: [...s.projects, {
        id, name, position,
        agentIds: [], isRunning: false, color: '#7c3aed'
      }]
    }))
    return id
  },

  selectAgent: (agentId) => set({ selectedAgentId: agentId }),

  addAgent: (projectId, config) => {
    const id = 'a' + Date.now()
    set(s => ({
      agents: { ...s.agents, [id]: { id, ...config, status: 'idle', output: '' } },
      projects: s.projects.map(p =>
        p.id === projectId ? { ...p, agentIds: [...p.agentIds, id] } : p
      )
    }))
    return id
  },

  addConnection: (fromId, toId) => {
    const id = 'c' + Date.now()
    set(s => ({
      connections: [...s.connections, { id, fromAgentId: fromId, toAgentId: toId }]
    }))
  },

  setAgentStatus: (id, status) => set(s => ({
    agents: { ...s.agents, [id]: { ...s.agents[id], status } }
  })),

  appendAgentOutput: (id, token) => set(s => ({
    agents: { ...s.agents, [id]: { ...s.agents[id], output: s.agents[id].output + token } }
  })),

  clearAgentOutput: (id) => set(s => ({
    agents: { ...s.agents, [id]: { ...s.agents[id], output: '', status: 'idle' } }
  })),

  updateAnimalPosition: (id, pos, rotation) => set(s => ({
    animals: s.animals.map(a =>
      a.id === id ? { ...a, position: { x: pos.x, z: pos.z }, rotation: rotation ?? a.rotation } : a
    )
  })),

  updateAnimalState: (id, updates) => set(s => ({
    animals: s.animals.map(a =>
      a.id === id ? { ...a, ...updates } : a
    )
  })),

  setProjectRunning: (projectId, running) => set(s => ({
    projects: s.projects.map(p =>
      p.id === projectId ? { ...p, isRunning: running } : p
    )
  })),

  runMockPipelineAction: async (projectId) => {
    const state = get()
    const project = state.projects.find(p => p.id === projectId)
    if (!project || project.agentIds.length === 0) return

    set(s => ({
      projects: s.projects.map(p => p.id === projectId ? { ...p, isRunning: true } : p)
    }))

    // Clear existing outputs
    project.agentIds.forEach(agentId => {
      set(s => ({
        agents: { ...s.agents, [agentId]: { ...s.agents[agentId], output: '', status: 'idle' } }
      }))
    })

    await runMockPipeline(
      project.agentIds,
      get().agents,
      (id, status) => get().setAgentStatus(id, status),
      (id, token) => get().appendAgentOutput(id, token)
    )

    set(s => ({
      projects: s.projects.map(p => p.id === projectId ? { ...p, isRunning: false } : p),
      sessionCalls: s.sessionCalls + 1,
      sessionCost: s.sessionCost + Math.floor(Math.random() * 500 + 200)
    }))
  },

  clearAllProjects: () => set(s => ({
    projects: s.projects.map(p => ({ ...p, isRunning: false })),
    agents: Object.fromEntries(
      Object.entries(s.agents).map(([k, v]) => [k, { ...v, status: 'idle', output: '' }])
    )
  })),
}))

export default useGameStore
