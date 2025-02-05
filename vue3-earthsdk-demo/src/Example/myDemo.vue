//switchToViewer.vue
<script setup lang='ts'>
// import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { ESObjectsManager } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
const objm = new ESObjectsManager();

import { onMounted, ref } from 'vue';
// 通过ref获得html元素
//名组件中ref='xx' 中的值相同
// onMounted中获取
const xe2Container = ref<HTMLDivElement>()
// const objm = getESObjectsManager()

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
        uri: "http://localhost:8080/",//ESSS信令服务器的接口地址
        app: "9a1eab97cc7546ffb1764b2916e3eda7"//ESSS信令服务器中的实例id
    }
    const ueViewer = objm.switchToUEViewer(options)
    console.log(ueViewer)
}

onMounted(() => {
    const dom = xe2Container.value;
    if (!dom) return;
    //创建一个cesium视口,并且绑定一个div容器
    const czmViewer = objm.createCesiumViewer(dom)
    console.log(czmViewer)

    const json = {
        "root": {
            "children": [
                {
                    "name": "Cesium基础场景",
                    "children": [
                        {
                            "name": "谷歌影像",
                            "sceneObj": {
                                "id": "e211f45f-bed9-4898-8ae4-8f4ba7cba447",
                                "type": "ESImageryLayer",
                                "url": "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
                                "name": "谷歌影像"
                            },
                            "children": []
                        }
                    ]
                }
            ]
        }
    }

    //获取内置默认场景树
    const sceneTree = objm.sceneTree

    //设置树json
    sceneTree.json = { ...json }
    const tree1 = objm.createSceneTree('tree1')
})

</script>

<template>
    <div style="width: 100%; height: 100%;" ref="xe2Container"></div>
    <div class="btn">
        <button @click="switchToCesiumViewer">切换为czm</button>
        <button @click="switchToUEViewer">切换为ue</button>
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
