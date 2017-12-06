const startText = document.querySelector('div');
const body = document.querySelector('body');

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
scene.add(light);

const light2 = new THREE.PointLight(0xffaaff, 0.5);
light2.position.x = 500;
light2.position.y = 50;
light2.position.z = 1000;
scene.add(light2);

let objects = [];

const sphere1 = new THREE.SphereGeometry(75, 100, 100);
const sphere2 = new THREE.SphereGeometry(75, 100, 100);
const sphere3 = new THREE.SphereGeometry(75, 100, 100);
const sphere4 = new THREE.SphereGeometry(75, 100, 100);
const shooter = new THREE.ConeGeometry(20, 100, 3);
const shot = new THREE.TetrahedronGeometry(6, 0);

const material1 = new THREE.MeshLambertMaterial({color: 0x00FF00});
const material2 = new THREE.MeshLambertMaterial({color: 0x0000FF});
const material3 = new THREE.MeshLambertMaterial({color: 0xFF0000});
const material4 = new THREE.MeshLambertMaterial({color: 0xFFFF00});
const material5 = new THREE.MeshLambertMaterial({color: 0xFF00FF});
const material6 = new THREE.MeshLambertMaterial({color: 0xFFEEDD});

const mesh1 = new THREE.Mesh(sphere1, material1);
const mesh2 = new THREE.Mesh(sphere2, material2);
const mesh3 = new THREE.Mesh(sphere3, material3);
const mesh4 = new THREE.Mesh(sphere4, material4);
const mesh5 = new THREE.Mesh(shooter, material5);
const mesh6 = new THREE.Mesh(shot, material6);

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

mesh5.position.x = 0;
mesh5.position.y = -75;
mesh5.position.z = -500;
mesh5.rotation.x = 75;
mesh5.rotation.y = 0;
mesh5.rotation.z = 0;

mesh6.position.x = 0;
mesh6.position.y = -75;
mesh6.position.z = -500;

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);

objects.push(mesh1);
objects.push(mesh2);
objects.push(mesh3);
objects.push(mesh4);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let playerChoiceArr = [];

function onSpacePress(event) {
	event.preventDefault();
	if (event.code == 'Space') {
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mousedown', onMouseDown, false);
		body.removeChild(startText);
		lightUpSphere();
		document.removeEventListener('keyup', onSpacePress)
	};
};

function onMouseMove(event) {
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mesh5.rotation.z = -mouse.x * 1.5;
};

function onMouseDown(event) {
	event.preventDefault();

	mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
	mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(objects);

	if (intersects.length > 0) {
		let spherePosition = intersects[0].object.position.x;
		addSphereToArray(spherePosition);
		intersects[0].object.material.color.setHex(0xffffff);
		setTimeout(getTone, 275, spherePosition);
		setTimeout(impact, 275);
		setTimeout(revertBack, 300);
		shoot(intersects);
		shotSound();
		setTimeout(compareArrays, 100);
	};
};

function addSphereToArray(spherePos) {
	switch (spherePos) {
		case -500:
			playerChoiceArr.push(1);
			break;
		case -175:
			playerChoiceArr.push(2);
			break;
		case 175:
			playerChoiceArr.push(3);
			break;
		case 500:
			playerChoiceArr.push(4);
			break;
	};
};

function compareArrays() {
	for (i=0; i < playerChoiceArr.length;) {
		if ((playerChoiceArr[i] !== arr[i]) || (playerChoiceArr.length === arr.length && playerChoiceArr[playerChoiceArr.length-1] !== arr[arr.length-1])) {
			playerChoiceArr = [];
			arr = [];
			setTimeout(lightUpSphere, 1500);
			break;
		} else if (playerChoiceArr[i] === arr[i] && playerChoiceArr.length < arr.length) {
			i++;
		} else if (playerChoiceArr[i] === arr[i] && playerChoiceArr.length === arr.length) {
			setTimeout(lightUpSphere, 1500);
			break;
		}
	}
};

function shoot(intersects) {
	scene.add(mesh6);
	let posX = intersects["0"].point.x;
	let posY = intersects["0"].point.y;
	let posZ = intersects["0"].point.z;
	let frames = requestAnimationFrame(render);
	let arrX = [];
	let arrY = [];
	let arrZ = [];
	let position = {x: 0, y: -75, z: -500};
	let target = {x: posX, y: posY, z: posZ};
	var tween = new TWEEN.Tween(mesh6.position)
		.to(target, 150)
		.start()
	animate();
	setTimeout(removeShot, 150)
};

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	renderer.render(scene, camera);
	mesh6.position.x = 0;
	mesh6.position.y = -75;
	mesh6.position.z = -500;
};

function removeShot() {
	scene.remove(mesh6)
}


document.addEventListener('keyup', onSpacePress, false);

requestAnimationFrame(render);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
