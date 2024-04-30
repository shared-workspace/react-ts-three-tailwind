/* eslint-disable @typescript-eslint/no-unused-vars */
// import { AshimaCodeCnoise, AshimaCodePnoise } from "../noise/ashima";

// ${AshimaCodeCnoise}
export const vertexShader = `
varying vec2 vUv;
uniform float time;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
export const fragmentShader = `
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(vec3(0.98), 1.0);
} 
`;
// gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0);

// const vertexShader = /* glsl*/ `
//     ${AshimaCodeCnoise}
//     uniform float time;
//     uniform float startTime; // Time when the animation started
//     uniform vec3 sphereCenter; // Center of the sphere
//     varying float displacementFactor;
//     void main() {
//         float driftRange = 20.0; // Adjust the drift range as needed
//         float driftSpeed = 0.5; // Adjust the drift speed as needed
//         float animatedTime = mod(time - startTime, driftRange * cnoise(position)) * driftSpeed;
//         vec3 direction = normalize(position - sphereCenter);
//         vec3 driftedPosition = position + direction * animatedTime;
//         float displacement = length(position - driftedPosition);
//         displacementFactor = smoothstep(0.0, 10.0, displacement); // Adjust the range (0.0 to 10.0) as needed
//         if (displacementFactor < 0.01) {
//             gl_PointSize = 3.0;
//         } else if (displacementFactor < 0.5) {
//             gl_PointSize = 2.0;
//         } else if (displacementFactor < 0.15) {
//             gl_PointSize = 1.5;
//         } else if (displacementFactor < 0.20) {
//             gl_PointSize = 2.0;
//         } else if (displacementFactor < 0.40) {
//             gl_PointSize = 2.5;
//         } else {
//             gl_PointSize = 3.0;
//         }
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(driftedPosition, 1.0);
//     }`;




