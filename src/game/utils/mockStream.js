const FAKE_OUTPUTS = {
  'Researcher': 'Based on my analysis, the market shows strong growth signals. Key findings: 1) User engagement up 34% 2) Competitor gap identified in mobile 3) Revenue projection: $2.4M Q2...',
  'Lead':       'we lost the plot for this project 👑 what\'s the current git status? what were we working on? any .md files with progress that we were working on something etc etc',
  'Critic':     'Found 3 critical issues: Authentication flow has race condition. API rate limiting not implemented. Mobile viewport breaks at 375px width...',
  'Writer':     'Here is the refined version:\n\nLLM Minecraft is a visual pipeline builder disguised as a city-building game. Place agents, wire them together, watch intelligence flow...',
  'Worker':     'Processing task... analyzing dependencies... building component tree... optimizing bundle size... running tests... all 47 tests passed ✓',
  'default':    'Processing request... analyzing context... generating response... synthesizing data points... formatting output...'
}

export async function runMockPipeline(agentIds, agents, setStatus, appendOutput) {
  for (const agentId of agentIds) {
    const agent = agents[agentId]
    if (!agent) continue
    setStatus(agentId, 'thinking')

    const text = FAKE_OUTPUTS[agent.name] || FAKE_OUTPUTS['default']
    const tokens = text.split('')

    for (const char of tokens) {
      appendOutput(agentId, char)
      await sleep(15 + Math.random() * 35)
    }

    setStatus(agentId, 'done')
    await sleep(400)
  }
}

export const sleep = ms => new Promise(res => setTimeout(res, ms))
