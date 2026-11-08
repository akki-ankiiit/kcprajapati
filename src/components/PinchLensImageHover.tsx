// Pinch Lens Image Hover by Made for Award: https://www.madeforaward.com/ui/interactions/pinch-lens-image-hover
// Free and open source (MIT). If it helped, a star means a lot: https://github.com/shivc868/madeforaward-ui

import { useEffect, useRef, useState } from "react";

export type PinchLensImageHoverProps = {
  /** the picture; it is drawn through WebGL, so it must allow CORS */
  src?: string;
  alt?: string;
  /** lens radius, as a share of the picture's width */
  lensRadius?: number;
  /** how hard the lens pinches (0–1) */
  lensStrength?: number;
  /** how far the diagonal sweep zooms the picture in (0–0.3) */
  zoom?: number;
  /** seconds the sweep takes to cross the picture */
  sweepDuration?: number;
  /** fill the parent instead of holding a portrait frame */
  fill?: boolean;
  className?: string;
};

const DEFAULT_SRC =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80&auto=format&fit=crop";

const OVERSCAN = 1.1; // the picture is drawn larger than its frame, so the zoom never shows an edge

const VERTEX = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = vec2(aPosition.x * 0.5 + 0.5, 0.5 - aPosition.y * 0.5);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// Two passes in one. First a diagonal sweep: a band runs from the top-left
// corner to the bottom-right as uProgress goes -1 → 1, and behind it the
// picture sits zoomed in, with a slightly deeper ridge on the band itself.
// Then a pinch lens round the pointer (in pixels): inside the radius the
// picture is sampled further out, so it shrinks toward the centre, fading
// to nothing at the rim.
const FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform vec2 uBox;
uniform vec2 uTexture;
uniform float uProgress;
uniform float uZoom;
uniform vec3 uLens;
uniform float uRadius;
in vec2 vUv;
out vec4 outColor;

void main() {
  vec2 d = vUv - 0.5;
  float u = (d.x + d.y) * 0.70710678 + 0.5 - uProgress;
  float y = min(0.3 * (1.68 - smoothstep(0.18, 0.492, u)) + smoothstep(0.34, 0.896, u), 1.0);
  vec2 uv = d * (1.0 - uZoom * (1.0 - y)) + 0.5;

  vec2 c = uv * uBox - uLens.xy;
  float dist = length(c);
  if (uLens.z > 0.0 && dist < uRadius) {
    float pct = max(dist / uRadius, 1e-4);
    c *= mix(1.0, pow(pct, -uLens.z * 0.75), 1.0 - pct);
  }
  uv = (c + uLens.xy) / uBox;

  // Cover the frame, with the overscan.
  float box = uBox.x / uBox.y, tex = uTexture.x / uTexture.y;
  vec2 fit = box > tex ? vec2(1.0, tex / box) : vec2(box / tex, 1.0);
  uv = (uv - 0.5) * fit / ${OVERSCAN.toFixed(2)} + 0.5;
  outColor = vec4(texture(uImage, uv).rgb, 1.0);
}`;

// Hovering the picture sends a slow diagonal zoom across it and drops a
// pinch lens under the pointer that trails it by about a second; leaving
// plays it back. One fullscreen-triangle shader on WebGL2 (with the plain
// image underneath until it loads, or if WebGL isn't there); it only
// renders while something is moving.
export default function PinchLensImageHover({
  src = DEFAULT_SRC,
  alt = "",
  lensRadius = 0.23,
  lensStrength = 0.3,
  zoom = 0.1,
  sweepDuration = 5,
  fill = false,
  className = "",
}: PinchLensImageHoverProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, depth: false, stencil: false });
    if (!box || !canvas || !gl) return;

    const program = link(gl);
    if (!program) return;
    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const u = {
      box: uniform("uBox"),
      texture: uniform("uTexture"),
      progress: uniform("uProgress"),
      lens: uniform("uLens"),
      radius: uniform("uRadius"),
    };
    gl.useProgram(program);
    const vao = gl.createVertexArray();
    const buffer = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uniform("uZoom"), zoom);
    const texture = gl.createTexture();

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ratio = 1;
    let loaded = false;
    // Tweens: the lens strength (0.5s) and the sweep (-1 → 1); the lens
    // centre eases toward the pointer, a second behind it.
    const strength = tween(0);
    const sweep = tween(-1);
    const lens = { x: 0, y: 0, tx: 0, ty: 0 };
    let over = false;
    let raf = 0;
    let last = 0;

    const draw = () => {
      if (!loaded) return;
      const now = performance.now();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u.box, canvas.width, canvas.height);
      gl.uniform1f(u.radius, lensRadius * canvas.width);
      gl.uniform1f(u.progress, sweep.at(now));
      gl.uniform3f(u.lens, lens.x * ratio, lens.y * ratio, strength.at(now) * lensStrength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(now - last, 50) / 1000 : 0;
      last = now;
      const ease = 1 - Math.exp(-dt * 4);
      lens.x += (lens.tx - lens.x) * ease;
      lens.y += (lens.ty - lens.y) * ease;
      draw();
      const settled = Math.abs(lens.tx - lens.x) + Math.abs(lens.ty - lens.y) < 0.2;
      if (over || !strength.done(now) || !sweep.done(now) || !settled) raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(u.texture, image.naturalWidth, image.naturalHeight);
      loaded = true;
      draw();
      setReady(true);
    };
    image.src = src;

    const point = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      lens.tx = e.clientX - r.left;
      lens.ty = e.clientY - r.top;
    };
    const onEnter = (e: PointerEvent) => {
      point(e);
      // The lens starts where the pointer came in, then trails it.
      lens.x = lens.tx;
      lens.y = lens.ty;
      over = true;
      if (still) return;
      strength.to(1, 0.5);
      sweep.to(1, sweepDuration);
      wake();
    };
    const onLeave = () => {
      over = false;
      if (still) return;
      strength.to(0, 0.5);
      sweep.to(-1, sweepDuration);
      wake();
    };
    const onMove = (e: PointerEvent) => {
      point(e);
      if (!still) wake();
    };
    box.addEventListener("pointerenter", onEnter);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointermove", onMove);

    const ro = new ResizeObserver(() => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(box.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(box.clientHeight * ratio));
      draw();
    });
    ro.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      box.removeEventListener("pointerenter", onEnter);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointermove", onMove);
      image.onload = null;
      // Keep the context (a canvas hands the same one back on remount).
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [src, lensRadius, lensStrength, zoom, sweepDuration]);

  return (
    <div
      className={`@container relative grid h-full w-full place-items-center overflow-hidden select-none ${className}`}
    >
      {/* 70% of the box tall at 543 × 800, or narrower on tall boxes. */}
      <div
        ref={boxRef}
        className={
          fill
            ? "relative h-full w-full overflow-hidden"
            : "relative aspect-[543/800] h-[min(70cqh,91cqw)] overflow-hidden"
        }
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`absolute inset-0 block h-full w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}

// A value that eases out toward a target over a set time.
function tween(value: number) {
  let from = value;
  let target = value;
  let start = 0;
  let seconds = 0;
  const progress = (now: number) => (seconds ? Math.min(1, (now - start) / (seconds * 1000)) : 1);
  const at = (now: number) => from + (target - from) * (1 - Math.pow(1 - progress(now), 3));
  return {
    at,
    done: (now: number) => progress(now) >= 1,
    to(next: number, duration: number) {
      const now = performance.now();
      from = at(now);
      target = next;
      start = now;
      seconds = duration;
    },
  };
}

function link(gl: WebGL2RenderingContext) {
  const program = gl.createProgram()!;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}
