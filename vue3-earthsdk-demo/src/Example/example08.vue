
<script setup lang='ts'>
import {
    ESGeoLineString,
    ESGeoPolygon,
    ESGeoRectangle,
} from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';

import { getESObjectsManager } from '@/scripts/getESObjectsManager';
const objm = getESObjectsManager()

// 折线:ESGeoLineString
// 多边形:ESGeoPolygon
// 矩形:ESGeoRectangle

//场景对象创建方式都一致,参考“对象的创建与销毁”章节
const addLineString = () => {    //添加折线
    const sceneObject = objm.createSceneObject('ESGeoLineString') as ESGeoLineString | undefined
    if (!sceneObject) return;
    sceneObject.editing = true;
}
const addPolygon = () => {    //添加多边形
    const sceneObject = objm.createSceneObject('ESGeoPolygon') as ESGeoPolygon | undefined
    if (!sceneObject) return;
    sceneObject.editing = true;
}
const addRectangle = () => {    //添加矩形
    const sceneObject = objm.createSceneObject('ESGeoRectangle') as ESGeoRectangle | undefined
    if (!sceneObject) return;
    sceneObject.editing = true;
}

</script>

<template>
    <div style="position: absolute;left: 0;top:0">
        <button @click="addLineString()">添加折线</button>
        <button @click="addPolygon()">添加多边形</button>
        <button @click="addRectangle()">添加矩形</button>
    </div>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
