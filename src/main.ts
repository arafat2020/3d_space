import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { spaceShipLoader } from './model/spceShip';
import { spaceCraft } from './model/spaceCraft';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// import { spaceCraft2 } from './model/spaceCraft2';

const dracoLoader = new DRACOLoader();
// dracoLoader.setPath('./')
const gui = new dat.GUI();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  alpha: true
});
const LDmanager = new THREE.LoadingManager();
// let mouseX = 0, mouseY = 0;

const loader = new GLTFLoader(LDmanager);
loader.setDRACOLoader(dracoLoader)
const clock = new THREE.Clock()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// set size and aspect
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update()
controls.enableDamping = true
const light = new THREE.PointLight(0xfffefc, 20, 100);
const light2 = new THREE.PointLight(0x2f3c45, 20, 100);

// gui.add(light2.position,'x')
// gui.add(light2.position,'y')
// gui.add(light2.position,'z')
light2.position.set(-48, -24, -37);

light.position.set(5, 61, -21);
scene.add(light);
scene.add(light2);
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( light2, sphereSize );
// scene.add( pointLightHelper );

// star gm start
// star gm end

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 1500; i++) {
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);
  vertices.push(x, y, z);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
// Create a material for the stars
const material = new THREE.PointsMaterial({
  size: 1, // Adjust the size of the stars
  color: 0xffffff,
  transparent: true,
  
});
const points = new THREE.Points(geometry, material);






// Add the points object to the scene
scene.add(points);
// adding model start
async function modelLoader() {
  spaceShipLoader(scene, clock, camera, renderer, THREE, gui, loader)
  spaceCraft(scene, clock, camera, renderer, THREE, gui, loader)
  // spaceCraft2(scene, clock, camera, renderer, THREE, gui, loader)
  
}
modelLoader()
// spaceCraft2(scene, clock, camera, renderer, THREE, gui, loader)
// adding model end

window.addEventListener('mousemove', (e) => {

  // mouseX = (e.clientX - innerWidth * .5) * .003;
  // mouseY = (e.clientY - innerHeight * .5) * .003;

  // controls.enabled = false
})


LDmanager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log(url, itemsLoaded, itemsTotal);
};
LDmanager.onProgress = function (url, loaded, total) {
  let status: HTMLElement | null = document.getElementById("status");
  status && (status.innerHTML = `${loaded} asset: ${url}`);
  if (loaded === total) document.getElementById('app')?.classList.add('hide')

};

LDmanager.onLoad = function () {

  animate()
};
let time = 0;
camera.position.z = 15;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;
  const opacity = Math.abs(Math.sin(time));
  material.opacity = opacity;
  // camera.position.x += (mouseX - camera.position.x) * .05;
  // camera.position.y += (- mouseY - camera.position.y) * .05;
  camera.lookAt(scene.position);
  controls.update();
  renderer.render(scene, camera);
}
animate();
