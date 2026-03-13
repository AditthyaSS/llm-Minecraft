import { useMemo } from 'react'

// ── TWEAK THESE ──────────────────────────────
const FENCE_MIN = -16   // where your fence sits
const FENCE_MAX = 16
const STEP = 1  // tile spacing
const DEPTH = 2  // how many blocks deep outside the fence (1 or 2)
const BLOCK_SIZE = 2
// ─────────────────────────────────────────────

function GrassBlock({ position }) {
    return (
        <group position={position}>
            {/* Body — dark green sides */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[BLOCK_SIZE, 1.0, BLOCK_SIZE]} />
                <meshLambertMaterial color="#4a7c2f" />
            </mesh>
            {/* Bright green top */}
            <mesh position={[0, 0.52, 0]}>
                <boxGeometry args={[BLOCK_SIZE, 0.08, BLOCK_SIZE]} />
                <meshLambertMaterial color="#6abf47" />
            </mesh>
        </group>
    )
}

export function EdgeBlocks() {
    const blocks = useMemo(() => {
        const result = []

        for (let d = 1; d <= DEPTH; d++) {
            const offset = d * STEP

            // Top edge — extends outward in negative Z
            for (let x = FENCE_MIN; x <= FENCE_MAX; x += STEP) {
                result.push({ x, z: FENCE_MIN - offset })
            }

            // Bottom edge — extends outward in positive Z
            for (let x = FENCE_MIN; x <= FENCE_MAX; x += STEP) {
                result.push({ x, z: FENCE_MAX + offset })
            }

            // Left edge — extends outward in negative X
            for (let z = FENCE_MIN - offset; z <= FENCE_MAX + offset; z += STEP) {
                result.push({ x: FENCE_MIN - offset, z })
            }

            // Right edge — extends outward in positive X
            for (let z = FENCE_MIN - offset; z <= FENCE_MAX + offset; z += STEP) {
                result.push({ x: FENCE_MAX + offset, z })
            }
        }

        return result
    }, [])

    return (
        <group>
            {blocks.map(({ x, z }, i) => (
                <GrassBlock key={i} position={[x, 0, z]} />
            ))}
        </group>
    )
}