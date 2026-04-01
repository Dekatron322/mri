// "use client"

// import React, { useEffect, useRef, useState, useMemo, useCallback } from "react"
// import { LOGO_COORDS } from "@/lib/logo-coords"

// interface DitheredLogoProps {
//   scale?: number
//   dotScale?: number
//   invert?: boolean
// }

// const DEFAULT_PARAMS = {
//   scale: 0.5,
//   dotScale: 1,
//   invert: true,
// }

// const SHOCKWAVE_PARAMS = {
//   shockwaveSpeed: 225,
//   shockwaveWidth: 37,
//   shockwaveStrength: 20,
//   shockwaveDuration: 675,
// }

// interface Shockwave {
//   x: number
//   y: number
//   start: number
// }

// interface AnimationState {
//   ctx: CanvasRenderingContext2D
//   w: number
//   h: number
//   dpr: number
//   logo: {
//     x: Float32Array
//     y: Float32Array
//     brightness: Float32Array
//     size: Float32Array
//     count: number
//   }
//   renderX: Float32Array
//   renderY: Float32Array
//   renderBr: Float32Array
//   renderSize: Float32Array
//   renderTint: Float32Array
//   displaceX: Float32Array
//   displaceY: Float32Array
//   buckets: {
//     indices: Int32Array[]
//     lengths: Int32Array
//   }
//   count: number
//   mouseX: number
//   mouseY: number
//   mouseActive: boolean
//   shockwaves: Shockwave[]
//   _needsAnim: boolean
//   _hasDisplacement: boolean
//   invert: boolean
//   _firstRender?: boolean
// }

// export const DitheredLogo: React.FC<DitheredLogoProps> = ({
//   scale = DEFAULT_PARAMS.scale,
//   dotScale = DEFAULT_PARAMS.dotScale,
//   invert = DEFAULT_PARAMS.invert,
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [isMobile, setIsMobile] = useState(false)
//   const stateRef = useRef<AnimationState | null>(null)

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 640px)")
//     setIsMobile(mediaQuery.matches)
//     const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
//     mediaQuery.addEventListener("change", handler)
//     return () => mediaQuery.removeEventListener("change", handler)
//   }, [])

//   const currentDotScale = isMobile ? dotScale * 0.8 : dotScale

//   const initAnimationState = useCallback(
//     (canvas: HTMLCanvasElement): AnimationState | null => {
//       const dpr = window.devicePixelRatio || 1
//       const rect = canvas.getBoundingClientRect()
//       const width = rect.width
//       const height = rect.height

//       canvas.width = width * dpr
//       canvas.height = height * dpr

//       const ctx = canvas.getContext("2d")
//       if (!ctx) return null
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

//       // Logo generation logic
//       let points: readonly (readonly [number, number])[] = LOGO_COORDS
//       const GRID_SIZE = 205

//       if (invert) {
//         const logoSet = new Set<number>()
//         let minX = GRID_SIZE,
//           maxX = 0,
//           minY = GRID_SIZE,
//           maxY = 0

//         for (let i = 0; i < LOGO_COORDS.length; i++) {
//           const [cx, cy] = LOGO_COORDS[i]
//           logoSet.add(GRID_SIZE * cy + cx)
//           if (cy < minY) minY = cy
//           if (cy > maxY) maxY = cy
//           if (cx < minX) minX = cx
//           if (cx > maxX) maxX = cx
//         }

//         const widthP = maxX - minX + 1
//         const heightP = maxY - minY + 1
//         const radius = Math.round(0.22 * Math.min(widthP, heightP))

//         const isInsideBackground = (x: number, y: number) => {
//           const relX = x - minX
//           const relY = y - minY
//           if (relX < 0 || relX >= widthP || relY < 0 || relY >= heightP) return false

//           // Standard rectangular parts
//           if ((relX >= radius && relX < widthP - radius) || (relY >= radius && relY < heightP - radius)) return true

//           // Corners
//           let cornerX, cornerY
//           if (relX < radius && relY < radius) {
//             cornerX = radius
//             cornerY = radius
//           } else if (relX >= widthP - radius && relY < radius) {
//             cornerX = widthP - radius - 1
//             cornerY = radius
//           } else if (relX < radius && relY >= heightP - radius) {
//             cornerX = radius
//             cornerY = heightP - radius - 1
//           } else {
//             cornerX = widthP - radius - 1
//             cornerY = heightP - radius - 1
//           }

//           const dx = relX - cornerX
//           const dy = relY - cornerY
//           return dx * dx + dy * dy <= radius * radius
//         }

