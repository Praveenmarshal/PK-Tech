precision mediump float;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  float mist = smoothstep(0.0, 1.0, vUv.y) * 0.22;
  float pulse = sin((vUv.x + uMouse.x) * 8.0 + uTime * 0.4) * 0.04;
  gl_FragColor = vec4(0.76, 0.71, 0.99, mist + pulse);
}

