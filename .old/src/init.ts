import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

let Canvas: HTMLCanvasElement;
export const scene = new THREE.Scene();

// ############ Camera #####################
const perspectiveCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | null = null;
export function Camera() {
    if (!camera) camera = perspectiveCamera;
    return camera
}

// ############ Renderer #####################
let renderer: THREE.WebGLRenderer | null = null;
export function Renderer() {
    if (!renderer) renderer = new THREE.WebGLRenderer({ antialias: true, canvas: Canvas });
    return renderer;
}

// ############ OrbitControls #####################
let controls: OrbitControls | null = null;
export function Controls() {
    if (!controls) controls = new OrbitControls(Camera(), Canvas);
    return controls;
}

// ############ Helper's #####################
const size = 20;
export const gridHelper = new THREE.GridHelper(size, size);
export const axesHelper = new THREE.AxesHelper(size);
export function setHelpers() {
    scene.add(gridHelper);
    scene.add(axesHelper);
}
// plane to revice Shadow only
export const gridPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial | THREE.MeshStandardMaterial, THREE.Object3DEventMap> = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }))
export function setGridePlane() {
    gridPlane.rotation.x = -0.5 * Math.PI;
    const gui = new dat.GUI();
    scene.add(gridPlane);
    const options = { planeColor: 0xffffff, wireframe: false };
    gui.addColor(options, "planeColor").onChange(function (e) { gridPlane.material.color.set(e); });
    gui.add(options, "wireframe").onChange(function (e) { gridPlane.material.wireframe = e; });
}


// ############ for Mesh which require Light Source #####################
export const pointLight = new THREE.PointLight(0xffffff, 1);
export const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
export const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(-10, 20, 0);
ambientLight.position.set(5, 5, 5);
pointLight.position.set(5, 5, 5);
// ambientLight to pointLight
export function changeLight() { 
    scene.remove(ambientLight);
    scene.add(pointLight);
}
// helper for Light Direction
export const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
export const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
export function shadowEnable() {
    gridPlane.material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    scene.add(ambientLight);
    // scene.add(pointLight);
    scene.add(directionalLight);
    scene.add(dLightHelper);
    scene.add(dLightShadowHelper);
    directionalLight.castShadow = true;
    Renderer().shadowMap.enabled = true;
    gridPlane.receiveShadow = true;
}

// ############ Raycaster for ? #####################
export const Raycaster = new THREE.Raycaster();
export const pointer = new THREE.Vector2(0, 0);
export function trackMousePointer(e: MouseEvent) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
}
export const clock = new THREE.Clock();
// ############ Animation Control ? #####################
export const Animate = new Map<string, () => void>();
export function animate(){
    requestAnimationFrame(animate);
    Animate.forEach(A => A());
}

function handleWindowResize(): void {
    let w = window.innerWidth;
    let h = window.innerHeight;
    const camera = Camera();
    Renderer().setSize(w, h);
    if (camera instanceof THREE.PerspectiveCamera) camera.aspect = w / h;
    w /= 2; h /= 2;
    if (camera instanceof THREE.OrthographicCamera) camera.left = -w, camera.right = w, camera.top = h, camera.bottom = -h;
    camera.updateProjectionMatrix();
}
// ############ initilize everything need to call very 1st #####################
// ############ initilize everything need to call very 1st #####################
export function init(canvas: HTMLCanvasElement) {
    Canvas = canvas; 

    perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera.updateProjectionMatrix();

    orthographicCamera.left = window.innerWidth / -2;
    orthographicCamera.right = window.innerWidth / 2;
    orthographicCamera.top = window.innerHeight / 2;
    orthographicCamera.bottom = window.innerHeight / -2;
    orthographicCamera.updateProjectionMatrix();

    Renderer().setPixelRatio(window.devicePixelRatio);
    Controls().target.set(0, 0, 0);
    Camera().position.set(5, 5, 5);
    // Controls().enableDamping = true;
    // Controls().dampingFactor = 0.25;
    Animate.set("controls", () => { Controls().update(); })
    Animate.set("renderer", () => { Renderer().render(scene, Camera()); })
    setHelpers();
    window.addEventListener("mousemove", (e) => trackMousePointer(e));
    window.addEventListener('resize', () => handleWindowResize());
    handleWindowResize();
}

console.log("init run again !");


