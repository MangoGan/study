<template>
    <div id="text"></div>
</template>
<script>
import * as THREE from 'three'

export default {
  name: 'Circle',
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let scene = new THREE.Scene()
      let camera = new THREE.PerspectiveCamera(
        45,
        window.innerHeight / window.innerHeight,
        0.1,
        10000
      )
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)

      let axes = new THREE.AxesHelper(15)
      scene.add(axes)

      // 画地面坐标系
      let polarGridGeometry = new THREE.CircleGeometry(1000, 512)
      let polarGridMaterial = new THREE.MeshBasicMaterial({
        color: 'white',
        depthWrite: false
        // wireframe: true
      })
      let polarGrid = new THREE.Mesh(polarGridGeometry, polarGridMaterial)
      polarGrid.position.set(0, 0, 0)
      polarGrid.rotateX(0.5 * Math.PI)

      // var polarGridFont =
      let polarGridLoader = new THREE.FontLoader()
      polarGridLoader.load(
        '../../static/helvetiker_regular.typeface.json',
        function (font) {
          let matLite = new THREE.MeshBasicMaterial({
            color: 'blue',
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            depthWrite: false
          })
          new Array(1, 2, 4, 6, 8, 10).forEach(i => {
            let distance = 100 * i
            let radius = distance + 5
            let message = distance.toString() + 'm'
            let shapes = font.generateShapes(message, 12)
            let geometry = new THREE.ShapeGeometry(shapes)
            let textShape = new THREE.BufferGeometry()
            geometry.computeBoundingBox()
            let xMid =
              -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
            geometry.translate(xMid, 0, 0)
            textShape.fromGeometry(geometry)
            let text = new THREE.Mesh(textShape, matLite)
            let rad = Math.PI * (25 / 180)
            text.rotation.z = -(Math.PI / 2 + rad)
            text.position.x = radius * Math.cos(rad)
            text.position.y = -radius * Math.sin(rad)
            text.position.z = -0.2
            scene.add(text)
          })
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        }
      )

      let PolarGridHelpler = new THREE.PolarGridHelper(
        500,
        -1,
        10,
        64,
        'red',
        'red'
      )
      scene.add(PolarGridHelpler)
      scene.add(polarGrid)

      camera.up.set(0, 1, 0)
      camera.position.set(0, 2000, 0)
      camera.lookAt(scene.position)

      document.getElementById('text').appendChild(renderer.domElement)
      renderer.render(scene, camera)
    }
  }
}
</script>
