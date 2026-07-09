/**
 * Plasma – Animated WebGL2 background (vanilla JS, zero dependencies)
 * Ported faithfully from the React Bits <Plasma /> component.
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

  var gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    powerPreference: 'default'
  });

  if (!gl) {
    container.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#1a0533 50%,#0a0a0a 100%)';
    return;
  }

  /* ── Shaders (exact port from React Bits Plasma) ────────── */
  var VERT =
    '#version 300 es\n' +
    'in vec2 position;\n' +
    'void main(){\n' +
    '  gl_Position=vec4(position,0.0,1.0);\n' +
    '}\n';

  var FRAG =
    '#version 300 es\n' +
    'precision highp float;\n' +
    'uniform vec2 iResolution;\n' +
    'uniform float iTime;\n' +
    'out vec4 fragColor;\n' +
    '\n' +
    'void mainImage(out vec4 o, vec2 C){\n' +
    '  vec2 center=iResolution.xy*0.5;\n' +
    '  C=(C-center)/1.1+center;\n' +            // scale=1.1
    '  float i,d,z,T=iTime*0.4;\n' +             // speed=0.4
    '  vec3 O,p,S;\n' +
    '  for(vec2 r=iResolution.xy,Q;++i<60.;O+=o.w/d*o.xyz){\n' +
    '    p=z*normalize(vec3(C-.5*r,r.y));\n' +
    '    p.z-=4.;\n' +
    '    S=p;\n' +
    '    d=p.y-T;\n' +
    '    p.x+=.4*(1.+p.y)*sin(d+p.x*0.1)*cos(.34*d+p.x*0.05);\n' +
    '    Q=p.xz*=mat2(cos(p.y+vec4(0,11,33,0)-T));\n' +
    '    z+=d=abs(sqrt(length(Q*Q))-.25*(5.+S.y))/3.+8e-4;\n' +
    '    o=1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));\n' +
    '  }\n' +
    '  o.xyz=tanh(O/1e4);\n' +
    '}\n' +
    '\n' +
    'bool finite1(float x){return !(isnan(x)||isinf(x));}\n' +
    'vec3 sanitize(vec3 c){\n' +
    '  return vec3(\n' +
    '    finite1(c.r)?c.r:0.0,\n' +
    '    finite1(c.g)?c.g:0.0,\n' +
    '    finite1(c.b)?c.b:0.0\n' +
    '  );\n' +
    '}\n' +
    '\n' +
    'void main(){\n' +
    '  vec4 o=vec4(0.0);\n' +
    '  mainImage(o,gl_FragCoord.xy);\n' +
    '  vec3 rgb=sanitize(o.rgb);\n' +
    '  float intensity=(rgb.r+rgb.g+rgb.b)/3.0;\n' +
    '  vec3 tint=intensity*vec3(0.545,0.361,0.965);\n' +
    '  vec3 finalColor=mix(rgb,tint,0.35);\n' +
    '  float alpha=clamp(length(finalColor),0.0,1.0)*0.9;\n' +
    '  fragColor=vec4(finalColor,alpha);\n' +
    '}\n';

  /* If tanh/isnan/isinf not supported, use a simpler fallback shader */
  var FRAG_FALLBACK =
    '#version 300 es\n' +
    'precision highp float;\n' +
    'uniform vec2 iResolution;\n' +
    'uniform float iTime;\n' +
    'out vec4 fragColor;\n' +
    '\n' +
    'float tanh_s(float x){\n' +
    '  float e=exp(2.0*clamp(x,-10.0,10.0));\n' +
    '  return (e-1.0)/(e+1.0);\n' +
    '}\n' +
    'vec3 tanh_v(vec3 v){return vec3(tanh_s(v.x),tanh_s(v.y),tanh_s(v.z));}\n' +
    '\n' +
    'void main(){\n' +
    '  vec2 C=gl_FragCoord.xy;\n' +
    '  vec2 center=iResolution.xy*0.5;\n' +
    '  C=(C-center)/1.1+center;\n' +
    '  float T=iTime*0.4;\n' +
    '  vec3 O=vec3(0.0);\n' +
    '  float z=0.0;\n' +
    '  vec4 o=vec4(0.0);\n' +
    '  for(float i=0.0;i<60.0;i+=1.0){\n' +
    '    vec2 r=iResolution.xy;\n' +
    '    vec3 rawDir=vec3(C-0.5*r,r.y);\n' +
    '    float rl=length(rawDir);\n' +
    '    if(rl<0.001) rl=0.001;\n' +
    '    vec3 p=z*(rawDir/rl);\n' +
    '    p.z-=4.0;\n' +
    '    vec3 S=p;\n' +
    '    float d=p.y-T;\n' +
    '    p.x+=0.4*(1.0+p.y)*sin(d+p.x*0.1)*cos(0.34*d+p.x*0.05);\n' +
    '    float a=p.y-T;\n' +
    '    float c0=cos(a);float c1=cos(a+11.0);float c2=cos(a+33.0);\n' +
    '    mat2 rot=mat2(c0,c1,c2,c0);\n' +
    '    p.xz=rot*p.xz;\n' +
    '    vec2 Q=p.xz;\n' +
    '    d=abs(sqrt(length(Q*Q))-0.25*(5.0+S.y))/3.0+8e-4;\n' +
    '    z+=d;\n' +
    '    o=1.0+sin(S.y+p.z*0.5+S.z-length(S-p)+vec4(2.0,1.0,0.0,8.0));\n' +
    '    if(d>0.0001) O+=o.w/d*o.xyz;\n' +
    '  }\n' +
    '  vec3 col=tanh_v(O/1e4);\n' +
    '  col=clamp(col,0.0,1.0);\n' +
    '  float intensity=(col.r+col.g+col.b)/3.0;\n' +
    '  vec3 tint=intensity*vec3(0.545,0.361,0.965);\n' +
    '  vec3 finalColor=mix(col,tint,0.35);\n' +
    '  float alpha=clamp(length(finalColor),0.0,1.0)*0.9;\n' +
    '  fragColor=vec4(finalColor,alpha);\n' +
    '}\n';

  /* ── Compile + link helper ──────────────────────────────── */
  function makeShader(src, type) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(s);
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
      gl.deleteProgram(p);
      return null;
    }
    return p;
  }

  // Try primary shader first, fallback if it fails (tanh/isnan unsupported)
  var prog = makeProgram(VERT, FRAG);
  if (!prog) {
    prog = makeProgram(VERT, FRAG_FALLBACK);
  }
  if (!prog) {
    container.style.background = 'linear-gradient(135deg,#0a0a0a 0%,#1a0533 50%,#0a0a0a 100%)';
    return;
  }

  gl.useProgram(prog);

  /* ── Full-screen triangle ───────────────────────────────── */
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);

  var posLoc = gl.getAttribLocation(prog, 'position');
  if (posLoc < 0) posLoc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  /* ── Uniform locations ──────────────────────────────────── */
  var uTime = gl.getUniformLocation(prog, 'iTime');
  var uRes  = gl.getUniformLocation(prog, 'iResolution');

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
    gl.useProgram(prog);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ── Render loop ────────────────────────────────────────── */
  var raf;
  var t0 = performance.now();
  var running = true;

  function frame(t) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    gl.clearColor(0.04, 0.02, 0.06, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.bindVertexArray(vao);
    gl.uniform1f(uTime, (t - t0) * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  raf = requestAnimationFrame(frame);

  /* ── Pause when tab hidden ──────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else {
      running = true;
      t0 = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });
})();
