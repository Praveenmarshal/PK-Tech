/**
 * Lightning – Animated WebGL background (vanilla JS, zero dependencies)
 * Ported faithfully from the React Bits <Lightning /> component.
 */
(function () {
  'use strict';

  var container = document.querySelector('.pages-video-bg');
  if (!container) return;

  // Remove ALL children (videos, sources, etc)
  while (container.firstChild) container.removeChild(container.firstChild);

  /* ── Canvas ─────────────────────────────────────────────── */
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  container.appendChild(canvas);

  // Use webgl1 for max compatibility as defined in the original component
  var gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
    powerPreference: 'default'
  }) || canvas.getContext('experimental-webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true
  });

  if (!gl) {
    container.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#051033 50%,#0a0a0a 100%)';
    return;
  }

  /* ── Shaders ── */
  var VERT =
    'attribute vec2 aPosition;\n' +
    'void main() {\n' +
    '  gl_Position = vec4(aPosition, 0.0, 1.0);\n' +
    '}\n';

  var FRAG =
    'precision mediump float;\n' +
    'uniform vec2 iResolution;\n' +
    'uniform float iTime;\n' +
    'uniform float uHue;\n' +
    'uniform float uXOffset;\n' +
    'uniform float uSpeed;\n' +
    'uniform float uIntensity;\n' +
    'uniform float uSize;\n' +
    '\n' +
    '#define OCTAVE_COUNT 10\n' +
    '\n' +
    'vec3 hsv2rgb(vec3 c) {\n' +
    '    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);\n' +
    '    return c.z * mix(vec3(1.0), rgb, c.y);\n' +
    '}\n' +
    '\n' +
    'float hash11(float p) {\n' +
    '    p = fract(p * .1031);\n' +
    '    p *= p + 33.33;\n' +
    '    p *= p + p;\n' +
    '    return fract(p);\n' +
    '}\n' +
    '\n' +
    'float hash12(vec2 p) {\n' +
    '    vec3 p3 = fract(vec3(p.xyx) * .1031);\n' +
    '    p3 += dot(p3, p3.yzx + 33.33);\n' +
    '    return fract((p3.x + p3.y) * p3.z);\n' +
    '}\n' +
    '\n' +
    'mat2 rotate2d(float theta) {\n' +
    '    float c = cos(theta);\n' +
    '    float s = sin(theta);\n' +
    '    return mat2(c, -s, s, c);\n' +
    '}\n' +
    '\n' +
    'float noise(vec2 p) {\n' +
    '    vec2 ip = floor(p);\n' +
    '    vec2 fp = fract(p);\n' +
    '    float a = hash12(ip);\n' +
    '    float b = hash12(ip + vec2(1.0, 0.0));\n' +
    '    float c = hash12(ip + vec2(0.0, 1.0));\n' +
    '    float d = hash12(ip + vec2(1.0, 1.0));\n' +
    '    \n' +
    '    vec2 t = smoothstep(0.0, 1.0, fp);\n' +
    '    return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);\n' +
    '}\n' +
    '\n' +
    'float fbm(vec2 p) {\n' +
    '    float value = 0.0;\n' +
    '    float amplitude = 0.5;\n' +
    '    for (int i = 0; i < OCTAVE_COUNT; ++i) {\n' +
    '        value += amplitude * noise(p);\n' +
    '        p *= rotate2d(0.45);\n' +
    '        p *= 2.0;\n' +
    '        amplitude *= 0.5;\n' +
    '    }\n' +
    '    return value;\n' +
    '}\n' +
    '\n' +
    'void mainImage( out vec4 fragColor, in vec2 fragCoord ) {\n' +
    '    vec2 uv = fragCoord / iResolution.xy;\n' +
    '    uv = 2.0 * uv - 1.0;\n' +
    '    uv.x *= iResolution.x / iResolution.y;\n' +
    '    uv.x += uXOffset;\n' +
    '    \n' +
    '    uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;\n' +
    '    \n' +
    '    float dist = abs(uv.x);\n' +
    '    vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));\n' +
    '    vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;\n' +
    '    col = pow(col, vec3(1.0));\n' +
    '    float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);\n' +
    '    fragColor = vec4(col, a);\n' +
    '}\n' +
    '\n' +
    'void main() {\n' +
    '    mainImage(gl_FragColor, gl_FragCoord.xy);\n' +
    '}\n';

  /* ── Compile + link helper ──────────────────────────────── */
  function makeShader(src, type) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function makeProgram(vertSrc, fragSrc) {
    var vs = makeShader(vertSrc, gl.VERTEX_SHADER);
    if (!vs) return null;
    var fs = makeShader(fragSrc, gl.FRAGMENT_SHADER);
    if (!fs) { gl.deleteShader(vs); return null; }
    var p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(p));
      gl.deleteProgram(p);
      return null;
    }
    return p;
  }

  var prog = makeProgram(VERT, FRAG);
  if (!prog) {
    container.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#051033 50%,#0a0a0a 100%)';
    return;
  }

  gl.useProgram(prog);

  /* ── Geometry Setup ── */
  var vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var aPosition = gl.getAttribLocation(prog, 'aPosition');
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  /* ── Uniform locations ──────────────────────────────────── */
  var uRes = gl.getUniformLocation(prog, 'iResolution');
  var uTime = gl.getUniformLocation(prog, 'iTime');
  var uHue = gl.getUniformLocation(prog, 'uHue');
  var uXOffset = gl.getUniformLocation(prog, 'uXOffset');
  var uSpeed = gl.getUniformLocation(prog, 'uSpeed');
  var uIntensity = gl.getUniformLocation(prog, 'uIntensity');
  var uSize = gl.getUniformLocation(prog, 'uSize');

  /* ── Resize ─────────────────────────────────────────────── */
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = container.clientWidth  || window.innerWidth;
    var h = container.clientHeight || window.innerHeight;
    if (w < 1) w = window.innerWidth;
    if (h < 1) h = window.innerHeight;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Render loop ────────────────────────────────────────── */
  var raf;
  var startTime = performance.now();
  var running = true;

  // Render configuration matching the requested style/vibe
  var hue = 220; // default hue from prompt example
  var xOffset = 0;
  var speed = 1.0;
  var intensity = 1.0;
  var size = 1.0;

  function render(now) {
    if (!running) return;
    raf = requestAnimationFrame(render);

    gl.clearColor(0.04, 0.02, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - startTime) / 1000.0);
    gl.uniform1f(uHue, hue);
    gl.uniform1f(uXOffset, xOffset);
    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uIntensity, intensity);
    gl.uniform1f(uSize, size);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  raf = requestAnimationFrame(render);

  /* ── Pause when tab hidden ──────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else {
      running = true;
      startTime = performance.now();
      raf = requestAnimationFrame(render);
    }
  });
})();
