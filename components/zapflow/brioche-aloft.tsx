// Brioche Aloft — Originkit

"use client";

const RenderTarget = {
  current: () => "preview",
  hasRestrictions: () => false,
  canvas: "canvas",
  export: "export",
  preview: "preview",
  thumbnail: "thumbnail",
};

"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import { animate } from "motion/react"
import type { AnimationPlaybackControls, Transition } from "motion/react"
import * as THREE from "three"

type LayerKind = "crown" | "sauce" | "onion" | "cheddar" | "beef" | "tomato" | "lettuce" | "heel"

export interface BriocheAloftLayer {
    kind?: LayerKind
    label?: string
    note?: string
}

export interface BriocheAloftPlacement {
    x?: number
    y?: number
    angle?: number
    tilt?: number
}

export interface BriocheAloftAdvanced {
    seeds?: number
    lens?: number
    elevation?: number
    keyTurn?: number
    keyHeight?: number
    rim?: number
    exposure?: number
    softness?: number
    floorShadow?: number
    spotlight?: number
    translucency?: number
    gloss?: number
    stagger?: number
    float?: number
}

export interface BriocheAloftProps {
    layers?: BriocheAloftLayer[]
    background?: string

    labels?: boolean
    font?: CSSProperties
    textColor?: string

    spacing?: number

    scale?: number
    placement?: BriocheAloftPlacement

    explode?: "hover" | "tap" | "always"

    parallax?: number

    spin?: number

    transition?: Transition
    advanced?: BriocheAloftAdvanced
    style?: CSSProperties
}

const DEFAULT_LAYERS: Required<BriocheAloftLayer>[] = [
    { kind: "crown", label: "Brioche Crown", note: "Butter glazed · toasted sesame" },
    { kind: "sauce", label: "House Sauce", note: "Smoked paprika aioli" },
    { kind: "onion", label: "Red Onion", note: "Shaved · lightly pickled" },
    { kind: "cheddar", label: "Aged Cheddar", note: "Twelve months · melted" },
    { kind: "beef", label: "Grilled Beef", note: "Dry-aged chuck · flame seared" },
    { kind: "tomato", label: "Heirloom Tomato", note: "Vine ripened" },
    { kind: "lettuce", label: "Crisp Lettuce", note: "Hand-torn green leaf" },
    { kind: "heel", label: "Brioche Heel", note: "Griddle toasted" },
]

const DEFAULT_FONT: CSSProperties = {
    fontFamily: "Cormorant Garamond",
    fontWeight: 500,
    fontStyle: "normal",
}

const DEFAULT_PLACEMENT: Required<BriocheAloftPlacement> = { x: 0, y: 0, angle: 0, tilt: 0 }

const DEFAULT_TRANSITION: Transition = { type: "spring", stiffness: 70, damping: 13, mass: 1 }

const DEFAULT_ADVANCED: Required<BriocheAloftAdvanced> = {
    seeds: 150,
    lens: 24,
    elevation: 16,
    keyTurn: -50,
    keyHeight: 40,
    rim: 100,
    exposure: 100,
    softness: 3,
    floorShadow: 70,
    spotlight: 100,
    translucency: 100,
    gloss: 100,
    stagger: 45,
    float: 100,
}

const DEFAULTS = {
    background: "#000000",
    labels: true,
    textColor: "#f2eadf",
    spacing: 5,
    scale: 100,
    explode: "hover",
    parallax: 4,
    spin: 3,
}

const REF_W = 1200
const REF_H = 800
const REF_ASPECT = REF_W / REF_H

const FILL = 0.8
const MAX_LAYERS = 12
const DEG = Math.PI / 180
const TAU = Math.PI * 2

function clamp(v: number, lo: number, hi: number) {
    return v < lo ? lo : v > hi ? hi : v
}
function num(v: unknown, fallback: number) {
    return typeof v === "number" && Number.isFinite(v) ? v : fallback
}
function smooth(a: number, b: number, x: number) {
    const t = clamp((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)
}
function mulberry(seed: number) {
    let a = seed >>> 0
    return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = a
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}
function hash3(x: number, y: number, z: number, seed: number) {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1274126177) + Math.imul(seed, 1442695041)) | 0
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
}

function vnoise(x: number, y: number, z: number, seed: number) {
    const ix = Math.floor(x)
    const iy = Math.floor(y)
    const iz = Math.floor(z)
    const fx = x - ix
    const fy = y - iy
    const fz = z - iz
    const ux = fx * fx * (3 - 2 * fx)
    const uy = fy * fy * (3 - 2 * fy)
    const uz = fz * fz * (3 - 2 * fz)
    const a = hash3(ix, iy, iz, seed)
    const b = hash3(ix + 1, iy, iz, seed)
    const c = hash3(ix, iy + 1, iz, seed)
    const d = hash3(ix + 1, iy + 1, iz, seed)
    const e = hash3(ix, iy, iz + 1, seed)
    const f = hash3(ix + 1, iy, iz + 1, seed)
    const g = hash3(ix, iy + 1, iz + 1, seed)
    const h = hash3(ix + 1, iy + 1, iz + 1, seed)
    const x1 = a + (b - a) * ux
    const x2 = c + (d - c) * ux
    const x3 = e + (f - e) * ux
    const x4 = g + (h - g) * ux
    const y1 = x1 + (x2 - x1) * uy
    const y2 = x3 + (x4 - x3) * uy
    return y1 + (y2 - y1) * uz
}
function fbm(x: number, y: number, z: number, oct: number, seed: number) {
    let s = 0
    let a = 0.5
    let n = 0
    for (let k = 0; k < oct; k++) {
        s += a * vnoise(x, y, z, seed + k * 17)
        n += a
        a *= 0.5
        x = x * 2.03 + 1.7
        y = y * 2.03 + 9.2
        z = z * 2.03 + 3.1
    }
    return s / n
}

function ringNoise(phi: number, freq: number, seed: number, oct = 3) {
    return fbm(Math.cos(phi) * freq + 5, Math.sin(phi) * freq + 5, 0.5, oct, seed) * 2 - 1
}

const JITTER: [number, number, number, number, number][] = (() => {
    const rnd = mulberry(77)
    return Array.from({ length: MAX_LAYERS }, () => {
        const a = rnd() * TAU
        const r = 0.012 + rnd() * 0.022
        return [Math.cos(a) * r, Math.sin(a) * r, (rnd() - 0.5) * 2.2 * DEG, (rnd() - 0.5) * 2.2 * DEG, rnd() * TAU] as [number, number, number, number, number]
    })
})()

interface Seg {
    n: number
    region: number
    f: (s: number) => [number, number]
}
interface RegionSpec {
    mat: number
    uv: "planar" | "profile" | "polar"
    ext?: number
}
interface SurfSpec {
    seg: number
    segs: Seg[]
    regions: RegionSpec[]

    k?: (phi: number) => number

    warp?: (p: [number, number, number]) => void

    disp?: (x: number, y: number, z: number, region: number) => number

    flip?: boolean

    phiDensity?: (phi: number) => number
}
interface Surface {
    geo: THREE.BufferGeometry

    prof: Float32Array
    profLen: number
    P: Float32Array
    N: Float32Array
    rowsY: number[]
    rowsR: number[]
    rowRegion: number[]
    C: number
}

const PROF_N = 33

let LOD = 1
const lod = (n: number, min = 6) => Math.max(min, Math.round(n * LOD))

function line(r0: number, y0: number, r1: number, y1: number) {
    return (s: number): [number, number] => [r0 + (r1 - r0) * s, y0 + (y1 - y0) * s]
}
function arc(cr: number, cy: number, rx: number, ry: number, a0: number, a1: number) {
    return (s: number): [number, number] => {
        const a = (a0 + (a1 - a0) * s) * DEG
        return [cr + rx * Math.cos(a), cy + ry * Math.sin(a)]
    }
}

function normalsOf(P: Float32Array, T: number, C: number, out: Float32Array, poleFlip: (j: number) => number) {
    const W = C + 1
    for (let j = 0; j < T; j++) {
        const jp = Math.min(T - 1, j + 1)
        const jm = Math.max(0, j - 1)
        for (let i = 0; i <= C; i++) {
            const ip = i === C ? 1 : i + 1
            const im = i === 0 ? C - 1 : i - 1
            const a = (j * W + ip) * 3
            const b = (j * W + im) * 3
            const c = (jp * W + i) * 3
            const d = (jm * W + i) * 3
            const px = P[a] - P[b]
            const py = P[a + 1] - P[b + 1]
            const pz = P[a + 2] - P[b + 2]
            const tx = P[c] - P[d]
            const ty = P[c + 1] - P[d + 1]
            const tz = P[c + 2] - P[d + 2]

            let nx = ty * pz - tz * py
            let ny = tz * px - tx * pz
            let nz = tx * py - ty * px
            let l = Math.hypot(nx, ny, nz)
            const o = (j * W + i) * 3
            if (l < 1e-10) {
                nx = 0
                ny = poleFlip(j)
                nz = 0
                l = 1
            }
            out[o] = nx / l
            out[o + 1] = ny / l
            out[o + 2] = nz / l
        }
    }
}

function buildSurface(spec: SurfSpec): Surface {
    const C = lod(spec.seg, 24)
    const phis = new Float64Array(C + 1)
    if (spec.phiDensity) {
        const M = 4096
        const cdf = new Float64Array(M + 1)
        for (let m = 0; m < M; m++) cdf[m + 1] = cdf[m] + spec.phiDensity(((m + 0.5) / M) * TAU)
        let m = 0
        for (let i = 0; i <= C; i++) {
            const target = (i / C) * cdf[M]
            while (m < M - 1 && cdf[m + 1] < target) m++
            const f = cdf[m + 1] > cdf[m] ? (target - cdf[m]) / (cdf[m + 1] - cdf[m]) : 0
            phis[i] = ((m + clamp(f, 0, 1)) / M) * TAU
        }
    } else for (let i = 0; i <= C; i++) phis[i] = (i / C) * TAU
    phis[C] = TAU
    const W = C + 1
    const rowsR: number[] = []
    const rowsY: number[] = []
    const rowRegion: number[] = []
    spec.segs.forEach((sg, k) => {
        const n = lod(sg.n, Math.min(sg.n, 3))
        for (let t = k === 0 ? 0 : 1; t <= n; t++) {
            const [r, y] = sg.f(t / n)
            rowsR.push(r)
            rowsY.push(y)
            rowRegion.push(sg.region)
        }
    })
    const T = rowsR.length

    const bandRegion = rowRegion.slice(1)
    const P = new Float32Array(T * W * 3)
    const B = new Float32Array(T * W * 2)
    const kk = new Float32Array(W)
    for (let i = 0; i <= C; i++) kk[i] = spec.k ? spec.k(phis[i]) : 1
    const p: [number, number, number] = [0, 0, 0]
    for (let j = 0; j < T; j++) {
        for (let i = 0; i <= C; i++) {
            const phi = i === C ? 0 : phis[i]
            const r = rowsR[j] * kk[i]
            p[0] = r * Math.cos(phi)
            p[1] = rowsY[j]
            p[2] = r * Math.sin(phi)
            const o = j * W + i
            B[o * 2] = p[0]
            B[o * 2 + 1] = p[2]
            if (spec.warp) spec.warp(p)
            P[o * 3] = p[0]
            P[o * 3 + 1] = p[1]
            P[o * 3 + 2] = p[2]
        }
    }
    const pole = (j: number) => (j === 0 ? -1 : 1)
    const N = new Float32Array(T * W * 3)
    normalsOf(P, T, C, N, pole)
    if (spec.disp) {
        for (let j = 0; j < T; j++) {
            const reg = rowRegion[j]
            for (let i = 0; i <= C; i++) {
                const o = (j * W + i) * 3
                const src = (j * W + (i === C ? 0 : i)) * 3
                const d = spec.disp(P[src], P[src + 1], P[src + 2], reg)
                P[o] += N[src] * d
                P[o + 1] += N[src + 1] * d
                P[o + 2] += N[src + 2] * d
            }
        }
        normalsOf(P, T, C, N, pole)
    }
    if (spec.flip) for (let q = 0; q < N.length; q++) N[q] = -N[q]

    const profRows: number[] = []
    for (let j = 0; j < T; j++) {
        const inProf = (j > 0 && spec.regions[bandRegion[j - 1]].uv === "profile") || (j < T - 1 && spec.regions[bandRegion[j]].uv === "profile")
        if (inProf) profRows.push(j)
    }
    const arcAt = new Map<number, number>()
    let profLen = 0
    profRows.forEach((j, q) => {
        if (q > 0) {
            const jm = profRows[q - 1]
            profLen += Math.hypot(rowsR[j] - rowsR[jm], rowsY[j] - rowsY[jm])
        }
        arcAt.set(j, profLen)
    })
    const prof = new Float32Array(PROF_N * 2)
    if (profRows.length > 1) {
        let q = 0
        for (let s = 0; s < PROF_N; s++) {
            const target = (s / (PROF_N - 1)) * profLen
            while (q < profRows.length - 2 && (arcAt.get(profRows[q + 1]) as number) < target) q++
            const ja = profRows[q]
            const jb = profRows[q + 1]
            const la = arcAt.get(ja) as number
            const lb = arcAt.get(jb) as number
            const f = lb > la ? clamp((target - la) / (lb - la), 0, 1) : 0
            prof[s * 2] = rowsR[ja] + (rowsR[jb] - rowsR[ja]) * f
            prof[s * 2 + 1] = rowsY[ja] + (rowsY[jb] - rowsY[ja]) * f
        }
    }

    const pos: number[] = []
    const nor: number[] = []
    const uvs: number[] = []
    const idx: number[] = []
    const geo = new THREE.BufferGeometry()
    let j0 = 0
    while (j0 < T - 1) {
        const reg = bandRegion[j0]
        let j1 = j0
        while (j1 < T - 1 && bandRegion[j1] === reg) j1++
        const rs = spec.regions[reg]
        const base = pos.length / 3
        const start = idx.length
        for (let j = j0; j <= j1; j++) {
            for (let i = 0; i <= C; i++) {
                const o = j * W + i
                pos.push(P[o * 3], P[o * 3 + 1], P[o * 3 + 2])
                nor.push(N[o * 3], N[o * 3 + 1], N[o * 3 + 2])
                if (rs.uv === "planar") {
                    const e = rs.ext || 1
                    uvs.push(B[o * 2] / (2 * e) + 0.5, B[o * 2 + 1] / (2 * e) + 0.5)
                } else if (rs.uv === "polar") {
                    const e = rs.ext || 1
                    uvs.push(phis[i] / TAU, (rowsR[j] * kk[i]) / e)
                } else {
                    uvs.push(phis[i] / TAU, profLen > 0 ? (arcAt.get(j) ?? 0) / profLen : 0)
                }
            }
        }
        for (let j = 0; j < j1 - j0; j++) {
            for (let i = 0; i < C; i++) {
                const a = base + j * W + i
                const b = a + 1
                const c = a + W
                const d = c + 1
                if (spec.flip) idx.push(a, b, c, b, d, c)
                else idx.push(a, c, b, b, c, d)
            }
        }
        geo.addGroup(start, idx.length - start, rs.mat)
        j0 = j1
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3))
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
    geo.setIndex(idx)
    geo.computeBoundingSphere()
    return { geo, prof, profLen, P, N, rowsY, rowsR, rowRegion, C }
}

interface KindSpec {
    h: number
    radius: number
    aoTop: number
    hitR: number
    ylo: number
    yhi: number
}
const KINDS: Record<LayerKind, KindSpec> = {
    crown: { h: 0.75, radius: 1.0, aoTop: 0.75, hitR: 1.0, ylo: 0, yhi: 0.78 },
    sauce: { h: 0.058, radius: 0.9, aoTop: 0.062, hitR: 0.98, ylo: -0.25, yhi: 0.09 },
    onion: { h: 0.064, radius: 0.76, aoTop: 0.066, hitR: 0.95, ylo: 0, yhi: 0.07 },
    cheddar: { h: 0.044, radius: 1.06, aoTop: 0.044, hitR: 1.12, ylo: -0.33, yhi: 0.06 },
    beef: { h: 0.304, radius: 1.06, aoTop: 0.31, hitR: 1.07, ylo: 0, yhi: 0.33 },
    tomato: { h: 0.1, radius: 0.87, aoTop: 0.1, hitR: 0.88, ylo: 0, yhi: 0.11 },
    lettuce: { h: 0.026, radius: 1.2, aoTop: 0.03, hitR: 1.28, ylo: -0.22, yhi: 0.08 },
    heel: { h: 0.356, radius: 1.0, aoTop: 0.358, hitR: 1.0, ylo: 0, yhi: 0.36 },
}

function raySpheroid(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, cy: number, r: number, ry: number) {
    const k = r / ry
    const py = (oy - cy) * k
    const qy = dy * k
    const A = dx * dx + qy * qy + dz * dz
    const B = 2 * (ox * dx + py * qy + oz * dz)
    const C = ox * ox + py * py + oz * oz - r * r
    const D = B * B - 4 * A * C
    return D >= 0 && (-B + Math.sqrt(D)) / (2 * A) >= 0
}

