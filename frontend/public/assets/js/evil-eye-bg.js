/**
 * EvilEye – Animated WebGL background (vanilla JS, zero dependencies)
 * Ported faithfully from the React Bits <EvilEye /> component.
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
    container.style.background = '#030204';
    return;
  }

  /* ── Noise Texture Generator ── */
  function generateNoiseTexture(size) {
    var data = new Uint8Array(size * size * 4);

    function hash(x, y, s) {
      var n = x * 374761393 + y * 668265263 + s * 1274126177;
      n = Math.imul(n ^ (n >>> 13), 1274126177);
      return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
    }

    function noise(px, py, freq, seed) {
      var fx = (px / size) * freq;
      var fy = (py / size) * freq;
      var ix = Math.floor(fx);
      var iy = Math.floor(fy);
      var tx = fx - ix;
      var ty = fy - iy;
      var w = freq | 0;
      var v00 = hash(((ix % w) + w) % w, ((iy % w) + w) % w, seed);
      var v10 = hash((((ix + 1) % w) + w) % w, ((iy % w) + w) % w, seed);
      var v01 = hash(((ix % w) + w) % w, (((iy + 1) % w) + w) % w, seed);
      var v11 = hash((((ix + 1) % w) + w) % w, (((iy + 1) % w) + w) % w, seed);
      return v00 * (1 - tx) * (1 - ty) + v10 * tx * (1 - ty) + v01 * (1 - tx) * ty + v11 * tx * ty;
    }

    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var v = 0;
        var amp = 0.4;
        var totalAmp = 0;
        for (var o = 0; o < 8; o++) {
          var f = 32 * (1 << o);
          v += amp * noise(x, y, f, o * 31);
          totalAmp += amp;
          amp *= 0.65;
        }
        v /= totalAmp;
        v = (v - 0.5) * 2.2 + 0.5;
        v = Math.max(0, Math.min(1, v));
        var val = Math.round(v * 255);
        var i = (y * size + x) * 4;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
    }
    return data;
  }

  var noiseData = generateNoiseTexture(256);
  var noiseTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noiseData);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

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
    'uniform sampler2D uNoiseTexture;\n' +
    'uniform float uPupilSize;\n' +
    'uniform float uIrisWidth;\n' +
    'uniform float uGlowIntensity;\n' +
    'uniform float uIntensity;\n' +
    'uniform float uScale;\n' +
    'uniform float uNoiseScale;\n' +
    'uniform vec2 uMouse;\n' +
    'uniform float uPupilFollow;\n' +
    'uniform float uFlameSpeed;\n' +
    'uniform vec3 uEyeColor;\n' +
    'uniform vec3 uBgColor;\n' +
    'varying vec2 vUv;\n' +
    '\n' +
    'void main() {\n' +
    '  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;\n' +
    '  uv /= uScale;\n' +
    '  float ft = uTime * uFlameSpeed;\n' +
    '\n' +
    '  float polarRadius = length(uv) * 2.0;\n' +
    '  float polarAngle = (2.0 * atan(uv.x, uv.y)) / 6.28 * 0.3;\n' +
    '  vec2 polarUv = vec2(polarRadius, polarAngle);\n' +
    '\n' +
    '  vec4 noiseA = texture2D(uNoiseTexture, polarUv * vec2(0.2, 7.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));\n' +
    '  vec4 noiseB = texture2D(uNoiseTexture, polarUv * vec2(0.3, 4.0) * uNoiseScale + vec2(-ft * 0.2, 0.0));\n' +
    '  vec4 noiseC = texture2D(uNoiseTexture, polarUv * vec2(0.1, 5.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));\n' +
    '\n' +
    '  float distanceMask = 1.0 - length(uv);\n' +
    '\n' +
    '  // Inner ring\n' +
    '  float innerRing = clamp(-1.0 * ((distanceMask - 0.7) / uIrisWidth), 0.0, 1.0);\n' +
    '  innerRing = (innerRing * distanceMask - 0.2) / 0.28;\n' +
    '  innerRing += noiseA.r - 0.5;\n' +
    '  innerRing *= 1.3;\n' +
    '  innerRing = clamp(innerRing, 0.0, 1.0);\n' +
    '\n' +
    '  float outerRing = clamp(-1.0 * ((distanceMask - 0.5) / 0.2), 0.0, 1.0);\n' +
    '  outerRing = (outerRing * distanceMask - 0.1) / 0.38;\n' +
    '  outerRing += noiseC.r - 0.5;\n' +
    '  outerRing *= 1.3;\n' +
    '  outerRing = clamp(outerRing, 0.0, 1.0);\n' +
    '\n' +
    '  innerRing += outerRing;\n' +
    '\n' +
    '  // Inner eye\n' +
    '  float innerEye = distanceMask - 0.1 * 2.0;\n' +
    '  innerEye *= noiseB.r * 2.0;\n' +
    '\n' +
    '  // Pupil with cursor tracking\n' +
    '  vec2 pupilOffset = uMouse * uPupilFollow * 0.12;\n' +
    '  vec2 pupilUv = uv - pupilOffset;\n' +
    '  float pupil = 1.0 - length(pupilUv * vec2(9.0, 2.3));\n' +
    '  pupil *= uPupilSize;\n' +
    '  pupil = clamp(pupil, 0.0, 1.0);\n' +
    '  pupil /= 0.35;\n' +
    '\n' +
    '  // Outer eye\n' +
    '  float outerEyeGlow = 1.0 - length(uv * vec2(0.5, 1.5));\n' +
    '  outerEyeGlow = clamp(outerEyeGlow + 0.5, 0.0, 1.0);\n' +
    '  outerEyeGlow += noiseC.r - 0.5;\n' +
    '  float outerBgGlow = outerEyeGlow;\n' +
    '  outerEyeGlow = pow(outerEyeGlow, 2.0);\n' +
    '  outerEyeGlow += distanceMask;\n' +
    '  outerEyeGlow *= uGlowIntensity;\n' +
    '  outerEyeGlow = clamp(outerEyeGlow, 0.0, 1.0);\n' +
    '  outerEyeGlow *= pow(1.0 - distanceMask, 2.0) * 2.5;\n' +
    '\n' +
    '  // Outer eye bg glow\n' +
    '  outerBgGlow += distanceMask;\n' +
    '  outerBgGlow = pow(outerBgGlow, 0.5);\n' +
    '  outerBgGlow *= 0.15;\n' +
    '\n' +
    '  vec3 color = uEyeColor * uIntensity * clamp(max(innerRing + innerEye, outerEyeGlow + outerBgGlow) - pupil, 0.0, 3.0);\n' +
    '  color += uBgColor;\n' +
    '\n' +
    '  gl_FragColor = vec4(color, 1.0);\n' +
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
    container.style.background = '#030204';
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
  var uPupilSize = gl.getUniformLocation(prog, 'uPupilSize');
  var uIrisWidth = gl.getUniformLocation(prog, 'uIrisWidth');
  var uGlowIntensity = gl.getUniformLocation(prog, 'uGlowIntensity');
  var uIntensity = gl.getUniformLocation(prog, 'uIntensity');
  var uScale = gl.getUniformLocation(prog, 'uScale');
  var uNoiseScale = gl.getUniformLocation(prog, 'uNoiseScale');
  var uPupilFollow = gl.getUniformLocation(prog, 'uPupilFollow');
  var uFlameSpeed = gl.getUniformLocation(prog, 'uFlameSpeed');
  var uEyeColor = gl.getUniformLocation(prog, 'uEyeColor');
  var uBgColor = gl.getUniformLocation(prog, 'uBgColor');

  /* ── Configuration ── */
  var eyeColorHex = '#660666'; // deep purple/magenta eye color matching usage example
  var bgColorHex = '#030204';  // background color matching usage example

  function hexToVec3(hex) {
    var h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255
    ];
  }

  var eyeColor = hexToVec3(eyeColorHex);
  var bgColor = hexToVec3(bgColorHex);

  var intensity = 1.5;
  var pupilSize = 0.6;
  var irisWidth = 0.25;
  var glowIntensity = 0.35;
  var scale = 0.8;
  var noiseScale = 1.0;
  var pupilFollow = 1.0;
  var flameSpeed = 1.0;

  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  /* ── Mouse move ─────────────────────────────────────────── */
  function onMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.ty = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function onMouseLeave() {
    mouse.tx = 0;
    mouse.ty = 0;
  }

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseLeave);

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
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    gl.clearColor(0.04, 0.02, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(prog);
    
    // Bind noise texture to unit 0
    gl.activeTexture(gl.TEXTURE_0);
    gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
    var uNoiseTexture = gl.getUniformLocation(prog, 'uNoiseTexture');
    gl.uniform1i(uNoiseTexture, 0);

    gl.uniform3f(uRes, canvas.width, canvas.height, canvas.width / canvas.height);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uTime, (now - startTime) * 0.001);
    gl.uniform1f(uPupilSize, pupilSize);
    gl.uniform1f(uIrisWidth, irisWidth);
    gl.uniform1f(uGlowIntensity, glowIntensity);
    gl.uniform1f(uIntensity, intensity);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uNoiseScale, noiseScale);
    gl.uniform1f(uPupilFollow, pupilFollow);
    gl.uniform1f(uFlameSpeed, flameSpeed);
    gl.uniform3fv(uEyeColor, eyeColor);
    gl.uniform3fv(uBgColor, bgColor);

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
