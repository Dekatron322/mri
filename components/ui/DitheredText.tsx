"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

interface DitheredTextProps {
  text: string
  font?: string
  scale?: number
  dotScale?: number
  isDark?: boolean
  className?: string
}

const DEFAULT_PARAMS = {
  scale: 1,
  dotScale: 1.2,
  isDark: true,
}

const SHOCKWAVE_PARAMS = {
  shockwaveSpeed: 225,
  shockwaveWidth: 37,
  shockwaveStrength: 20,
  shockwaveDuration: 675,
}

interface Shockwave {
  x: number
  y: number
  start: number
}

interface AnimationState {
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  dpr: number
  logo: {
    x: Float32Array
    y: Float32Array
    brightness: Float32Array
    size: Float32Array
    count: number
  }
  renderX: Float32Array
  renderY: Float32Array
  renderBr: Float32Array
  renderSize: Float32Array
  renderTint: Float32Array
  displaceX: Float32Array
  displaceY: Float32Array
  buckets: {
    indices: Int32Array[]
    lengths: Int32Array
  }
  count: number
  mouseX: number
  mouseY: number
  mouseActive: boolean
  shockwaves: Shockwave[]
  _needsAnim: boolean
  _hasDisplacement: boolean
  isDark: boolean
  _firstRender?: boolean
}