//         const backgroundPoints: [number, number][] = []
//         for (let y = minY; y <= maxY; y++) {
//           for (let x = minX; x <= maxX; x++) {
//             if (isInsideBackground(x, y) && !logoSet.has(GRID_SIZE * y + x)) {
//               backgroundPoints.push([x, y])
//             }
//           }
//         }
//         points = backgroundPoints
//       }

//       const count = points.length
//       const s = Math.max(0.5, (Math.min(width, height) * scale) / GRID_SIZE)
//       const offsetX = Math.round((width - GRID_SIZE * s) / 2)
//       const offsetY = Math.round((height - GRID_SIZE * s) / 2)

//       const x = new Float32Array(count)
//       const y = new Float32Array(count)
//       const br = new Float32Array(count)
//       const sz = new Float32Array(count)

//       for (let i = 0; i < count; i++) {
//         const [cx, cy] = points[i]
//         x[i] = offsetX + cx * s
//         y[i] = offsetY + cy * s
//         br[i] = 1
//         sz[i] = s * currentDotScale
//       }

//       const renderX = new Float32Array(count)
//       const renderY = new Float32Array(count)
//       const renderBr = new Float32Array(count)
//       const renderSize = new Float32Array(count)
//       const renderTint = new Float32Array(count)
//       const displaceX = new Float32Array(count)
//       const displaceY = new Float32Array(count)

//       for (let i = 0; i < count; i++) {
//         renderX[i] = x[i]
//         renderY[i] = y[i]
//         renderBr[i] = br[i]
//         renderSize[i] = sz[i]
//         renderTint[i] = 1
//       }

//       const bucketIndices = Array.from({ length: 126 }, () => new Int32Array(count))
//       const bucketLengths = new Int32Array(126)

//       return {
//         ctx,
//         w: width,
//         h: height,
//         dpr,
//         logo: { x, y, brightness: br, size: sz, count },
//         renderX,
//         renderY,
//         renderBr,
//         renderSize,
//         renderTint,
//         displaceX,
//         displaceY,
//         buckets: { indices: bucketIndices, lengths: bucketLengths },
//         count,
//         mouseX: -9999,
//         mouseY: -9999,
//         mouseActive: false,
//         shockwaves: [],
//         _needsAnim: false,
//         _hasDisplacement: false,
//         invert,
//       }
//     },
//     [scale, currentDotScale, invert]
//   )

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     stateRef.current = initAnimationState(canvas)
//     let animationFrameId: number | null = null

//     const animate = (time: number) => {
//       const state = stateRef.current
//       if (!state) return

//       state._needsAnim = false
//       const swDuration = SHOCKWAVE_PARAMS.shockwaveDuration
//       state.shockwaves = state.shockwaves.filter((sw) => time - sw.start < swDuration)

//       const hasShockwaves = state.shockwaves.length > 0

//       if (state.mouseActive || hasShockwaves || state._hasDisplacement) {
//         const mx = state.mouseX
//         const my = state.mouseY
//         const swStrengthMultiplier = 1 + (state.shockwaves.length - 1) * 0.5

//         if (hasShockwaves) state._needsAnim = true
//         state._hasDisplacement = false

//         for (let i = 0; i < state.count; i++) {
//           const lx = state.logo.x[i]
//           const ly = state.logo.y[i]
//           let dx = 0
//           let dy = 0

//           if (state.mouseActive) {
//             const vx = lx + state.displaceX[i] - mx
//             const vy = ly + state.displaceY[i] - my
//             const distSq = vx * vx + vy * vy

//             if (distSq < 10000 && distSq > 0.1) {
//               const dist = Math.sqrt(distSq)
//               const factor = 1 - dist / 100
//               const repulsion = factor * factor * factor * 40
//               dx = (vx / dist) * repulsion
//               dy = (vy / dist) * repulsion
//             }
//           }

//           for (let j = 0; j < state.shockwaves.length; j++) {
//             const sw = state.shockwaves[j]
//             const elapsed = time - sw.start
//             const wavePos = (elapsed / 1000) * SHOCKWAVE_PARAMS.shockwaveSpeed
//             const waveFade = 1 - elapsed / swDuration
//             const vx = lx - sw.x
//             const vy = ly - sw.y
//             const dist = Math.sqrt(vx * vx + vy * vy)

//             if (dist < 0.1) continue

