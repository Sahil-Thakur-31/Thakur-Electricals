"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Float, Sphere, Cylinder, Torus } from "@react-three/drei";
import * as THREE from "three";
import { StaticBulb } from "./static-bulb";

function useBrandColors() {
  return React.useMemo(
    () => ({
      brand: new THREE.Color("#ff8a2a"),
      glow: new THREE.Color("#ffb35a"),
      gold: new THREE.Color("#d9a35a"),
      glass: new THREE.Color("#fff7ea"),
    }),
    []
  );
}

function Filament() {
  const colors = useBrandColors();
  const materialRef = React.useRef<THREE.MeshStandardMaterial>(null);
  const lightRef = React.useRef<THREE.PointLight>(null);
  const curve = React.useMemo(() => {
    const pts = [
      new THREE.Vector3(0, -0.32, 0),
      new THREE.Vector3(-0.22, -0.1, 0.05),
      new THREE.Vector3(0.22, 0.14, -0.05),
      new THREE.Vector3(-0.2, 0.38, 0.05),
      new THREE.Vector3(0.1, 0.58, 0),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.4);
  }, []);

  // Pure brightness pulse — a material property, not a transform, so it can
  // never shift the bulb's on-screen size the way rotation could. This is
  // the one animation that always runs, reduced-motion or not: it's a
  // small, slow glow flicker, not the kind of motion that setting is for.
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 2.9 + Math.sin(t * 1.8) * 0.5;
    if (materialRef.current) materialRef.current.emissiveIntensity = pulse;
    if (lightRef.current) lightRef.current.intensity = 7.5 + Math.sin(t * 1.8) * 1.8;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.022, 8, false]} />
        <meshStandardMaterial
          ref={materialRef}
          color={colors.brand}
          emissive={colors.brand}
          emissiveIntensity={3.2}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 0.15, 0]}
        color="#ffb35a"
        intensity={5.5}
        distance={5}
        decay={2}
      />
    </group>
  );
}