function rayCylinder(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, r: number, a: number, b: number) {
    const A = dx * dx + dz * dz
    const B = 2 * (ox * dx + oz * dz)
    const C = ox * ox + oz * oz - r * r
    let t0 = -Infinity
    let t1 = Infinity
    if (A < 1e-12) {
        if (C > 0) return false
    } else {
        const D = B * B - 4 * A * C
        if (D < 0) return false
        const q = Math.sqrt(D)
        t0 = (-B - q) / (2 * A)
        t1 = (-B + q) / (2 * A)
    }
    let u0 = -Infinity
    let u1 = Infinity
    if (Math.abs(dy) < 1e-12) {
        if (oy < a || oy > b) return false
    } else {
        const ta = (a - oy) / dy
        const tb = (b - oy) / dy
        u0 = Math.min(ta, tb)
        u1 = Math.max(ta, tb)
    }
    return Math.max(t0, u0, 0) <= Math.min(t1, u1)
}
const KIND_LIST: LayerKind[] = ["crown", "sauce", "onion", "cheddar", "beef", "tomato", "lettuce", "heel"]
const KIND_TITLES = ["Brioche Crown", "Sauce", "Red Onion", "Cheddar", "Grilled Beef", "Tomato", "Lettuce", "Brioche Heel"]

const TX = { crust: 0, heel: 1, crumb: 2, beefTop: 3, beefSide: 4, tomatoFace: 5, tomatoSkin: 6, cheese: 7, lettuce: 8, sauce: 9, onion: 10 } as const
type TexKind = keyof typeof TX

const CROWN_DOME_N = 2.3
const PATTY_SHOULDER = { r: 0.93, cy: 0.15, rx: 0.115, ry: 0.15 }

const TOMATO_LOCULES: [number, number, number, number][] = [
    [0.1, 0.53, 0.29, 0.48],
    [0.95, 0.5, 0.24, 0.36],
    [1.75, 0.54, 0.29, 0.46],
    [2.75, 0.52, 0.3, 0.55],
    [3.75, 0.55, 0.26, 0.4],
    [4.5, 0.5, 0.24, 0.36],
    [5.35, 0.53, 0.29, 0.48],
]

const TOMATO_SEPTUM = 0.028
const tomatoK = (phi: number) => {
    let s = 0
    for (const l of TOMATO_LOCULES) s += Math.exp(-((angDist(phi, l[0]) / 0.32) ** 2))
    return 0.985 + 0.018 * s + 0.008 * Math.sin(7 * phi + 1.3)
}

function tomatoLoculeD(x: number, z: number) {
    const rho = Math.hypot(x, z)
    const a = Math.atan2(z, x)
    const q = rho / (0.86 * tomatoK(a))
    let d = 9
    for (const [la, qc, hr, hw] of TOMATO_LOCULES) {
        const half = Math.max(0.02, rho * hw - TOMATO_SEPTUM)
        const t = (q - qc) / hr
        const u = (angDist(a, la) * rho) / half
        d = Math.min(d, Math.pow(t ** 4 + u ** 4, 0.25))
    }
    return d
}
const crownK = (phi: number) => 1 + 0.012 * Math.sin(3 * phi + 0.7) + 0.008 * Math.sin(5 * phi + 2.1)
const pattyK = (phi: number) => 1 + 0.024 * ringNoise(phi, 1.6, 31)
const heelK = (phi: number) => 1 + 0.008 * Math.sin(2 * phi + 1.1) + 0.006 * Math.sin(5 * phi + 0.3)
function angDist(a: number, b: number) {
    const d = Math.abs(a - b) % TAU
    return d > Math.PI ? TAU - d : d
}

function tongueAt(phi: number, drips: [number, number, number][]) {
    let t = 0
    for (const [a, len, w] of drips) {
        const x = angDist(phi, a) / w
        if (x < 1) t = Math.max(t, len * (1 - x * x) * (1 - x * x))
    }
    return t
}

function remapRadius(rho: number, base: number, full: number) {
    const u = rho / full
    return u <= 0.7 ? u * base : 0.7 * base + ((u - 0.7) / 0.3) * (full - 0.7 * base)
}

function dripLength(phi: number, drips: [number, number, number][]) {
    let best = 0
    let near = 1e9
    for (const [a, len, w] of drips) {
        const x = angDist(phi, a) / w
        if (x < 1 && x < near) {
            near = x
            best = len
        }
    }
    return best
}
function dripDensity(phi: number, drips: [number, number, number][]) {
    let d = 1
    for (const [a, , w] of drips) d += 7 * Math.exp(-((angDist(phi, a) / (1.6 * w)) ** 2))
    return d
}

const SAUCE_DRIPS: [number, number, number][] = [
    [0.45, 0.17, 0.095],
    [1.32, 0.06, 0.075],
    [2.2, 0.21, 0.105],
    [3.05, 0.045, 0.07],
    [3.85, 0.12, 0.095],
    [4.65, 0.07, 0.075],
    [5.3, 0.18, 0.095],
]
const sauceBase = (phi: number) => {
    let ooze = 0
    for (const [a, len] of SAUCE_DRIPS) ooze = Math.max(ooze, smooth(0.03, 0.15, len) * Math.exp(-((angDist(phi, a) / 0.26) ** 2)))
    return 0.84 * (1 + 0.05 * Math.sin(3 * phi + 0.5) + 0.03 * Math.sin(7 * phi + 2.0) + 0.05 * ringNoise(phi, 3, 77)) + 0.15 * ooze
}
const sauceK = (phi: number) => sauceBase(phi) + tongueAt(phi, SAUCE_DRIPS)
const lettuceK = (phi: number) => 1.16 * (1 + 0.05 * Math.sin(3 * phi + 1.0) + 0.03 * Math.sin(7 * phi + 2.0) + 0.06 * ringNoise(phi, 2.5, 5))

const cheeseSquare = (phi: number) =>
    (1.06 / Math.pow(Math.pow(Math.abs(Math.cos(phi)), 6) + Math.pow(Math.abs(Math.sin(phi)), 6), 1 / 6)) * (1 + 0.018 * ringNoise(phi, 4, 63))

const CHEESE_DRIPS: [number, number, number][] = [
    [0.25, 0.12, 0.085],
    [1.45, 0.07, 0.075],
    [3.3, 0.14, 0.095],
    [4.55, 0.06, 0.07],
    [5.0, 0.1, 0.085],
]
const cheeseK = (phi: number) => cheeseSquare(phi) + tongueAt(phi, CHEESE_DRIPS)

function crownSurface() {
    const n = CROWN_DOME_N
    return buildSurface({
        seg: 176,
        segs: [
            { n: 26, region: 0, f: line(0, 0.012, 0.955, 0) },
            { n: 10, region: 1, f: arc(0.955, 0.1, 0.045, 0.1, -90, 0) },
            {
                n: 60,
                region: 1,
                f: (s) => {
                    const t = s * (Math.PI / 2)
                    const c = Math.max(0, Math.cos(t))
                    const sn = Math.max(0, Math.sin(t))
                    return [Math.pow(c, 2 / n), 0.1 + 0.64 * Math.pow(sn, 2 / n)]
                },
            },
        ],
        regions: [
            { mat: 1, uv: "planar", ext: 1.05 },
            { mat: 0, uv: "profile" },
        ],
        k: crownK,
        disp: (x, y, z, reg) =>
            reg === 0
                ? 0.004 * (fbm(x * 9, y * 9, z * 9, 3, 3) - 0.5)
                : smooth(0.02, 0.2, y) * (0.026 * (fbm(x * 1.8, y * 1.8, z * 1.8, 3, 11) - 0.5) + 0.006 * (fbm(x * 7, y * 7, z * 7, 2, 12) - 0.5)),
    })
}

function heelSurface() {
    return buildSurface({
        seg: 176,
        segs: [
            { n: 22, region: 0, f: line(0, 0.004, 0.86, 0) },
            { n: 12, region: 0, f: arc(0.86, 0.13, 0.14, 0.13, -90, 0) },
            { n: 14, region: 0, f: (s) => [1.0 - 0.025 * s * s + 0.006 * Math.sin(Math.PI * s), 0.13 + 0.205 * s] },
            { n: 5, region: 0, f: arc(0.955, 0.335, 0.02, 0.025, 0, 90) },
            { n: 26, region: 1, f: line(0.955, 0.36, 0, 0.355) },
        ],
        regions: [
            { mat: 0, uv: "profile" },
            { mat: 1, uv: "planar", ext: 1.05 },
        ],
        k: heelK,
        disp: (x, y, z, reg) => (reg === 1 ? 0.004 * (fbm(x * 9, y * 9, z * 9, 3, 4) - 0.5) : 0.008 * (fbm(x * 3, y * 3, z * 3, 3, 14) - 0.5)),
    })
}

function pattySurface() {
    const S = PATTY_SHOULDER
    return buildSurface({
        seg: 256,
        segs: [
            { n: 28, region: 0, f: line(0, 0.006, S.r, 0) },
            { n: 40, region: 1, f: arc(S.r, S.cy, S.rx, S.ry, -90, 90) },
            { n: 28, region: 0, f: (s) => [S.r * (1 - s), 0.3 + 0.018 * (1 - (1 - s) * (1 - s))] },
        ],
        regions: [
            { mat: 0, uv: "planar", ext: 1.12 },
            { mat: 1, uv: "profile" },
        ],
        k: pattyK,
        disp: (x, y, z) => {
            const a = fbm(x * 5.5, y * 5.5, z * 5.5, 3, 21) - 0.5
            const b = vnoise(x * 19, y * 19, z * 19, 22) - 0.5

            const c = vnoise(x * 9 + 3, y * 9, z * 9, 23)
            return 0.026 * a + 0.009 * b + 0.018 * c * c * c
        },
    })
}

function tomatoSurface() {
    return buildSurface({
        seg: 256,
        segs: [
            { n: 48, region: 0, f: line(0, 0.003, 0.835, 0) },
            { n: 5, region: 1, f: arc(0.835, 0.022, 0.025, 0.022, -90, 0) },
            { n: 6, region: 1, f: line(0.86, 0.022, 0.86, 0.078) },
            { n: 5, region: 1, f: arc(0.835, 0.078, 0.025, 0.022, 0, 90) },
            { n: 48, region: 0, f: line(0.835, 0.1, 0, 0.101) },
        ],
        regions: [
            { mat: 0, uv: "planar", ext: 0.92 },
            { mat: 1, uv: "profile" },
        ],
        k: tomatoK,

        warp: (p) => {
            p[1] += smooth(0, 0.1, p[1]) * 0.01 * (p[0] / 0.86)
        },
        disp: (x, y, z, reg) => {
            const n = 0.002 * (fbm(x * 6, y * 6, z * 6, 2, 41) - 0.5)

            if (reg !== 0) return n + 0.0012 * (fbm(x * 30, y * 30, z * 30, 2, 42) - 0.5)

            const d = tomatoLoculeD(x, z)
            const gel = 1 - smooth(0.82, 1.04, d)
            return n - 0.013 * gel * (0.55 + 0.45 * smooth(0, 0.8, 1 - d)) + 0.002 * smooth(1.0, 1.15, d) * (1 - smooth(1.3, 1.6, d))
        },
    })
}

function drapeCheese(p: [number, number, number]) {
    const S = PATTY_SHOULDER
    const BASE = -0.004
    const CLEAR = 0.008
    const phi = Math.atan2(p[2], p[0])
    const sq = cheeseSquare(phi)
    const rho0 = Math.hypot(p[0], p[2])
    const rho = remapRadius(rho0, sq, cheeseK(phi))
    const x = (p[0] / Math.max(rho0, 1e-9)) * rho
    const z = (p[2] / Math.max(rho0, 1e-9)) * rho
    const L = dripLength(phi, CHEESE_DRIPS)
    const bead = L > 0.03 && rho > sq ? 1 + 0.9 * smooth(0.6, 1, (rho - sq) / L) : 1
    const y = p[1] * bead

    const wob = 0.006 * (fbm(x * 3 + 7, z * 3 + 2, 0.5, 2, 61) - 0.5)
    if (rho <= S.r) {
        const lumps = 0.6 * 0.026 * (fbm(x * 5.5, 0.31 * 5.5, z * 5.5, 3, 21) - 0.5)
        const fade = 1 - smooth(0.7, 0.93, rho)
        p[1] = y + BASE + CLEAR + 0.018 * (1 - (rho / S.r) ** 2) + wob + lumps * fade
        return
    }
    const A = S.rx + CLEAR + y
    const Bv = S.ry + CLEAR + y
    let s = rho - S.r

    let px = 0
    let py = Bv
    let done = false
    const steps = 48
    for (let k = 0; k < steps; k++) {
        const nb = Math.PI / 2 - ((k + 1) / steps) * (Math.PI / 2)
        const nx = A * Math.cos(nb)
        const ny = Bv * Math.sin(nb)
        const l = Math.hypot(nx - px, ny - py)
        if (l >= s) {
            const f = s / l
            px += (nx - px) * f
            py += (ny - py) * f
            done = true
            break
        }
        s -= l
        px = nx
        py = ny
    }
    let radial = S.r + px
    let yy = BASE - S.ry + py
    if (!done) {
        radial = S.r + A - s * 0.12
        yy = BASE - S.ry - s
    }
    p[0] = (x / rho) * radial
    p[2] = (z / rho) * radial
    p[1] = yy + wob
}

function cheeseSurface() {
    return buildSurface({
        seg: 240,
        segs: [

            { n: 36, region: 0, f: (t) => [0.99 * (1 - Math.pow(1 - t, 1.8)), 0] },
            { n: 6, region: 0, f: arc(0.99, 0.009, 0.01, 0.009, -90, 90) },
            { n: 36, region: 0, f: (t) => [0.99 * (1 - Math.pow(t, 1.8)), 0.018] },
        ],
        regions: [{ mat: 0, uv: "planar", ext: 1.45 }],
        k: cheeseK,
        warp: drapeCheese,
        phiDensity: (phi) => dripDensity(phi, CHEESE_DRIPS),
    })
}

function lettuceY(x: number, z: number) {
    const r = Math.hypot(x, z)
    const phi = Math.atan2(z, x)
    const c = Math.cos(phi)
    const s = Math.sin(phi)
    const ampN = fbm(c * 2.2 + 11, s * 2.2 + 11, 0.3, 2, 93)
    const A = 0.055 * smooth(0.97, 1.32, r) * (0.35 + 1.1 * ampN)
    const w = 17 * phi + 3.4 * TAU * fbm(c * 1.6 + 3, s * 1.6 + 3, r * 1.2, 3, 91)
    const fine = 0.32 * A * Math.sin(2.7 * w + 4 * fbm(c * 4 + 1, s * 4 + 1, r, 2, 94)) * smooth(1.0, 1.3, r)
    const droop = (0.09 + 0.12 * fbm(c * 1.3 + 7, s * 1.3 + 7, 0.7, 2, 95)) * smooth(0.99, 1.4, r)
    return A * Math.sin(w) + fine - droop + 0.012 * (1 - smooth(0, 0.8, r)) + 0.012 * (fbm(x * 3, z * 3, 1.3, 2, 92) - 0.5)
}

function lettuceSurface() {
    return buildSurface({
        seg: 380,

        segs: [{ n: 44, region: 0, f: (t) => [1 - Math.pow(1 - t, 1.6), 0] }],
        regions: [{ mat: 0, uv: "polar", ext: 1.45 }],
        k: lettuceK,
        warp: (p) => {
            p[1] += lettuceY(p[0], p[2])
        },
        flip: true,
    })
}

function sauceWave(x: number, z: number) {
    return 0.034 * (fbm(x * 1.7 + 4, z * 1.7 + 1, 0.2, 2, 73) - 0.5)
}

function bendSauce(p: [number, number, number]) {
    const phi = Math.atan2(p[2], p[0])
    const base = sauceBase(phi)
    const rho0 = Math.hypot(p[0], p[2])
    const rho = remapRadius(rho0, base, sauceK(phi))
    const x = (p[0] / Math.max(rho0, 1e-9)) * rho
    const z = (p[2] / Math.max(rho0, 1e-9)) * rho
    const L = dripLength(phi, SAUCE_DRIPS)
    const rB = base * 0.965
    const e = rho - rB

    const tq = e > 0 ? rB / rho : 1
    const thick = 0.65 + 0.7 * fbm(x * tq * 2.6 + 3, z * tq * 2.6 + 1, 0.4, 3, 74)
    const bead = L > 0.03 && e > 0 ? 1 + 1.1 * smooth(0.55, 1, e / (L + base - rB)) : 1

    const dome = p[1] > 0 ? (Math.min(p[1], 0.048) / 0.048) * 0.014 * (1 - Math.pow(Math.min(1, rho / rB), 3)) : 0
    const y = (p[1] + dome) * thick * bead
    if (e <= 0) {
        p[1] = y + sauceWave(x, z)
        return
    }
    const rc = 0.028
    const ux = x / rho
    const uz = z / rho
    const R = rc + y
    const quarter = (Math.PI / 2) * rc
    let radial: number
    let yy: number
    if (e < quarter) {
        const b = e / rc
        radial = rB + R * Math.sin(b)
        yy = -rc + R * Math.cos(b)
    } else {
        const s2 = e - quarter
        radial = rB + R - s2 * 0.1
        yy = -rc - s2
    }
    p[0] = ux * radial
    p[2] = uz * radial
    p[1] = yy + sauceWave(ux * rB, uz * rB)
}

