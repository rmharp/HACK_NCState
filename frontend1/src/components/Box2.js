// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// const style = {
//     height: 500 // Set the scene height
// };

// const Box2 = ({ onProgress }) => {
//     const mount = useRef(null);
//     const [scene, setScene] = useState(null);
//     const [camera, setCamera] = useState(null);
//     const [renderer, setRenderer] = useState(null);
//     const [controls, setControls] = useState(null);
//     const [model, setModel] = useState(null);
//     const [requestID, setRequestID] = useState(null);

//     useEffect(() => {
//         const sceneSetup = () => {
//             const width = mount.current.clientWidth;
//             const height = mount.current.clientHeight;

//             const newScene = new THREE.Scene();
//             const newCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//             newCamera.position.z = 500;
//             const newRenderer = new THREE.WebGLRenderer();
//             newRenderer.setSize(width, height);
//             mount.current.appendChild(newRenderer.domElement);
//             const newControls = new OrbitControls(newCamera, mount.current);

//             setScene(newScene);
//             setCamera(newCamera);
//             setRenderer(newRenderer);
//             setControls(newControls);
//         };

//         const loadTheModel = () => {
//             const loader = new OBJLoader();

//             loader.load(
//                 '../models/eleph.obj',
//                 (object) => {
//                     if (!scene) return; // Guard clause to ensure scene is defined
//                     scene.add(object);

//                     const el = scene.getObjectByName("Elephant_4");
//                     el.position.set(0, -150, 0);
//                     el.material.color.set(0x50C878);
//                     el.rotation.x = 23.5;

//                     setModel(el);
//                 },
//                 (xhr) => {
//                     const loadingPercentage = Math.ceil(xhr.loaded / xhr.total * 100);
//                     onProgress(loadingPercentage);
//                 },
//                 (error) => {
//                     console.error('An error happened:', error);
//                 }
//             );
//         };

//         const addLights = () => {
//             if (!scene) return; // Guard clause to ensure scene is defined

//             const lights = [];

//             lights[0] = new THREE.PointLight(0xffffff, 1, 0);
//             lights[1] = new THREE.PointLight(0xffffff, 1, 0);
//             lights[2] = new THREE.PointLight(0xffffff, 1, 0);

//             lights[0].position.set(0, 2000, 0);
//             lights[1].position.set(1000, 2000, 1000);
//             lights[2].position.set(-1000, -2000, -1000);

//             scene.add(lights[0]);
//             scene.add(lights[1]);
//             scene.add(lights[2]);
//         };

//         const startAnimationLoop = () => {
//             if (!scene || !model) return; // Guard clause to ensure scene and model are defined

//             model.rotation.z += 0.005;

//             renderer.render(scene, camera);
//             const newRequestID = window.requestAnimationFrame(startAnimationLoop);
//             setRequestID(newRequestID);
//         };

//         const handleWindowResize = () => {
//             const width = mount.current.clientWidth;
//             const height = mount.current.clientHeight;

//             if (!renderer || !camera) return; // Guard clause to ensure renderer and camera are defined

//             renderer.setSize(width, height);
//             camera.aspect = width / height;
//             camera.updateProjectionMatrix();
//         };

//         if (!scene) {
//             sceneSetup();
//             addLights();
//             loadTheModel();
//             window.addEventListener('resize', handleWindowResize);
//         }

//         return () => {
//             window.removeEventListener('resize', handleWindowResize);
//             window.cancelAnimationFrame(requestID);
//             if (controls) controls.dispose();
//         };
//     }, [scene, camera, renderer, controls, model, requestID, onProgress]);

//     return (
//         <>
//             <div style={style} ref={mount} />
//         </>
//     );
// };

// export default Box;
