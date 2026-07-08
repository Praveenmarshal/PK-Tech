/**
 * Plasma – Animated WebGL2 background (vanilla JS, zero dependencies)
 * Replaces the video in .pages-video-bg with a live Plasma shader.
 */
(function () {
  'use strict';

  var container = document.querySelector('.pages-video-bg');
  if (!container) return;

  // Kill every video element inside the container
  var videos = container.querySelectorAll('video');
  videos.forEach(function (v) { v.pause(); v.remove(); });

  // Also remove any lingering source/picture elements
  container.innerHTML = '';

  /* ── Create canvas ──────────────────────────────────────── */
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  container.appendChild(canvas);

  var gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) { console.warn('WebGL2 not available'); return; }

  /* ── Shaders ────────────────────────────────────────────── */
  var VERT = [
    '#version 300 es',
    'in vec2 aPos;',
    'void main(){gl_Position=vec4(aPos,0.,1.);}'
  ].join('\n');

  var FRAG = [
    '#version 300 es',
    'precision highp float;',
    'uniform vec2 iResolution;',
    'uniform float iTime;',
    'uniform float uSpeed;',
    'uniform float uScale;',
    'uniform float uOpacity;',
    'out vec4 fragColor;',
    '',
    'void mainImage(out vec4 o, vec2 C){',
    '  vec2 center=iResolution.xy*0.5;',
    '  C=(C-center)/uScale+center;',
    '  float i,d,z,T=iTime*uSpeed;',
    '  vec3 O,p,S;',
    '  for(vec2 r=iResolution.xy,Q;++i<60.;O+=o.w/d*o.xyz){',
    '    p=z*normalize(vec3(C-.5*r,r.y));',
    '    p.z-=4.;',
    '    S=p;',
    '    d=p.y-T;',
    '    p.x+=.4*(1.+p.y)*sin(d+p.x*0.1)*cos(.34*d+p.x*0.05);',
    '    Q=p.xz*=mat2(cos(p.y+vec4(0,11,33,0)-T));',
    '    z+=d=abs(sqrt(length(Q*Q))-.25*(5.+S.y))/3.+8e-4;',
    '    o=1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));',
    '  }',
    '  o.xyz=tanh(O/1e4);',
    '}',
    '',
    'bool finite1(float x){return !(isnan(x)||isinf(x));}',
    'vec3 sanitize(vec3 c){',
    '  return vec3(',
    '    finite1(c.r)?c.r:0.,',
    '    finite1(c.g)?c.g:0.,',
    '    finite1(c.b)?c.b:0.',
    '  );',
    '}',
    '',
    'void main(){',
    '  vec4 o=vec4(0.);',
    '  mainImage(o,gl_FragCoord.xy);',
    '  vec3 rgb=sanitize(o.rgb);',
    '  // Tint towards violet/orange PK_Tech_Warrior brand palette',
    '  float intensity=(rgb.r+rgb.g+rgb.b)/3.;',
    '  vec3 tint=intensity*vec3(0.545,0.361,0.965);', // #8B5CF6
    '  vec3 finalColor=mix(rgb,tint,0.35);',
    '  float alpha=length(finalColor)*uOpacity;',
    '  fragColor=vec4(finalColor,alpha);',
    '}'
  ].join('\n');

  /* ── Compile ────────────────────────────────────────────── */
  function compile(src, type) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
    }
    return s;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, compile(VERT, gl.VERTEX_SHADER));
  gl.attachShader(prog, compile(FRAG, gl.FRAGMENT_SHADER));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Link error:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  /* ── Full-screen triangle ───────────────────────────────── */
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  /* ── Uniforms ───────────────────────────────────────────── */
  var uTime    = gl.getUniformLocation(prog, 'iTime');
  var uRes     = gl.getUniformLocation(prog, 'iResolution');
  var uSpeed   = gl.getUniformLocation(prog, 'uSpeed');
  var uScale   = gl.getUniformLocation(prog, 'uScale');
  var uOpacity = gl.getUniformLocation(prog, 'uOpacity');

  gl.uniform1f(uSpeed, 0.4);
  gl.uniform1f(uScale, 1.1);
  gl.uniform1f(uOpacity, 0.9);

  /* ── Resize ─────────────────────────────────────────────── */
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = container.clientWidth;
    var h = container.clientHeight;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Render loop ────────────────────────────────────────── */
  var raf;
  var t0 = performance.now();

  function frame(t) {
    raf = requestAnimationFrame(frame);
    gl.uniform1f(uTime, (t - t0) * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  raf = requestAnimationFrame(frame);

  /* ── Perf: pause when hidden ────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { cancelAnimationFrame(raf); }
    else { t0 = performance.now(); raf = requestAnimationFrame(frame); }
  });
})();
