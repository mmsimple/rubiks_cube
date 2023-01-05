/*
 * _______________#########_______________________
 * ______________############_____________________
 * ______________#############____________________
 * _____________##__###########___________________
 * ____________###__######_#####__________________
 * ____________###_#######___####_________________
 * ___________###__##########_####________________
 * __________####__###########_####_______________
 * ________#####___###########__#####_____________
 * _______######___###_########___#####___________
 * _______#####___###___########___######_________
 * ______######___###__###########___######_______
 * _____######___####_##############__######______
 * ____#######__#####################_#######_____
 * ____#######__##############################____
 * ___#######__######_#################_#######___
 * ___#######__######_######_#########___######___
 * ___#######____##__######___######_____######___
 * ___#######________######____#####_____#####____
 * ____######________#####_____#####_____####_____
 * _____#####________####______#####_____###______
 * ______#####______;###________###______#________
 * ________##_______####________####______________
 *              神兽保佑            永无BUG
 */

/*
 * @Date: 2022-11-10 15:36:44
 * @LastEditors: wuyifan wuyifan@max-optics.com
 * @LastEditTime: 2022-11-11 17:08:42
 * @FilePath: /aquaman/example/RodriguesRotationFormula.js
 */
/* eslint-disable no-unused-vars */

import { Vector3, Matrix4 } from '../node_modules/three/build/three.module.js';
/**
 * @description: use Rodrigues` rotation formula to create rotate matrix
 * @param {vec3} vec3Before
 * @param {vec3} vec3After
 * @return {mat4} rotate matrix
 */
function rotationFormula(vec3Before, vec3After) {
  const rotationAxis = new Vector3().crossVectors(vec3Before, vec3After);

  const rotateAngle = Math.acos(dotProduct(vec3Before, vec3After) / normalizeVec3(vec3Before) * normalizeVec3(vec3After));

  return rotateMatrix(rotateAngle, rotationAxis);
}

/**
 * @description: 求 vec3 的膜长
 * @param {vec3} vec3
 * @return {number}
 */
function normalizeVec3(vec3) {
  const { x, y, z } = vec3;
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * @description:  vec3 dot product
 * @param {*} vec31
 * @param {*} vec32
 * @return {*} number
 */
function dotProduct(vec31, vec32) {
  return vec31.clone().dot(vec32);
}

/**
 * @description: generate rotate matrix
 * @param {number} rotateAngle
 * @param {vec3} rotationAxis
 * @return {mat4} Matrix4
 */
function rotateMatrix(rotateAngle, rotationAxis) {
  const norm = normalizeVec3(rotationAxis);

  const Ux = rotationAxis.x / norm;
  const Uy = rotationAxis.y / norm;
  const Uz = rotationAxis.z / norm;

  const cr = Math.cos(rotateAngle);
  const sr = Math.sin(rotateAngle);

  const m11 = cr + Ux * Ux * (1 - cr);
  const m12 = Ux * Uy * (1 - cr) - Uz * sr;
  const m13 = Uy * sr + Ux * Uz * (1 - cr);

  const m21 = Uz * sr + Ux * Uy * (1 - cr);
  const m22 = Uy * Uy * (1 - cr) + cr;
  const m23 = -Ux * sr + Uy * Uz * (1 - cr);

  const m31 = -Uy * sr + Ux * Uz * (1 - cr);
  const m32 = Ux * sr + Uy * Uz * (1 - cr);
  const m33 = cr + Uz * Uz * (1 - cr);

  return new Matrix4().set(
    m11, m12, m13, 0,
    m21, m22, m23, 0,
    m31, m32, m33, 0,
    0, 0, 0, 1
  );
}

export {
  rotationFormula
};
