<!-- ES3DTileset,ESGltfModel,加载3dtiles数据,加载glb,gltf模型 -->
<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { ES3DTileset, ESGltfModel } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
import { ref, watch } from 'vue';

const objm = getESObjectsManager()

let es3DTileset: ES3DTileset | null = null;
let esGltfModel: ESGltfModel | null = null;

const add3DTilest = () => {
    //http://114.242.26.126:6003/model/dayanta-3dtiles-202211/tileset.json
    //http://114.242.26.126:6003/model/shanghai2-3dtiles-20230907/tileset.json
    if (es3DTileset) return;
    const sceneObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject) return;
    sceneObject.url = 'http://126.10.1.210:9003/model/lHAjxvdu/tileset.json'
    es3DTileset = sceneObject;
}
const addGlb = () => {
    if (esGltfModel) return;
    const sceneObject = objm.createSceneObject('ESGltfModel') as ESGltfModel | undefined
    if (!sceneObject) return;
    sceneObject.position = [121.50167224894633, 31.207410852871238, 0]
    esGltfModel = sceneObject;

}
const del3DTilest = () => {
    if (!es3DTileset) return;
    objm.destroySceneObject(es3DTileset);
    es3DTileset = null;

}
const delGlb = () => {
    if (!esGltfModel) return;
    objm.destroySceneObject(esGltfModel);
    esGltfModel = null;
}

const flyTo3DTilest = () => {
    if (!es3DTileset) return;
    es3DTileset.flyTo();
}

const flyToGlb = () => {
    if (!esGltfModel) return;
    esGltfModel.flyTo();
}

const xScale = ref(0)
const yScale = ref(0)
const zScale = ref(0)

const hScale = ref(0)
const pScale = ref(0)
const rScale = ref(0)

const fScale = ref(1)
const sScale = ref(1)
const tScale = ref(1)

watch([xScale, yScale, zScale, hScale, pScale, rScale, fScale, sScale, tScale], () => {
    if (!esGltfModel) return;
    const gltfModel = esGltfModel

    const scale = [Number(xScale.value), Number(yScale.value), Number(zScale.value)] as [number, number, number]
    gltfModel.setNodePosition("TuMuGongCheng_F05", [...scale])
    gltfModel.setNodePosition("TuMuGongCheng_F13_TopBuilding", [Number(xScale.value), Number(yScale.value) * 3, Number(zScale.value) * 3])
    gltfModel.setNodePosition("TuMuGongCheng_F13_Top", [Number(xScale.value), Number(yScale.value) * 3, Number(zScale.value) * 3])
    gltfModel.setNodePosition("TuMuGongCheng_F13", [Number(xScale.value), Number(yScale.value) * 3, Number(zScale.value) * 3])
    gltfModel.setNodePosition("TuMuGongCheng_F12", [Number(xScale.value), Number(yScale.value) * 2.5, Number(zScale.value) * 2.5])
    gltfModel.setNodePosition("TuMuGongCheng_F11", [Number(xScale.value), Number(yScale.value) * 2, Number(zScale.value) * 2])
    gltfModel.setNodePosition("TuMuGongCheng_F10", [Number(xScale.value), Number(yScale.value) * 1.5, Number(zScale.value) * 1.5])
    gltfModel.setNodePosition("TuMuGongCheng_F9", [Number(xScale.value), Number(yScale.value), Number(zScale.value)])

    const hpr = [Number(hScale.value), Number(pScale.value), Number(rScale.value)] as [number, number, number]
    gltfModel.setNodeRotation("TuMuGongCheng_F05", [...hpr])
    const fst = [Number(fScale.value), Number(sScale.value), Number(tScale.value)] as [number, number, number]
    gltfModel.setNodeScale("TuMuGongCheng_F05", [...fst])

})

</script>

<template>
    <div style="position: absolute;left: 0;top:0">
        <button @click="add3DTilest">创建3DTilest</button>
        <button @click="flyTo3DTilest">定位3DTilest</button>

        <button @click="addGlb">创建glb</button>
        <button @click="flyToGlb">定位glb</button>

        <button @click="del3DTilest">销毁3DTilest</button>
        <button @click="delGlb">销毁glb</button>
    </div>
    <div style="position: absolute;right: 0;top:0">
        <div style="width: 360px; height: 250px;background: #cccccc41; pointer-events: all;">
            <p>glb建筑模型楼层拆解演示</p>
            x<input type="range" step="1" min="0" max="100" v-model="xScale" style="width: 330px; margin: 5px;"><br>
            y<input type="range" step="1" min="0" max="100" v-model="yScale" style="width: 330px;margin: 5px;"><br>
            z<input type="range" step="1" min="0" max="100" v-model="zScale" style="width: 330px;margin: 5px;"><br>
            h<input type="range" step="1" min="0" max="360" v-model="hScale" style="width: 330px; margin: 5px;"><br>
            p<input type="range" step="1" min="0" max="360" v-model="pScale" style="width: 330px;margin: 5px;"><br>
            r<input type="range" step="1" min="0" max="360" v-model="rScale" style="width: 330px;margin: 5px;"><br>
            f<input type="range" step="0.1" min="1" max="10" v-model="fScale" style="width: 330px; margin: 5px;"><br>
            s<input type="range" step="0.1" min="1" max="10" v-model="sScale" style="width: 330px;margin: 5px;"><br>
            t<input type="range" step="0.1" min="1" max="10" v-model="tScale" style="width: 330px;margin: 5px;"><br>
        </div>
    </div>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
