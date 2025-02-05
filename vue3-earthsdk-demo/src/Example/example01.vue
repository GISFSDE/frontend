<!-- 对象的创建与销毁 -->

<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { onMounted, ref } from 'vue';
import { ES3DTileset, ESImageryLayer, ESTerrainLayer, ESLocalSkyBox, ESVideoFusion, ESGltfModel, ESHuman, ESPath, ESPlayer, ESPolygonFlattenedPlane, ESExcavate, ESWidget } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';

const objm = getESObjectsManager()
const xe2Container = ref<HTMLDivElement>();
var humanObject = objm.createSceneObject(ESHuman)
var opMove = false;
objm.viewerCreatedEvent.don((viewer) => {
    viewer.clickEvent.don((e) => {

        // 鼠标拾取位置，平滑移动

        viewer.pickPosition(e.screenPosition).then(res => {
            if (opMove) {
                res[2] = 5;
                if (res) {
                    // 平滑移动（位置，时长）
                    humanObject.smoothMove(res, 6)
                    console.log('res', res)
                    let target = deepClone(res);
                    // target[0] = target[0] - 0.0001;
                    target[1] = target[1] + 0.00005;
                    target[2] = 8;
                    objm.activeViewer.flyIn(target, [187.15651411689228, 2.317686432692143, 359.99751557621585], 8)
                }
            }
        })

    })
})
function deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                //判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}
onMounted(() => {
    const dom = xe2Container.value;
    if (!dom) return;
    //创建一个cesium视口,并且绑定一个div容器
    // const czmViewer = objm.createCesiumViewer(dom)
    const options = {
        domid: dom,
        uri: "http://126.10.1.211:9007/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7",
        // sunIntensity: 251000,
    }
    const ueViewer = objm.createUEViewer(options)
    objm.activeViewer.innerViewer.useDefaultStatusDiv = false
    objm.viewerCreatedEvent.don((viewer) => {
        console.log('ueViewer', ueViewer)
        ueViewer.flyIn([120.1610394483858, 30.254656139557696, 2206.8592553717567], [2.2768337726593018, -37.637657165527344, 0], 1)

        var now = new Date(); // 获取当前日期时间
        now.setHours(10, 0, 0, 0); // 将当前日期时间设置为小时数
        objm.activeViewer.innerViewer.useDefaultStatusDiv = false
        objm.activeViewer.currentTime = now.getTime();
    })


    addESImageryLayer();

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
let es3DTileset: ES3DTileset | null = null;

//创建影像
const addESImageryLayer = () => {

    // imageryLayer = objm.createSceneObject('ESImageryLayer') as ESImageryLayer;
    //设置url属性
    const imageryLayer = objm.createSceneObjectFromJson({
        "id": "b32d0a12-4511-45ae-b398-aaf965b4d456",
        "type": "ESImageryLayer",
        "url": "https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/tile/{TileMatrix}/{TileRow}/{TileCol}",
        "options": {
            "type": "wmts",
            "tileMatrixLabels": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20"
            ],
            "tilingScheme": {
                "type": "GeographicTilingScheme",
                "numberOfLevelZeroTilesX": 2,
                "numberOfLevelZeroTilesY": 1
            }
        },
        "name": "ESImageryLayer_b32d",
        "allowPicking": true
    });
    let tileUrl = 'http://126.10.1.211:9004/tile/model/service/';
    const sceneObject1 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject1) return;
    sceneObject1.url = tileUrl + 'xCC1SW2g/tileset.json'
    sceneObject1.editing = false;
    const sceneObject2 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject2) return;
    sceneObject2.url = tileUrl + 'hRZzH0rE/tileset.json'
    sceneObject2.editing = false;
    const sceneObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject) return;
    sceneObject.url = tileUrl + 'gTp78xGg/tileset.json'
    sceneObject.editing = false;
    const sceneObject4 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject4) return;
    sceneObject4.url = tileUrl + 'zKfFN4wt/tileset.json'
    sceneObject4.editing = false;
    const sceneObject6 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject6) return;
    sceneObject6.url = tileUrl + 'GgVbsE2y/tileset.json'
    sceneObject6.editing = false;
    es3DTileset = sceneObject1;
    let accuracy = 16;
    sceneObject.maximumScreenSpaceError = accuracy;
    sceneObject4.maximumScreenSpaceError = accuracy;
    sceneObject1.maximumScreenSpaceError = accuracy;
    sceneObject2.maximumScreenSpaceError = accuracy;
    // const sceneObject3 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    // if (!sceneObject3) return;
    // sceneObject3.url = 'http://126.10.1.211:9003/model/3/tileset.json'
    // sceneObject3.id = 'c2c8311e-6e50-47a2-b764-1c82f2d0e254'
    // sceneObject3.editing = false;
    // const eS3DTileset = objm.createSceneObjectFromJson({
    //     "id": "c2c8311e-6e50-47a2-b764-1c82f2d0e254",
    //     "type": "ES3DTileset",
    //     "name": "ES3DTileset",
    //     "allowPicking": true,
    //     "url": tileUrl +'2/tileset.json'
    // })

    // 监听视口创建完成事件
    objm.viewerCreatedEvent.don((viewer) => {
        /**
         * 
         * pickPosition(screenPosition)：异步拾取参数像素点位置处的三维经纬高坐标
         *  参数1：screenPosition 像素点位置
         * 
         *  返回值：
         *  Promise对象      
         *  
        */
        // 监听点击事件
        viewer.clickEvent.don((e) => {
            viewer.pickPosition(e.screenPosition).then(res => {
                const czmViewer = objm.activeViewer && objm.activeViewer.getCurrentCameraInfo()
                const { position, rotation } = czmViewer
                console.log('position, rotation', position, rotation)
            })
        })
    })
    const sceneObject5 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject5) return;
    sceneObject5.url = 'http://126.10.1.45:9003/model/bSTkuuxm/tileset.json'
    sceneObject5.editing = false;


    objm.activeViewer && objm.activeViewer.statusChanged.don(status => {
        console.log('status', status)
        if (status == 'Created') {
            flyTo3DTilest();
        }
    })

}
const flyTo3DTilest = () => {
    if (!es3DTileset) return;
    // es3DTileset.flyTo();
    objm.activeViewer && objm.activeViewer.flyIn([120.17199745438995, 30.333899118247853, 214.47086339013256], [186.62644705037118, -21.107752475709216, 0.0016580296250513756], 1)

}
//销毁影像
const delESImageryLayer = () => {
    imageryLayer && objm.destroySceneObject(imageryLayer);
}
//将div切换为UE视口
const switchToUEViewer = () => {
    const dom = xe2Container.value;
    if (!dom) return;

    const options = {
        domid: dom,
        uri: "http://126.10.1.211:9007/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7",
        // sunIntensity: 251000,
    }
    const ueViewer = objm.switchToUEViewer(options)
    ueViewer.sceneControlled = true;
    ueViewer.brightness = -1;
    ueViewer.sunIntensity = 101000;
    ueViewer.atmosphere = false;
    const timestamp = hourToTimestamp(12);
    ueViewer.currentTime = timestamp


    const sceneObject = objm.createSceneObject(ESLocalSkyBox)
    sceneObject.position = [97.5366570628101, 37.864135075815014, 0]

    // 开启深度检测
    objm.activeViewer.innerViewer.sceneGlobeDepthTestAgainstTerrain = true
    /**
     *  开启自动跟随
     * 天空盒样式跟随视角
    */
    sceneObject.autoFollow = true

    // 自动不透明度系数，渐变效果，根据天空盒位置和相机位置的距离与size*autoOpacity比值控制天空盒透明度
    sceneObject.autoOpacityFactor = 200

    // 天空盒长宽高
    sceneObject.size = 100000
    sceneObject.mode = 'sunSets'
    console.log(ueViewer)
}
// 将小时转换为时间戳的方法
function hourToTimestamp(hour) {
    var now = new Date(); // 获取当前日期时间
    now.setHours(hour, 0, 0, 0); // 将当前日期时间设置为小时数
    return now.getTime();
}
//将div切换为Cesium视口
const switchToCesiumViewer = () => {
    const dom = xe2Container.value;
    if (!dom) return;
    const czmViewer = objm.switchToCesiumViewer(dom)
    console.log(czmViewer)
}
const getCurrentCameraInfo = () => {

    const czmViewer = objm.activeViewer && objm.activeViewer.getCurrentCameraInfo()
    if (!czmViewer) {
        alert("获取当前视角为空")
        return
    }
    const { position, rotation } = czmViewer
    console.log('position, rotation', position, rotation)
}
const toggleSwitchOn = () => {
    // 开启第一人称
    //  [120.17339710808236, 30.331530267673195, 42.83043975118045] (3) [245.22881865566026, -18.391385676338025, 359.99973012420435]
    objm.activeViewer && objm.activeViewer.flyIn([120.17339720808236, 30.331530267673195, 42.83043975118045], [245.22881865566026, -18.391385676338025, 359.99973012420435], 1)
    objm.activeViewer && objm.activeViewer.changeToWalk([120.17549710808236, 30.331530267673195, 42.83043975118045])
}
const toggleSwitchOff = () => {
    // 关闭第一人称
    objm.activeViewer && objm.activeViewer.changeToMap()

}
const togo = () => {

    const esHuman = objm.createSceneObject(ESHuman)
    const esPath = objm.createSceneObject(ESPath)
    const esPlayer = objm.createSceneObject(ESPlayer)

    // 设置ESPath的路径点位
    esPath.points = [
        [120.17339710808236, 30.331530267673195, 42.83043975118045],
        [120.17339710818236, 30.431530267673195, 42.83043975118045],
        [120.17339710828236, 30.531530267673195, 42.83043975118045],
        [120.17339710838236, 30.631530267673195, 42.83043975118045],

    ]
    // 设置时间戳
    esPath.timeStamps = [0, 30000, 60000]

    // 监听路径的位置变化
    esPath.currentPositionChanged.don((e) => {
        if (!esPath.currentPosition) return
        // 将当前位置设置给人员对象实现位置移动
        esHuman.position = esPath.currentPosition
        if (!esPath.currentRotation) return
        esHuman.rotation = esPath.currentRotation
    })


    // 设置ESPlayer播放器
    esPlayer.startTime = 0
    esPlayer.stopTime = 60000
    esPlayer.playing = true
    esPlayer.loop = true
    esHuman.mode = "pedestrian"
    // 设置人员对象的动画为行走模式walking
    esHuman.animation = 'walking'
    esHuman.animation = "walking"
    esHuman.flyTo()

}
const startWatch = () => {

    opMove = !opMove;
    if (opMove) {
        // 位置
        humanObject.position = [120.18156639030802, 30.345430270311326, 1]
        // 姿态
        humanObject.rotation = [0, 0, 0]
        /** 人员有三种模式
             1. 路人 pedestrian
             2. 消防员 police
             3. 警察 police
        */
        humanObject.mode = 'police'
        /**
         * 动画效果
         * 1. 奔跑 running
         * 2. 行走 walking
         * 3. 站立 standing
        */
        humanObject.animation = 'walking'
        objm.activeViewer.flyIn([120.18156639030802, 30.345430270311326, 21.709691272981487], [185.83759529203098, -7.648565841725815, 0.0013616815675382002], 0)
    }
}


</script>

<template>
    <div style="width: 100%; height: 100%;position: absolute;" ref="xe2Container">
    </div>
    <!-- <button @click="getCurrentCameraInfo" v-show="true">获取当前视角</button>
    <button @click="addESImageryLayer">添加影像</button> -->
    <!-- <button @click="delESImageryLayer">销毁影像</button> 

    <button @click="flyTo3DTilest">定位</button>
    <button @click="switchToUEViewer" v-show="true">切换为ue</button>
    <button @click="switchToCesiumViewer" v-show="true">切换为czm</button>
    <button @click="toggleSwitchOn" v-show="true">开启第一人称</button>
    <button @click="toggleSwitchOff" v-show="true">关闭第一人称</button>
    <button @click="startWatch" v-show="true">巡查</button>-->
</template>

<style scoped>
button {
    width: 100px;
    height: 36px;
    position: relative;
}
</style>
