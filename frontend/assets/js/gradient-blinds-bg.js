/**
 * GradientBlinds – Animated WebGL background (vanilla JS, zero dependencies)
 * Ported faithfully from the React Bits <GradientBlinds /> component.
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

  var gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true
  }) || canvas.getContext('experimental-webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true
  });

  if (!gl) {
    container.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#2a0a2f 50%,#0a0a0a 100%)';
    return;
  }

  /* ── Shaders ── */
  var VERT =
    'attribute vec2 position;\n' +
    'attribute vec2 uv;\n' +
    'varying vec2 vUv;\n' +
    'void main() {\n' +
    '  vUv = uv;\n' +
    '  gl_Position = vec4(position, 0.0, 1.0);\n' +
    '}\n';

  var FRAG =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    '\n' +
    'uniform vec3  iResolution;\n' +
    'uniform vec2  iMouse;\n' +
    'uniform float iTime;\n' +
    '\n' +
    'uniform float uAngle;\n' +
    'uniform float uNoise;\n' +
    'uniform float uBlindCount;\n' +
    'uniform float uSpotlightRadius;\n' +
    'uniform float uSpotlightSoftness;\n' +
    'uniform float uSpotlightOpacity;\n' +
    'uniform float uMirror;\n' +
    'uniform float uDistort;\n' +
    'uniform float uShineFlip;\n' +
    'uniform vec3  uColor0;\n' +
    'uniform vec3  uColor1;\n' +
    'uniform vec3  uColor2;\n' +
    'uniform vec3  uColor3;\n' +
    'uniform vec3  uColor4;\n' +
    'uniform vec3  uColor5;\n' +
    'uniform vec3  uColor6;\n' +
    'uniform vec3  uColor7;\n' +
    'uniform int   uColorCount;\n' +
    '\n' +
    'varying vec2 vUv;\n' +
    '\n' +
    'float rand(vec2 co){\n' +
    '  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);\n' +
    '}\n' +
    '\n' +
    'vec2 rotate2D(vec2 p, float a){\n' +
    '  float c = cos(a);\n' +
    '  float s = sin(a);\n' +
    '  return mat2(c, -s, s, c) * p;\n' +
    '}\n' +
    '\n' +
    'vec3 getGradientColor(float t){\n' +
    '  float tt = clamp(t, 0.0, 1.0);\n' +
    '  int count = uColorCount;\n' +
    '  if (count < 2) count = 2;\n' +
    '  float scaled = tt * float(count - 1);\n' +
    '  float seg = floor(scaled);\n' +
    '  float f = fract(scaled);\n' +
    '\n' +
    '  if (seg < 1.0) return mix(uColor0, uColor1, f);\n' +
    '  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);\n' +
    '  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);\n' +
    '  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f); \n' +
    '  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);\n' +
    '  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);\n' +
    '  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);\n' +
    '  if (count > 7) return uColor7;\n' +
    '  if (count > 6) return uColor6;\n' +
    '  if (count > 5) return uColor5;\n' +
    '  if (count > 4) return uColor4;\n' +
    '  if (count > 3) return uColor3;\n' +
    '  if (count > 2) return uColor2;\n' +
    '  return uColor1;\n' +
    '}\n' +
    '\n' +
    'void mainImage( out vec4 fragColor, in vec2 fragCoord )\n' +
    '{\n' +
    '    vec2 uv0 = fragCoord.xy / iResolution.xy;\n' +
    '\n' +
    '    float aspect = iResolution.x / iResolution.y;\n' +
    '    vec2 p = uv0 * 2.0 - 1.0;\n' +
    '    p.x *= aspect;\n' +
    '    vec2 pr = rotate2D(p, uAngle);\n' +
    '    pr.x /= aspect;\n' +
    '    vec2 uv = pr * 0.5 + 0.5;\n' +
    '\n' +
    '    vec2 uvMod = uv;\n' +
    '    if (uDistort > 0.0) {\n' +
    '      float a = uvMod.y * 6.0;\n' +
    '      float b = uvMod.x * 6.0;\n' +
    '      float w = 0.01 * uDistort;\n' +
    '      uvMod.x += sin(a) * w;\n' +
    '      uvMod.y += cos(b) * w;\n' +
    '    }\n' +
    '    float t = uvMod.x;\n' +
    '    if (uMirror > 0.5) {\n' +
    '      t = 1.0 - abs(1.0 - 2.0 * fract(t));\n' +
    '    }\n' +
    '    vec3 base = getGradientColor(t);\n' +
    '\n' +
    '    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);\n' +
    '    float d = length(uv0 - offset);\n' +
    '    float r = max(uSpotlightRadius, 1e-4);\n' +
    '    float dn = d / r;\n' +
    '    float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;\n' +
    '    vec3 cir = vec3(spot);\n' +
    '    float stripe = fract(uvMod.x * max(uBlindCount, 1.0));\n' +
    '    if (uShineFlip > 0.5) stripe = 1.0 - stripe;\n' +
    '    vec3 ran = vec3(stripe);\n' +
    '\n' +
    '    vec3 col = cir + base - ran;\n' +
    '    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;\n' +
    '\n' +
    '    fragColor = vec4(col, 1.0);\n' +
    '}\n' +
    '\n' +
    'void main() {\n' +
    '    vec4 color;\n' +
    '    mainImage(color, vUv * iResolution.xy);\n' +
    '    gl_FragColor = color;\n' +
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
    container.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#2a0a2f 50%,#0a0a0a 100%)';
    return;
  }

  gl.useProgram(prog);

  /* ── Geometry Setup (Full screen single triangle) ── */
  var vertices = new Float32Array([
    -1.0, -1.0,  0.0, 0.0,
     3.0, -1.0,  2.0, 0.0,
    -1.0,  3.0,  0.0, 2.0
  ]);
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(prog, 'position');
  var uvLoc = gl.getAttribLocation(prog, 'uv');

  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);

  gl.enableVertexAttribArray(uvLoc);
  gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

  /* ── Uniform locations ──────────────────────────────────── */
  var uRes = gl.getUniformLocation(prog, 'iResolution');
  var uMouse = gl.getUniformLocation(prog, 'iMouse');
  var uTime = gl.getUniformLocation(prog, 'iTime');
  var uAngle = gl.getUniformLocation(prog, 'uAngle');
  var uNoise = gl.getUniformLocation(prog, 'uNoise');
  var uBlindCount = gl.getUniformLocation(prog, 'uBlindCount');
  var uSpotlightRadius = gl.getUniformLocation(prog, 'uSpotlightRadius');
  var uSpotlightSoftness = gl.getUniformLocation(prog, 'uSpotlightSoftness');
  var uSpotlightOpacity = gl.getUniformLocation(prog, 'uSpotlightOpacity');
  var uMirror = gl.getUniformLocation(prog, 'uMirror');
  var uDistort = gl.getUniformLocation(prog, 'uDistort');
  var uShineFlip = gl.getUniformLocation(prog, 'uShineFlip');

  var uColor0 = gl.getUniformLocation(prog, 'uColor0');
  var uColor1 = gl.getUniformLocation(prog, 'uColor1');
  var uColor2 = gl.getUniformLocation(prog, 'uColor2');
  var uColor3 = gl.getUniformLocation(prog, 'uColor3');
  var uColor4 = gl.getUniformLocation(prog, 'uColor4');
  var uColor5 = gl.getUniformLocation(prog, 'uColor5');
  var uColor6 = gl.getUniformLocation(prog, 'uColor6');
  var uColor7 = gl.getUniformLocation(prog, 'uColor7');
  var uColorCount = gl.getUniformLocation(prog, 'uColorCount');

  /* ── Configuration ── */
  var colorsHex = ['#FF9FFC', '#5227FF']; // standard brand gradient (magenta + indigo)
  var MAX_COLORS = 8;
  
  function hexToRGB(hex) {
    var c = hex.replace('#', '').padEnd(6, '0');
    var r = parseInt(c.slice(0, 2), 16) / 255;
    var g = parseInt(c.slice(2, 4), 16) / 255;
    var b = parseInt(c.slice(4, 6), 16) / 255;
    return [r, g, b];
  }

  var base = colorsHex.slice(0, MAX_COLORS);
  if (base.length === 1) base.push(base[0]);
  while (base.length < MAX_COLORS) base.push(base[base.length - 1]);
  
  var colorArr = [];
  for (var i = 0; i < MAX_COLORS; i++) {
    colorArr.push(hexToRGB(base[i]));
  }
  var colorCount = Math.max(2, Math.min(MAX_COLORS, colorsHex.length));

  var angle = 0;
  var noise = 0.3;
  var blindCount = 12;
  var blindMinWidth = 50;
  var spotlightRadius = 0.5;
  var spotlightSoftness = 1.0;
  var spotlightOpacity = 1.0;
  var mirrorGradient = false;
  var distortAmount = 0.0;
  var shineDirection = 'left';
  var mouseDampening = 0.15;

  var mouseTarget = [0, 0];
  var currentMouse = [0, 0];
  var firstMove = true;

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

    if (blindMinWidth > 0) {
      var maxByMinWidth = Math.max(1, Math.floor(w / blindMinWidth));
      var effectiveBlinds = Math.min(blindCount, maxByMinWidth);
      gl.useProgram(prog);
      gl.uniform1f(uBlindCount, Math.max(1.0, effectiveBlinds));
    } else {
      gl.useProgram(prog);
      gl.uniform1f(uBlindCount, Math.max(1.0, blindCount));
    }

    if (firstMove) {
      firstMove = false;
      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      mouseTarget = [cx, cy];
      currentMouse = [cx, cy];
    }
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Mouse move ─────────────────────────────────────────── */
  window.addEventListener('pointermove', function (e) {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var x = (e.clientX - rect.left) * dpr;
    var y = (rect.height - (e.clientY - rect.top)) * dpr;
    mouseTarget = [x, y];
    if (mouseDampening <= 0) {
      currentMouse = [x, y];
    }
  });

  /* ── Render loop ────────────────────────────────────────── */
  var raf;
  var startTime = performance.now();
  var lastTime = startTime;
  var running = true;

  function render(now) {
    if (!running) return;
    raf = requestAnimationFrame(render);

    var dt = (now - lastTime) / 1000.0;
    lastTime = now;

    if (mouseDampening > 0) {
      var tau = Math.max(1e-4, mouseDampening);
      var factor = 1 - Math.exp(-dt / tau);
      if (factor > 1) factor = 1;
      currentMouse[0] += (mouseTarget[0] - currentMouse[0]) * factor;
      currentMouse[1] += (mouseTarget[1] - currentMouse[1]) * factor;
    }

    gl.clearColor(0.04, 0.02, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog);
    gl.uniform3f(uRes, canvas.width, canvas.height, 1.0);
    gl.uniform2f(uMouse, currentMouse[0], currentMouse[1]);
    gl.uniform1f(uTime, (now - startTime) / 1000.0);
    gl.uniform1f(uAngle, (angle * Math.PI) / 180.0);
    gl.uniform1f(uNoise, noise);
    gl.uniform1f(uSpotlightRadius, spotlightRadius);
    gl.uniform1f(uSpotlightSoftness, spotlightSoftness);
    gl.uniform1f(uSpotlightOpacity, spotlightOpacity);
    gl.uniform1f(uMirror, mirrorGradient ? 1.0 : 0.0);
    gl.uniform1f(uDistort, distortAmount);
    gl.uniform1f(uShineFlip, shineDirection === 'right' ? 1.0 : 0.0);

    gl.uniform3fv(uColor0, colorArr[0]);
    gl.uniform3fv(uColor1, colorArr[1]);
    gl.uniform3fv(uColor2, colorArr[2]);
    gl.uniform3fv(uColor3, colorArr[3]);
    gl.uniform3fv(uColor4, colorArr[4]);
    gl.uniform3fv(uColor5, colorArr[5]);
    gl.uniform3fv(uColor6, colorArr[6]);
    gl.uniform3fv(uColor7, colorArr[7]);
    gl.uniform1i(uColorCount, colorCount);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
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
      lastTime = performance.now();
      raf = requestAnimationFrame(render);
    }
  });
})();
