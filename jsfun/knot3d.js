// import { OrbitControls } from '/jsfun/threeOrbitControl.js';
// import { GUI } from '/jsfun/threeGUI.js';

// import { OrbitControls } from 'myPage/jsfun/threeOrbitControl.js';
// import { GUI } from 'myPage/jsfun/threeGUI.js'; 

import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
// import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/loaders/GLTFLoader.js';


var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function get_torus_knot(radius, p, q) {
    const g = new THREE.TorusKnotGeometry(radius, 0.12, 256, 48, p, q)
    const m = new THREE.MeshStandardMaterial({ color: get_random_Color(), wireframe: true, metalness: 0.2 })
    const mesh = new THREE.Mesh(g, m)
        // console([p, q])
    return mesh

}

function rotate_on_self(mesh, xyz) {
    let center = new THREE.Vector3();
    mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox.getCenter(center);
    let x = center.x;
    let y = center.y;
    let z = center.z;

    // 把对象放到坐标原点
    mesh.geometry.center();

    // 绕轴旋转
    mesh.rotation.x += xyz[0]
    mesh.rotation.y += xyz[1]
    mesh.rotation.z += xyz[2]


    // 再把对象放回原来的地方
    mesh.geometry.translate(x, y, z);
    // 版权声明：本文为CSDN博主「六弦的闷音」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/qzmrock/article/details/106175750

}

function get_parameter_surface(func) {

    const m = new THREE.MeshNormalMaterial({ color: get_random_Color() })
    const p = new THREE.ParametricGeometry(func, 128, 128)
    const mesh = new THREE.Mesh(p, m)

    return mesh
}



function klein(v, u, target) {

    u *= Math.PI;
    v *= 2 * Math.PI;

    u = u * 2;
    let x, z;
    if (u < Math.PI) {

        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
        z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);

    } else {

        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
        z = -8 * Math.sin(u);

    }

    const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

    target.set(x, y, z);

}






function world_3js(container_id) {
    // const canvas = document.querySelector('#' + container_id);
    let canvas_container = document.getElementById(container_id)
    var canvas = document.createElement("canvas")
    canvas_container.appendChild(canvas)
    let scale = canvas_container.offsetWidth / 1600

    var unit = 500 * scale * 0.8

    let width = 1600
    let height = 1200

    canvas.style.width = (width * scale) + 'px'
    canvas.style.height = (height * scale) + 'px'



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
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#00fff0', shininess: 150, envMaps: "refraction" });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);
        cube = mesh
            // cube.position.z = 8
        cube.position.y = 4
    }


    var sphere_group = 0


    {
        const g = new THREE.Group();
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        let n = 20
        let xyz = [1, 8, 1]
        let r = 4
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshStandardMaterial({ color: get_random_Color() });
        const mesh0 = new THREE.Mesh(sphereGeo, sphereMat);

        mesh0.position.x = xyz[0]
        mesh0.position.y = xyz[1]
        mesh0.position.z = xyz[2]
            // mesh0.scale.multiplyScalar(0.75);

        g.add(mesh0)

        const color_list = color_gradient(get_random_Color(), get_random_Color(), n)

        for (let i = 0; i < n; i++) {

            const mesh = mesh0.clone()

            mesh.material = new THREE.MeshStandardMaterial({ color: color_list[i] });

            mesh.position.x = xyz[0] + r * Math.sin(2 * Math.PI * i / n)
            mesh.position.y = xyz[1] + r * Math.cos(2 * Math.PI * i / n);
            mesh.position.z = xyz[2]

            mesh.scale.multiplyScalar(0.01 + 0.01 * i);


            g.add(mesh)

        }

        sphere_group = g
        scene.add(g)
    }

    // -----add_by_funtion---2021年4月26日---------------

    var torus_knot_group = new THREE.Group()
    var text_mesh = 0
    var mobius = 0
    var klein_mesh = 0



    {
        let n=getRandomInt(4,10)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const g = get_torus_knot(1.5, 2 + i, 3 + j)
                g.position.x = -16 + 6 * i
                g.position.y = 5 + 6 * j
                g.position.z = -10
                torus_knot_group.add(g)

            }
        }

        // const g = new THREE.TextGeometry("Beauty", { size: 14 })
        // const m = new THREE.MeshStandardMaterial({ color: get_random_Color() })
        // text_mesh = new THREE.Mesh(g, m)
        // scene.add(text_mesh)

        const mobius_func = function(u, t, target) {
            u *= Math.PI;
            t *= 2 * Math.PI;

            u = u * 2;
            const phi = u / 2;
            const major = 2.25,
                a = 0.125,
                b = 0.65;

            let x = a * Math.cos(t) * Math.cos(phi) - b * Math.sin(t) * Math.sin(phi);
            const z = a * Math.cos(t) * Math.sin(phi) + b * Math.sin(t) * Math.cos(phi);
            const y = (major + x) * Math.sin(u);
            x = (major + x) * Math.cos(u);

            target.set(x, y, z);

        }

        mobius = get_parameter_surface(mobius_func)
        mobius.position.y = 15
        mobius.position.x = 20


        klein_mesh = get_parameter_surface(klein)
        klein_mesh.position.y = 15
        klein_mesh.position.x = -20
        klein_mesh.scale.multiplyScalar(0.6);


        scene.add(klein_mesh)
        scene.add(mobius)


        scene.add(torus_knot_group)
    }


    //--------2021年4月26日-----------------------------

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

        sphere.position.y = 4 + 2 * Math.cos(Math.PI * 2 * t / 60)
        t = (t + 1) % 60

        sphere_group.rotation.z += 0.01

        for (let i = 0; i < torus_knot_group.children.length; i++) {
            rotate_on_self(torus_knot_group.children[i], [0, 0.01, 0.01])
        }
        rotate_on_self(mobius, [0.01, 0.01, 0.01])

        rotate_on_self(klein_mesh, [0.01, 0.01, 0.01])


        renderer.render(scene, camera);


        requestAnimationFrame(render);

    }

    requestAnimationFrame(render);
}
world_3js("canva_container")