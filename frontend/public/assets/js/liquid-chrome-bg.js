/**
 * LiquidChrome – Animated WebGL background (vanilla JS, zero dependencies)
 * Ported faithfully from the React Bits <LiquidChrome /> component.
 */
(function () {
  'use strict';

  var container = document.querySelector('.home-video-bg');
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
    container.style.background = '#0a0a0a';
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
    'precision highp float;\n' +
    'uniform float uTime;\n' +
    'uniform vec3 uResolution;\n' +
    'uniform vec3 uBaseColor;\n' +
    'uniform float uAmplitude;\n' +
    'uniform float uFrequencyX;\n' +
    'uniform float uFrequencyY;\n' +
    'uniform vec2 uMouse;\n' +
    'varying vec2 vUv;\n' +
    '\n' +
    'vec4 renderImage(vec2 uvCoord) {\n' +
    '    vec2 fragCoord = uvCoord * uResolution.xy;\n' +
    '    vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);\n' +
    '\n' +
    '    for (float i = 1.0; i < 10.0; i++){\n' +
    '        uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);\n' +
    '        uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);\n' +
    '    }\n' +
    '\n' +
    '    vec2 diff = (uvCoord - uMouse);\n' +
    '    float dist = length(diff);\n' +
    '    float falloff = exp(-dist * 20.0);\n' +
    '    float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;\n' +
    '    uv += (diff / (dist + 0.0001)) * ripple * falloff;\n' +
    '\n' +
    '    vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));\n' +
    '    return vec4(color, 1.0);\n' +
    '}\n' +
    '\n' +
    'void main() {\n' +
    '    vec4 col = vec4(0.0);\n' +
    '    int samples = 0;\n' +
    '    for (int i = -1; i <= 1; i++){\n' +
    '        for (int j = -1; j <= 1; j++){\n' +
    '            vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));\n' +
    '            col += renderImage(vUv + offset);\n' +
    '            samples++;\n' +
    '        }\n' +
    '    }\n' +
    '    gl_FragColor = col / float(samples);\n' +
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
    container.style.background = '#0a0a0a';
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
  var uRes = gl.getUniformLocation(prog, 'uResolution');
  var uMouse = gl.getUniformLocation(prog, 'uMouse');
  var uTime = gl.getUniformLocation(prog, 'uTime');
  var uBaseColor = gl.getUniformLocation(prog, 'uBaseColor');
  var uAmplitude = gl.getUniformLocation(prog, 'uAmplitude');
  var uFrequencyX = gl.getUniformLocation(prog, 'uFrequencyX');
  var uFrequencyY = gl.getUniformLocation(prog, 'uFrequencyY');

  /* ── Configuration ── */
  var baseColor = [0.12, 0.10, 0.18]; // Sleek dark purple/indigo chrome base instead of default flat grey
  var speed = 0.25;
  var amplitude = 0.35;
  var frequencyX = 3.0;
  var frequencyY = 3.0;

  var mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  /* ── Input Listeners ── */
  function onMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - rect.left) / rect.width;
    mouse.ty = 1.0 - ((e.clientY - rect.top) / rect.height);
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      var touch = e.touches[0];
      var rect = canvas.getBoundingClientRect();
      mouse.tx = (touch.clientX - rect.left) / rect.width;
      mouse.ty = 1.0 - ((touch.clientY - rect.top) / rect.height);
    }
  }

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('touchmove', onTouchMove);

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

  function render(now) {
    if (!running) return;
    raf = requestAnimationFrame(render);

    // Easing the mouse position
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    gl.clearColor(0.04, 0.02, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog);

    gl.uniform3f(uRes, canvas.width, canvas.height, canvas.width / canvas.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uTime, (now - startTime) * 0.001 * speed);
    gl.uniform3fv(uBaseColor, baseColor);
    gl.uniform1f(uAmplitude, amplitude);
    gl.uniform1f(uFrequencyX, frequencyX);
    gl.uniform1f(uFrequencyY, frequencyY);

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
      raf = requestAnimationFrame(render);
    }
  });
})();
