/* eslint-disable no-unused-vars */
/*
 * @Date: 2022-11-16 15:00:21
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2022-12-23 17:27:35
 * @FilePath: /aquaman/example/edge/index.js
 */

import {
    Scene,
    Mesh,
    BufferGeometry,
    Vector3,
    DoubleSide,
    LineBasicMaterial,
    EdgesGeometry,
    BufferAttribute,
    LineSegments,
    MeshBasicMaterial,
    BoxBufferGeometry,
    MeshLambertMaterial,
    Matrix4,
    Euler,
    Quaternion,
    Points,
    PointsMaterial,
    BoxGeometry,
  } from './node_modules/three/build/three.module.js';
  import { OrbitControls } from './OrbitControls.js';
  import {
    initRenderer,
    initOrthographicCamera,
    initCustomGrid,
    createAxesHelper
  } from './common.js';
  
  (function() {
    init();
  })();
  
  function init() {
    const renderer = initRenderer();
    const camera = initOrthographicCamera(new Vector3(100, -100, 100));
    camera.up.set(0, 0, 1);
    const scene = new Scene();
    createAxesHelper(scene);
    renderer.setClearColor(0xffffff);
    initCustomGrid(scene);
  
    const controls = new OrbitControls(camera, renderer.domElement);
    draw(scene);
  
    render();
    function render() {
      controls.update();
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    console.log(scene);
  }
  
  function draw(scene) {
    // const [x, y, z] = [6, 10, 4];
    // const g = new BoxBufferGeometry(x, y, z);
    // const lm = new LineBasicMaterial({ color: 'red' });
    // const e = new EdgesGeometry(g);
    // const l = new LineSegments(e, lm);
    // createMesh(l, x, y, z, scene);
    // scene.add(l);
  
    // console.log(scene);
    const geometry = new BoxGeometry(100, 100, 100);
    const material = new MeshLambertMaterial({
        color: 0x0000ff
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
  }
  

  
 