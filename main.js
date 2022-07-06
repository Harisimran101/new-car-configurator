import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js';

         const colorpicker = document.querySelector('.color');

         
         
         const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
                antialias: true
            });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;




          const controls = new OrbitControls( camera, renderer.domElement );



          new RGBELoader()
					.load( 'studio.hdr', function ( texture, textureData ) {
						texture.mapping = THREE.EquirectangularReflectionMapping;

						scene.background = texture;
					
						scene.environment = texture;

					

					} );


			camera.position.z = 5;

            let model;
            let carbody;

            const loader = new GLTFLoader();
            loader.load('car.glb', (gltf) =>{
                console.log(gltf)
                model = gltf.scene;
                scene.add(model)

                model.traverse((child) =>{
                    if(child.name == 'car-body'){
                        carbody = child;
                    }
                })

       
                

            })

            colorpicker.addEventListener('input', (e) =>{
                carbody.material.color.set(e.target.value)
            })

			function animate() {
				requestAnimationFrame( animate );

                controls.update();
				renderer.render( scene, camera );
			};

			animate();