
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerWidth)

document.body.appendChild(renderer.domElement)
window.addEventListener('resize', () => {
  var width = window.innerWidth
  var height = width/(16/9)
  renderer.setSize(width, height)
  camera.size = width/height
  camera.updateProjectionMatrix()
})
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  wireframe: false
})
var cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 3

var update = function() {
  cube.rotation.x += 0.1
  cube.rotation.y += 0.005
}

var render = function() {
  renderer.render(scene, camera)
}

var GameLoop = function() {
  requestAnimationFrame(GameLoop)

  update()
  render()
}

GameLoop()
