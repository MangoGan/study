function init() {
	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.setSize(window.innerWidth, window.innerHeight);

	var axes = new THREE.AxesHelper(20);
	scene.add(axes);

	var planeGeometry = new THREE.PlaneGeometry(60, 20);
	var planeMaterial = new THREE.MeshBasicMaterial({
		color: 0xAAAAAA
	});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;

	scene.add(plane);

	//create a cube
	var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
	var cubeMaterial = new THREE.MeshBasicMaterial({
		color: 0xFF0000,
		wireframe: true
	});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	cube.position.set(-4, 3, 0);

	scene.add(cube);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    document.getElementById('webgl-output').appendChild(renderer.domElment);

    renderer.render(scene, camera);


}