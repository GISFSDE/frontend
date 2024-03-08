<!--视角管理器-->
<script setup lang='ts'>
import ESViewCollectionVue3UI from "vue-xe2-plugin/dist-node/components/xe2/ESCameraViewCollectionVue3UI.vue";
import { getESObjectsManager } from '@/scripts/getESObjectsManager';

const objm = getESObjectsManager()

const { cameraViewsManager } = objm

</script>

<template>
    <div style="width: 600px;position: fixed;left:calc(50% - 280px);bottom: 5%;">
        <ESViewCollectionVue3UI :currenESCameraViewCollection="cameraViewsManager" />
    </div>
</template>

