import React, { useState, useEffect } from 'react'

let toastQueue = []
let setToastFn = null

export function showToast(message, type = 'info') {
  if (setToastFn) {
    setToastFn({ message, type, id: Date.now() })
  }
}

export default function Toast() {
  const [toast, setToast] = useState(null)
  setToastFn = setToast

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (!toast) return null

  const bgColors = {
    info: 'rgba(52,152,219,0.9)',
    success: 'rgba(46,204,113,0.9)',
    error: 'rgba(231,76,60,0.9)',
    warning: 'rgba(243,156,18,0.9)',
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      background: bgColors[toast.type] || bgColors.info,
      color: '#ffffff',
      padding: '10px 20px',
      borderRadius: 8,
      fontFamily: 'Inter, sans-serif',
      fontSize: 13,
      fontWeight: 500,
      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      animation: 'float 0.3s ease-out',
      pointerEvents: 'none',
    }}>
      {toast.message}
    </div>
  )
}
