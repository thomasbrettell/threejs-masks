import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Load 3D Scene
const scene = new THREE.Scene();

// Load Camera Perspektive
const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  1,
  20000
);
camera.position.set(1, 1, 20);

// Load a Renderer
const renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the Orbitcontroller
const controls = new OrbitControls(camera, renderer.domElement);

// Load Light
const ambientLight = new THREE.AmbientLight(0xcccccc);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0, 1).normalize();
directionalLight.intensity = 4
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff);
directionalLight2.position.set(0, 0, -1).normalize();
directionalLight2.intensity = 4
scene.add(directionalLight2);

// glTf 2.0 Loader
const loader = new GLTFLoader();
loader.load(
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedTriangle/glTF-Embedded/AnimatedTriangle.gltf',
  function (gltf) {
    console.log(gltf);
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.x = 0; //Position (x = right+ left-)
    gltf.scene.position.y = 0; //Position (y = up+, down-)
    gltf.scene.position.z = 0; //Position (z = front +, back-)

    scene.add(gltf.scene);
  }
);

loader.load(
  'https://gist.githubusercontent.com/thomasbrettell/d2e74743234a814f861905946ed3e92d/raw/23801059b5e93d9755bc83b16d09c639293bcce7/mask.gltf',
  function (gltf) {
    console.log(gltf);
    const object = gltf.scene;
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.x = -0; //Position (x = right+ left-)
    gltf.scene.position.y = -25; //Position (y = up+, down-)
    gltf.scene.position.z = -10; //Position (z = front +, back-)
    gltf.scene.receiveShadow = true

    scene.add(gltf.scene);
  }
);

function animate() {
  render();
  requestAnimationFrame(animate);
}

function render() {
  renderer.render(scene, camera);
}

render();
animate();