export const DitheredText: React.FC<DitheredTextProps> = ({
  text,
  font = "800 16vw Syne",
  scale = DEFAULT_PARAMS.scale,
  dotScale = DEFAULT_PARAMS.dotScale,
  isDark = DEFAULT_PARAMS.isDark,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const stateRef = useRef<AnimationState | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)")
    setIsMobile(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const currentDotScale = isMobile ? dotScale * 0.8 : dotScale

  const initAnimationState = useCallback(
    (canvas: HTMLCanvasElement): AnimationState | null => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      if (width === 0 || height === 0) return null

      canvas.width = width * dpr
      canvas.height = height * dpr

      const ctx = canvas.getContext("2d")
      if (!ctx) return null
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // --- Point Generation from Text ---
      const offscreenCanvas = document.createElement("canvas")
      offscreenCanvas.width = width
      offscreenCanvas.height = height
      const offCtx = offscreenCanvas.getContext("2d")
      if (!offCtx) return null

      offCtx.font = font
      offCtx.fillStyle = "white"
      offCtx.textAlign = "center"
      offCtx.textBaseline = "middle"
      offCtx.fillText(text, width / 2, height / 2)

      const imageData = offCtx.getImageData(0, 0, width, height)
      const points: [number, number][] = []
      const step = isMobile ? 3 : 2.5 // Dithering density

      const data = imageData.data
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (Math.floor(y) * width + Math.floor(x)) * 4
          const alpha = data[idx + 3]
          if (alpha !== undefined && alpha > 128) {
            points.push([x, y])
          }
        }
      }

      const count = points.length
      const x = new Float32Array(count)
      const y = new Float32Array(count)
      const br = new Float32Array(count)
      const sz = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        const point = points[i]
        if (point) {
          x[i] = point[0]
          y[i] = point[1]
          br[i] = 1
          sz[i] = (step / 2) * currentDotScale
        }
      }

      const renderX = new Float32Array(count)
      const renderY = new Float32Array(count)
      const renderBr = new Float32Array(count)
      const renderSize = new Float32Array(count)
      const renderTint = new Float32Array(count)
      const displaceX = new Float32Array(count)
      const displaceY = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        renderX[i] = x[i] ?? 0
        renderY[i] = y[i] ?? 0
        renderBr[i] = br[i] ?? 0
        renderSize[i] = sz[i] ?? 0
        renderTint[i] = 1
      }

      const bucketIndices = Array.from({ length: 126 }, () => new Int32Array(count))
      const bucketLengths = new Int32Array(126)

      return {
        ctx,
        w: width,
        h: height,
        dpr,
        logo: { x, y, brightness: br, size: sz, count },
        renderX,
        renderY,
        renderBr,
        renderSize,
        renderTint,
        displaceX,
        displaceY,
        buckets: { indices: bucketIndices, lengths: bucketLengths },
        count,
        mouseX: -9999,
        mouseY: -9999,
        mouseActive: false,
        shockwaves: [],
        _needsAnim: false,
        _hasDisplacement: false,
        isDark,
      }
    },
    [text, font, currentDotScale, isDark, isMobile]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    stateRef.current = initAnimationState(canvas)
    let animationFrameId: number | null = null

    const animate = (time: number) => {
      const state = stateRef.current
      if (!state) return

      state._needsAnim = false
      const swDuration = SHOCKWAVE_PARAMS.shockwaveDuration
      state.shockwaves = state.shockwaves.filter((sw) => time - sw.start < swDuration)

      const hasShockwaves = state.shockwaves.length > 0

      if (state.mouseActive || hasShockwaves || state._hasDisplacement) {
        const mx = state.mouseX
        const my = state.mouseY
        const swStrengthMultiplier = 1 + (state.shockwaves.length - 1) * 0.5

        if (hasShockwaves) state._needsAnim = true
        state._hasDisplacement = false

        const count = state.count
        const lxArr = state.logo.x
        const lyArr = state.logo.y
        const displaceX = state.displaceX
        const displaceY = state.displaceY
        const renderX = state.renderX
        const renderY = state.renderY

        for (let i = 0; i < count; i++) {
          const lx = lxArr[i] ?? 0
          const ly = lyArr[i] ?? 0
          let dx = 0
          let dy = 0

          if (state.mouseActive) {
            const vx = lx + (displaceX[i] ?? 0) - mx
            const vy = ly + (displaceY[i] ?? 0) - my
            const distSq = vx * vx + vy * vy

            if (distSq < 15000 && distSq > 0.1) {
              const dist = Math.sqrt(distSq)
              const factor = 1 - dist / 125
              const repulsion = factor * factor * factor * 50
              dx = (vx / dist) * repulsion
              dy = (vy / dist) * repulsion
            }
          }

          for (let j = 0; j < state.shockwaves.length; j++) {
            const sw = state.shockwaves[j]
            if (!sw) continue
            const elapsed = time - sw.start
            const wavePos = (elapsed / 1000) * SHOCKWAVE_PARAMS.shockwaveSpeed
            const waveFade = 1 - elapsed / swDuration
            const vx = lx - sw.x
            const vy = ly - sw.y
            const dist = Math.sqrt(vx * vx + vy * vy)

            if (dist < 0.1) continue

            const diff = Math.abs(dist - wavePos)
            if (diff < SHOCKWAVE_PARAMS.shockwaveWidth) {
              const repulsion =
                (1 - diff / SHOCKWAVE_PARAMS.shockwaveWidth) *
                waveFade *
                SHOCKWAVE_PARAMS.shockwaveStrength *
                swStrengthMultiplier
              dx += (vx / dist) * repulsion
              dy += (vy / dist) * repulsion
            }
          }

          displaceX[i] = (displaceX[i] ?? 0) + (dx - (displaceX[i] ?? 0)) * 0.12
          displaceY[i] = (displaceY[i] ?? 0) + (dy - (displaceY[i] ?? 0)) * 0.12

          if (Math.abs(displaceX[i] ?? 0) < 0.01) displaceX[i] = 0
          if (Math.abs(displaceY[i] ?? 0) < 0.01) displaceY[i] = 0

          if (displaceX[i] !== 0 || displaceY[i] !== 0) {
            state._needsAnim = true
            state._hasDisplacement = true
          }

          renderX[i] = lx + (displaceX[i] ?? 0)
          renderY[i] = ly + (displaceY[i] ?? 0)
        }
      }

      // Rendering
      const { ctx, w, h, count, buckets } = state
      ctx.clearRect(0, 0, w, h)

      // Base dot color based on theme
      const r = state.isDark ? 255 : 31
      const g = state.isDark ? 255 : 41
      const b = state.isDark ? 255 : 55

      buckets.lengths.fill(0)
      for (let i = 0; i < count; i++) {
        const brVal = state.renderBr[i] ?? 0
        if (brVal < 0.01) continue
        const bucketIdx = 6 * Math.round(20 * brVal) + Math.round(5 * (state.renderTint[i] ?? 0))
        const pos = buckets.lengths[bucketIdx] ?? 0
        buckets.lengths[bucketIdx] = (buckets.lengths[bucketIdx] ?? 0) + 1
        const bucketIndices = buckets.indices[bucketIdx]
        if (bucketIndices) {
          bucketIndices[pos] = i
        }
      }

      for (let i = 0; i < 126; i++) {
        const len = buckets.lengths[i] ?? 0
        if (len === 0) continue
        const alpha = Math.floor(i / 6) / 20
        const indices = buckets.indices[i]
        if (!indices) continue
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        for (let j = 0; j < len; j++) {
          const idx = indices[j] ?? 0
          const dotSize = state.renderSize[idx] ?? 0
          ctx.fillRect((state.renderX[idx] ?? 0) - 0.25, (state.renderY[idx] ?? 0) - 0.25, dotSize + 0.5, dotSize + 0.5)
        }
      }

      if (!state._firstRender) {
        state._firstRender = true
        requestAnimationFrame(() => {
          if (canvas) canvas.dataset.ready = "true"
        })
      }

      animationFrameId = state.mouseActive || state._needsAnim ? requestAnimationFrame(animate) : null
    }

    animationFrameId = requestAnimationFrame(animate)

    const onResize = () => {
      stateRef.current = initAnimationState(canvas)
      if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
    }

    const getMousePos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onPointerMove = (e: PointerEvent) => {
      const state = stateRef.current
      if (!state || e.pointerType !== "mouse") return
      const { x, y } = getMousePos(e)
      state.mouseX = x
      state.mouseY = y
      state.mouseActive = true
      if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
    }

    const onPointerLeave = (e: PointerEvent) => {
      const state = stateRef.current
      if (state && e.pointerType === "mouse") {
        state.mouseActive = false
        if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      const state = stateRef.current
      if (!state) return
      const { x, y } = getMousePos(e)
      state.shockwaves.push({ x, y, start: performance.now() })
      if (!animationFrameId) animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", onResize)
    canvas.addEventListener("pointermove", onPointerMove)
    canvas.addEventListener("pointerleave", onPointerLeave)
    canvas.addEventListener("pointerup", onPointerUp)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerleave", onPointerLeave)
      canvas.removeEventListener("pointerup", onPointerUp)
    }
  }, [initAnimationState])

  return (
    <div
      className={`pointer-events-auto relative flex h-full min-h-[250px] w-full items-center justify-center ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
      />
    </div>
  )
}
