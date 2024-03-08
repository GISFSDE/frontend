
<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { onMounted, ref } from 'vue';

const xe2Container = ref<HTMLDivElement>()
const objm = getESObjectsManager()

onMounted(() => {
    const dom = xe2Container.value;
    if (!dom) return;
    //创建一个cesium视口,并且绑定一个div容器
    const czmViewer = objm.createCesiumViewer(dom)
    console.log(czmViewer)

    //创建一个UE视口,并且绑定一个div容器
    // const options = {
    //     domid: dom,
    //     uri: "http://localhost:8086/",
    //     app: "sxlc"
    // }
    // const ueViewer = objm.createUEViewer(options)
    // console.log(ueViewer)
})

</script>

<template>
    <div style="width: 100%; height: 100%;" ref="xe2Container"></div>
</template>