//     private createParticle() {
//         const particle = new THREE.Mesh(this.geometry, this.material);
//         scene.add(particle);
//         this.Particles.push(particle);
//         particle.userData["velocity"] = new THREE.Vector3(0, 0, 0);
//         particle.userData["speed"] = 1;
//         this.ParticleAnimation.push(() => {
//             const v = particle.userData["velocity"] as THREE.Vector3;
//             if (particle.userData["velocity"] && particle.userData["speed"]) {
//                 let pos = particle.position;
//                 if (pos.x <= -this.LimitX || this.LimitX <= pos.x) {
//                     v.setX(v.x * -1);
//                     pos.addScaledVector(v, clock.getElapsedTime() * 0.01 * particle.userData["speed"]);
//                 } else if (pos.y <= -this.LimitY || this.LimitY <= pos.y) {
//                     v.setY(v.y * -1);
//                     pos.addScaledVector(v, clock.getElapsedTime() * 0.01 * particle.userData["speed"]);
//                 } else {
//                     pos.addScaledVector(v, clock.getElapsedTime() * 0.01 * particle.userData["speed"]);
//                 }
//                 if (v.length() > 2) v.sub(v.normalize().negate().multiplyScalar(1));
//                 else if (v.length() > 1) v.sub(v.normalize().negate().multiplyScalar(0.5));
//                 else if (v.length() > 0.5) v.sub(v.normalize().negate().multiplyScalar(0.05));
//                 else if (v.length() > 0.1) v.sub(v.normalize().negate().multiplyScalar(0.01));
//             }
//         })
//         return particle;
//     }
//     private calParticlePos() {
//         this.Particles.forEach(p => {
//             scene.remove(p);
//             p.geometry.dispose();
//             p.material.dispose();
//         });
//         this.Particles = [];
//         this.calSize();
//         const size = this.size / 2;
//         const grid = Math.floor(this.options.scale);
//         const grid1 = grid + 1;
//         const segment = this.size / grid;
//         for (let iy = 0; iy < grid1; iy++) {
//             const y = iy * segment - size;
//             for (let ix = 0; ix < grid1; ix++) {
//                 const x = ix * segment - size;
//                 this.createParticle().position.set(x, -y, 0);
//             }
//         }
//     }
//     private updateParticlePos() {
//         this.calSize();
//         const size = this.size / 2;
//         const grid = Math.floor(this.options.scale);
//         const grid1 = grid + 1;
//         const segment = this.size / grid;
//         let i = 0;
//         for (let iy = 0; iy < grid1; iy++) {
//             const y = iy * segment - size;
//             for (let ix = 0; ix < grid1; ix++) {
//                 const x = ix * segment - size;
//                 const particle = this.Particles[i++];
//                 if (particle) particle.position.set(x, -y, 0);
//             }
//         }
//     }
//     private calSize() {
//         this.size = (this.options.scale * (this.options.radius + this.options.spacing)) * 2;
//     }
//     private changeGeomatry() {
//         if (this.geometry) this.geometry.dispose();
//         const geometry = new THREE.CircleGeometry(this.options.radius, Math.ceil(Math.sqrt(this.options.radius)) + 2);
//         this.Particles.forEach(p => { p.geometry.dispose(); p.geometry = geometry; });
//         this.geometry = geometry;
//         if (!this.isAnimateSet) this.updateParticlePos();
//     }
//     setGUI() {
//         const material = this.material;
//         const particleFolder = gui.addFolder('Particle Settings');
//         particleFolder.addColor(this.options, "color").name('Color').onChange(function (e) {
//             const newColor = new THREE.Color(e.r / 255, e.g / 255, e.b / 255);
//             material.uniforms["color"].value = new THREE.Color(newColor);
//         });
//         particleFolder.add(this.options, "speed", 1, 50).name('Speed').onChange((e) => this.options.speed = e);
//         particleFolder.add(this.options, "spacing", 2, 20).name('Spacing').onChange((e) => {
//             this.options.spacing = e;
//             this.updateParticlePos();
//         });
//         particleFolder.add(this.options, "scale", 1, 50).name('Particals Scale').onChange((e) => {
//             this.options.scale = e;
//             this.calParticlePos();
//         });
//         particleFolder.add(this.options, "radius", 2, 20).name('Radius').onChange((e) => {
//             this.options.radius = e;
//             this.changeGeomatry();
//         });
//         particleFolder.add(this.options, "InfluenceRadius", 1, 100).name('Influence Radius').onChange((e) => {
//             this.options.InfluenceRadius = e;
//         });
//         particleFolder.add(this.options, "repulsionStrength", 1, 10).name('repulsion Strength').onChange((e) => {
//             this.options.repulsionStrength = e;
//         });
//     }
//     setLimit(lx: number, ly: number, ir: number) {
//         this.LimitX = lx / 2 - 10;
//         this.LimitY = ly / 2 - 10;
//         this.options.InfluenceRadius = ir;
//     }
//     private updateParticleDirection() {
//         const P = this.Particles;
//         const ir = this.options.InfluenceRadius;

//         P.forEach(cp => {
//             let repulsion = new THREE.Vector3();
//             const x = cp.position.x;
//             const y = cp.position.y;
//             const pxLimit = x + ir;
//             const mxLimit = x - ir;
//             const pyLimit = y + ir;
//             const myLimit = y - ir;
//             P.forEach(op => {
//                 if (cp !== op) {
//                     if ((mxLimit < op.position.x && op.position.x < pxLimit) && (myLimit < op.position.y && op.position.y < pyLimit)) {
//                         const direction = cp.position.clone().sub(op.position).normalize();
//                         const distance = cp.position.distanceTo(op.position);
//                         const repulsionForce = direction.multiplyScalar(this.options.repulsionStrength / distance);
//                         if ((x - 10 < op.position.x && op.position.x < x + 10) && (y - 10 < op.position.y && op.position.y < y + 10)) {
//                             (cp.userData["velocity"] as THREE.Vector3).sub(direction.negate().multiplyScalar(0.5));
//                             (op.userData["velocity"] as THREE.Vector3).sub(direction.multiplyScalar(0.5));
//                         }
//                         repulsion.add(repulsionForce);
//                         (op.userData["velocity"] as THREE.Vector3).sub(repulsionForce);
//                     }
//                 }
//             });
//             (cp.userData["velocity"] as THREE.Vector3)?.add(repulsion)?.multiplyScalar(1);
//             cp.userData["speed"] = this.options.speed;
//         });
//     }
//     startAnimation() {
//         this.isAnimateSet = true;
//         const P = this.ParticleAnimation
//         Animate.push(() => P.forEach(p => p()));
//         setInterval(() => this.updateParticleDirection(), 1_00);
//     }
// }