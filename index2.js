import { 
    BoxGeometry,
    Texture,
    MeshLambertMaterial,
    Mesh,
    BoxBufferGeometry
} from './node_modules/three/build/three.module.js'
/**
 * 简易魔方
 * x、y、z 魔方中心点坐标
 * num 魔方阶数
 * len 小方块宽高
 * colors 魔方六面体颜色
 */
function simpleCube(x, y, z, num, len, colors) {
    // 左上角坐标
    const leftUpX = x - num * len / 2
    const leftUpY = y + num * len / 2
    const leftUpZ = z + num * len / 2

    // 根据颜色生成材质
    const materilaArr = []
    for (let i = 0; i < colors.length; i++) {
        const texture = new Texture(faces(colors[i]))
        texture.needsUpdate = true
        const material = new MeshLambertMaterial({map: texture})
        materilaArr.push(material)
    }
    const cubes = []
    const cubegeo = new BoxBufferGeometry(len, len, len)
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num * num; i++) {
            const cube = new Mesh(cubegeo, materilaArr)
            cube.position.x = (leftUpX + len / 2) + (j % num) * len
            cube.position.y = (leftUpY - len / 2) - parseInt(j / num) * len
            cube.position.z = (leftUpZ - len /2) - i * len
            cubes.push(cube)
        }
    }
    return cubes
}

function faces(rgbaColor) {
    const canvas = document.createElement('canvas')
    
}

a = simpleCube(0, 0, 0, 3, 1, ['red', 'red', 'red', 'red', 'red', 'red'])

console.log(a)