/* eslint-disable no-unused-vars */
/*
 * @Date: 2022-11-16 15:00:21
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2022-12-28 17:02:57
 * @FilePath: /aquaman/example/edge/index2.js
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
  PointsMaterial
} from '../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../OrbitControls.js';
import {
  initRenderer,
  initOrthographicCamera,
  initCustomGrid,
  createAxesHelper
} from '../common.js';

import { LineMaterial } from '../LineMaterial.js';
import { LineSegments2 } from '../LineSegments2.js';
import { LineSegmentsGeometry } from '../LineSegmentsGeometry.js';

import { angle2Radians } from '../func.js';
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
}

function draw(scene) {
//   const [x, y, z] = [6, 10, 4];
  var pointArr = [0, 0, 0, 0, 10, 0];

  // 2. 创建 LineGeometry，并设置空间点
  var g = new BoxBufferGeometry(5, 6, 4);
  const edge = new EdgesGeometry(g);
  const l = new LineSegments(edge, new LineBasicMaterial({ color: 'green' }));
  const geometry = new LineSegmentsGeometry();
  geometry.fromEdgesGeometry(edge);
  // 3. 创建 LineMaterial，设置颜色和线宽
  var material = new LineMaterial({
    color: 0xff0000,
    linewidth: 3
    // wireframe: true
  });
  // 4. 设置材质分辨率
  material.resolution.set(window.innerWidth, window.innerHeight);
  // 5. 创建 Line2
  var line = new LineSegments2(geometry, material);
  // 6. 计算下线条长度
  //   line.computeLineDistances();
  // 7. 添加到场景
  scene.add(line, l);

  console.log(scene);
}
