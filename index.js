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

(function () {
    init();
})();

function init() {
    const renderer = initRenderer();
    const camera = initOrthographicCamera(new Vector3(-100, 100, 100));
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
    console.log(renderer.domElement);
    // document.addEventListener('mousedown')

    renderer.domElement.addEventListener('mousedown',(e)=>{
        console.log('down',e);
    })
    renderer.domElement.addEventListener('mouseup',(e)=>{
        console.log('up',e);
    })
}


function createMatterial(index) {
    var colors = ['red', 'yellow', 'skyBlue', 'white', 'green', 'orange']
    return new MeshBasicMaterial({
        color: colors[index]
    });
}

function draw(scene) {
    // var materials = [
    //     createMatterial(0),
    //     createMatterial(1),
    //     createMatterial(2),
    //     createMatterial(3),
    //     createMatterial(4),
    //     createMatterial(5),
    // ]
    // console.log(scene);
    // const geometry = new BoxBufferGeometry(1, 1, 1);
    // const mesh = new Mesh(geometry, materials);
    // const mesh2 = new Mesh(geometry, materials);
    // // // mesh.position.set(1,1,1);
    // // // mesh.setRotationFromEuler(new Euler(45,0,0))
    // // //  缩放 默认为1
    // // // const scaleMatrix = new Matrix4().makeScale(1,1,1);
    // // // 旋转
    // // // const rotateMatrix = new Matrix4().makeRotationFromEuler(new Euler(45,0,0));
    // // // 位移
    // const translationMatrix = new Matrix4().makeTranslation(-1,-1,1);
    // // // T * R * S
    // mesh.applyMatrix4(translationMatrix)

    // const translationMatrix2 = new Matrix4().makeTranslation(1,-1,1);
    // mesh2.applyMatrix4(translationMatrix2)
    // scene.add(mesh);
    // scene.add(mesh2);
    createMesh(3, scene, 0.1)
}


function createMesh(num, scene, offset = 0) {
    const cubes = []
    const leftUpX = -(num -1) / 2
    const leftUpY = -(num -1) / 2
    const leftUpZ = (num -1) / 2
    const position = []
    var materials = [
        createMatterial(0),
        createMatterial(1),
        createMatterial(2),
        createMatterial(3),
        createMatterial(4),
        createMatterial(5),
    ]
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num * num; j++) {
            position[0] = (leftUpX + j % num) + (j % num * offset)
            position[1] = (leftUpY + parseInt(j / num)) + parseInt(j / num) * offset
            position[2] = (leftUpZ - i) - offset * i
            console.log(position)
            var geometry = new BoxBufferGeometry(1, 1, 1);
            const mesh = new Mesh(geometry, materials);
            const translationMatrix = new Matrix4().makeTranslation(position[0], position[1], position[2]);
            mesh.applyMatrix4(translationMatrix)
            scene.add(mesh)
        }
    }
}



