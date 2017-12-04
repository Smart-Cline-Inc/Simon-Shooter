const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('gameDisplay'), antialias: true});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light)

const light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2)

const circle1 = new THREE.CircleGeometry(75, 100);
const circle2 = new THREE.CircleGeometry(75, 100);
const circle3 = new THREE.CircleGeometry(75, 100);
const circle4 = new THREE.CircleGeometry(75, 100);

const material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
const mesh1 = new THREE.Mesh(circle1, material);
const mesh2 = new THREE.Mesh(circle2, material);
const mesh3 = new THREE.Mesh(circle3, material);
const mesh4 = new THREE.Mesh(circle4, material);

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
