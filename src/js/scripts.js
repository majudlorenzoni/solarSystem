import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import * as dat from 'dat.gui';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const gui = new dat.GUI();
const options = {
    pausar: false,
    reiniciar: function() {
        mercury.mesh.rotation.set(0, 0, 0);
        venus.mesh.rotation.set(0, 0, 0);
        earth.mesh.rotation.set(0, 0, 0);
        mars.mesh.rotation.set(0, 0, 0);
        jupiter.mesh.rotation.set(0, 0, 0);
        saturn.mesh.rotation.set(0, 0, 0);
        uranus.mesh.rotation.set(0, 0, 0);
        neptune.mesh.rotation.set(0, 0, 0);
        pluto.mesh.rotation.set(0, 0, 0);

        mercury.obj.rotation.set(0, 0, 0);
        venus.obj.rotation.set(0, 0, 0);
        earth.obj.rotation.set(0, 0, 0);
        mars.obj.rotation.set(0, 0, 0);
        jupiter.obj.rotation.set(0, 0, 0);
        saturn.obj.rotation.set(0, 0, 0);
        uranus.obj.rotation.set(0, 0, 0);
        neptune.obj.rotation.set(0, 0, 0);
        pluto.obj.rotation.set(0, 0, 0);
    }
};


const rotationOptions = gui.addFolder('Controle de Rotação');
rotationOptions.add(options, 'pausar').name('Pausar Rotação');
rotationOptions.add(options, 'reiniciar').name('Reiniciar Rotação');


options.pausar = false; // Inicialmente não pausado

const camera = new THREE.PerspectiveCamera
(
    45,
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);

orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333, 8);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();
const sunMap = textureLoader.load(sunTexture);
sunMap.colorSpace = THREE.SRGBColorSpace

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: sunMap
});

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanet(size, texture, position, ring){
    const planetMap = textureLoader.load(texture);
    planetMap.colorSpace = THREE.SRGBColorSpace
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: planetMap
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
        const ringMap = textureLoader.load(ring.texture);
        ringMap.colorSpace = THREE.SRGBColorSpace
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius, 
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: ringMap,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh: mesh, obj: obj}
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, 
    {
        innerRadius: 10,
        outerRadius: 20,
        texture: saturnRingTexture
    });
    
const uranus = createPlanet(7, uranusTexture, 176, 
        {
            innerRadius: 7,
            outerRadius: 12,
            texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 300);
scene.add(pointLight);

function animate(){
    if(!options.pausar){
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    saturn.mesh.rotateY(0.038);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    }
    renderer.render(scene, camera);

};
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});