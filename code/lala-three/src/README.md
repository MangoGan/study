## 心得

### 阴影
[blog](https://blog.csdn.net/zhengxiaotaozz/article/details/70226311)

必要步骤：
1. 渲染器：renderer.shadowMap.enable = true
（renderer.shadowMap.type，shadowDarkness）
2. 光源以及要产生阴影的物体调用: xxx.castShadow = true
3. 接收者： xxx.receiveShadow = true
4. 此外还要设置光源的相关属性，对于聚光灯需要设置:`shadowCameraNear, shadowCameraFar, shadowCameraFov`，对于平行个要设置`shadowCameraNear/Far/Left/Right/Top/Bottom`，只有这些面围起来的地方才能产生阴影效果
5. 开启`light.shadowCameraVisible = true`来显示阴影照相机的位置


### 渲染

`renderer.render(scene, camera)`是在appendChild之后的