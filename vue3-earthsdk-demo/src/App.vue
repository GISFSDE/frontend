<script setup lang='ts'>
import { provide } from 'vue';
import Xe2Container from './components/xe2Container.vue';
import switchToViewer from './Example/switchToViewer.vue';
import myDemo from './Example/myDemo.vue';
import example01 from './Example/example01.vue';
import example02 from './Example/example02.vue';
import example03 from './Example/example03.vue';
import example04 from './Example/example04.vue';
import example05 from './Example/example05.vue';
import example06 from './Example/example06.vue';
import example07 from './Example/example07.vue';
import example08 from './Example/example08.vue';
import example09 from './Example/example09.vue';

import { ESObjectsManager } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
// "esobjs-xe2-plugin": "^0.1.26",//可跨引擎的对象插件依赖，一般以ES开头的对象都出自此处；
// "esobjs-xe2-plugin-assets": "^0.1.0",//ES对象内部使用的一些静态资源，图片模型等；
//   "smplotting-xe2-plugin": "^0.1.1",//超图标绘的插件依赖；
//     "vue-xe2-plugin": "^0.1.3",//针对vue3和XE2所做的插件，使二者配合使用更加丝滑
//       "xbsj-xe2": "0.1.24",//XE2主题包，内部规定的基础对象，整体的框架
//         "xbsj-xe2-assets": "^0.1.3",//XE2内部静态资源，模型图片等
//           "xbsj-renderer": "^0.3.26",//底层工具
const props = withDefaults(defineProps<{ objm: ESObjectsManager; }>(), {});

//所有子组件都可以获取到ESObjectsManager
provide('objm', props.objm)

</script>

<template>
  <!-- <myDemo /> -->
  <!-- 创建视口绑定div -->
  <!-- <Xe2Container /> -->

  <!-- 切换视口 !-->
  <!-- <switchToViewer /> -->

  <!-- 对象的创建与销毁 !-->
  <example01 />

  <!-- 属性更改事件监听 !-->
  <!-- <example02 /> -->

  <!-- 地形影像创建与销毁 !-->
  <!-- <example03 /> -->

  <!-- 视角管理器-->
  <!-- <example04 /> -->

  <!-- ES3DTileset,ESGltfModel,加载3dtiles数据,加载glb,gltf模型 -->
  <!-- <example05 /> -->

  <!-- 测量工具 -->
  <!-- <example06 /> -->

  <!-- 文字、图片、div嵌入 -->
  <!-- <example07 /> -->

  <!-- 线与多边形绘制 -->
  <!-- <example08 /> -->

  <!-- 报警，电子围栏，路径绘制 -->
  <!-- <example09 /> -->
</template>