function Bulb() {
  const colors = useBrandColors();

  return (
    <group>
      {/* Glass globe — only a faint tint of its own; the light inside should
          read as coming from the filament's point light hitting the glass
          from within, not from the glass itself being uniformly emissive. */}
      <Sphere args={[1, 64, 64]} position={[0, 0.65, 0]} scale={[0.95, 1.05, 0.95]}>
        <meshStandardMaterial
          color={colors.glass}
          emissive={colors.glow}
          emissiveIntensity={0.06}
          roughness={0.15}
          metalness={0}
          transparent
          opacity={0.5}
        />
      </Sphere>

      <Filament />

      {/* Frosted neck connecting glass to base */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.42, 0.5, 0.26, 32]} />
        <meshStandardMaterial
          color="#f6d9a8"
          emissive="#ff8a2a"
          emissiveIntensity={0.3}
          roughness={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Brass screw base */}
      <Cylinder args={[0.4, 0.44, 0.58, 28]} position={[0, -0.74, 0]}>
        <meshStandardMaterial color={colors.gold} metalness={0.9} roughness={0.32} />
      </Cylinder>
      {[0, 1, 2].map((i) => (
        <Torus
          key={i}
          args={[0.415, 0.028, 10, 32]}
          position={[0, -0.55 - i * 0.16, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color={colors.gold} metalness={0.9} roughness={0.4} />
        </Torus>
      ))}
      <mesh position={[0, -1.07, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.06, 28]} />
        <meshStandardMaterial color="#8a6a3c" metalness={0.8} roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Fires once the canvas has actually produced a handful of real frames — a
 *  much stronger "it's working" signal than onCreated, which only confirms
 *  the context was constructed, not that anything is visibly drawing. */
function RenderConfirm({ onConfirmed }: { onConfirmed: () => void }) {
  const frames = React.useRef(0);
  const firedRef = React.useRef(false);
  useFrame(() => {
    if (firedRef.current) return;
    frames.current += 1;
    if (frames.current > 6) {
      firedRef.current = true;
      onConfirmed();
    }
  });
  return null;
}

function Scene({
  reducedMotion,
  isDark,
  onConfirmed,
}: {
  reducedMotion: boolean;
  isDark: boolean;
  onConfirmed: () => void;
}) {
  const { size } = useThree();
  // A single one-time breakpoint check, not a continuous width/height-driven
  // formula — the previous version recalculated scale on every resize
  // observer tick, and any layout reflow (webfont swap, scrollbar, etc.)
  // could nudge it mid-session, which is what read as "randomly enlarging."
  // Fixed scale/position per breakpoint, never recalculated mid-session.
  const isDesktop = size.width >= 1024;
  const scale = size.width < 640 ? 0.85 : isDesktop ? 1.3 : 1.25;
  // Desktop: beside the (left-aligned) text, like the two-column layout
  // calls for. Below that breakpoint the text is centered and stacked on
  // top, so the bulb sits low and centered, behind/under the content.
  const groupPosition: [number, number, number] = isDesktop
    ? [2.7, -0.7, -2]
    : [0, -4.4, -2];

  // No rotation anywhere in this scene, ever — a rotating off-center shape
  // under a perspective camera genuinely changes apparent size as it turns,
  // which read as "the bulb keeps growing." A vertical-only bob can't do
  // that (distance from camera doesn't change), so that's all this uses.
  // It stays on regardless of reduced-motion: it's a few px of drift and a
  // slow glow pulse, not the kind of motion that preference is meant to stop.
  return (
    <>
      <RenderConfirm onConfirmed={onConfirmed} />
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 4]} intensity={9} color="#fff3e0" />
      <pointLight position={[-3, -1, -2]} intensity={6} color="#ffb35a" />
      <pointLight position={[0, 2.5, 2]} intensity={4} color="#ffe3b3" />

      <group scale={scale} position={groupPosition}>
        <Float speed={1.3} rotationIntensity={0} floatIntensity={reducedMotion ? 0.08 : 0.25}>
          <Bulb />
        </Float>
        {/* White sparkles glow beautifully against a dark backdrop, but on a
            light page they have nothing to contrast against and read as
            hollow rings — so light mode gets a saturated amber instead. */}
        <Sparkles
          count={45}
          scale={4}
          size={5}
          speed={0.25}
          color={isDark ? "#fff2cc" : "#ff8a2a"}
          opacity={1}
        />
      </group>
    </>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  React.useEffect(() => {
    camera.position.set(0, 0.1, 11);
  }, [camera]);
  return null;
}

class WebGLBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D hero scene unavailable, showing fallback.", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * The static SVG bulb is a permanent backdrop layer — it never gets hidden
 * or faded based on whether WebGL "succeeded", because privacy-hardened
 * browsers (e.g. Brave Shields) can let a WebGL context construct cleanly
 * and then silently render nothing, with no catchable error to react to.
 * The live canvas sits on top with a transparent background: when 3D
 * actually draws, it visually covers the static bulb beneath it; when it
 * doesn't, the static bulb was there all along. The hero is never blank.
 */
const MAX_ATTEMPTS = 3;

export function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [canvasFailed, setCanvasFailed] = React.useState(() => !hasWebGL());
  const [confirmed, setConfirmed] = React.useState(false);
  // "Reload fixes it" is the signature of a one-time GPU/context negotiation
  // race on cold start (common on hybrid-GPU laptops), not a hard
  // incompatibility — so instead of giving up permanently on the first
  // failed attempt, remount the canvas a couple of times first. This
  // automates exactly what a manual page reload was doing.
  const [attempt, setAttempt] = React.useState(0);
  // Give the live canvas a head start before falling back to the static
  // bulb — if 3D confirms within this window (the common case), the static
  // illustration never appears at all, so there's nothing to swap and
  // nothing to flicker. Generous, since a cold GPU process can genuinely
  // take a second or two to produce its first frame.
  const [graceExpired, setGraceExpired] = React.useState(false);

  // Shared by the startup watchdog and a mid-session context loss: bump the
  // attempt counter (remounting the canvas fresh) unless we've already used
  // up our retries, in which case give up for good. A context can die well
  // after it initially worked (driver reset, GPU memory pressure, tab
  // backgrounding) — that's a different failure from a slow cold start, but
  // it deserves the same "try again before giving up" treatment, not an
  // immediate permanent fallback.
  const retry = React.useCallback(() => {
    setConfirmed(false);
    setAttempt((a) => {
      if (a + 1 >= MAX_ATTEMPTS) {
        setCanvasFailed(true);
        return a;
      }
      setGraceExpired(false);
      return a + 1;
    });
  }, []);

  React.useEffect(() => {
    if (canvasFailed || confirmed) return;
    const graceTimer = window.setTimeout(() => setGraceExpired(true), 900);
    const retryTimer = window.setTimeout(retry, 3200);
    return () => {
      window.clearTimeout(graceTimer);
      window.clearTimeout(retryTimer);
    };
  }, [canvasFailed, confirmed, attempt, retry]);

  const showStatic = canvasFailed || (!confirmed && graceExpired);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <StaticBulb
        className={
          showStatic
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0 transition-opacity duration-1000"
        }
      />

      {!canvasFailed && (
        <WebGLBoundary key={attempt} fallback={null}>
          <Canvas
            dpr={[1, 1.75]}
            // "default" (not "high-performance") avoids forcing a discrete-
            // GPU handoff on hybrid-graphics laptops — that negotiation can
            // race or stall on a cold start, which is exactly the kind of
            // thing a reload "fixes" by giving it a second, cleaner attempt.
            gl={{ antialias: true, alpha: true, powerPreference: "default" }}
            camera={{ fov: 26, position: [0, 0.1, 11] }}
            onCreated={({ gl }) => {
              // preventDefault() tells the browser we intend to recover —
              // without it the context is lost for good. retry() remounts
              // the canvas fresh, which is how that recovery actually
              // happens (R3F doesn't re-upload GPU resources into a
              // restored context on its own).
              gl.domElement.addEventListener("webglcontextlost", (e) => {
                e.preventDefault();
                retry();
              });
            }}
          >
            <CameraSetup />
            <React.Suspense fallback={null}>
              <Scene
                reducedMotion={reducedMotion}
                isDark={isDark}
                onConfirmed={() => setConfirmed(true)}
              />
            </React.Suspense>
          </Canvas>
        </WebGLBoundary>
      )}
    </div>
  );
}
