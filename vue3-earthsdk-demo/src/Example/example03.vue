<!-- 地形影像创建与销毁 -->
<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { ESImageryLayer, ESTerrainLayer } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
import { onMounted, ref } from 'vue';

const objm = getESObjectsManager()

const xe2Container = ref<HTMLDivElement>();
onMounted(() => {
    const dom = xe2Container.value;
    if (!dom) return;
    //创建一个cesium视口,并且绑定一个div容器
    const czmViewer = objm.createCesiumViewer(dom)
    console.log(czmViewer)
})

let imageryLayer: ESImageryLayer;
let terrainLayer: ESTerrainLayer;

//添加地形
const addTerrainLayer = () => {
    const sceneObject = objm.createSceneObject('ESTerrainLayer') as ESTerrainLayer
    if (!sceneObject) return;
    //服务有可能失效,请使用独立服务
    sceneObject.url = 'http://114.242.26.126:6003/terrain/globe/layer.json'
    terrainLayer = sceneObject;
}

//添加影像
const addESImageryLayer = () => {
    const sceneObject = objm.createSceneObject('ESImageryLayer') as ESImageryLayer
    if (!sceneObject) return;
    //服务有可能失效,请使用独立服务
    sceneObject.url = 'http://114.242.26.126:6003/image/tms/china-imagery-13z-202301/tilemapresource.xml';
    sceneObject.zIndex = 2;//层级覆盖
    imageryLayer = sceneObject;
}

//销毁地形
const delTerrainLayer = () => {
    terrainLayer && objm.destroySceneObject(terrainLayer);
}

//销毁影像
const delESImageryLayer = () => {
    imageryLayer && objm.destroySceneObject(imageryLayer);
}

</script>

<template>
    <div style="width: 100%; height: 100%;position: absolute;" ref="xe2Container">
    </div>
    <div style="position: absolute;left: 0;top:0">
        <button @click="addTerrainLayer">添加地形</button>
        <button @click="addESImageryLayer">添加影像</button>
        <button @click="delTerrainLayer">销毁地形</button>
        <button @click="delESImageryLayer">销毁影像</button>
    </div>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
