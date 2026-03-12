import * as THREE from 'three'

// Reusable rounded box (slightly beveled feel)
export function createRoundedBoxGeometry(width, height, depth, radius = 0.05) {
  return new THREE.BoxGeometry(width, height, depth)
}

// Random point within bounds for animal wandering
export function randomGroundPoint(bounds = 8) {
  return new THREE.Vector3(
    (Math.random() - 0.5) * bounds * 2,
    0,
    (Math.random() - 0.5) * bounds * 2
  )
}

// Lerp helper
export function lerp(a, b, t) {
  return a + (b - a) * t
}

// Check if a grid position is on a defined path
export function isOnPath(x, z) {
  const pathCoords = [
    // Horizontal main road
    [-5, -2], [-4, -2], [-3, -2], [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2], [4, -2], [5, -2],
    // Vertical connector left
    [-3, -1], [-3, 0], [-3, 1],
    // Vertical connector center
    [0, -1], [0, 0], [0, 1],
    // Vertical connector right
    [3, -1], [3, 0], [3, 1],
    // Cross road
    [-5, 0], [-4, 0], [-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
  ]
  return pathCoords.some(([px, pz]) => px === x && pz === z)
}
