import * as three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function spaceCraft2(
    scene: THREE.Scene,
    clock: THREE.Clock,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    THREE: typeof three,
    gui: dat.GUI,
    loader: GLTFLoader
) {
    loader.load('./sps1/scene.gltf', function (gltf) {
        const rotate = {
            x: -0.2,
            y: -1.63,
            z: 0
        }
        const model = gltf.scene
        model.scale.set(1, 1, 1)
        // gui.add(model.position,'x')
        // gui.add(model.position,'y')
        // gui.add(model.position,'z')
        gui.add(model.rotation, 'x').name('spacecraft2 station x').step(.01)
        gui.add(model.rotation, 'y').name('spacecraft2 station y').step(.01)
        gui.add(model.rotation, 'z').name('spacecraft2 station z').step(.01)
        model.rotation.set(rotate.x, rotate.y, rotate.z)
        model.position.set(8.62, 2.92, 9.5)

        scene.add(gltf.scene);
        // camera.lookAt(model.position);

        if (gltf.animations && gltf.animations.length > 0) {
            var mixer = new THREE.AnimationMixer(model);
            var animation = mixer.clipAction(gltf.animations[0]);
            animation.play();
        }
        function animate() {
            requestAnimationFrame(animate);
            // model.rotation.y += clock.getDelta() * -.15
            // model.position.z += clock.getDelta() * -.5
            // model.rotation.x += clock.getDelta() * -.1
            // Update the animation mixer
            if (mixer) {
                mixer.update(clock.getDelta());
            }

            renderer.render(scene, camera);
        }

        animate();
    },function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened',error );

	});
}