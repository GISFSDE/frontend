<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { onMounted, ref } from 'vue';
import { ES3DTileset, ESImageryLayer, ESGltfModel } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
const xe2Container = ref<HTMLDivElement>()
const objm = getESObjectsManager()
let es3DTileset: ES3DTileset | null = null;
let esImageryLayer: ESImageryLayer | null = null;
//将div切换为Cesium视口
const switchToCesiumViewer = () => {
    const dom = xe2Container.value;
    if (!dom) return;
    const czmViewer = objm.switchToCesiumViewer(dom)
    console.log(czmViewer)
}

//将div切换为UE视口
const switchToUEViewer = () => {
    const dom = xe2Container.value;
    if (!dom) return;
    const options = {
        domid: dom,
        uri: "http://localhost:8086/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7"
    }
    const ueViewer = objm.switchToUEViewer(options)
    console.log(ueViewer)
}
const flyTo3DTilest = () => {
    if (!es3DTileset) return;
    es3DTileset.flyTo();
}
const getCurrentCameraInfo = () => {

    const czmViewer = objm.activeViewer.getCurrentCameraInfo()
    if (!czmViewer) {
        alert("获取当前视角为空")
        return
    }
    const { position, rotation } = czmViewer
    console.log('position, rotation', position, rotation)
}
onMounted(() => {
    const dom = xe2Container.value;
    //人生哪得圆满!
    if (!dom) return;
    //创建一个cesium视口,并且绑定一个div容器
    const czmViewer = objm.createCesiumViewer(dom)
    console.log(czmViewer)
    let imageryObject = objm.createSceneObject('ESImageryLayer') as ESImageryLayer | undefined
    if (!imageryObject) return;
    let matrixIds = [];
    for (let i = 0; i < 19; ++i) {
        matrixIds[i] = i + 1;
    }
    imageryObject.czmTilingSchemeJson = {
        "type": "GeographicTilingScheme",
        "numberOfLevelZeroTilesX": 2,
        "numberOfLevelZeroTilesY": 1
    }
    imageryObject.rectangle = [
        -180,
        -90,
        180,
        90
    ]
    imageryObject.maximumLevel = 19
    imageryObject.minimumLevel = 0
    imageryObject.zIndex = 2
    imageryObject.tileMatrixLabels = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19"
    ],
        imageryObject.czmImageryProviderType = "wmts"
    imageryObject.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/tile/{TileMatrix}/{TileRow}/{TileCol}';

    // imageryObject.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/WMTS?service=wmts&request=getTile&tilematrixset=worldimage&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'




    const sceneObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject) return;
    sceneObject.url = 'http://126.10.1.210:9003/model/EewNoRrp/tileset.json'
    const sceneObject1 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject1) return;
    sceneObject1.url = 'http://126.10.1.210:9003/model/t6BZc9uZ/tileset.json'
    const sceneObject3 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject3) return;
    sceneObject3.url = 'http://126.10.1.210:9003/model/cC9u0k7w/tileset.json'
    const sceneObject4 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject4) return;
    sceneObject4.url = 'http://126.10.1.210:9003/model/YYIqHBxx/tileset.json'
    es3DTileset = sceneObject;

    czmViewer.statusChanged.don(status => {
        if (status == 'Created') {
            objm.activeViewer.flyIn([120.18078852021108, 30.31953180938132, 720.1584561734548], [359.9999999999963, -45.113072909618715, 359.999999999997], 0)
        }
    });
    // if (!sceneObject) return;
    // sceneObject.flyTo();
    // flyTo3DTilest;
    // getCurrentCameraInfo()
})

</script>

<template>
    <div style="width: 100%; height: 100%;" ref="xe2Container"></div>
    <div class="btn">
        <!-- <button @click="getCurrentCameraInfo">获取当前视角</button>
        <button @click="flyTo3DTilest">flyTo3DTilest</button>
        <button @click="switchToCesiumViewer">切换为czm</button>
        <button @click="switchToUEViewer">切换为ue</button> -->
    </div>
</template>

<style scoped>
.btn {
    position: absolute;
    left: 0px;
    top: 0px;
    box-sizing: border-box;
}

button {
    padding: 0 10px;
    margin: 0 10px;
    height: 30px;
    cursor: pointer;
}
</style>
