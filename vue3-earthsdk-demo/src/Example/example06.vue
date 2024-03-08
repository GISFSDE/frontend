
<script setup lang='ts'>
import { ref } from 'vue';
import {
    ESGeoDistanceMeasurement,
    ESGeoAreaMeasurement,
    ESGeoHeightMeasurement,
    ESGeoLocationMeasurement,
    ESGeoDirectionMeasurement
} from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';

import { getESObjectsManager } from '@/scripts/getESObjectsManager';
const objm = getESObjectsManager()

// 距离测量:ESGeoDistanceMeasurement
// 面积测量:ESGeoAreaMeasurement
// 高度测量:ESGeoHeightMeasurement
// 坐标测量:ESGeoLocationMeasurement
// 方位角测量:ESGeoDirectionMeasurement

//场景对象创建方式都一致,参考“对象的创建与销毁”章节
const distanceMeasurement = () => {
    //距离测量
    const sceneObject = objm.createSceneObject('ESGeoDistanceMeasurement') as ESGeoDistanceMeasurement | undefined
    if (!sceneObject) return;
    sceneObject.editing = true;
}

</script>

<template>
    <div style="position: absolute;left: 0;top:0">
        <button @click="distanceMeasurement()">距离测量</button>
    </div>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
