<template>
  <div id="particle"></div>
</template>
<script>
// import * as THREE from 'three'

export default {
  name: 'Particle',
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let THREE = this.THREE
      let stats = this.InitThree.initStats()
      let scene = new THREE.Scene()
      // let camera = this.IintThree.initCamera()
      // let renderer = this.IintThree.initRenderer('particle')
      let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.set(new THREE.Vector3(20, 0, 150))
      camera.lookAt(new THREE.Vector3(20, 30, 0))

      let renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(new THREE.Color(0x000000))
      renderer.setSize(window.innerWidth, window.innerHeight)

      let axes = new THREE.AxesHelper(20)
      scene.add(axes)

      let geometry = new THREE.PlaneGeometry(5, 20, 30)
      let material = new THREE.MeshBasicMaterial({
        color: 0xfff00,
        side: THREE.DoubleSide
      })
      let plane = new THREE.Mesh(geometry, material)
      plane.position.set(0, 0, 0)
      scene.add(plane)

      let group

      camera.position.set(-30, 40, 30)
      camera.lookAt(scene.position)

      createSprites()
      document.getElementById('particle').appendChild(renderer.domElement)
      renderer.render(scene, camera)
      render()

      function getTexture () {
        let texture = new THREE.TextureLoader().load('../../static/sprite-sheet.png')
        return texture
      }

      function createSprites () {
        group = new THREE.Object3D()
        let range = 200
        for (let i = 0; i < 400; i++) {
          group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range))
        }
        scene.add(group)
      }

      function createSprite (size, transparent, opacity, color, spriteNumber, range) {
        let spriteMaterial = new THREE.SpriteMaterial({
          opacity: opacity,
          color: color,
          transparent: transparent,
          map: getTexture()
        })

        // 纹理在表面上绘制时的偏移，在UV方向上
        spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0)
        // 纹理在表面上重复多少次，在UV方向上，任一方向的repeat设置大于1,则相应的wrap参数也应该设置为THREE.RepeatWrapping/MirroredRepeatWrapping以实现所需要的平铺
        spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1)
        // 是否使用深度测试,默认为true
        spriteMaterial.map.depthTest = false

        spriteMaterial.blending = THREE.AdditiveBlending

        let sprite = new THREE.Sprite(spriteMaterial)
        sprite.scale.set(size, size, size)
        sprite.position.set(1000, size / 2, 0)
        sprite.position.set(
          Math.random * range - range / 2,
          Math.random * range - range / 2,
          Math.random * range - range / 2
        )

        return sprite
      }

      function render () {
        stats.update()

        group.rotation.x += 0.01
        requestAnimationFrame(render)
        renderer.render(scene, camera)
      }
    }
  }
}
</script>
<style scoped>
</style>