function sauceSurface() {
    return buildSurface({
        seg: 300,
        segs: [
            { n: 60, region: 0, f: (t) => [0.93 * (1 - Math.pow(1 - t, 2.2)), 0] },
            { n: 14, region: 0, f: arc(0.93, 0.024, 0.07, 0.024, -90, 90) },
            {
                n: 60,
                region: 0,
                f: (t) => [0.93 * (1 - Math.pow(t, 2.2)), 0.048],
            },
        ],
        regions: [{ mat: 0, uv: "planar", ext: 1.3 }],
        k: sauceK,
        warp: bendSauce,
        phiDensity: (phi) => dripDensity(phi, SAUCE_DRIPS),
        disp: (x, y, z) => 0.003 * (fbm(x * 8, y * 8, z * 8, 2, 72) - 0.5),
    })
}

function mergeGeos(geos: THREE.BufferGeometry[]) {
    const pos: number[] = []
    const nor: number[] = []
    const uv: number[] = []
    const col: number[] = []
    const idx: number[] = []
    let hasCol = true
    geos.forEach((g) => {
        const base = pos.length / 3
        const gi = g.index ? g.index : null
        const gp = g.getAttribute("position")
        const gn = g.getAttribute("normal")
        const gu = g.getAttribute("uv")
        const gc = g.getAttribute("color")
        if (!gc) hasCol = false
        for (let i = 0; i < gp.count; i++) {
            pos.push(gp.getX(i), gp.getY(i), gp.getZ(i))
            nor.push(gn.getX(i), gn.getY(i), gn.getZ(i))
            if (gu) uv.push(gu.getX(i), gu.getY(i))
            else uv.push(0, 0)
            if (gc) col.push(gc.getX(i), gc.getY(i), gc.getZ(i))
        }
        if (gi) for (let i = 0; i < gi.count; i++) idx.push(base + gi.getX(i))
        else for (let i = 0; i < gp.count; i++) idx.push(base + i)
    })
    const m = new THREE.BufferGeometry()
    m.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
    m.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3))
    m.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2))
    if (hasCol && col.length) m.setAttribute("color", new THREE.Float32BufferAttribute(col, 3))
    m.setIndex(idx)
    m.computeBoundingSphere()
    return m
}

function onionGeometry() {
    const rnd = mulberry(5150)
    const slices = [
        { cx: 0.16, cz: 0.1, y: 0, rings: 7, r0: 0.11, tilt: [0, 0] },
        { cx: -0.4, cz: -0.28, y: 0.03, rings: 4, r0: 0.12, tilt: [0.05, -0.04] },
    ]
    const rings: { cx: number; cz: number; r: number; y: number; tx: number; tz: number; hw: number; seed: number }[] = []
    slices.forEach((sl, si) => {
        for (let k = 0; k < sl.rings; k++) {
            const r = sl.r0 + k * 0.083
            if (si === 1 && k === sl.rings - 1) continue
            rings.push({ cx: sl.cx + (rnd() - 0.5) * 0.02, cz: sl.cz + (rnd() - 0.5) * 0.02, r, y: sl.y + rnd() * 0.004, tx: sl.tilt[0], tz: sl.tilt[1], hw: 0.036 + rnd() * 0.006, seed: rnd() * 10 })
        }
    })

    rings.push({ cx: 0.6, cz: -0.36, r: 0.3, y: 0.028, tx: -0.04, tz: 0.07, hw: 0.034, seed: 3.3 })
    const M = lod(24, 12)
    const C = lod(128, 40)
    const hh0 = 0.014
    const m = 5
    const geos: THREE.BufferGeometry[] = []
    const e = new THREE.Euler()
    const mtx = new THREE.Matrix4()
    rings.forEach((rg) => {
        const pos: number[] = []
        const nor: number[] = []
        const uv: number[] = []
        const idx: number[] = []
        const reps = Math.max(1, Math.round(rg.r / 0.11))
        for (let i = 0; i <= C; i++) {
            const phi = ((i === C ? 0 : i) / C) * TAU
            const rr = rg.r * (1 + 0.035 * Math.sin(2 * phi + rg.seed) + 0.015 * Math.sin(5 * phi + rg.seed * 2))

            const hh = hh0 * (0.75 + 0.5 * fbm(Math.cos(phi) * 1.5 + rg.seed, Math.sin(phi) * 1.5, 0.3, 2, 81))
            const hw = rg.hw * (0.88 + 0.24 * fbm(Math.cos(phi) * 2 + rg.seed, Math.sin(phi) * 2, 1.7, 2, 82))
            const lift = 0.006 * Math.sin(2 * phi + rg.seed) + 0.003 * Math.sin(5 * phi + rg.seed * 1.7)
            const cp = Math.cos(phi)
            const sp = Math.sin(phi)
            for (let k = 0; k <= M; k++) {
                const a = ((k === M ? 0 : k) / M) * TAU
                const ca = Math.cos(a)
                const sa = Math.sin(a)
                const sx = Math.sign(ca) * Math.pow(Math.abs(ca), 2 / m)
                const sy = Math.sign(sa) * Math.pow(Math.abs(sa), 2 / m)
                let gx = (Math.sign(sx) * Math.pow(Math.abs(sx), m - 1)) / hw
                let gy = (Math.sign(sy) * Math.pow(Math.abs(sy), m - 1)) / hh
                const gl = Math.hypot(gx, gy) || 1
                gx /= gl
                gy /= gl
                const R = rr + hw * sx
                pos.push(R * cp, hh * sy + lift, R * sp)
                nor.push(gx * cp, gy, gx * sp)
                uv.push((i / C) * reps, k / M)
            }
        }
        const Wd = M + 1
        for (let i = 0; i < C; i++) {
            for (let k = 0; k < M; k++) {
                const a = i * Wd + k
                const b = a + 1
                const c = a + Wd
                const d = c + 1
                idx.push(a, b, c, b, d, c)
            }
        }
        const g = new THREE.BufferGeometry()
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
        g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3))
        g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2))
        g.setIndex(idx)
        e.set(rg.tx, 0, rg.tz)
        mtx.makeRotationFromEuler(e).setPosition(rg.cx, rg.y + hh0, rg.cz)
        g.applyMatrix4(mtx)
        geos.push(g)
    })
    const merged = mergeGeos(geos)
    geos.forEach((g) => g.dispose())
    return merged
}

function dropletMatrices(leaf: Surface, count: number) {
    const rnd = mulberry(4242)
    const C = leaf.C
    const W = C + 1
    const T = leaf.rowsY.length
    const out: THREE.Matrix4[] = []
    const p = new THREE.Vector3()
    const n = new THREE.Vector3()
    const t = new THREE.Vector3()
    const b = new THREE.Vector3()
    const placed: THREE.Vector3[] = []
    let tries = 0
    while (out.length < count && tries < count * 80) {
        tries++
        const j = 1 + Math.floor(rnd() * (T - 2))
        const i = Math.floor(rnd() * C)
        const o = (j * W + i) * 3
        p.set(leaf.P[o], leaf.P[o + 1], leaf.P[o + 2])
        n.set(leaf.N[o], leaf.N[o + 1], leaf.N[o + 2]).normalize()
        const r = Math.hypot(p.x, p.z)
        if (r < 0.55 || r > 1.28 || n.y < 0.72) continue
        let close = false
        for (const q of placed) if (q.distanceToSquared(p) < 0.06 * 0.06) close = true
        if (close) continue
        t.set(rnd() - 0.5, 0, rnd() - 0.5).cross(n)
        if (t.lengthSq() < 1e-6) continue
        t.normalize()
        b.crossVectors(t, n)
        const rx = 0.013 + rnd() * rnd() * 0.028
        const m = new THREE.Matrix4().makeBasis(t.clone().multiplyScalar(rx), n.clone().multiplyScalar(rx * 0.55), b.clone().multiplyScalar(rx * (0.8 + rnd() * 0.4)))
        m.setPosition(p.x + n.x * rx * 0.2, p.y + n.y * rx * 0.2, p.z + n.z * rx * 0.2)
        out.push(m)
        placed.push(p.clone())
    }
    return out
}

function seedMatrices(crown: Surface, count: number) {
    const rnd = mulberry(1777)
    const C = crown.C
    const W = C + 1
    const T = crown.rowsY.length
    const out: THREE.Matrix4[] = []
    const placed: THREE.Vector3[] = []
    const p = new THREE.Vector3()
    const n = new THREE.Vector3()
    const t = new THREE.Vector3()
    const b = new THREE.Vector3()
    const pick = (j: number, i: number, fj: number, fi: number, arr: Float32Array, v: THREE.Vector3) => {
        const g = (jj: number, ii: number) => (jj * W + ii) * 3
        const a = g(j, i)
        const bb = g(j, i + 1)
        const c = g(j + 1, i)
        const d = g(j + 1, i + 1)
        for (let q = 0; q < 3; q++) {
            const top = arr[a + q] + (arr[bb + q] - arr[a + q]) * fi
            const bot = arr[c + q] + (arr[d + q] - arr[c + q]) * fi
            v.setComponent(q, top + (bot - top) * fj)
        }
    }
    let tries = 0
    while (out.length < count && tries < count * 60) {
        tries++
        const jf = rnd() * (T - 2)
        const j = Math.floor(jf)
        if (crown.rowRegion[j + 1] !== 1) continue
        const y = crown.rowsY[j]
        if (y < 0.3) continue

        if (rnd() > crown.rowsR[j] * 1.05) continue
        const fi0 = rnd() * C
        const i = Math.min(C - 1, Math.floor(fi0))
        pick(j, i, jf - j, fi0 - i, crown.P, p)
        let close = false
        for (const q of placed) if (q.distanceToSquared(p) < 0.062 * 0.062) close = true
        if (close) continue
        pick(j, i, jf - j, fi0 - i, crown.N, n)
        n.normalize()
        t.set(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).cross(n)
        if (t.lengthSq() < 1e-6) continue
        t.normalize()
        b.crossVectors(t, n)
        const s = 0.85 + rnd() * 0.3
        const m = new THREE.Matrix4().makeBasis(t.clone().multiplyScalar(0.031 * s), n.clone().multiplyScalar(0.0095 * s), b.clone().multiplyScalar(0.018 * s))

        m.setPosition(p.x + n.x * 0.0065, p.y + n.y * 0.0065, p.z + n.z * 0.0065)
        out.push(m)
        placed.push(p.clone())
    }
    return out
}

function seedGeometry() {
    const g = new THREE.SphereGeometry(1, lod(10, 6), lod(6, 4))
    const a = g.getAttribute("position")
    for (let i = 0; i < a.count; i++) {
        const x = a.getX(i)

        a.setZ(i, a.getZ(i) * (1 - 0.38 * ((x + 1) / 2) ** 1.5))
        a.setY(i, a.getY(i) * (1 - 0.3 * ((x + 1) / 2)))
    }
    g.computeVertexNormals()
    return g
}

const BAKE_VERTEX =  `
in vec3 position;
void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
`

