<!-- 属性更改事件监听 -->
<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { ESImageryLayer } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const objm = getESObjectsManager()
const xe2Container = ref<HTMLDivElement>();

let imageryLayer: ESImageryLayer;

onMounted(() => {
  const dom = xe2Container.value;
  if (!dom) return;
  //创建一个cesium视口,并且绑定一个div容器
  const czmViewer = objm.createCesiumViewer(dom)
  console.log(czmViewer)

  //创建一个影像图层
  imageryLayer = objm.createSceneObject('ESImageryLayer') as ESImageryLayer;
  imageryLayer.url = 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';
  imageryLayer.zIndex = 2;

  //监听showChanged事件
  const dispose = imageryLayer.showChanged.don((newValue, oldValue) => {
    console.log('newValue', newValue)
    console.log('oldValue', oldValue)
  });

  //zIndexChanged监听
  // imageryLayer.zIndexChanged.don((zIndex) => {
  //   console.log('zIndexChanged', zIndex)
  // })

  //urlChanged监听
  // imageryLayer.urlChanged.don((url) => {
  //   console.log('urlChanged', url)
  // })

  //销毁监听
  onBeforeUnmount(() => { dispose() })
})

const showLayer = () => {
  //show变化会触发showChanged事件
  imageryLayer && (imageryLayer.show = !imageryLayer.show);
}


</script>

<template>
  <div style="width: 100%; height: 100%;position: absolute;" ref="xe2Container">
  </div>
  <button @click="showLayer">显示/隐藏</button>
</template>

<style scoped>
button {
  width: 100px;
  height: 36px;
  position: relative;
}
</style>
