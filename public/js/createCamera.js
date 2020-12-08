import * as THREE  from 'super-three';


// Field of View. Camera frustum vertical field, from bottom to top of view, in degrees.
// The larger this is the more extreme is perspective distortion.
const FOV = 60;

// Camera frustum aspect ratio. Usually the canvas width / canvas height.
const ASPECT_RATIO = window.innerWidth / window.innerHeight;

// Camera frustum near clipping plane.
const NEAR_CLIP = 0.1;


const Z_POSITION = 0; //1750;


export default function(farClip, sceneZ) {
    const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR_CLIP, farClip);
    camera.position.z = Z_POSITION;

    const color = 0xFFFFFF;
    const intensity = 0.2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(10, -20, -40);
    light.target.position.set(0, 0, sceneZ);
    camera.add(light);

    return camera;
}
