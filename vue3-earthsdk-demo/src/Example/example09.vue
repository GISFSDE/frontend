
<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import {
    ESAlarm,
    ESPath,
    ESPolygonFence,
} from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
const objm = getESObjectsManager()

// 报警:ESAlarm
// 电子围栏:ESPolygonFence
// 路径:ESPath

//场景对象创建方式都一致,参考“对象的创建与销毁”章节
const addAlarm = () => {    //添加报警
    const sceneObject = objm.createSceneObject('ESAlarm') as ESAlarm | undefined
    if (!sceneObject) return;
    sceneObject.position = [116.403857, 39.915526, 30]
    sceneObject.radius = 10
}
const addPolygonFence = () => {    //添加电子围栏
    const sceneObject = objm.createSceneObject('ESPolygonFence') as ESPolygonFence | undefined
    if (!sceneObject) return;
    sceneObject.editing = true;
}
const addPath = () => {    //添加路径
    const sceneObject = objm.createSceneObject('ESPath') as ESPath | undefined
    if (!sceneObject) return;
    sceneObject.editing = true;
}

</script>

<template>
    <div style="position: absolute;left: 0;top:0">
        <button @click="addAlarm()">添加报警</button>
        <button @click="addPolygonFence()">添加电子围栏</button>
        <button @click="addPath()">添加路径</button>
    </div>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
