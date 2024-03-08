<!-- 对象的创建与销毁 -->

<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { ESImageryLayer } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
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


/**
     * 通过Class创建一个场景对象，注意不会在场景结构树上体现
     * @param sceneObjConstructor 需要创建的场景对象类
     * @param id 指定场景对象的id，如果不指定或者为undefined时，则会内部自动生成
     * @returns 返回一个场景对象，如果失败返回undefined
     * @example
     * // 示例1 通过场景对象类创建某个类型的场景对象
     * import { CzmModelPrimitive } from 'xbsj-xe2/dist-node/xe2-cesium-objects';
     * const sceneObject = projectManager.createSceneObject(CzmModelPrimitive);
     * //or
     * const sceneObject = projectManager.createSceneObject('CzmModelPrimitive', 'abc123');
     * sceneObject.position = [116.39, 39.9, 100];
     * //场景对象飞入
     * sceneObject.flyTo();
     *
     * // 示例2 通过场景对象类创建某个类型的场景对象，并指定场景对象的ID
     * import { CzmModelPrimitive } from 'xbsj-xe2/dist-node/xe2-cesium-objects';
     * const sceneObject = projectManager.createSceneObject(CzmModelPrimitive, 'abc123');
     * sceneObject.position = [116.39, 39.9, 100];
     * //场景对象飞入
     * sceneObject.flyTo();
     * 
     * //示例3 通过场景对象类创建某个类型的场景对象，并指定场景对象的ID为undefined,此时会自动创建ID
     * import { CzmModelPrimitive } from 'xbsj-xe2/dist-node/xe2-cesium-objects';
     * const sceneObject = projectManager.createSceneObject(CzmModelPrimitive, undefined);
     * sceneObject.position = [116.39, 39.9, 100];
     * //场景对象飞入
     * sceneObject.flyTo();
**/

let imageryLayer: ESImageryLayer;

//创建影像
const addESImageryLayer = () => {
    imageryLayer = objm.createSceneObject('ESImageryLayer') as ESImageryLayer;
    //设置url属性

    // imageryLayer.url = 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';{y}/{x}/{z} {y}/{z}/{x} {x}/{y}/{z} {z}/{x}/{y} {z}/{x}/{y}
    imageryLayer.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/tile/{z}/{y}/{x}';
    //设置影像层级
    imageryLayer.zIndex = 1;

    // const imageryLayer = objm.createSceneObjectFromJson({
    //     "id": "bacf1812-c1c7-4799-ab1a-45b2aa3032b5",
    //     "type": "ESImageryLayer",
    //     "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    //     "zIndex": 1,
    //     "name": "argis",
    //     "allowPicking": true,
    //     "maximumLevel": 15
    // });
}

//销毁影像
const delESImageryLayer = () => {
    imageryLayer && objm.destroySceneObject(imageryLayer);
}


</script>

<template>
    <div style="width: 100%; height: 100%;position: absolute;" ref="xe2Container">
    </div>

    <button @click="addESImageryLayer">添加影像</button>
    <button @click="delESImageryLayer">销毁影像</button>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
