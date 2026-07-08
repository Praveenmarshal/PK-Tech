/**
 * Strands – Animated WebGL background (vanilla JS, no framework)
 * Drop-in replacement for the pages-video-bg on the about page.
 * Uses raw WebGL2 – zero dependencies.
 */
(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────── */
  var COLORS = [
    [0.976, 0.451, 0.086],   // #F97316
    [0.486, 0.227, 0.929],   // #7C3AED
    [0.024, 0.714, 0.831],   // #06B6D4
    [0.545, 0.361, 0.965],   // #8B5CF6
  ];
  var STRAND_COUNT  = 5;
  var SPEED         = 0.45;
  var AMPLITUDE     = 1.2;
  var WAVINESS      = 1.0;
  var THICKNESS     = 0.65;
  var GLOW          = 3.0;
  var TAPER         = 3.0;
  var SPREAD        = 1.2;
  var INTENSITY     = 0.7;
  var SATURATION    = 1.6;
  var OPACITY       = 1.0;
  var SCALE         = 1.5;
  var MAX_STRANDS   = 12;
  var MAX_COLORS    = 8;

  /* ── Shaders ────────────────────────────────────────────── */
  var VERT = '#version 300 es\nin vec2 aPos;\nvoid main(){gl_Position=vec4(aPos,0.0,1.0);}';

  var FRAG = [
    '#version 300 es',
    'precision highp float;',
    'uniform float uTime;',
    'uniform vec2 uRes;',
    'uniform vec3 uColors[' + MAX_COLORS + '];',
    'uniform int uColorCount;',
    'uniform int uStrandCount;',
    'uniform float uSpeed,uAmp,uWave,uThick,uGlow,uTaper,uSpread,uIntensity,uOpacity,uScale,uSat;',
    'out vec4 O;',
    'const float PI=3.14159265;',
    'vec3 spectrum(float t){return .5+.5*cos(2.*PI*(t+vec3(0.,.33,.67)));}',
    'vec3 sampleP(float t){t=fract(t);float s=t*float(uColorCount);int i=int(floor(s));float b=fract(s);int n=i+1;if(n>=uColorCount)n=0;return mix(uColors[i],uColors[n],b);}',
    'vec3 sc(float t){if(uColorCount>0)return sampleP(t);return spectrum(t);}',
    'void main(){',
    '  vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;',
    '  uv/=max(uScale,.0001);',
    '  float e=.06+uIntensity*.94;',
    '  float env=pow(max(cos(uv.x*PI*1.3),0.),uTaper);',
    '  vec3 col=vec3(0.);',
    '  for(int i=0;i<' + MAX_STRANDS + ';i++){',
    '    if(i>=uStrandCount)break;',
    '    float fi=float(i);',
    '    float ph=fi*1.7*uSpread;',
    '    float freq=(2.+fi*.35)*uWave;',
    '    float spd=1.4+fi*1.2;',
    '    float tt=uTime*uSpeed;',
    '    float w=sin(uv.x*freq+tt*spd+ph)*.60+sin(uv.x*freq*1.1-tt*spd*.7+ph*1.7)*.40;',
    '    float amp=(.1+.02*e)*env*uAmp;',
    '    float y=w*amp;',
    '    float d=abs(uv.y-y);',
    '    float thick=(.001+.05*e)*(.35+env)*uThick;',
    '    float g=thick/(d+thick*.45);g=g*g;',
    '    float h=fi/float(uStrandCount)+uv.x*.30+uTime*.04;',
    '    col+=sc(h)*g*env;',
    '  }',
    '  col*=.45+.7*e;',
    '  col=1.-exp(-col*uGlow);',
    '  float gray=dot(col,vec3(.2126,.7152,.0722));',
    '  col=max(mix(vec3(gray),col,uSat),0.);',
    '  float lum=max(max(col.r,col.g),col.b);',
    '  float a=clamp(lum,0.,1.)*uOpacity;',
    '  O=vec4(col*uOpacity,a);',
    '}'
  ].join('\n');

  /* ── Bootstrap ──────────────────────────────────────────── */
  var container = document.querySelector('.pages-video-bg');
  if (!container) return;

  // Remove the existing video element
  var vid = container.querySelector('video');
  if (vid) { vid.pause(); container.removeChild(vid); }

  // Create canvas
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  container.appendChild(canvas);

  var gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) { console.warn('WebGL2 not supported'); return; }

  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  /* ── Compile helper ─────────────────────────────────────── */
  function compile(src, type) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
    }
    return s;
  }

  var vs = compile(VERT, gl.VERTEX_SHADER);
  var fs = compile(FRAG, gl.FRAGMENT_SHADER);
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  /* ── Full-screen triangle ───────────────────────────────── */
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  /* ── Uniforms ───────────────────────────────────────────── */
  var uTime      = gl.getUniformLocation(prog, 'uTime');
  var uRes       = gl.getUniformLocation(prog, 'uRes');
  var uColorsLoc = gl.getUniformLocation(prog, 'uColors');
  var uColorCnt  = gl.getUniformLocation(prog, 'uColorCount');
  var uStrandCnt = gl.getUniformLocation(prog, 'uStrandCount');
  var uSpeedLoc  = gl.getUniformLocation(prog, 'uSpeed');
  var uAmpLoc    = gl.getUniformLocation(prog, 'uAmp');
  var uWaveLoc   = gl.getUniformLocation(prog, 'uWave');
  var uThickLoc  = gl.getUniformLocation(prog, 'uThick');
  var uGlowLoc   = gl.getUniformLocation(prog, 'uGlow');
  var uTaperLoc  = gl.getUniformLocation(prog, 'uTaper');
  var uSpreadLoc = gl.getUniformLocation(prog, 'uSpread');
  var uIntLoc    = gl.getUniformLocation(prog, 'uIntensity');
  var uOpLoc     = gl.getUniformLocation(prog, 'uOpacity');
  var uScaleLoc  = gl.getUniformLocation(prog, 'uScale');
  var uSatLoc    = gl.getUniformLocation(prog, 'uSat');

  // Flatten colors array for uniform
  var flatColors = [];
  for (var i = 0; i < MAX_COLORS; i++) {
    var c = COLORS[i] || COLORS[COLORS.length - 1];
    flatColors.push(c[0], c[1], c[2]);
  }

  gl.uniform3fv(uColorsLoc, new Float32Array(flatColors));
  gl.uniform1i(uColorCnt, COLORS.length);
  gl.uniform1i(uStrandCnt, Math.min(STRAND_COUNT, MAX_STRANDS));
  gl.uniform1f(uSpeedLoc, SPEED);
  gl.uniform1f(uAmpLoc, AMPLITUDE);
  gl.uniform1f(uWaveLoc, WAVINESS);
  gl.uniform1f(uThickLoc, THICKNESS);
  gl.uniform1f(uGlowLoc, GLOW);
  gl.uniform1f(uTaperLoc, TAPER);
  gl.uniform1f(uSpreadLoc, SPREAD);
  gl.uniform1f(uIntLoc, INTENSITY);
  gl.uniform1f(uOpLoc, OPACITY);
  gl.uniform1f(uScaleLoc, SCALE);
  gl.uniform1f(uSatLoc, SATURATION);

  /* ── Resize ─────────────────────────────────────────────── */
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = container.clientWidth;
    var h = container.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Render loop ────────────────────────────────────────── */
  var raf;
  function frame(t) {
    raf = requestAnimationFrame(frame);
    gl.uniform1f(uTime, t * 0.001);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  raf = requestAnimationFrame(frame);

  /* ── Cleanup on page hide ───────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(frame);
  });
})();