const BAKE_FRAGMENT =  `
precision highp float;
precision highp int;
uniform int uMode;
uniform vec2 uSize;
uniform vec2 uProf[${PROF_N}];
uniform float uLen;
uniform float uExt;
layout(location = 0) out vec4 oAlbedo;
layout(location = 1) out vec4 oOrm;
layout(location = 2) out vec4 oHeight;

uniform highp sampler2D uNoise;
vec4 rnd4(ivec3 c) { return texelFetch(uNoise, (c.xy + c.z * ivec2(37, 17)) & ivec2(255), 0); }
float h31(ivec3 c) { return rnd4(c).r; }
vec3 h33(ivec3 c) { return rnd4(c).gba; }
float vn(vec3 p) {
    ivec3 i = ivec3(floor(p)); vec3 f = fract(p); vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = h31(i), b = h31(i + ivec3(1,0,0)), c = h31(i + ivec3(0,1,0)), d = h31(i + ivec3(1,1,0));
    float e = h31(i + ivec3(0,0,1)), g = h31(i + ivec3(1,0,1)), h = h31(i + ivec3(0,1,1)), k = h31(i + ivec3(1,1,1));
    return mix(mix(mix(a, b, u.x), mix(c, d, u.x), u.y), mix(mix(e, g, u.x), mix(h, k, u.x), u.y), u.z);
}
uniform int uOne;
float fbm(vec3 p, int o) {
    float s = 0.0, a = 0.5, n = 0.0;

    for (int k = 0; k < o * uOne; k++) { s += a * vn(p); n += a; a *= 0.5; p = p * 2.03 + vec3(1.7, 9.2, 3.1); }
    return s / n;
}

vec3 wor(vec3 p) {
    ivec3 i = ivec3(floor(p)); vec3 f = fract(p); float d1 = 8.0, d2 = 8.0, id = 0.0;
    for (int z = -uOne; z <= uOne; z++) for (int y = -uOne; y <= uOne; y++) for (int x = -uOne; x <= uOne; x++) {
        ivec3 o = ivec3(x, y, z); vec3 hh = h33(i + o); vec3 r = vec3(o) + hh - f; float d = dot(r, r);
        if (d < d1) { d2 = d1; d1 = d; id = hh.z; } else if (d < d2) d2 = d;
    }
    return vec3(sqrt(d1), sqrt(d2), id);
}

vec3 wor2(vec2 p) {
    ivec2 i = ivec2(floor(p)); vec2 f = fract(p); float d1 = 8.0, d2 = 8.0, id = 0.0;
    for (int y = -uOne; y <= uOne; y++) for (int x = -uOne; x <= uOne; x++) {
        ivec2 o = ivec2(x, y); vec3 hh = h33(ivec3(i + o, 0)); vec2 r = vec2(o) + hh.xy - f; float d = dot(r, r);
        if (d < d1) { d2 = d1; d1 = d; id = hh.z; } else if (d < d2) d2 = d;
    }
    return vec3(sqrt(d1), sqrt(d2), id);
}
vec3 srgb(float r, float g, float b) { return pow(vec3(r, g, b) / 255.0, vec3(2.2)); }

const vec4 TL[${TOMATO_LOCULES.length}] = vec4[${TOMATO_LOCULES.length}](${TOMATO_LOCULES.map((l) => `vec4(${l.map((v) => v.toFixed(4)).join(", ")})`).join(", ")});
float angD(float a, float b) { return abs(mod(a - b + 3.14159265, 6.28318530718) - 3.14159265); }
float tomK(float a) {
    float s = 0.0;
    for (int i = 0; i < ${TOMATO_LOCULES.length}; i++) { float d = angD(a, TL[i].x) / 0.32; s += exp(-d * d); }
    return 0.985 + 0.018 * s + 0.008 * sin(7.0 * a + 1.3);
}

struct Surf { vec3 alb; float h; float rough; float coat; float thin; };

vec3 posOf(vec2 uv, out vec2 tl) {
    if (uMode == 0) { tl = vec2(2.0 * uExt); return vec3((uv.x * 2.0 - 1.0) * uExt, 0.0, (uv.y * 2.0 - 1.0) * uExt); }
    float ph = uv.x * 6.28318530718;
    if (uMode == 1) {
        float f = clamp(uv.y, 0.0, 1.0) * float(${PROF_N - 1});
        int k = int(min(floor(f), float(${PROF_N - 2})));
        vec2 q = mix(uProf[k], uProf[k + 1], f - float(k));
        tl = vec2(6.28318530718 * max(q.x, 0.02), uLen);
        return vec3(q.x * cos(ph), q.y, q.x * sin(ph));
    }
    if (uMode == 3) {
        tl = vec2(6.28318530718 * 0.6, 0.12);
        return vec3(0.6 * cos(ph), uv.y * 0.2, 0.6 * sin(ph));
    }
    float r = uv.y * uExt;
    tl = vec2(6.28318530718 * max(r, 0.02), uExt);
    return vec3(r * cos(ph), 0.0, r * sin(ph));
}

Surf crust(vec3 p, bool heel) {
    Surf s;
    float y = p.y;
    float mott = fbm(p * 2.6, 4);
    float sp = fbm(p * 9.0, 3);
    vec3 w = wor(p * 34.0);
    float streak = fbm(vec3(p.x * 9.0, p.y * 3.5, p.z * 9.0), 3);
    s.h = 0.0024 * fbm(p * 42.0, 3) + 0.0014 * smoothstep(0.0, 0.55, w.x) + 0.0006 * vn(p * 160.0);
    if (!heel) {
        float band = smoothstep(0.1, 0.34, y + 0.08 * (mott - 0.5) + 0.05 * (streak - 0.5));
        vec3 top = mix(srgb(96.0, 36.0, 10.0), srgb(150.0, 70.0, 22.0), smoothstep(0.25, 0.75, mott));
        top = mix(top, srgb(70.0, 25.0, 8.0), smoothstep(0.55, 0.8, sp) * 0.5);
        top = mix(top, srgb(175.0, 92.0, 34.0), smoothstep(0.62, 0.9, mott) * 0.35);
        vec3 waist = mix(srgb(222.0, 172.0, 102.0), srgb(196.0, 132.0, 66.0), streak);
        waist = mix(waist, srgb(236.0, 204.0, 140.0), (1.0 - smoothstep(0.0, 0.06, y)));
        s.alb = mix(waist, top, band);
        s.h += 0.0025 * (streak - 0.5) * (1.0 - band);
        s.rough = mix(0.62, 0.3, band) + 0.08 * (sp - 0.5);
        s.coat = band * mix(0.7, 1.0, mott);
        s.thin = 0.12;
    } else {
        float pale = smoothstep(0.2, 0.33, y + 0.04 * (streak - 0.5));
        float under = 1.0 - smoothstep(0.0, 0.03, y);
        vec3 side = mix(srgb(170.0, 96.0, 36.0), srgb(198.0, 128.0, 56.0), mott);
        side = mix(side, srgb(226.0, 182.0, 112.0), pale);
        side = mix(side, srgb(120.0, 58.0, 20.0), under * (0.6 + 0.4 * sp));
        s.alb = side;
        s.rough = 0.66 + 0.1 * (sp - 0.5);
        s.coat = 0.25 * (1.0 - pale);
        s.thin = 0.1;
    }
    return s;
}

Surf crumb(vec3 p) {
    Surf s;
    float rho = length(p.xz);
    vec2 q = p.xz + 0.04 * vec2(fbm(p * 5.0, 2) - 0.5, fbm(p * 5.0 + 9.0, 2) - 0.5);
    vec3 w = wor2(q * 24.0);
    vec3 w2 = wor2(q * 11.0 + 3.0);
    vec3 big = wor2(q * 7.0 + 1.0);

    float pore = (1.0 - smoothstep(0.08, 0.32, w.x)) * step(0.25, w.z);
    float mid = (1.0 - smoothstep(0.06, 0.26, w2.x)) * step(0.62, w2.z);
    float hole = (1.0 - smoothstep(0.05, 0.17, big.x)) * step(0.86, big.z);
    float cav = max(pore * 0.7, max(mid, hole));
    float n = fbm(p * 3.2, 4);
    float toast = smoothstep(0.25, 0.7, n * 0.9 + 0.2 + 0.25 * smoothstep(0.6, 0.94, rho));
    vec3 base = srgb(240.0, 208.0, 138.0);
    vec3 golden = srgb(204.0, 140.0, 64.0);
    vec3 dark = srgb(142.0, 78.0, 30.0);
    vec3 c = mix(base, golden, toast * 0.85);
    c = mix(c, dark, smoothstep(0.62, 0.85, fbm(p * 8.0, 3)) * toast * 0.7);

    c *= mix(1.0, 0.5, cav);
    c = mix(c, srgb(228.0, 196.0, 128.0), cav * 0.25 * (1.0 - toast));
    c = mix(c, srgb(118.0, 52.0, 16.0), smoothstep(0.915, 0.95, rho));
    s.alb = c;
    s.h = -0.006 * pore - 0.009 * mid - 0.014 * hole + 0.0012 * fbm(p * 60.0, 2);
    s.rough = 0.78 - 0.22 * smoothstep(0.62, 0.85, fbm(p * 4.0 + 5.0, 3));
    s.coat = 0.12 * smoothstep(0.6, 0.85, fbm(p * 4.0 + 5.0, 3));
    s.thin = 0.25;
    return s;
}

Surf beef(vec3 p, bool top) {
    Surf s;
    float rho = length(p.xz);

    vec3 wp = p + 0.05 * vec3(fbm(p * 5.0, 2) - 0.5, fbm(p * 5.0 + 3.0, 2) - 0.5, fbm(p * 5.0 + 6.0, 2) - 0.5);
    vec3 w1 = top ? wor2(wp.xz * 11.0) : wor(wp * 11.0);
    vec3 w2 = top ? wor2(wp.xz * 25.0 + 5.0) : wor(wp * 25.0 + 5.0);
    vec3 w3 = top ? wor2(wp.xz * 52.0 + 9.0) : wor(wp * 52.0 + 9.0);
    float b1 = (1.0 - smoothstep(0.0, 0.85, w1.x)) * (0.55 + 0.45 * w1.z);
    float b2 = (1.0 - smoothstep(0.0, 0.8, w2.x)) * (0.5 + 0.5 * w2.z);
    float b3 = 1.0 - smoothstep(0.0, 0.7, w3.x);
    float n1 = fbm(p * 4.0, 4);
    float n2 = fbm(p * 11.0, 3);
    float lump = b1 * 0.6 + b2 * 0.4;
    float chunk = smoothstep(0.25, 0.6, lump);
    float crev = 1.0 - smoothstep(0.12, 0.38, lump);
    s.h = 0.0075 * b1 + 0.0042 * b2 + 0.0016 * b3 + 0.003 * n1;
    vec3 c = mix(srgb(80.0, 38.0, 18.0), srgb(128.0, 70.0, 36.0), smoothstep(0.3, 0.75, n1));

    c = mix(c, srgb(150.0, 92.0, 54.0), chunk * smoothstep(0.5, 0.9, w1.z) * 0.4);
    c *= 0.88 + 0.24 * b3 * w3.z;
    c = mix(c, srgb(46.0, 18.0, 8.0), crev * 0.6);
    c = mix(c, srgb(30.0, 13.0, 6.0), smoothstep(0.72, 0.84, n2) * 0.5);
    float juice = smoothstep(0.55, 0.8, fbm(p * 6.0 + 4.0, 2));
    float rough = mix(0.58, 0.2, crev) - 0.12 * juice;
    float coat = crev * 0.6 + 0.12 + 0.35 * juice;

    vec3 wb = top ? wor2(wp.xz * 34.0 + 7.0) : wor(wp * 34.0 + 7.0);
    float fat = (1.0 - smoothstep(0.05, 0.17, wb.x)) * step(0.84, wb.z);
    c = mix(c, srgb(170.0, 120.0, 82.0), fat * 0.45);
    rough = mix(rough, 0.06, fat);
    coat = max(coat, fat);
    s.h += 0.0016 * fat;
    if (top) {
        vec2 q = p.xz + 0.05 * vec2(fbm(p * 4.0, 2) - 0.5, fbm(p * 4.0 + 7.0, 2) - 0.5);
        vec2 d1 = vec2(cos(0.62), sin(0.62));
        vec2 d2 = vec2(cos(0.62 + 1.2), sin(0.62 + 1.2));
        float g1 = abs(fract(dot(q, d1) / 0.25 + 0.3) - 0.5);
        float g2 = abs(fract(dot(q, d2) / 0.25 + 0.1) - 0.5);
        float m1 = 1.0 - smoothstep(0.07, 0.15, g1);
        float m2 = (1.0 - smoothstep(0.06, 0.13, g2)) * 0.7;
        float mark = max(m1, m2) * smoothstep(0.1, 0.45, chunk + 0.35 * n2) * (1.0 - smoothstep(0.8, 0.92, rho));
        c = mix(c, mix(srgb(26.0, 11.0, 5.0), srgb(48.0, 30.0, 22.0), smoothstep(0.6, 0.9, n2)), mark * 0.92);
        rough = mix(rough, 0.7, mark);
        coat *= 1.0 - mark * 0.8;
        s.h -= 0.002 * mark;
    } else {
        c = mix(c, srgb(110.0, 72.0, 52.0), smoothstep(0.45, 0.8, fbm(p * 3.0 + 4.0, 3)) * 0.3);
        float crisp = smoothstep(0.6, 1.0, abs(p.y - 0.15) / 0.15 + 0.25 * (n2 - 0.5));
        c = mix(c, srgb(38.0, 17.0, 8.0), crisp * 0.65);
        rough = mix(rough, 0.62, crisp * 0.6);
    }
    s.alb = c;
    s.rough = clamp(rough, 0.12, 1.0);
    s.coat = coat;
    s.thin = 0.0;
    return s;
}

Surf tomFace(vec3 p) {
    Surf s;
    float n1 = fbm(p * 6.0, 3);
    float n2 = fbm(p * 14.0, 2);

    vec2 wq = p.xz + 0.035 * vec2(fbm(p * 3.0, 2) - 0.5, fbm(p * 3.0 + 7.0, 2) - 0.5);
    float rho = length(wq);
    float a = atan(wq.y, wq.x);
    float q = rho / (0.86 * tomK(a));

    float d = 9.0, rel = 0.0, t = 0.0;
    for (int i = 0; i < ${TOMATO_LOCULES.length}; i++) {
        vec4 l = TL[i];
        float r_ = mod(a - l.x + 3.14159265, 6.28318530718) - 3.14159265;
        float half_ = max(0.02, rho * l.w - ${TOMATO_SEPTUM.toFixed(4)});
        float ti = (q - l.y) / l.z;
        float u = abs(r_) * rho / half_;
        float di = pow(pow(abs(ti), 4.0) + pow(u, 4.0), 0.25);
        if (di < d) { d = di; rel = r_; t = ti; }
    }
    d += 0.1 * (fbm(p * 5.0 + 3.0, 2) - 0.5);
    float gel = 1.0 - smoothstep(0.82, 1.0, d);
    float rim = smoothstep(0.84, 0.92, d) * (1.0 - smoothstep(0.92, 1.0, d));
    float core = 1.0 - smoothstep(0.14, 0.3, q + 0.05 * (n1 - 0.5));

    vec3 cell = wor2(p.xz * 115.0);
    float cells = smoothstep(0.0, 0.35, cell.y - cell.x);
    vec3 flesh = mix(srgb(178.0, 36.0, 26.0), srgb(200.0, 60.0, 42.0), n1);
    flesh = mix(flesh, srgb(222.0, 96.0, 70.0), smoothstep(0.55, 0.85, n2) * 0.3);
    flesh *= 0.9 + 0.15 * cells;
    float fib = fbm(vec3(a * 26.0, q * 2.0, 0.5), 2);
    float wallZone = smoothstep(0.8, 0.86, q) * (1.0 - smoothstep(0.93, 0.97, q));
    flesh = mix(flesh, srgb(218.0, 92.0, 66.0), smoothstep(0.62, 0.85, fib) * wallZone * 0.12);

    vec3 col = mix(flesh, srgb(218.0, 88.0, 60.0), core * 0.75);
    col = mix(col, srgb(236.0, 166.0, 140.0), core * smoothstep(0.5, 0.85, n2) * 0.3);

    float depth = smoothstep(0.0, 0.9, 1.0 - d);
    vec3 gelC = mix(srgb(196.0, 58.0, 32.0), srgb(220.0, 94.0, 54.0), fbm(p * 10.0, 2));

    gelC = mix(gelC, srgb(232.0, 122.0, 74.0), smoothstep(0.55, 0.9, d) * 0.3);
    gelC *= 1.0 - 0.12 * depth;
    col = mix(col, gelC, gel);
    col *= 1.0 - 0.18 * rim;

    vec2 lp = vec2(rel * rho, q * 0.86);
    vec3 sw = wor2(lp * vec2(19.0, 12.0) + 0.6 * vec2(n2 - 0.5, n1 - 0.5));
    float crowd = 1.0 - smoothstep(-0.4, 0.6, t);
    float zone = gel * smoothstep(0.12, 0.3, d) * (1.0 - smoothstep(0.86, 0.95, d)) * step(0.62 - 0.58 * crowd, sw.z);
    float rs = 0.15 + 0.11 * fract(sw.z * 7.31);
    float seed = (1.0 - smoothstep(rs - 0.04, rs + 0.02, sw.x)) * zone;
    float sac = (1.0 - smoothstep(rs + 0.03, rs + 0.15, sw.x)) * zone - seed;
    float sunk = 0.15 + 0.55 * fract(sw.z * 13.7);
    vec3 seedC = mix(srgb(238.0, 222.0, 160.0), srgb(198.0, 162.0, 96.0), smoothstep(rs * 0.4, rs, sw.x));
    seedC = mix(seedC, gelC, sunk);
    col = mix(col, srgb(238.0, 146.0, 92.0), sac * 0.4);
    col = mix(col, seedC, seed);

    vec3 jb = wor2(p.xz * 42.0 + 3.0);
    float bead = (1.0 - smoothstep(0.04, 0.13, jb.x)) * step(0.9, jb.z);

    float qs = length(p.xz) / (0.86 * tomK(atan(p.z, p.x)));
    col = mix(col, srgb(170.0, 26.0, 16.0), smoothstep(0.93, 0.96, qs) * 0.5);
    col = mix(col, srgb(110.0, 10.0, 6.0), smoothstep(0.972, 0.988, qs));
    s.alb = col;
    float sd = clamp(sw.x / max(rs, 0.05), 0.0, 1.0);

    float film = fbm(p * 7.0 + 11.0, 3);

    s.h = -0.006 * (1.0 - smoothstep(0.7, 0.98, d)) + 0.0032 * seed * (1.0 - sd * sd) * (1.0 - sunk) + 0.0012 * sac + 0.0006 * cells * (1.0 - gel) + 0.0018 * bead + 0.0018 * film - 0.0012 * rim;
    s.rough = mix(0.16 - 0.05 * cells, 0.03, gel) + 0.18 * seed * (1.0 - sunk) + 0.08 * smoothstep(0.5, 0.8, film);
    s.rough = mix(s.rough, 0.02, bead);
    s.coat = 1.0;
    s.thin = mix(0.55, 1.0, gel);
    return s;
}

Surf tomSkin(vec3 p) {
    Surf s;
    float n = fbm(p * 7.0, 3);
    float n2 = fbm(vec3(p.x * 40.0, p.y * 4.0, p.z * 40.0), 2);

    vec3 c = mix(srgb(136.0, 14.0, 8.0), srgb(176.0, 34.0, 16.0), n);
    vec3 w = wor(p * 60.0);
    c = mix(c, srgb(196.0, 84.0, 34.0), (1.0 - smoothstep(0.05, 0.14, w.x)) * step(0.9, w.z) * 0.5);
    s.alb = c;
    s.h = 0.0007 * fbm(p * 80.0, 2) + 0.0008 * n2;
    s.rough = 0.14 + 0.1 * n2;
    s.coat = 1.0;
    s.thin = 0.3;
    return s;
}

Surf cheese(vec3 p) {
    Surf s;
    float rho = length(p.xz);
    float n = fbm(p * 3.0, 3);
    float n2 = fbm(p * 9.0, 2);

    vec3 c = mix(srgb(238.0, 150.0, 28.0), srgb(246.0, 170.0, 48.0), n);
    float thinEdge = smoothstep(0.9, 1.3, rho);
    c = mix(c, srgb(214.0, 110.0, 12.0), thinEdge * 0.55);

    float oil = smoothstep(0.58, 0.8, fbm(p * 5.0 + 3.0, 3));
    c = mix(c, c * 0.95 + vec3(0.025, 0.01, 0.0), oil * 0.2);

    float rip = sin(rho * 115.0 + 7.0 * n2) * smoothstep(0.86, 1.0, rho) * (1.0 - smoothstep(1.12, 1.3, rho));
    vec3 w = wor2(p.xz * 14.0);
    float pin = (1.0 - smoothstep(0.03, 0.07, w.x)) * step(0.96, w.z);
    c *= 1.0 - 0.12 * pin;
    s.alb = c;
    s.h = 0.0007 * rip + 0.0016 * fbm(p * 6.0, 2) - 0.0014 * pin + 0.0003 * fbm(p * 40.0, 2);
    s.rough = mix(0.34, 0.1, oil) + 0.06 * (n2 - 0.5);
    s.coat = 0.4 + 0.5 * oil;
    s.thin = mix(0.6, 1.0, thinEdge);
    return s;
}

Surf lettuce(vec3 p) {
    Surf s;
    float r = length(p.xz);
    vec2 q = p.xz;

    float bend = 0.12 * sin(q.x * 1.3 + 0.4) + 0.06 * (fbm(vec3(q.x * 1.5, 0.3, 0.7), 2) - 0.5);
    float dy = q.y - bend;
    float along = clamp((q.x + 1.3) / 2.6, 0.0, 1.0);
    float midW = mix(0.065, 0.006, smoothstep(0.0, 1.0, along));
    float mid = 1.0 - smoothstep(midW * 0.4, midW, abs(dy));
    float sv = q.x * 4.2 - abs(dy) * 3.2 + 0.3 * fbm(p * 2.5, 2);
    float secA = abs(fract(sv) - 0.5);
    float secW = mix(0.07, 0.025, smoothstep(0.0, 0.9, abs(dy)));
    float sec = (1.0 - smoothstep(secW * 0.45, secW, secA)) * smoothstep(0.03, 0.09, abs(dy)) * (1.0 - mid) * (1.0 - 0.6 * smoothstep(1.0, 1.35, r));

    vec3 w = wor2(p.xz * 24.0);
    float net = 1.0 - smoothstep(0.0, 0.06, w.y - w.x);

    vec3 w2 = wor2(p.xz * 9.0 + 3.0);
    float puck = 1.0 - smoothstep(0.0, 0.6, w2.x);
    float n = fbm(p * 4.0, 3);

    float near = 1.0 - smoothstep(0.05, 0.45, abs(dy));
    vec3 c = mix(srgb(150.0, 196.0, 84.0), srgb(212.0, 226.0, 150.0), max(near * (1.0 - along * 0.6), 1.0 - smoothstep(0.1, 0.6, r)));
    c = mix(c, srgb(94.0, 158.0, 50.0), smoothstep(0.55, 1.0, r + 0.15 * (n - 0.5)));
    c = mix(c, srgb(50.0, 112.0, 30.0), smoothstep(1.05, 1.36, r + 0.1 * (n - 0.5)));
    c *= 0.86 + 0.2 * puck + 0.08 * (n - 0.5);
    c = mix(c, srgb(236.0, 242.0, 200.0), mid * 0.85);
    c = mix(c, c * 1.16 + 0.02, sec * 0.5 + net * 0.12);
    s.alb = c;
    s.h = 0.0042 * puck + 0.0032 * mid + 0.0012 * sec - 0.0008 * net + 0.0006 * fbm(p * 70.0, 2);
    float wet = smoothstep(0.62, 0.8, fbm(p * 10.0 + 3.0, 3));
    s.rough = mix(0.48, 0.12, wet);
    s.coat = 0.25 + 0.6 * wet;
    s.thin = 1.0 - 0.4 * mid;
    return s;
}

Surf sauce(vec3 p) {
    Surf s;
    vec2 xz = p.xz;
    float rho = length(xz);

    vec3 fq = p * 1.6 + vec3(fbm(p * 2.2 + 4.0, 2), 0.0, fbm(p * 2.2 + 9.0, 2)) * 1.4;
    float flow = fbm(vec3(fq.x * 3.5, 0.3, fq.z * 1.2), 3);
    vec3 wq = p * 2.4 + vec3(fbm(p * 3.0, 2), 0.0, fbm(p * 3.0 + 5.0, 2));
    float swirl = fbm(wq, 3);
    vec3 c = mix(srgb(222.0, 116.0, 56.0), srgb(242.0, 164.0, 102.0), smoothstep(0.3, 0.75, swirl));
    c = mix(c, srgb(196.0, 78.0, 32.0), smoothstep(0.62, 0.8, flow) * 0.45);

    vec3 w = wor2(xz * 46.0);
    float fleck = (1.0 - smoothstep(0.07, 0.14, w.x)) * step(0.9, w.z);
    vec3 w2 = wor2(xz * 30.0 + 11.0);
    float chive = (1.0 - smoothstep(0.06, 0.12, w2.x)) * step(0.95, w2.z);
    vec3 w3 = wor2(xz * 70.0 + 5.0);
    float bub = (1.0 - smoothstep(0.05, 0.12, w3.x)) * step(0.92, w3.z);
    c = mix(c, srgb(96.0, 22.0, 8.0), fleck);
    c = mix(c, srgb(52.0, 112.0, 36.0), chive);
    c = mix(c, c * 1.12 + 0.03, bub);
    s.alb = c;
    s.h = 0.0024 * fbm(p * 5.0, 2) + 0.0005 * flow + 0.0006 * (fleck + chive) + 0.0007 * bub;
    s.rough = 0.06 + 0.06 * flow + 0.15 * chive;
    s.coat = 1.0;
    s.thin = 0.7;
    return s;
}

Surf onion(vec3 p) {
    Surf s;
    float v = p.y / 0.2;
    float ang = v * 6.28318530718;
    float ca = cos(ang), sa = sin(ang);
    float sx = sign(ca) * pow(abs(ca), 0.4);
    float sy = sign(sa) * pow(abs(sa), 0.4);
    vec2 g = vec2(sign(sx) * pow(abs(sx), 4.0) / 0.037, sign(sy) * pow(abs(sy), 4.0) / 0.014);
    g /= max(length(g), 1e-5);
    float u = atan(p.z, p.x);
    float n = fbm(p * 6.0, 3);
    float fib = fbm(vec3(u * 3.0, v * 90.0, 0.5), 2);
    float across = (sx + 1.0) * 0.5;

    vec3 face = mix(srgb(246.0, 238.0, 244.0), srgb(234.0, 210.0, 228.0), (1.0 - across) * 0.5);
    face *= 0.93 + 0.1 * fib;
    float band = smoothstep(0.55 + 0.12 * (n - 0.5), 0.93, across);
    face = mix(face, mix(srgb(150.0, 30.0, 104.0), srgb(118.0, 22.0, 84.0), n), band);

    float veins = fbm(vec3(u * 160.0, v * 3.0, 0.5), 2);
    vec3 skin = mix(srgb(100.0, 18.0, 68.0), srgb(146.0, 40.0, 104.0), n) * (0.9 + 0.2 * veins);
    vec3 inner = srgb(232.0, 206.0, 222.0) * (0.95 + 0.08 * fib);
    float outer = smoothstep(0.7, 0.9, g.x);
    float inside = smoothstep(0.7, 0.9, -g.x);
    vec3 c = mix(face, skin, outer);
    c = mix(c, inner, inside);
    s.alb = c;
    s.h = 0.0005 * fib * (1.0 - outer - inside) + 0.0005 * veins * outer;
    s.rough = mix(0.2, 0.3, outer);
    s.coat = 0.8;
    s.thin = mix(0.95, 0.4, outer);
    return s;
}

Surf surfAt(vec3 p) {
#if KIND == ${TX.crust}
    return crust(p, false);
#elif KIND == ${TX.heel}
    return crust(p, true);
#elif KIND == ${TX.crumb}
    return crumb(p);
#elif KIND == ${TX.beefTop}
    return beef(p, true);
#elif KIND == ${TX.beefSide}
    return beef(p, false);
#elif KIND == ${TX.tomatoFace}
    return tomFace(p);
#elif KIND == ${TX.tomatoSkin}
    return tomSkin(p);
#elif KIND == ${TX.cheese}
    return cheese(p);
#elif KIND == ${TX.lettuce}
    return lettuce(p);
#elif KIND == ${TX.onion}
    return onion(p);
#else
    return sauce(p);
#endif
}

void main() {
    vec2 uv = gl_FragCoord.xy / uSize;
    vec2 tl;
    vec3 p = posOf(uv, tl);
    Surf s = surfAt(p);
    oAlbedo = vec4(clamp(s.alb, 0.0, 1.0), 1.0);
    oOrm = vec4(clamp(s.coat, 0.0, 1.0), clamp(s.rough, 0.04, 1.0), 0.0, clamp(s.thin, 0.0, 1.0));

    float hn = clamp(s.h / HEIGHT_RANGE + 0.5, 0.0, 1.0) * 255.0;
    oHeight = vec4(floor(hn) / 255.0, fract(hn), 0.0, 1.0);
}
`

