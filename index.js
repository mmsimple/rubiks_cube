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
  } from './common.js';
import { OrbitControls } from './OrbitControls.js';


function init() {
    const renderer = initRenderer();
}