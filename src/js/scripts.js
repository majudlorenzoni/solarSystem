import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

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

const camera = new THREE.PerspectiveCamera
(
    75,
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.setZ(-90, 140, 140);
orbit.update;

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


const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(mercuryTexture),
    color: 0xffffff, // Cor base do material
    metalness: 0.5,
    roughness: 0.6
});

const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
scene.add(mercury);
mercury.position.x = 28;

const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 300);
scene.add(pointLight);

function animate(){
    sun.rotateY(0.004);
    mercury.rotateY(0.004);
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});