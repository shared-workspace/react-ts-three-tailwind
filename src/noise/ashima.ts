// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
const AshimaCodeCommon = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
  `;
// Classic Perlin noise
export const AshimaCodeCnoise = /* glsl*/ `
  ${AshimaCodeCommon}
float cnoise(vec3 P) {
  // Integer part for indexing
  vec3 Pi0 = floor(P); 
  // Integer part + 1
  vec3 Pi1 = Pi0 + vec3(1.0); 
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  // Fractional part for interpolation
  vec3 Pf0 = fract(P); 
  // Fractional part - 1.0
  vec3 Pf1 = Pf0 - vec3(1.0); 
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);  return 2.2 * n_xyz; }
`;

// Classic Perlin noise, periodic variant
export const AshimaCodePnoise = /* glsl*/ `
  ${AshimaCodeCommon}
  float pnoise(vec3 P, vec3 rep) {
    // Integer part, modulo period
    vec3 Pi0 = mod(floor(P), rep); 
    // Integer part + 1, mod period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    // Fractional part for interpolation
    vec3 Pf0 = fract(P); 
    // Fractional part - 1.0
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);  return 2.2 * n_xyz; 
  }`;


// import * as THREE from "three";

// in clone().abs()
// Property 'abs' does not exist on type 'Vector4'
// Property 'yz' does not exist on type 'Vector3'
// The right - hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363)
// const n_xyz: THREE.Vector4
// class SimplexNoise {
//   constructor(){}
//   mix(a: THREE.Vector4, b: THREE.Vector4, t: number): THREE.Vector4 {
//   return a.clone().multiplyScalar(1.0 - t).add(b.clone().multiplyScalar(t));
// }
//  mod289(x: THREE.Vector3): THREE.Vector3 {
//   const scale = new THREE.Vector3(1.0 / 289.0, 1.0 / 289.0, 1.0 / 289.0);
//   const scaled = x.clone().multiply(scale);
//   const floored = scaled.clone().floor();
//   const scaledAndFloored = floored.clone().multiplyScalar(289.0);
//   const result = x.clone().sub(scaledAndFloored);
//   return result;
// }

//  mod289Vec4(x: THREE.Vector4): THREE.Vector4 {
//   const scale = new THREE.Vector4(1.0 / 289.0, 1.0 / 289.0, 1.0 / 289.0, 1.0 / 289.0);
//   const scaled = x.clone().multiply(scale);
//   const floored = scaled.clone().floor();
//   const scaledAndFloored = floored.clone().multiplyScalar(289.0);
//   const result = x.clone().sub(scaledAndFloored);
//   return result;
// }

//  permute(x: THREE.Vector4): THREE.Vector4 {
//   return this.mod289Vec4(x.clone().multiplyScalar(34.0).addScalar(10.0)).multiply(x);
// }

//  taylorInvSqrt(r: THREE.Vector4): THREE.Vector4 {
//   return new THREE.Vector4(1.79284291400159, 1.79284291400159, 1.79284291400159, 1.79284291400159)
//     .sub(r.clone().multiplyScalar(0.85373472095314));
// }

//  fade(t: THREE.Vector3): THREE.Vector3 {
//   const t3 = t.clone().multiply(t).multiply(t);
//   return t3.clone().multiply(t.clone().multiply(t.clone().multiplyScalar(6.0).subScalar(15.0)).addScalar(10.0));
// }

// // Classic Perlin noise
//  cnoise(P: THREE.Vector3): number {
//   const Pi0 = P.clone().floor(); // Integer part for indexing
//   const Pi1 = Pi0.clone().addScalar(1.0); // Integer part + 1
//   const Pf0 = P.clone().sub(Pi0); // Fractional part for interpolation
//   const Pf1 = Pf0.clone().subScalar(1.0); // Fractional part - 1.0
//   const ix = new THREE.Vector4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
//   const iy = new THREE.Vector4(Pi0.y, Pi1.y, Pi0.y, Pi1.y);
//   const iz0 = new THREE.Vector4(Pi0.z, Pi0.z, Pi1.z, Pi1.z);
//   const iz1 = new THREE.Vector4(Pi1.z, Pi1.z, Pi1.z, Pi1.z);

//   const ixy = this.permute(this.permute(ix).add(iy));
//   const ixy0 = this.permute(ixy.clone().add(iz0));
//   const ixy1 = this.permute(ixy.clone().add(iz1));

//   const gx0 = ixy0.clone().multiplyScalar(1.0 / 7.0);
//   const gy0 = gx0.clone().floor().multiplyScalar(1.0 / 7.0).subScalar(0.5);
//   gx0.sub(gx0.clone().floor());
//   const gz0 = new THREE.Vector4(0.5).sub(gx0.clone().abs()).sub(gy0.clone().abs());
//   const sz0 = gz0.clone().step(new THREE.Vector4(0.0));
//   gx0.sub(sz0.clone().multiply(sz0.clone().step(gx0.clone().floor().subScalar(0.5))));
//   gy0.sub(sz0.clone().multiply(sz0.clone().step(gy0.clone().floor().subScalar(0.5))));

//   const gx1 = ixy1.clone().multiplyScalar(1.0 / 7.0);
//   const gy1 = gx1.clone().floor().multiplyScalar(1.0 / 7.0).subScalar(0.5);
//   gx1.sub(gx1.clone().floor());
//   const gz1 = new THREE.Vector4(0.5).sub(gx1.clone().abs()).sub(gy1.clone().abs());
//   const sz1 = gz1.clone().step(new THREE.Vector4(0.0));
//   gx1.sub(sz1.clone().multiply(sz1.clone().step(gx1.clone().floor().subScalar(0.5))));
//   gy1.sub(sz1.clone().multiply(sz1.clone().step(gy1.clone().floor().subScalar(0.5))));

//   const g000 = new THREE.Vector3(gx0.x, gy0.x, gz0.x);
//   const g100 = new THREE.Vector3(gx0.y, gy0.y, gz0.y);
//   const g010 = new THREE.Vector3(gx0.z, gy0.z, gz0.z);
//   const g110 = new THREE.Vector3(gx0.w, gy0.w, gz0.w);
//   const g001 = new THREE.Vector3(gx1.x, gy1.x, gz1.x);
//   const g101 = new THREE.Vector3(gx1.y, gy1.y, gz1.y);
//   const g011 = new THREE.Vector3(gx1.z, gy1.z, gz1.z);
//   const g111 = new THREE.Vector3(gx1.w, gy1.w, gz1.w);

//   const norm0 = this.taylorInvSqrt(new THREE.Vector4(g000.dot(g000), g010.dot(g010), g100.dot(g100), g110.dot(g110)));
//   g000.multiply(norm0.x);
//   g010.multiply(norm0.y);
//   g100.multiply(norm0.z);
//   g110.multiply(norm0.w);
//   const norm1 = this.taylorInvSqrt(new THREE.Vector4(g001.dot(g001), g011.dot(g011), g101.dot(g101), g111.dot(g111)));
//   g001.multiply(norm1.x);
//   g011.multiply(norm1.y);
//   g101.multiply(norm1.z);
//   g111.multiply(norm1.w);

//   const n000 = g000.dot(Pf0);
//   const n100 = g100.dot(new THREE.Vector3(Pf1.x, Pf0.yz));
//   const n010 = g010.dot(new THREE.Vector3(Pf0.x, Pf1.y, Pf0.z));
//   const n110 = g110.dot(new THREE.Vector3(Pf1.xy, Pf0.z));
//   const n001 = g001.dot(new THREE.Vector3(Pf0.xy, Pf1.z));
//   const n101 = g101.dot(new THREE.Vector3(Pf1.x, Pf0.y, Pf1.z));
//   const n011 = g011.dot(new THREE.Vector3(Pf0.x, Pf1.yz));
//   const n111 = g111.dot(Pf1);

//    const fade_xyz = this.fade(Pf0);
//    const n_z = this.mix(new THREE.Vector4(n000, n100, n010, n110), new THREE.Vector4(n001, n101, n011, n111), fade_xyz.z);
//    const n_yz = this.mix(n_z.xy, n_z.zw, fade_xyz.y);
//    const n_xyz = this.mix(n_yz.x, n_yz.y, fade_xyz.x);

//    return 2.2 * n_xyz;
// }

// }
// // Example usage
// const THREE.VectorResult = cnoise(new THREE.Vector3(/* your values here */));
// console.log(THREE.VectorResult);

