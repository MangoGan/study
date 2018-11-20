function resize (camera, renderer) {
  let width = window.innerWidth
  let height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

window.utils = {
  'resize': resize
}