//             const diff = Math.abs(dist - wavePos)
//             if (diff < SHOCKWAVE_PARAMS.shockwaveWidth) {
//               const repulsion =
//                 (1 - diff / SHOCKWAVE_PARAMS.shockwaveWidth) *
//                 waveFade *
//                 SHOCKWAVE_PARAMS.shockwaveStrength *
//                 swStrengthMultiplier
//               dx += (vx / dist) * repulsion
//               dy += (vy / dist) * repulsion
//             }
//           }

//           state.displaceX[i] += (dx - state.displaceX[i]) * 0.12
//           state.displaceY[i] += (dy - state.displaceY[i]) * 0.12

//           if (Math.abs(state.displaceX[i]) < 0.01) state.displaceX[i] = 0
//           if (Math.abs(state.displaceY[i]) < 0.01) state.displaceY[i] = 0

//           if (state.displaceX[i] !== 0 || state.displaceY[i] !== 0) {
//             state._needsAnim = true
//             state._hasDisplacement = true
//           }

//           state.renderX[i] = lx + state.displaceX[i]
//           state.renderY[i] = ly + state.displaceY[i]
//         }
//       }

//       // Rendering
//       const { ctx, w, h, count, buckets } = state
//       ctx.clearRect(0, 0, w, h)

//       const r = state.invert ? 255 : 138
//       const g = state.invert ? 255 : 143
//       const b = state.invert ? 255 : 152

//       buckets.lengths.fill(0)
//       for (let i = 0; i < count; i++) {
//         const brVal = state.renderBr[i]
//         if (brVal < 0.01) continue
//         const bucketIdx = 6 * Math.round(20 * brVal) + Math.round(5 * state.renderTint[i])
//         const pos = buckets.lengths[bucketIdx]++
//         buckets.indices[bucketIdx][pos] = i
//       }

//       for (let i = 0; i < 126; i++) {
//         const len = buckets.lengths[i]
//         if (len === 0) continue
//         const alpha = Math.floor(i / 6) / 20
//         const indices = buckets.indices[i]
//         ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
//         for (let j = 0; j < len; j++) {
//           const idx = indices[j]
//           const dotSize = state.renderSize[idx]
//           ctx.fillRect(state.renderX[idx] - 0.25, state.renderY[idx] - 0.25, dotSize + 0.5, dotSize + 0.5)
//         }
//       }

//       if (!state._firstRender) {
//         state._firstRender = true
//         requestAnimationFrame(() => {
//           if (canvas) canvas.dataset.ready = "true"
//         })
//       }

//       animationFrameId = state.mouseActive || state._needsAnim ? requestAnimationFrame(animate) : null
//     }

//     animationFrameId = requestAnimationFrame(animate)

//     const onResize = () => {
//       stateRef.current = initAnimationState(canvas)
//       if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
//     }

//     const getMousePos = (e: PointerEvent) => {
//       const rect = canvas.getBoundingClientRect()
//       return { x: e.clientX - rect.left, y: e.clientY - rect.top }
//     }

//     const onPointerMove = (e: PointerEvent) => {
//       const state = stateRef.current
//       if (!state || e.pointerType !== "mouse") return
//       const { x, y } = getMousePos(e)
//       state.mouseX = x
//       state.mouseY = y
//       state.mouseActive = true
//       if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
//     }

//     const onPointerLeave = (e: PointerEvent) => {
//       const state = stateRef.current
//       if (state && e.pointerType === "mouse") {
//         state.mouseActive = false
//         if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
//       }
//     }

//     const onPointerUp = (e: PointerEvent) => {
//       const state = stateRef.current
//       if (!state) return
//       const { x, y } = getMousePos(e)
//       state.shockwaves.push({ x, y, start: performance.now() })
//       if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
//     }

//     window.addEventListener("resize", onResize)
//     canvas.addEventListener("pointermove", onPointerMove)
//     canvas.addEventListener("pointerleave", onPointerLeave)
//     canvas.addEventListener("pointerup", onPointerUp)

//     return () => {
//       if (animationFrameId) cancelAnimationFrame(animationFrameId)
//       window.removeEventListener("resize", onResize)
//       canvas.removeEventListener("pointermove", onPointerMove)
//       canvas.removeEventListener("pointerleave", onPointerLeave)
//       canvas.removeEventListener("pointerup", onPointerUp)
//     }
//   }, [initAnimationState])

//   return (
//     <div className="pointer-events-auto relative flex h-full min-h-[300px] w-full items-center justify-center">
//       <canvas
//         ref={canvasRef}
//         className="h-full w-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
//       />
//     </div>
//   )
// }