const NORMAL_FRAGMENT =  `
precision highp float;
precision highp int;
uniform sampler2D uH;
uniform int uMode;
uniform vec2 uSize;
uniform vec2 uProf[${PROF_N}];
uniform float uLen;
uniform float uExt;
out vec4 oNormal;
float hAt(ivec2 c) {
    ivec2 sz = ivec2(uSize);
    c.y = uMode == 3 ? (c.y + sz.y) % sz.y : clamp(c.y, 0, sz.y - 1);
    c.x = uMode == 0 ? clamp(c.x, 0, sz.x - 1) : (c.x + sz.x) % sz.x;
    vec2 e = texelFetch(uH, c, 0).rg;
    return ((e.r * 255.0 + e.g) / 255.0 - 0.5) * HEIGHT_RANGE;
}
void main() {
    ivec2 c = ivec2(gl_FragCoord.xy);
    vec2 uv = gl_FragCoord.xy / uSize;
    vec2 tl = vec2(2.0 * uExt);
    if (uMode == 1) {
        float f = clamp(uv.y, 0.0, 1.0) * float(${PROF_N - 1});
        int k = int(min(floor(f), float(${PROF_N - 2})));
        float rr = mix(uProf[k].x, uProf[k + 1].x, f - float(k));
        tl = vec2(6.28318530718 * max(rr, 0.02), uLen);
    } else if (uMode == 2) {
        tl = vec2(6.28318530718 * max(uv.y * uExt, 0.02), uExt);
    } else if (uMode == 3) {
        tl = vec2(6.28318530718 * 0.6, 0.12);
    }
    float su = (hAt(c + ivec2(1, 0)) - hAt(c - ivec2(1, 0))) * uSize.x / (2.0 * tl.x);
    float sv = (hAt(c + ivec2(0, 1)) - hAt(c - ivec2(0, 1))) * uSize.y / (2.0 * tl.y);
    oNormal = vec4(normalize(vec3(-su, -sv, 1.0)) * 0.5 + 0.5, 1.0);
}
`

const HEIGHT_RANGE = 0.06

interface BakeJob {
    kind: TexKind
    mode: 0 | 1 | 2 | 3
    w: number
    h: number
    ext: number
    rt: THREE.WebGLRenderTarget
    row: number
    mat: THREE.RawShaderMaterial
    scene: THREE.Scene

    nrt: THREE.WebGLRenderTarget
    uniforms: Record<string, THREE.IUniform>
    phase: 0 | 1

    ready: boolean
}

interface SharedUniforms {
    uKeyDir: { value: THREE.Vector3 }
    uKeyCol: { value: THREE.Color }
    uBackDir: { value: THREE.Vector3 }
    uBackCol: { value: THREE.Color }
}
interface LayerUniforms {
    uAoA: { value: THREE.Vector4 }
    uAoB: { value: THREE.Vector4 }
}

function hookMaterial(mat: THREE.MeshPhysicalMaterial, shared: SharedUniforms, layer: LayerUniforms, sss: THREE.Vector4) {
    const sssU = { value: sss }
    mat.onBeforeCompile = (sh) => {
        sh.uniforms.uKeyDir = shared.uKeyDir
        sh.uniforms.uKeyCol = shared.uKeyCol
        sh.uniforms.uBackDir = shared.uBackDir
        sh.uniforms.uBackCol = shared.uBackCol
        sh.uniforms.uAoA = layer.uAoA
        sh.uniforms.uAoB = layer.uAoB
        sh.uniforms.uSss = sssU
        sh.vertexShader = sh.vertexShader
            .replace("#include <common>", "#include <common>\nvarying vec3 vLocalP;")
            .replace(
                "#include <begin_vertex>",
                `#include <begin_vertex>
#ifdef USE_INSTANCING
vLocalP = (instanceMatrix * vec4(transformed, 1.0)).xyz;
#else
vLocalP = transformed;
#endif`
            )
        sh.fragmentShader = sh.fragmentShader
            .replace(
                "#include <common>",
                `#include <common>
varying vec3 vLocalP;
uniform vec3 uKeyDir;
uniform vec3 uKeyCol;
uniform vec3 uBackDir;
uniform vec3 uBackCol;
uniform vec4 uAoA;
uniform vec4 uAoB;
uniform vec4 uSss;`
            )
            .replace(
                "#include <aomap_fragment>",
                `{
    float thinK = 1.0;
#ifdef USE_ROUGHNESSMAP
    thinK = texture2D(roughnessMap, vRoughnessMapUv).a;
#endif
    vec3 Lb = normalize(uBackDir + normal * 0.45);
    float tb = pow(saturate(dot(geometryViewDir, -Lb)), 3.0);
    float nl = dot(normal, uKeyDir);
    float wrapK = saturate((nl + 0.55) / 1.55);
    wrapK = max(wrapK * wrapK - saturate(nl), 0.0);
    vec3 sss = (uBackCol * tb * 1.8 + uKeyCol * wrapK * 0.55) * thinK * uSss.a * uSss.rgb;
    reflectedLight.directDiffuse += sss * material.diffuseColor * RECIPROCAL_PI * 3.14159;

    float rr = length(vLocalP.xz);
    float covA = 1.0 - smoothstep(uAoA.z - 0.06, uAoA.z + 0.14, rr);
    float covB = 1.0 - smoothstep(uAoB.z - 0.06, uAoB.z + 0.14, rr);
    float occA = uAoA.x * covA * exp(-max(uAoA.y - vLocalP.y, 0.0) / uAoA.w);
    float occB = uAoB.x * covB * exp(-max(vLocalP.y - uAoB.y, 0.0) / uAoB.w);
    float cao = (1.0 - 0.88 * occA) * (1.0 - 0.75 * occB);
    reflectedLight.indirectDiffuse *= cao;
    reflectedLight.indirectSpecular *= cao * cao;
    reflectedLight.directDiffuse *= mix(1.0, cao, 0.55);
    reflectedLight.directSpecular *= mix(1.0, cao, 0.55);
#if defined( USE_CLEARCOAT )
    clearcoatSpecularIndirect *= cao * cao;
    clearcoatSpecularDirect *= mix(1.0, cao, 0.55);
#endif
}
#include <aomap_fragment>`
            )
    }
    mat.customProgramCacheKey = () => "brioche-aloft"
}

function dirOf(az: number, el: number, out: THREE.Vector3) {
    return out.set(Math.sin(az * DEG) * Math.cos(el * DEG), Math.sin(el * DEG), Math.cos(az * DEG) * Math.cos(el * DEG))
}

function buildStudio(renderer: THREE.WebGLRenderer) {
    const env = new THREE.Scene()
    const room = new THREE.Mesh(new THREE.SphereGeometry(30, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.012, 0.009, 0.007), side: THREE.BackSide }))
    env.add(room)
    const v = new THREE.Vector3()
    const parts: THREE.Mesh[] = [room]
    const panel = (w: number, h: number, az: number, el: number, col: string, k: number) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide }))
        dirOf(az, el, v).multiplyScalar(12)
        m.position.copy(v)
        m.lookAt(0, 0, 0)
        env.add(m)
        parts.push(m)
    }

    panel(7, 5, DEFAULT_ADVANCED.keyTurn, DEFAULT_ADVANCED.keyHeight, "#fff1df", 5)

    panel(1.6, 9, 155, 22, "#fff7ee", 7)

    panel(1.2, 8, -150, 18, "#ffe9d6", 2.4)

    panel(8, 8, 0, 88, "#fff4e6", 0.9)

    panel(9, 4.5, 180, 48, "#fff3e4", 2.4)

    panel(6, 3, 45, 2, "#ffd6ae", 0.45)

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.03, 0.022, 0.016) }))
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1.2
    env.add(floor)
    parts.push(floor)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const rt = pmrem.fromScene(env, 0.02)
    pmrem.dispose()
    parts.forEach((m) => {
        m.geometry.dispose()
        ;(m.material as THREE.Material).dispose()
    })
    return rt
}

function blobTexture() {
    const S = 128
    const data = new Uint8Array(S * S * 4)
    for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
            const dx = (x + 0.5) / S - 0.5
            const dy = (y + 0.5) / S - 0.5
            const r = Math.sqrt(dx * dx + dy * dy) * 2
            const a = Math.exp(-r * r * 5.5) * (1 - smooth(0.85, 1, r))
            const o = (y * S + x) * 4
            data[o] = data[o + 1] = data[o + 2] = Math.round(a * 255)
            data[o + 3] = 255
        }
    }
    const t = new THREE.DataTexture(data, S, S)
    t.minFilter = THREE.LinearFilter
    t.magFilter = THREE.LinearFilter
    t.needsUpdate = true
    return t
}

