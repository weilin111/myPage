import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';



function world_3js(container_id) {
    const canvas = document.querySelector('#'+container_id);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 45;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 80);


    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    var cube
    var sphere
    var t = 0



    {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    {
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#ff0000' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        scene.add(mesh);
        sphere = mesh
    }


    {
        const cubeSize = 4;
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#00ff00' });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);
        cube = mesh
            // cube.position.z = 8
        cube.position.y = 4
    }

    var sphere_group=0
    {
        const g= new THREE.Group();
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        let n=20
        let xyz=[1,8,1]
        let r=4
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshStandardMaterial({ color: get_random_Color() });
        const mesh0 = new THREE.Mesh(sphereGeo, sphereMat);
        
        mesh0.position.x=xyz[0]
        mesh0.position.y=xyz[1]
        mesh0.position.z=xyz[2]
        // mesh0.scale.multiplyScalar(0.75);

        g.add(mesh0)

        const color_list=color_gradient(get_random_Color(),get_random_Color(),n)

        for (let i=0;i<n;i++){
            
            const mesh=mesh0.clone()

            mesh.material=new THREE.MeshStandardMaterial({ color: color_list[i] });

            mesh.position.x=xyz[0] +r*Math.sin(2 * Math.PI * i/n)
            mesh.position.y=xyz[1] + r* Math.cos(2 * Math.PI * i/n);
            mesh.position.z=xyz[2]
            
            mesh.scale.multiplyScalar(0.01 + 0.01*i);

            
            g.add(mesh)

        }
   
        sphere_group=g
        scene.add(g)
    }
    
    










    // {
    //     const gltfLoader = new GLTFLoader();
    //     gltfLoader.load('https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
    //         const root = gltf.scene;
    //         scene.add(root);

    //         // compute the box that contains all the stuff
    //         // from root and below
    //         const box = new THREE.Box3().setFromObject(root);

    //         const boxSize = box.getSize(new THREE.Vector3()).length();
    //         const boxCenter = box.getCenter(new THREE.Vector3());

    //         // set the camera to frame the box
    //         frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

    //         // update the Trackball controls to handle the new size
    //         controls.maxDistance = boxSize * 10;
    //         controls.target.copy(boxCenter);
    //         controls.update();
    //     });
    // }

    class ColorGUIHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }
        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

        const gui = new GUI();
        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'intensity', 0, 2, 0.01);
        light.position.set(5, 10, 2);

    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }


    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }



        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        sphere_group.rotation.z+=0.01
        // sphere_group.rotation.y+=0.01



        sphere.position.y = 4 + 2 * Math.cos(Math.PI * 2 * t / 60)

        t = (t + 1) % 60

        renderer.render(scene, camera);




        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
world_3js("world_3js")
