import { createApp } from 'vue';
import App from './App.vue';
import './css/index.css';
import { ESObjectsManager } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
import { objmJson } from 'D:/Projects/MY/frontend/vue3-earthsdk-demo/src/scripts/dataJson'

//实例化一个场景对象管理器
const objm = new ESObjectsManager();

//监听json加载
objm.jsonLoadingEvent.don(e => {
    if (e.type !== 'loaded') return;
    console.log('jso加载完成了!', e)
});

//加载场景json
//@ts-ignore
objm.json = { ...objmJson }

//使用管理器来处理vue页面内的业务逻辑
const app = createApp(App, { objm })
app.mount('#app');

//调试
// @ts-ignore
window.g_objm = objm;
