
<script setup lang='ts'>
import { ref } from 'vue';
import {
    ESGeoDivTextPoi,
    ESImageLabel,
    ESGeoDiv
} from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';

import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { Viewer } from 'xbsj-xe2/dist-node/xe2-base-objects';
const objm = getESObjectsManager()

//ESGeoDivTextPoi 文字标签
const addText = () => {
    const sceneObject = objm.createSceneObject('ESGeoDivTextPoi') as ESGeoDivTextPoi | undefined
    if (!sceneObject) return;
    sceneObject.text = '天安门'
    sceneObject.position = [116.403847, 39.915526, 0]
}
//ESImageLabel
//属性 url支持自定义图片
const addImg = () => {
    const sceneObject = objm.createSceneObject('ESImageLabel') as ESImageLabel | undefined
    if (!sceneObject) return;
    sceneObject.position = [116.403857, 39.915526, 30]
    // sceneObject.url = '支持网络图片'
}
//ESGeoDiv 自定义div
const addDom = () => {
    const sceneObject = objm.createSceneObject('ESGeoDiv') as ESGeoDiv | undefined
    if (!sceneObject) return;
    sceneObject.position = [116.403867, 39.915526, 100]
    sceneObject.originRatioAndOffset = [0.5, 1, 0, 0]//设置div的原点位置,前两个参数为比例,后两个参数为偏移量
    //简单div设置
    // sceneObject.innerHTML = '<div style="width: 100px;height: 100px;background-color: red;">这是一个自定义div</div>'

    //复杂div设置
    class MyDiv {
        // container是Poi的div
        // eSGeoDiv指向当前的GeoCustomDivPoi场景对象
        // viewer指定当前的视口
        private _container: HTMLElement;
        private _div: HTMLDivElement;
        constructor(container: HTMLDivElement, eSGeoDiv: ESGeoDiv, viewer: Viewer) {
            this._container = container;
            this._div = document.createElement('div');
            this._container.appendChild(this._div);
            this._div.innerHTML = `<div style="width: 500px; height: 50px; background: rgba(120, 120, 0, 0.7); color: white; font-size: 30px; line-height: 50px; border: 1px solid white;">Hello world!自定义div</div>
`;
        }
        // 销毁函数，注意此函数必需，否则会报错！
        destroy() {
            this._container.removeChild(this._div);
        }
    }
    sceneObject.instanceClass = MyDiv as any;
}

</script>

<template>
    <div style="position: absolute;left: 0;top:0">
        <button @click="addText()">添加文字</button>
        <button @click="addImg()">添加图片</button>
        <button @click="addDom()">添加自定义div</button>
    </div>
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