const SERIF_FALLBACK = `"Times New Roman", Georgia, serif`
function fontFamilyCss(font: CSSProperties | undefined) {
    const f = { ...DEFAULT_FONT, ...font }
    const fam = String(f.fontFamily || "").trim()
    if (!fam) return SERIF_FALLBACK
    return /[,"']/.test(fam) ? fam : `"${fam}", ${SERIF_FALLBACK}`
}
/** Whether the chosen face is italic. Framer's font value names its face in
 *  `variant` ("Bold", "Bold Italic"); that is what the picker shows, so it
 *  wins over a `fontStyle` left behind by an older default. */
function labelItalic(font: CSSProperties | undefined) {
    if (!font) return false
    const variant = (font as { variant?: unknown }).variant
    if (typeof variant === "string" && variant.trim()) return /italic|oblique/i.test(variant)
    return font.fontStyle === "italic" || font.fontStyle === "oblique"
}
const requestedFonts = new Set<string>()
/** Outside Framer nothing loads the default face: fetch it from Google Fonts. */
function ensureFont(font: CSSProperties | undefined) {
    if (typeof document === "undefined") return
    const f = { ...DEFAULT_FONT, ...font }
    const fam = String(f.fontFamily || "").trim()
    if (!fam || /[,"']/.test(fam) || /^(serif|sans-serif|monospace|system-ui)$/i.test(fam)) return
    let registered = false
    document.fonts.forEach((face) => {
        if (face.family.replace(/^["']|["']$/g, "") === fam) registered = true
    })
    if (registered || requestedFonts.has(fam)) return
    requestedFonts.add(fam)
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fam).replace(/%20/g, "+")}:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap`
    document.head.appendChild(link)
}

function resolveLayers(list: BriocheAloftLayer[] | undefined) {
    const src = Array.isArray(list) && list.length ? list : DEFAULT_LAYERS
    return src.slice(0, MAX_LAYERS).map((l, i) => {
        const kind = (KIND_LIST as string[]).includes(String(l && l.kind)) ? (l.kind as LayerKind) : DEFAULT_LAYERS[i % DEFAULT_LAYERS.length].kind
        return { kind, label: typeof l?.label === "string" ? l.label : "", note: typeof l?.note === "string" ? l.note : "" }
    })
}

function spotlightCss(bg: string, k: number) {
    const c = new THREE.Color()
    try {
        c.setStyle(bg)
    } catch {
        c.set(DEFAULTS.background)
    }
    const mix = (t: number) => {
        const r = c.r + (1 - c.r) * t
        const g = c.g + (1 - c.g) * t * 0.96
        const b = c.b + (1 - c.b) * t * 0.9
        return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`
    }
    return `radial-gradient(ellipse 55% 62% at 50% 46%, ${mix(0.085 * k)} 0%, ${mix(0.03 * k)} 48%, ${bg} 100%)`
}

function isStatic() {
    try {
        return RenderTarget.current() === RenderTarget.canvas || RenderTarget.current() === RenderTarget.export
    } catch {
        return false
    }
}

/* ----------------------------------------------------------- component -- */

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1200
 * @framerIntrinsicHeight 800
 */
function __OriginkitBase_BriocheAloft({
    layers = [{"kind":"crown","note":"Butter glazed · toasted sesame","label":"Brioche Crown"},{"kind":"sauce","note":"Smoked paprika aioli","label":"House Sauce"},{"kind":"onion","note":"Shaved · lightly pickled","label":"Red Onion"},{"kind":"cheddar","note":"Twelve months · melted","label":"Aged Cheddar"},{"kind":"beef","note":"Dry-aged chuck · flame seared","label":"Grilled Beef"},{"kind":"tomato","note":"Vine ripened","label":"Heirloom Tomato"},{"kind":"lettuce","note":"Hand-torn green leaf","label":"Crisp Lettuce"},{"kind":"heel","note":"Griddle toasted","label":"Brioche Heel"}],
    background = DEFAULTS.background,
    labels = DEFAULTS.labels,
    font = {"variant":"Bold","fontSize":"16px","fontStyle":"italic","textAlign":"left","fontFamily":"Inter","fontWeight":700,"lineHeight":"1.5em","letterSpacing":"0em"},
    textColor = DEFAULTS.textColor,
    spacing = DEFAULTS.spacing,
    scale = DEFAULTS.scale,
    placement,
    explode = DEFAULTS.explode,
    parallax = DEFAULTS.parallax,
    spin = DEFAULTS.spin,
    transition = {"mass":1,"type":"spring","damping":13,"stiffness":70},
    advanced,
    style,
}: BriocheAloftProps) {
    const place = { ...DEFAULT_PLACEMENT, ...placement }
    const adv = { ...DEFAULT_ADVANCED, ...advanced }
    const list = resolveLayers(layers)
    const hostRef = useRef<HTMLDivElement>(null)
    const labelRefs = useRef<(HTMLDivElement | null)[]>([])
    const [ready, setReady] = useState(false)
    const [gen, setGen] = useState(0)
    const staticMode = isStatic()

    const live = { list, labels, spacing, scale, place, explode, parallax, spin, transition, adv, background, staticMode }
    const liveRef = useRef(live)
    const keyRef = useRef("")
    const dirtyRef = useRef(true)
    liveRef.current = live
    const key = JSON.stringify(live)
    if (key !== keyRef.current) {
        keyRef.current = key
        dirtyRef.current = true
    }

    useEffect(() => ensureFont(font), [font])

    useEffect(() => {
        const host = hostRef.current
        if (!host) return
        // Software GL (a blocklisted GPU, a VM) gets the light path: half the
        // tessellation, no MSAA and no shadow map. Asked of a throwaway
        // context, because antialiasing is fixed when the renderer is made.
        let soft = false
        try {
            const probe = document.createElement("canvas").getContext("webgl2")
            const info = probe && probe.getExtension("WEBGL_debug_renderer_info")
            if (probe && info) soft = /swiftshader|llvmpipe|software|basic render/i.test(String(probe.getParameter(info.UNMASKED_RENDERER_WEBGL)))
            probe?.getExtension("WEBGL_lose_context")?.loseContext()
        } catch {
            soft = false
        }
        LOD = soft ? 0.5 : 1
        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({ antialias: !soft, alpha: true, powerPreference: "low-power", preserveDrawingBuffer: false, premultipliedAlpha: true })
        } catch {
            return
        }
        renderer.setClearColor(0x000000, 0)
        // three's shader-error checks query link status on first use, which
        // waits for the GPU process to finish compiling: a freeze on load
        renderer.debug.checkShaderErrors = false
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.shadowMap.enabled = !soft
        renderer.shadowMap.type = THREE.PCFShadowMap
        renderer.shadowMap.autoUpdate = false
        const canvas = renderer.domElement
        canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"
        host.insertBefore(canvas, host.firstChild)
        // smaller maps where memory and bake time are scarce
        const weak = soft || (typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 8) <= 4)
        const texScale = weak ? 0.5 : 1
        const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy())

        let lost = false
        const onLost = (e: Event) => {
            e.preventDefault()
            lost = true
        }
        const onRestored = () => setGen((g) => g + 1)
        canvas.addEventListener("webglcontextlost", onLost)
        canvas.addEventListener("webglcontextrestored", onRestored)

        /* ---- scene */
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(DEFAULT_ADVANCED.lens, REF_ASPECT, 0.1, 200)
        // built in the first frame, not during mount: each is a long task of its own
        let env: THREE.WebGLRenderTarget | null = null
        scene.environmentIntensity = 0.55

        const key = new THREE.DirectionalLight(0xfff0dc, 3.1)
        key.castShadow = true
        key.shadow.mapSize.set(2048, 2048)
        key.shadow.bias = -0.0004
        key.shadow.normalBias = 0.012
        scene.add(key, key.target)
        const rim = new THREE.DirectionalLight(0xfff5ea, 2.6)
        scene.add(rim, rim.target)
        const rim2 = new THREE.DirectionalLight(0xffe6cf, 0.9)
        scene.add(rim2, rim2.target)

        // The content: a pivot at the composition's centre (Tilt turns about
        // it), the turntable inside, and the layers on that.
        const pivot = new THREE.Group()
        const turntable = new THREE.Group()
        const stack = new THREE.Group()
        pivot.add(turntable)
        turntable.add(stack)
        scene.add(pivot)

        // the ground: a soft contact shadow and a wider falloff, never the light's own
        const blob = blobTexture()
        const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: blob, transparent: true, depthWrite: false, toneMapped: false })
        const wideMat = new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: blob, transparent: true, depthWrite: false, toneMapped: false })
        const plane = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2)
        const contact = new THREE.Mesh(plane, shadowMat)
        const wide = new THREE.Mesh(plane, wideMat)
        contact.renderOrder = -2
        wide.renderOrder = -3
        scene.add(contact, wide)

        /* ---- bake: every surface's maps, made on the GPU */
        const bakeQuadGeo = new THREE.PlaneGeometry(2, 2)
        const noiseTex = (() => {
            const rnd = mulberry(2024)
            const d = new Uint8Array(256 * 256 * 4)
            for (let i = 0; i < d.length; i++) d[i] = Math.floor(rnd() * 256)
            const t = new THREE.DataTexture(d, 256, 256)
            t.needsUpdate = true
            return t
        })()
        const bakeCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const parallelCompile = !!renderer.extensions.get("KHR_parallel_shader_compile")
        const normalMat = new THREE.RawShaderMaterial({
            glslVersion: THREE.GLSL3,
            defines: { HEIGHT_RANGE: HEIGHT_RANGE.toFixed(4) },
            vertexShader: BAKE_VERTEX,
            fragmentShader: NORMAL_FRAGMENT,
            uniforms: {
                uMode: { value: 0 },
                uSize: { value: new THREE.Vector2(1, 1) },
                uProf: { value: [] },
                uLen: { value: 1 },
                uExt: { value: 1 },
                uH: { value: null },
            },
            depthTest: false,
            depthWrite: false,
        })
        let normalAsked = false
        const normalScene = new THREE.Scene()
        const normalQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), normalMat)
        normalQuad.frustumCulled = false
        normalScene.add(normalQuad)
        const jobs = new Map<TexKind, BakeJob>()
        const queue: BakeJob[] = []
        const texSet = (kind: TexKind, mode: 0 | 1 | 2 | 3, w: number, h: number, ext: number, surf?: Surface) => {
            const have = jobs.get(kind)
            if (have) return [have.rt.textures[0], have.nrt.texture, have.rt.textures[1]]
            const W = Math.max(64, Math.round(w * texScale))
            const H = Math.max(64, Math.round(h * texScale))
            const rt = new THREE.WebGLRenderTarget(W, H, {
                count: 3,
                depthBuffer: false,
                stencilBuffer: false,
                generateMipmaps: true,
                minFilter: THREE.LinearMipmapLinearFilter,
                magFilter: THREE.LinearFilter,
                wrapS: THREE.RepeatWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
            })
            rt.textures[0].colorSpace = THREE.SRGBColorSpace
            rt.textures.forEach((t) => {
                t.anisotropy = maxAniso
                t.wrapS = mode === 0 ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping
            })
            const nrt = new THREE.WebGLRenderTarget(W, H, {
                depthBuffer: false,
                stencilBuffer: false,
                generateMipmaps: true,
                minFilter: THREE.LinearMipmapLinearFilter,
                magFilter: THREE.LinearFilter,
            })
            nrt.texture.anisotropy = maxAniso
            nrt.texture.wrapS = mode === 0 ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping
            nrt.texture.wrapT = THREE.ClampToEdgeWrapping
            const prof = Array.from({ length: PROF_N }, (_, k) => new THREE.Vector2(surf ? surf.prof[k * 2] : 0, surf ? surf.prof[k * 2 + 1] : 0))
            const uniforms: Record<string, THREE.IUniform> = {
                uOne: { value: 1 },
                uNoise: { value: noiseTex },
                uMode: { value: mode },
                uSize: { value: new THREE.Vector2(W, H) },
                uProf: { value: prof },
                uLen: { value: surf ? surf.profLen : 1 },
                uExt: { value: ext },
                uH: { value: rt.textures[2] },
            }
            const mat = new THREE.RawShaderMaterial({
                glslVersion: THREE.GLSL3,
                defines: { KIND: TX[kind], HEIGHT_RANGE: HEIGHT_RANGE.toFixed(4) },
                vertexShader: BAKE_VERTEX,
                fragmentShader: BAKE_FRAGMENT,
                uniforms,
                depthTest: false,
                depthWrite: false,
            })
            const sc = new THREE.Scene()
            const quad = new THREE.Mesh(bakeQuadGeo, mat)
            quad.frustumCulled = false
            sc.add(quad)
            const job: BakeJob = { kind, mode, w: W, h: H, ext, rt, nrt, row: 0, mat, scene: sc, uniforms, phase: 0, ready: !parallelCompile }
            if (parallelCompile) {
                // compiled with its own target bound: three keys programs on the
                // target's colour space, so compiling against the screen would
                // only make the real draw compile it again, on the main thread
                renderer.setRenderTarget(rt)
                renderer.compileAsync(sc, bakeCam).then(
                    () => (job.ready = true),
                    () => (job.ready = true)
                )
                if (!normalAsked) {
                    normalAsked = true
                    normalMat.uniforms.uH.value = rt.textures[2]
                    normalMat.uniforms.uProf.value = prof
                    renderer.setRenderTarget(nrt)
                    renderer.compileAsync(normalScene, bakeCam)
                }
                renderer.setRenderTarget(null)
            }
            jobs.set(kind, job)
            queue.push(job)
            return [rt.textures[0], nrt.texture, rt.textures[1]]
        }
        /** Bakes a strip of each ready job, about `budgetRows` 1024-wide rows in all. */
        const gl = renderer.getContext() as WebGL2RenderingContext
        let bakeFence: WebGLSync | null = null
        let fencePolls = 0
        let bakeFirst = false
        let bakeAt = 0
        let bakeBudget = weak ? 64 : 192
        const runBake = (budgetRows: number) => {
            let rows = budgetRows
            for (let q = 0; q < queue.length && rows > 0; ) {
                const j = queue[q]
                if (!j.ready) {
                    q++
                    continue
                }
                if (j.phase === 1) {
                    // the normals: one cheap pass over the finished height
                    const nu = normalMat.uniforms
                    for (const k of ["uMode", "uSize", "uProf", "uLen", "uExt", "uH"]) nu[k].value = j.uniforms[k].value
                    normalQuad.material = normalMat
                    renderer.setRenderTarget(j.nrt)
                    renderer.render(normalScene, bakeCam)
                    renderer.setRenderTarget(null)
                    rows -= (j.h * j.w) / 1024 / 8
                    queue.splice(q, 1)
                    j.mat.dispose()
                    continue
                }
                if (j.row === 0) bakeFirst = true
                const n = Math.min(j.h - j.row, Math.max(16, Math.round((rows * 1024) / j.w)))
                j.rt.scissor.set(0, j.row, j.w, n)
                j.rt.scissorTest = true
                renderer.setRenderTarget(j.rt)
                renderer.render(j.scene, bakeCam)
                renderer.setRenderTarget(null)
                j.row += n
                rows -= (n * j.w) / 1024
                if (j.row >= j.h) j.phase = 1
                q++
            }
        }

        /* ---- geometry and materials, per kind, built when first needed */
        const shared: SharedUniforms = {
            uKeyDir: { value: new THREE.Vector3(0, 1, 0) },
            uKeyCol: { value: new THREE.Color() },
            uBackDir: { value: new THREE.Vector3(0, 0, -1) },
            uBackCol: { value: new THREE.Color() },
        }
        const surfaces = new Map<string, Surface>()
        const surfOf = (name: string, make: () => Surface) => {
            let s = surfaces.get(name)
            if (!s) {
                s = make()
                surfaces.set(name, s)
            }
            return s
        }
        let onionGeo: THREE.BufferGeometry | null = null
        const seedGeo = seedGeometry()
        const dropGeo = new THREE.SphereGeometry(1, lod(12, 8), lod(8, 5))

        interface Built {
            kind: LayerKind
            group: THREE.Group
            mats: THREE.MeshPhysicalMaterial[]
            uni: LayerUniforms
            seeds: THREE.InstancedMesh | null
            drops: THREE.InstancedMesh | null
        }

        const physical = (tex: THREE.Texture[] | null, o: Partial<THREE.MeshPhysicalMaterialParameters>, uni: LayerUniforms, tint: THREE.Vector4) => {
            // each material gets its own copy: Translucency scales its strength live
            const sss = tint.clone()
            const m = new THREE.MeshPhysicalMaterial({
                roughness: 1,
                metalness: 0,
                ior: 1.42,
                ...(tex ? { map: tex[0], normalMap: tex[1], roughnessMap: tex[2], clearcoatMap: tex[2] } : {}),
                ...o,
            })
            m.userData.coat = m.clearcoat
            m.userData.sss = sss.w
            m.userData.sssVec = sss
            hookMaterial(m, shared, uni, sss)
            return m
        }
        const SSS_TINT = {
            bun: new THREE.Vector4(1.2, 0.9, 0.6, 0.35),
            lettuce: new THREE.Vector4(1.3, 1.6, 0.6, 1.0),
            tomato: new THREE.Vector4(1.6, 0.7, 0.5, 0.8),
            cheese: new THREE.Vector4(1.5, 1.0, 0.4, 0.7),
            onion: new THREE.Vector4(1.3, 1.0, 1.2, 0.9),
            sauce: new THREE.Vector4(1.4, 0.9, 0.6, 0.6),
            beef: new THREE.Vector4(1.0, 0.6, 0.5, 0.0),
        }

        const buildLayer = (kind: LayerKind): Built => {
            const group = new THREE.Group()
            const uni: LayerUniforms = { uAoA: { value: new THREE.Vector4(0, 1, 1, 0.06) }, uAoB: { value: new THREE.Vector4(0, 0, 1, 0.06) } }
            const mats: THREE.MeshPhysicalMaterial[] = []
            let seeds: THREE.InstancedMesh | null = null
            let drops: THREE.InstancedMesh | null = null
            const add = (geo: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], double = false) => {
                const mesh = new THREE.Mesh(geo, m)
                mesh.castShadow = true
                mesh.receiveShadow = true
                if (double) (Array.isArray(m) ? m : [m]).forEach((x) => (x.side = THREE.DoubleSide))
                group.add(mesh)
                return mesh
            }
            if (kind === "crown" || kind === "heel") {
                const s = kind === "crown" ? surfOf("crown", crownSurface) : surfOf("heel", heelSurface)
                const crustT = texSet(kind === "crown" ? "crust" : "heel", 1, 1024, kind === "crown" ? 1024 : 512, 1, s)
                const crumbT = texSet("crumb", 0, 1024, 1024, 1.05)
                const crust = physical(crustT, { clearcoat: kind === "crown" ? 0.9 : 0.3, clearcoatRoughness: 0.22 }, uni, SSS_TINT.bun)
                const face = physical(crumbT, { clearcoat: 0.0 }, uni, SSS_TINT.bun)
                mats.push(crust, face)
                add(s.geo, [crust, face])
                if (kind === "crown") {
                    const sm = physical(null, { color: 0xffffff, roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.25, vertexColors: false }, uni, new THREE.Vector4(1.1, 1.0, 0.8, 0.5))
                    mats.push(sm)
                    const all = seedMatrices(s, 300)
                    seeds = new THREE.InstancedMesh(seedGeo, sm, Math.max(1, all.length))
                    const rnd = mulberry(99)
                    const c = new THREE.Color()
                    all.forEach((m, i) => {
                        seeds!.setMatrixAt(i, m)
                        const toasted = rnd() < 0.3
                        c.set(toasted ? "#d8b071" : "#f1e2bd").offsetHSL(0, 0, (rnd() - 0.5) * 0.06)
                        seeds!.setColorAt(i, c)
                    })
                    seeds.userData.max = all.length
                    seeds.castShadow = true
                    seeds.receiveShadow = true
                    group.add(seeds)
                }
            } else if (kind === "beef") {
                const s = surfOf("beef", pattySurface)
                const topT = texSet("beefTop", 0, 1024, 1024, 1.12)
                const sideT = texSet("beefSide", 1, 1024, 256, 1, s)
                const top = physical(topT, { clearcoat: 0.6, clearcoatRoughness: 0.3, normalScale: new THREE.Vector2(1.1, 1.1) }, uni, SSS_TINT.beef)
                const side = physical(sideT, { clearcoat: 0.6, clearcoatRoughness: 0.3, normalScale: new THREE.Vector2(1.1, 1.1) }, uni, SSS_TINT.beef)
                mats.push(top, side)
                add(s.geo, [top, side])
            } else if (kind === "tomato") {
                const s = surfOf("tomato", tomatoSurface)
                const faceT = texSet("tomatoFace", 0, 1024, 1024, 0.92)
                const skinT = texSet("tomatoSkin", 1, 512, 128, 1, s)
                const face = physical(faceT, { clearcoat: 1, clearcoatRoughness: 0.06 }, uni, SSS_TINT.tomato)
                const skin = physical(skinT, { clearcoat: 1, clearcoatRoughness: 0.08 }, uni, SSS_TINT.tomato)
                mats.push(face, skin)
                add(s.geo, [face, skin])
            } else if (kind === "cheddar") {
                const s = surfOf("cheddar", cheeseSurface)
                const t = texSet("cheese", 0, 1024, 1024, 1.45)
                const m = physical(t, { clearcoat: 0.55, clearcoatRoughness: 0.18 }, uni, SSS_TINT.cheese)
                mats.push(m)
                add(s.geo, m)
            } else if (kind === "lettuce") {
                const s = surfOf("lettuce", lettuceSurface)
                const t = texSet("lettuce", 2, 1024, 512, 1.45)
                const m = physical(t, { clearcoat: 0.5, clearcoatRoughness: 0.12 }, uni, SSS_TINT.lettuce)
                m.shadowSide = THREE.DoubleSide
                mats.push(m)
                add(s.geo, m, true)
                const second = add(s.geo, m, true)
                second.rotation.y = 2.1
                second.scale.set(0.93, 1, 0.93)
                second.position.y = 0.016
                // water beads on the top leaf, as a just-washed leaf carries
                const dm = physical(null, { color: 0x9cc276, roughness: 0.02, clearcoat: 1, clearcoatRoughness: 0.01, ior: 1.33, envMapIntensity: 1.6 }, uni, new THREE.Vector4(1.1, 1.3, 0.8, 0.9))
                mats.push(dm)
                const all = dropletMatrices(s, 40)
                drops = new THREE.InstancedMesh(dropGeo, dm, Math.max(1, all.length))
                all.forEach((mm, i) => drops!.setMatrixAt(i, mm))
                drops.count = all.length
                drops.receiveShadow = true
                second.add(drops)
            } else if (kind === "sauce") {
                const s = surfOf("sauce", sauceSurface)
                const t = texSet("sauce", 0, 1024, 1024, 1.3)
                const m = physical(t, { clearcoat: 1, clearcoatRoughness: 0.04 }, uni, SSS_TINT.sauce)
                mats.push(m)
                add(s.geo, m)
            } else {
                if (!onionGeo) onionGeo = onionGeometry()
                const t = texSet("onion", 3, 512, 128, 1)
                const m = physical(t, { clearcoat: 0.8, clearcoatRoughness: 0.1 }, uni, SSS_TINT.onion)
                mats.push(m)
                add(onionGeo, m)
            }
            return { kind, group, mats, uni, seeds, drops }
        }

        let built: Built[] = []
        let builtKey = ""
        const rebuild = (kinds: LayerKind[]) => {
            built.forEach((b) => {
                stack.remove(b.group)
                b.mats.forEach((m) => m.dispose())
                if (b.seeds) b.seeds.dispose()
                if (b.drops) b.drops.dispose()
            })
            built = []
            pending = kinds.slice()
        }
        let pending: LayerKind[] = []

        /* ---- explode state, one progress per layer */
        const prog = new Float64Array(MAX_LAYERS)
        let anims: AnimationPlaybackControls[] = []
        let running = 0
        let target = -1
        const reduce = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null
        const setTarget = (t: number, instant: boolean) => {
            if (t === target && !instant) return
            target = t
            anims.forEach((a) => a.stop())
            anims = []
            running = 0
            const p = liveRef.current
            const n = built.length
            const stagger = clamp(num(p.adv.stagger, DEFAULT_ADVANCED.stagger), 0, 300) / 1000
            for (let i = 0; i < n; i++) {
                if (instant || (reduce && reduce.matches)) {
                    prog[i] = t
                    continue
                }
                // apart: the crown lifts first; together: the heel's neighbours land first
                const order = t > 0.5 ? i : n - 1 - i
                running++
                const tr = (p.transition || DEFAULT_TRANSITION) as Transition
                anims.push(
                    animate(prog[i], t, {
                        ...(tr as object),
                        delay: ((tr as { delay?: number }).delay || 0) + order * stagger,
                        onUpdate: (v: number) => {
                            prog[i] = v
                        },
                        onComplete: () => {
                            running--
                            prog[i] = t
                            needs = true
                        },
                    } as Parameters<typeof animate>[2])
                )
            }
            needs = true
        }

        /* ---- pointer */
        // The handlers only record where the pointer is. Whether it is over
        // the burger — not just inside the frame — is decided in the frame,
        // against the layers where they are drawn (turning, floating, placed).
        const pt = { over: false, cx: 0, cy: 0, moved: false, u: 0.5, v: 0.5, lastX: NaN, lastY: NaN, tap: false }
        let hoverOpen = false
        let tapOpen = false
        const onEnter = (e: PointerEvent) => {
            if (e.pointerType === "touch") return
            pt.over = true
            pt.cx = e.clientX
            pt.cy = e.clientY
            pt.moved = true
            needs = true
        }
        const onMove = (e: PointerEvent) => {
            if (e.clientX === pt.lastX && e.clientY === pt.lastY) return
            pt.lastX = e.clientX
            pt.lastY = e.clientY
            pt.cx = e.clientX
            pt.cy = e.clientY
            pt.moved = true
            if (e.pointerType !== "touch") pt.over = true
            needs = true
        }
        const onLeave = (e: PointerEvent) => {
            if (e.pointerType === "touch") return
            pt.over = false
            hoverOpen = false
            needs = true
        }
        const onDown = (e: PointerEvent) => {
            const mode = liveRef.current.explode
            // tap mode toggles; on touch there is no hover, so a tap toggles there too
            if (mode === "tap" || (mode === "hover" && e.pointerType === "touch")) {
                pt.cx = e.clientX
                pt.cy = e.clientY
                pt.moved = true
                pt.tap = true
                needs = true
            }
        }

        /* ---- what the pointer is over */
        const hitRay = new THREE.Raycaster()
        const hitNdc = new THREE.Vector2()
        const hitInv = new THREE.Matrix4()
        const hitO = new THREE.Vector3()
        const hitD = new THREE.Vector3()
        let drawn = false
        // Opening pulls the camera back to fit the whole stack, so the burger
        // gets smaller on screen. A pointer near its edge would then be off
        // it, close it, be on it again… So the moment it opens, keep where
        // the closed burger was (camera and layers), and stay open while the
        // pointer is in either that or the open column.
        const snapCam = new THREE.PerspectiveCamera()
        const snapInv = new THREE.Matrix4()
        const snapY = new Float64Array(MAX_LAYERS)
        const snapX = new Float64Array(MAX_LAYERS)
        const snapZ = new Float64Array(MAX_LAYERS)
        let snapN = 0
        const rayInto = (cam: THREE.PerspectiveCamera, inv: THREE.Matrix4) => {
            hitNdc.set(pt.u * 2 - 1, 1 - pt.v * 2)
            hitRay.setFromCamera(hitNdc, cam)
            // into the turntable's space: the turn, Tilt and Placement are all undone
            hitO.copy(hitRay.ray.origin).applyMatrix4(inv)
            hitD.copy(hitRay.ray.direction).transformDirection(inv)
        }
        const layersHit = (n: number, ys: ArrayLike<number>, xs: ArrayLike<number>, zs: ArrayLike<number>) => {
            for (let i = 0; i < n; i++) {
                const k = KINDS[built[i].kind]
                const ox = hitO.x - xs[i]
                const oz = hitO.z - zs[i]
                if (built[i].kind === "crown") {
                    // a short wall up to the dome's foot, then the dome itself
                    if (rayCylinder(ox, hitO.y, oz, hitD.x, hitD.y, hitD.z, k.hitR, ys[i], ys[i] + 0.1)) return true
                    if (raySpheroid(ox, hitO.y, oz, hitD.x, hitD.y, hitD.z, ys[i] + 0.1, k.hitR, k.yhi - 0.1)) return true
                } else if (rayCylinder(ox, hitO.y, oz, hitD.x, hitD.y, hitD.z, k.hitR, ys[i] + k.ylo, ys[i] + k.yhi)) return true
            }
            return false
        }
        /** Closed, the pointer must be on a layer. Open, anywhere in the
         *  column the floating layers make, gaps included (so moving between
         *  layers never drops it shut), or where the closed burger was. */
        const overBurger = (open: boolean) => {
            const n = built.length
            if (!n || !drawn) return false
            hitInv.copy(turntable.matrixWorld).invert()
            rayInto(camera, hitInv)
            if (!open) {
                for (let i = 0; i < n; i++) {
                    snapY[i] = yA[i]
                    snapX[i] = built[i].group.position.x
                    snapZ[i] = built[i].group.position.z
                }
                const hit = layersHit(n, snapY, snapX, snapZ)
                if (hit) {
                    snapCam.copy(camera)
                    snapInv.copy(hitInv)
                    snapN = n
                }
                return hit
            }
            let r = 0
            let y0 = Infinity
            let y1 = -Infinity
            for (let i = 0; i < n; i++) {
                const k = KINDS[built[i].kind]
                r = Math.max(r, k.hitR)
                y0 = Math.min(y0, yA[i] + k.ylo)
                y1 = Math.max(y1, yA[i] + k.yhi)
            }
            if (rayCylinder(hitO.x, hitO.y, hitO.z, hitD.x, hitD.y, hitD.z, r + 0.06, y0 - 0.04, y1 + 0.04)) return true
            if (snapN !== n) return false
            rayInto(snapCam, snapInv)
            return layersHit(n, snapY, snapX, snapZ)
        }
        host.addEventListener("pointerenter", onEnter)
        host.addEventListener("pointermove", onMove)
        host.addEventListener("pointerleave", onLeave)
        host.addEventListener("pointerdown", onDown)

        /* ---- size */
        let W = 1
        let H = 1
        let shown = 1
        let quality = 1
        let sizeKey = ""
        let needs = true
        let visible = true
        const applySize = () => {
            const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
            let pr = Math.min(2, dpr * clamp(shown, 1, 2))
            const budget = 4.2e6
            if (W * H * pr * pr > budget) pr = Math.sqrt(budget / (W * H))
            pr *= quality
            const k = `${W}x${H}@${pr.toFixed(3)}`
            if (k === sizeKey) return
            sizeKey = k
            renderer.setPixelRatio(pr)
            renderer.setSize(W, H, false)
            needs = true
        }
        const labelBox = host.querySelector("[data-labels]") as HTMLDivElement | null
        const ro = new ResizeObserver((ents) => {
            const r = ents[0].contentRect
            W = Math.max(1, Math.round(r.width))
            H = Math.max(1, Math.round(r.height))
            const br = host.getBoundingClientRect()
            const s = br.width / Math.max(1, W)
            if (Math.abs(s - shown) / shown > 0.05) shown = s
            needs = true
        })
        ro.observe(host)
        let io: IntersectionObserver | null = null
        if (typeof IntersectionObserver !== "undefined") {
            io = new IntersectionObserver((e) => {
                visible = e[0].isIntersecting
                if (visible) needs = true
            })
            io.observe(host)
        }

        /* ---- loop */
        const v3 = new THREE.Vector3()
        const v4 = new THREE.Vector3()
        const right = new THREE.Vector3()
        const upAx = new THREE.Vector3(0, 1, 0)
        const qTilt = new THREE.Quaternion()
        const camRight = new THREE.Vector3()
        const keyCol = new THREE.Color()
        const yB = new Float64Array(MAX_LAYERS)
        const yA = new Float64Array(MAX_LAYERS)
        let raf = 0
        let last = -1
        let clock = 0
        let yaw = -0.55
        let leanX = 0
        let leanY = 0
        let leanVX = 0
        let leanVY = 0
        const gaps: number[] = []
        let every = 1
        let ticks = 0
        let lastDraw = -1
        const LADDER = [1, 0.85, 0.72, 0.6]
        const drawGaps: number[] = []
        let level = 0
        let probe: { from: number; base: number; at: number } | null = null
        let slowSince = -1
        let goodSince = -1
        let raisedAt = -1e9
        let downBanUntil = 0
        let upBanUntil = 0
        let announced = false
        let compiled = false
        let compiling = false

        const frame = (now: number) => {
            raf = requestAnimationFrame(frame)
            if (lost) return
            const rawDt = last < 0 ? 16.7 : now - last
            last = now
            gaps.push(rawDt)
            if (gaps.length > 15) gaps.shift()
            const p = liveRef.current
            if (dirtyRef.current) {
                dirtyRef.current = false
                needs = true
            }
            if (!visible || (typeof document !== "undefined" && document.hidden)) return

            /* layers (re)built when the list of kinds changes */
            const kinds = p.list.map((l) => l.kind)
            const kk = kinds.join(",")
            // size the canvas before any bake is queued: resizing the drawing
            // buffer waits for the GPU to finish what is queued, and done at
            // first show it waited for every bake (a half-second freeze)
            if (!announced) applySize()
            if (!env) {
                env = buildStudio(renderer)
                scene.environment = env.texture
                return
            }
            if (kk !== builtKey) {
                builtKey = kk
                rebuild(kinds)
                target = -1
                needs = true
            }
            // the first time, one layer a frame so no single task runs long;
            // after that (an edit in the panel) all at once, so nothing flickers
            while (pending.length) {
                const b = buildLayer(pending.shift() as LayerKind)
                built.push(b)
                stack.add(b.group)
                if (!announced) break
            }
            if (pending.length) return
            // compile the scene's programs off the main thread while the maps
            // bake — but only once the bake's own programs are built, or a bake
            // draw waits behind it in the GPU process and the page stalls
            if (!compiling && queue.every((j) => j.ready)) {
                compiling = true
                const done = () => {
                    compiled = true
                    needs = true
                }
                if (parallelCompile) renderer.compileAsync(scene, camera).then(done, done)
                else done()
            }
            // Bake in strips, never more than the GPU has finished: a fence after
            // each batch, and the next only once it signals. A long queue of
            // bake work made the next call that waits on the GPU (a resize, a
            // uniform query) freeze the page until all of it was done.
            if (bakeFence) {
                fencePolls++
                if (gl.getSyncParameter(bakeFence, gl.SYNC_STATUS) !== gl.SIGNALED) return
                gl.deleteSync(bakeFence)
                bakeFence = null
                // Back within a couple of ticks: the GPU has room, give it more.
                // Slow, and not because a surface drew for the first time
                // (its shader finishes compiling then): give it less.
                const lat = performance.now() - bakeAt
                if (lat < 24) bakeBudget *= 1.6
                else if (lat > 50 && !bakeFirst) bakeBudget *= 0.6
                bakeBudget = clamp(bakeBudget, 128, 8192)
                fencePolls = 0
            }
            if (queue.length) {
                bakeFirst = false
                runBake(bakeBudget)
                bakeFence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)
                bakeAt = performance.now()
                gl.flush()
                return
            }
            if (!compiled) return

            /* vsync-locked pacing: draw every Nth tick, N from the median gap */
            const sorted = gaps.slice().sort((a, b) => a - b)
            const period = sorted[sorted.length >> 1] || 16.7
            const x = 16.7 / period
            if (x < every - 0.1 || x >= every + 1.1) every = Math.max(1, Math.floor(x + 0.1))
            ticks++

            const A = p.adv
            const still = p.staticMode || !!(reduce && reduce.matches)
            const mode = p.explode

            /* pointer: the rect is read at most once per frame, only when it moved */
            if (pt.moved) {
                pt.moved = false
                const r = host.getBoundingClientRect()
                pt.u = clamp((pt.cx - r.left) / Math.max(1, r.width), 0, 1)
                pt.v = clamp((pt.cy - r.top) / Math.max(1, r.height), 0, 1)
            }
            // Tested every frame the pointer is in, not only when it moves:
            // the burger turns and floats under a resting cursor too.
            if ((pt.over || pt.tap) && mode !== "always" && !p.staticMode) {
                const hit = overBurger(target === 1)
                if (mode === "hover" && pt.over) hoverOpen = hit
                if (pt.tap) {
                    // a tap on the burger toggles it; a tap beside it closes it
                    pt.tap = false
                    tapOpen = hit ? !tapOpen : false
                }
                const cursor = mode === "tap" && hit ? "pointer" : ""
                if (host.style.cursor !== cursor) host.style.cursor = cursor
            }
            const open = mode === "always" ? 1 : p.staticMode ? 0 : mode === "tap" ? (tapOpen ? 1 : 0) : hoverOpen || tapOpen ? 1 : 0
            if (open !== target) setTarget(open, target < 0 && open === 0)

            const dt = Math.min(0.05, rawDt / 1000)
            const spinning = !still && num(p.spin, DEFAULTS.spin) > 0
            const par = still ? 0 : clamp(num(p.parallax, DEFAULTS.parallax), 0, 10) / 10
            const goalY = pt.over ? (pt.u - 0.5) * 2 * par * 0.2 : 0
            const goalX = pt.over ? (pt.v - 0.5) * 2 * par * 0.1 : 0
            const leaning = Math.abs(goalY - leanY) + Math.abs(goalX - leanX) + Math.abs(leanVX) + Math.abs(leanVY) > 1e-5
            const floatK = still ? 0 : clamp(num(A.float, DEFAULT_ADVANCED.float), 0, 300) / 100
            let anyOpen = false
            for (let i = 0; i < built.length; i++) if (prog[i] > 0.001) anyOpen = true
            const active = running > 0 || spinning || leaning || (anyOpen && floatK > 0)
            if (!needs && !active) return
            if (!needs && ticks < every) return
            ticks = 0

            /* adaptive resolution. A slow GPU slows the display's ticks too, so
               lateness against the measured cadence never shows: judge the
               drawn gaps against 60 fps instead, and treat every step down as
               a probe — kept only if frames really come faster (a display that
               ticks at 30 Hz, like Framer's canvas, never will) */
            if (lastDraw > 0 && active && running === 0 && now - lastDraw < 200) {
                drawGaps.push(now - lastDraw)
                if (drawGaps.length > 9) drawGaps.shift()
            } else if (now - lastDraw >= 200) drawGaps.length = 0
            if (drawGaps.length >= 9) {
                const med = drawGaps.slice().sort((x, y) => x - y)[4]
                const want = every * Math.min(period, 1000 / 60 + 0.4)
                const slow = med > want * 1.3
                if (probe) {
                    if (now - probe.at > 1500) {
                        if (med < probe.base * 0.87) probe = null
                        else {
                            level = probe.from
                            probe = null
                            downBanUntil = now + 30000
                        }
                        drawGaps.length = 0
                    }
                } else if (slow) {
                    goodSince = -1
                    if (slowSince < 0) slowSince = now
                    if (now - slowSince > 1000 && level < LADDER.length - 1 && now > downBanUntil) {
                        if (now - raisedAt < 3000) upBanUntil = now + 60000
                        probe = { from: level, base: med, at: now }
                        level++
                        slowSince = -1
                        drawGaps.length = 0
                    }
                } else {
                    slowSince = -1
                    if (goodSince < 0) goodSince = now
                    if (level > 0 && now - goodSince > 6000 && now > upBanUntil) {
                        level--
                        raisedAt = now
                        goodSince = -1
                    }
                }
                quality = LADDER[level]
            }
            lastDraw = now
            needs = false
            const stepDt = Math.min(dt, (every * period) / 1000 + 0.004)
            clock += stepDt
            applySize()

            /* turntable and the pointer lean (a critically damped spring) */
            if (spinning) yaw += stepDt * (clamp(num(p.spin, DEFAULTS.spin), 0, 10) / 10) * 0.42
            const w0 = 5.8 / 0.35
            for (let s = 0, ns = Math.max(1, Math.ceil(stepDt / 0.004)); s < ns; s++) {
                const h = stepDt / ns
                leanVY += (w0 * w0 * (goalY - leanY) - 2 * w0 * leanVY) * h
                leanY += leanVY * h
                leanVX += (w0 * w0 * (goalX - leanX) - 2 * w0 * leanVX) * h
                leanX += leanVX * h
            }
            if (Math.abs(goalY - leanY) < 1e-5 && Math.abs(leanVY) < 1e-4) {
                leanY = goalY
                leanVY = 0
            }
            if (Math.abs(goalX - leanX) < 1e-5 && Math.abs(leanVX) < 1e-4) {
                leanX = goalX
                leanVX = 0
            }

            /* stack: assembled bottoms, then lifted apart by each layer's progress */
            const n = built.length
            const gap = 0.08 + (clamp(num(p.spacing, DEFAULTS.spacing), 0, 10) / 10) * 0.75
            let cursor = 0
            for (let i = n - 1; i >= 0; i--) {
                yB[i] = cursor
                cursor += KINDS[built[i].kind].h
            }
            const lift = 0.12
            let top = 0
            for (let i = 0; i < n; i++) {
                const e = Math.max(0, prog[i])
                const rank = n - 1 - i
                const bob = floatK * e * 0.028 * Math.sin(clock * 1.15 + i * 1.9)
                yA[i] = yB[i] + e * (gap * rank + lift) + bob
                const b = built[i]
                // set down by hand: a little off centre, a little off level,
                // each turned its own way. Cheddar keeps its patty's offset
                // (it melted onto it); the heel is the base everything sits on.
                const jk = b.kind === "cheddar" && i < n - 1 && built[i + 1].kind === "beef" ? i + 1 : i
                const J = JITTER[jk % JITTER.length]
                const ja = b.kind === "heel" ? 0 : b.kind === "lettuce" ? 0.6 : 1
                b.group.position.set(J[0] * ja, yA[i], J[1] * ja)
                const sway = floatK * e * 1.4 * DEG
                b.group.rotation.set(J[2] * ja + sway * Math.sin(clock * 0.7 + i * 2.3), J[4] + floatK * e * 0.12 * Math.sin(clock * 0.31 + i * 1.3), J[3] * ja + sway * Math.cos(clock * 0.6 + i * 1.7))
                const kt = yB[i] + KINDS[b.kind].h + Math.max(0, prog[i]) * (gap * rank + lift)
                if (kt > top) top = kt
            }
            if (n === 0) top = 1

            /* contact occlusion from each layer's neighbours */
            for (let i = 0; i < n; i++) {
                const b = built[i]
                const ks = KINDS[b.kind]
                const above = i > 0 ? built[i - 1] : null
                const below = i < n - 1 ? built[i + 1] : null
                const gA = above ? yA[i - 1] - (yA[i] + ks.h) : 9
                const gB = below ? yA[i] - (yA[i + 1] + KINDS[below.kind].h) : yA[i]
                b.uni.uAoA.value.set(above ? Math.exp(-Math.max(0, gA) / 0.07) : 0, ks.aoTop, above ? KINDS[above.kind].radius : 1, 0.05)
                b.uni.uAoB.value.set(Math.exp(-Math.max(0, gB) / 0.07), 0, below ? KINDS[below.kind].radius : 2.5, 0.05)
                if (b.seeds) b.seeds.count = Math.min(b.seeds.userData.max as number, Math.round(clamp(num(A.seeds, DEFAULT_ADVANCED.seeds), 0, 300)))
                const gk = clamp(num(A.gloss, DEFAULT_ADVANCED.gloss), 0, 200) / 100
                const sk = clamp(num(A.translucency, DEFAULT_ADVANCED.translucency), 0, 300) / 100
                b.mats.forEach((m) => {
                    m.clearcoat = (m.userData.coat as number) * gk
                    ;(m.userData.sssVec as THREE.Vector4).w = (m.userData.sss as number) * sk
                })
            }

            /* framing: contain the composition, dolly with the explode */
            const aspect = W / H
            const fit = Math.min(1, aspect / REF_ASPECT)
            const lens = clamp(num(A.lens, DEFAULT_ADVANCED.lens), 10, 60)
            const sc = clamp(num(p.scale, DEFAULTS.scale), 20, 100) / 100
            // from just under the ground (the near rim drops below it in perspective) to the crown
            const hc = top + 0.5
            const wc = 2.7
            const halfH = Math.max(hc / 2, wc / 2 / REF_ASPECT) / FILL
            const dist = halfH / Math.tan((lens * DEG) / 2) / fit / sc
            const yc = (top - 0.2) / 2
            const el = clamp(num(A.elevation, DEFAULT_ADVANCED.elevation), -10, 45) * DEG + leanX
            const az = leanY
            camera.fov = lens
            camera.aspect = aspect
            camera.near = Math.max(0.05, dist * 0.2)
            camera.far = dist * 4 + 20
            camera.position.set(Math.sin(az) * Math.cos(el) * dist, yc + Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist)
            camera.up.set(0, 1, 0)
            camera.lookAt(0, yc, 0)
            const pl = p.place
            camera.rotateZ(clamp(num(pl.angle, 0), -180, 180) * DEG)
            const ox = clamp(num(pl.x, 0), -50, 50) / 100
            const oy = clamp(num(pl.y, 0), -50, 50) / 100
            camera.setViewOffset(W, H, -ox * W, -oy * H, W, H)
            camera.updateProjectionMatrix()
            camera.updateMatrixWorld()

            /* content: Tilt leans it about the camera's horizontal axis, through its centre */
            camRight.setFromMatrixColumn(camera.matrixWorld, 0).normalize()
            right.set(camRight.x, 0, camRight.z).normalize()
            qTilt.setFromAxisAngle(right, -clamp(num(pl.tilt, 0), -60, 60) * DEG)
            pivot.position.set(0, yc, 0)
            pivot.quaternion.copy(qTilt)
            turntable.position.set(0, -yc, 0)
            turntable.rotation.set(0, yaw, 0)

            /* ground shadows: tight under the heel, wide under the stack */
            const heelLift = n ? yA[n - 1] : 0
            const fs = clamp(num(A.floorShadow, DEFAULT_ADVANCED.floorShadow), 0, 100) / 100
            contact.scale.set(2.7 + heelLift * 3, 1, 2.7 + heelLift * 3)
            shadowMat.opacity = fs * 0.9 * Math.exp(-heelLift * 5)
            wide.scale.set(6.5, 1, 6.5)
            wideMat.opacity = fs * 0.45
            contact.position.y = 0.002
            wide.position.y = 0.001

            /* lights, fixed in the room while the burger turns */
            const kt = num(A.keyTurn, DEFAULT_ADVANCED.keyTurn)
            const kh = clamp(num(A.keyHeight, DEFAULT_ADVANCED.keyHeight), 5, 85)
            dirOf(kt, kh, v3)
            key.position.copy(v3).multiplyScalar(20).add(v4.set(0, yc, 0))
            key.target.position.set(0, yc, 0)
            const ext = Math.max(1.8, hc / 2 + 0.6)
            const scam = key.shadow.camera
            if (scam.top !== ext) {
                scam.left = -ext
                scam.right = ext
                scam.top = ext
                scam.bottom = -ext
                scam.near = 1
                scam.far = 40
                scam.updateProjectionMatrix()
            }
            key.shadow.radius = clamp(num(A.softness, DEFAULT_ADVANCED.softness), 1, 12)
            const ex = clamp(num(A.exposure, DEFAULT_ADVANCED.exposure), 20, 300) / 100
            renderer.toneMappingExposure = ex
            const rimK = clamp(num(A.rim, DEFAULT_ADVANCED.rim), 0, 300) / 100
            rim.intensity = 2.6 * rimK
            rim2.intensity = 0.9 * rimK
            dirOf(155, 22, v3)
            rim.position.copy(v3).multiplyScalar(20)
            dirOf(-150, 18, v3)
            rim2.position.copy(v3).multiplyScalar(20)
            // light directions in view space, for the translucency term
            const toView = (l: THREE.DirectionalLight, out: THREE.Vector3) => out.copy(l.position).sub(l.target.position).normalize().transformDirection(camera.matrixWorldInverse)
            toView(key, shared.uKeyDir.value)
            toView(rim, shared.uBackDir.value)
            keyCol.copy(key.color).multiplyScalar(key.intensity)
            shared.uKeyCol.value.copy(keyCol)
            shared.uBackCol.value.copy(rim.color).multiplyScalar(rim.intensity)

            /* we only get here when something moved: the shadows move with it */
            renderer.shadowMap.needsUpdate = true

            renderer.setRenderTarget(null)
            renderer.render(scene, camera)
            drawn = true

            /* labels: at each layer's silhouette, beside its column */
            const S = Math.min(H, W / REF_ASPECT)
            const box = labelBox
            if (box) {
                const showL = !!p.labels
                pivot.updateMatrixWorld(true)
                v3.set(0, yc, 0).project(camera)
                const cx = (v3.x * 0.5 + 0.5) * W
                v4.set(0, yc, 0).addScaledVector(camRight, 1.32).project(camera)
                const half = Math.abs((v4.x * 0.5 + 0.5) * W - cx)
                const kids = labelRefs.current
                for (let i = 0; i < kids.length; i++) {
                    const el = kids[i]
                    if (!el) continue
                    if (i >= n || !showL) {
                        el.style.opacity = "0"
                        continue
                    }
                    const b = built[i]
                    const side = i % 2 === 0 ? 1 : -1
                    const ks = KINDS[b.kind]
                    v3.set(0, ks.h * 0.5 + (b.kind === "cheddar" ? -0.06 : 0), 0)
                    b.group.localToWorld(v3)
                    v3.addScaledVector(camRight, side * ks.radius * 0.97).project(camera)
                    const ax = (v3.x * 0.5 + 0.5) * W
                    const ay = (-v3.y * 0.5 + 0.5) * H
                    const o = smooth(0.45, 0.95, prog[i])
                    const colX = cx + side * (half + 0.05 * S)
                    const len = Math.max(0, (colX - ax) * side)
                    const dot = el.children[0] as HTMLElement
                    const ln = el.children[1] as HTMLElement
                    const tx = el.children[2] as HTMLElement
                    el.style.opacity = o.toFixed(3)
                    dot.style.transform = `translate3d(${ax.toFixed(1)}px,${ay.toFixed(1)}px,0) translate(-50%,-50%)`
                    ln.style.transform = `translate3d(${(side > 0 ? ax : ax - len * o).toFixed(1)}px,${ay.toFixed(1)}px,0) scaleX(${(len * o).toFixed(1)})`
                    const slide = (1 - o) * 10 * side
                    tx.style.transform = `translate3d(${(colX + side * 0.012 * S + slide).toFixed(1)}px,${ay.toFixed(1)}px,0) translate(${side > 0 ? "0" : "-100%"},-50%)`
                    tx.style.textAlign = side > 0 ? "left" : "right"
                }
                const fsz = clamp(S * 0.031, 9, 40)
                box.style.fontSize = `${fsz.toFixed(2)}px`
            }

            if (!announced) {
                announced = true
                setReady(true)
            }
        }
        raf = requestAnimationFrame(frame)

        return () => {
            cancelAnimationFrame(raf)
            anims.forEach((a) => a.stop())
            host.removeEventListener("pointerenter", onEnter)
            host.removeEventListener("pointermove", onMove)
            host.removeEventListener("pointerleave", onLeave)
            host.removeEventListener("pointerdown", onDown)
            canvas.removeEventListener("webglcontextlost", onLost)
            canvas.removeEventListener("webglcontextrestored", onRestored)
            ro.disconnect()
            io?.disconnect()
            if (bakeFence) gl.deleteSync(bakeFence)
            built.forEach((b) => {
                b.mats.forEach((m) => m.dispose())
                if (b.seeds) b.seeds.dispose()
                if (b.drops) b.drops.dispose()
            })
            surfaces.forEach((s) => s.geo.dispose())
            dropGeo.dispose()
            onionGeo?.dispose()
            seedGeo.dispose()
            jobs.forEach((j) => {
                j.rt.dispose()
                j.nrt.dispose()
                j.mat.dispose()
            })
            normalMat.dispose()
            normalQuad.geometry.dispose()
            noiseTex.dispose()
            bakeQuadGeo.dispose()
            plane.dispose()
            blob.dispose()
            shadowMat.dispose()
            wideMat.dispose()
            env?.dispose()
            renderer.dispose()
            renderer.forceContextLoss()
            canvas.remove()
        }
    }, [gen])

    const famCss = fontFamilyCss(font)
    const f = { ...DEFAULT_FONT, ...font }
    const labelText: CSSProperties = {
        position: "absolute",
        left: 0,
        top: 0,
        whiteSpace: "nowrap",
        willChange: "transform",
        fontFamily: famCss,
        fontWeight: f.fontWeight,
        // italic only when the picker's variant says so ("Bold Italic"); a
        // stray fontStyle saved with a plain variant ("Bold") stays upright
        fontStyle: labelItalic(font) ? "italic" : "normal",
        letterSpacing: f.letterSpacing,
        lineHeight: 1.05,
        color: textColor,
    }
    const spot = clamp(num(adv.spotlight, DEFAULT_ADVANCED.spotlight), 0, 100) / 100

    return (
        <div
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                aspectRatio: `${REF_W} / ${REF_H}`,
                overflow: "hidden",
                background: spotlightCss(background, spot),
            }}
        >
            <div
                ref={hostRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: ready || staticMode ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    touchAction: "pan-y",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                }}
            >
                <div data-labels="" style={{ position: "absolute", inset: 0, pointerEvents: "none", fontSize: 24 }}>
                    {list.map((l, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                labelRefs.current[i] = el
                            }}
                            style={{ position: "absolute", inset: 0, opacity: 0 }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: "0.26em",
                                    height: "0.26em",
                                    borderRadius: "50%",
                                    border: `1px solid ${textColor}`,
                                    boxShadow: `0 0 0 0.12em rgba(0,0,0,0.25)`,
                                    background: "rgba(0,0,0,0.2)",
                                    willChange: "transform",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    width: 1,
                                    height: 1,
                                    background: textColor,
                                    opacity: 0.5,
                                    transformOrigin: "0 0",
                                    willChange: "transform",
                                }}
                            />
                            <div style={labelText}>
                                <div>{l.label}</div>
                                {l.note ? (
                                    <div
                                        style={{
                                            fontStyle: "normal",
                                            fontSize: "0.42em",
                                            letterSpacing: "0.22em",
                                            textTransform: "uppercase",
                                            opacity: 0.62,
                                            marginTop: "0.55em",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {l.note}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Control order arranged in the builder.

const __originkitPresetProps = {
  "background": "#000000",
  "textColor": "#f2eadf",
  "labels": true,
  "spacing": 5,
  "scale": 100,
  "explode": "hover",
  "parallax": 4,
  "spin": 3
};

export default function BriocheAloft(props: Record<string, unknown>) {
  return <__OriginkitBase_BriocheAloft {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
