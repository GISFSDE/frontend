import { inject } from "vue";
import { ESObjectsManager } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';

//provide与inject配合使用
export function getESObjectsManager() {
    //App.vue中 provide('objm', props.objm)
    const objm = inject('objm')
    if (!objm) {
        throw new Error('objm not found');
    }
    return objm as ESObjectsManager;
}
