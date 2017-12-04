const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('gameDisplay'), antialias: true});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xaaffff, 0.5);
light.position.x = -500;
light.position.y = 50;
light.position.z = 1000;
scene.add(light)

const light2 = new THREE.PointLight(0xffaaff, 0.5);
light2.position.x = 500;
light2.position.y = 50;
light2.position.z = 1000;
scene.add(light2)

const sphere1 = new THREE.SphereGeometry(75, 100, 100);
const sphere2 = new THREE.SphereGeometry(75, 100, 100);
const sphere3 = new THREE.SphereGeometry(75, 100, 100);
const sphere4 = new THREE.SphereGeometry(75, 100, 100);

const material1 = new THREE.MeshLambertMaterial({color: 0x00FF00});
const material2 = new THREE.MeshLambertMaterial({color: 0x0000FF});
const material3 = new THREE.MeshLambertMaterial({color: 0xFF0000});
const material4 = new THREE.MeshLambertMaterial({color: 0xFFFF00});
const mesh1 = new THREE.Mesh(sphere1, material1);
const mesh2 = new THREE.Mesh(sphere2, material2);
const mesh3 = new THREE.Mesh(sphere3, material3);
const mesh4 = new THREE.Mesh(sphere4, material4);

mesh1.position.x = -500;
mesh1.position.y = 50;
mesh1.position.z = -1000;

mesh2.position.x = -175;
mesh2.position.y = 175;
mesh2.position.z = -1000;

mesh3.position.x = 175;
mesh3.position.y = 175;
mesh3.position.z = -1000;

mesh4.position.x = 500;
mesh4.position.y = 50;
mesh4.position.z = -1000;

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);

requestAnimationFrame(render);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
