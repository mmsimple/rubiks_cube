import {
  Vector3,
  Scene,
  ArrowHelper
} from '../../node_modules/three/build/three.module.js';
import {
  initRenderer,
  initOrthographicCamera,
  createAxesHelper,
  initDefaultLighting
} from '../common.js';
import { OrbitControls } from '../OrbitControls.js';

(function() {
  init();
})();

function init() {
  const renderer = initRenderer();
  const camera = initOrthographicCamera();
  const scene = new Scene();
  //   const groundPlane = addLargeGroundPlane(scene);
  //   groundPlane.position.y = -0.01;

  initDefaultLighting(scene);
  createAxesHelper(scene);

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
  const dir = new Vector3(1, 0, 0).normalize();
  const origin = new Vector3(0, 0, 0);
  const arrowHelper = new ArrowHelper(dir, origin, 4, 'blue', 1, 0.5);
  scene.add(arrowHelper);
}
