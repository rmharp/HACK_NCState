// // import * as THREE from 'three';
// // import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
// // import { useEffect, useRef } from "react";

// // function Box() {
// //   function loadTheModel(){
// //     const loader = new OBJLoader();
// //     loader.load(
// //       '../models/rat_obj.obj',
// //       ( object ) => { 
// //         this.scene.add( object );
// //         const el = this.scene.getObjectByName("Box002");
// //         el.position.set(0, -150,0 );
// //         el.material.color.set(0x50C878);
// //         el.rotation.x = 23.5;
// //         this.model = el;
// //       },
// //       undefined,
// //       ( error ) => {
// //         console.log( 'An error happened:' + error );
// //       }
// //     );
// //   };






// //   const refContainer = useRef(null);
// //   useEffect(() => {
// //     // === THREE.JS CODE START ===
// //     var scene = new THREE.Scene();
// //     var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// //     var renderer = new THREE.WebGLRenderer();
// //     renderer.setSize(window.innerWidth, window.innerHeight);
// //     // document.body.appendChild( renderer.domElement );
// //     // use ref as a mount point of the Three.js scene instead of the document.body
// //     refContainer.current && refContainer.current.appendChild( renderer.domElement );
// //     // var geometry = new THREE.BoxGeometry(1, 1, 1);
// //     // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// //     // var cube = new THREE.Mesh(geometry, material);
// //     // scene.add(cube);
// //     loadTheModel()
// //     camera.position.z = 5;
// //     var animate = function () {
// //       requestAnimationFrame(animate);
// //       cube.rotation.x += 0.01;
// //       cube.rotation.y += 0.01;
// //       renderer.render(scene, camera);
// //     };
// //     animate();
// //   }, []);
// //   return (
// //     <div ref={refContainer}></div>

// //   );
// // }

// // export default Box

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// const style = {
//     height: 500 // we can control scene size by setting container dimensions
// };

// const Box = () => {
//     const mount = useRef(null);
//     const [loadingPercentage, setLoadingPercentage] = useState(0);
//     const [isMounted, setIsMounted] = useState(true);
//     let scene, camera, renderer, controls, model, requestID;

//     useEffect(() => {
//         const sceneSetup = () => {
//             const width = mount.current.clientWidth;
//             const height = mount.current.clientHeight;

//             scene = new THREE.Scene();
//             camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//             camera.position.z = 500;
//             controls = new OrbitControls(camera, mount.current);
//             renderer = new THREE.WebGLRenderer();
//             renderer.setSize(width, height);
//             mount.current.appendChild(renderer.domElement);
//         };

//         const loadTheModel = () => {
//             const loader = new OBJLoader();

//             loader.load(
//                 '../models/rat_obj.obj',
//                 (object) => {
//                     scene.add(object);

//                     const el = scene.getObjectByName("Box002");
//                     el.position.set(0, -150, 0);
//                     el.material.color.set(0x50C878);
//                     el.rotation.x = 23.5;

//                     model = el;
//                 },
//                 (xhr) => {
//                     setLoadingPercentage((xhr.loaded / xhr.total) * 100);
//                 },
//                 (error) => {
//                     console.error('An error happened:', error);
//                 }
//             );
//         };

//         const addLights = () => {
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
//             if (model) model.rotation.z += 0.005;

//             renderer.render(scene, camera);
//             requestID = window.requestAnimationFrame(startAnimationLoop);
//         };

//         const handleWindowResize = () => {
//             const width = mount.current.clientWidth;
//             const height = mount.current.clientHeight;

//             renderer.setSize(width, height);
//             camera.aspect = width / height;
//             camera.updateProjectionMatrix();
//         };

//         sceneSetup();
//         addLights();
//         loadTheModel();
//         startAnimationLoop();
//         window.addEventListener('resize', handleWindowResize);

//         return () => {
//             window.removeEventListener('resize', handleWindowResize);
//             window.cancelAnimationFrame(requestID);
//             controls.dispose();
//         };
//     }, []);

//     return (
//         <>
//             <div style={style} ref={mount} />
//             <div>
//                 <button onClick={() => setIsMounted(!isMounted)}>
//                     {isMounted ? "Unmount" : "Mount"}
//                 </button>
//                 {isMounted && loadingPercentage === 100 && <div>Scroll to zoom, drag to rotate</div>}
//                 {isMounted && loadingPercentage !== 100 && <div>Loading Model: {loadingPercentage}%</div>}
//             </div>
//         </>
//     );
// };

// export default Box;
