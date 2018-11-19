import {Stats} from 'three-stats'

let THREE = this.THREE
window.THREE = THREE
export function initRenderer (id) {
  let renderer = new THREE.WebGLRenderer()

  renderer.shadowMap.enable = true
  renderer.shadowMapSoft = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  renderer.setClearColor(new THREE.Color(0x000000))
  // renderer.shadowMap.enable = true
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.getElementById(id).appendChild(renderer)
  return renderer
}

export function initCamera (initialPosition) {
  let position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30)
  let camera = new this.PerspectiveCamera(45, window.innerWidth, window.innerHeight, 0.1, 1000)
  camera.position.copy(position)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  return camera
}

export function initStats (type) {
  let panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0
  let stats = new Stats()
  stats.showPanel(panelType)
  document.body.appendChild(stats.dom)

  return stats
}
