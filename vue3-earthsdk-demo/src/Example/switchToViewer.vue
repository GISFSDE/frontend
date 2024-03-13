<script setup lang='ts'>
import { getESObjectsManager } from '@/scripts/getESObjectsManager';
import { onMounted, ref } from 'vue';
import { ES3DTileset, ESImageryLayer, ESTerrainLayer, ESLocalSkyBox, ESVideoFusion, ESGltfModel, ESHuman } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
const xe2Container = ref<HTMLDivElement>()
const objm = getESObjectsManager()
var humanObject = objm.createSceneObject(ESHuman)
window.g_objm = objm
var opMove = false;
objm.viewerCreatedEvent.don((viewer) => {
    viewer.clickEvent.don((e) => {

        // 鼠标拾取位置，平滑移动

        viewer.pickPosition(e.screenPosition).then(res => {
            if (opMove) {
                res[2] = 5;
                if (res) {
                    // 平滑移动（位置，时长）
                    humanObject.smoothMove(res, 5)
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
let es3DTileset: ES3DTileset | null = null;
let esImageryLayer: ESImageryLayer | null = null;
let esTerrainLayer: ESTerrainLayer | null = null;
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
        uri: "http://126.10.1.210:8086/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7"
    }
    const ueViewer = objm.switchToUEViewer(options)
    console.log(ueViewer)
}
const flyTo3DTilest = () => {
    if (!es3DTileset) return;
    es3DTileset.flyTo();
}
const getCurrentCameraInfo = () => {

    const czmViewer = objm.activeViewer.getCurrentCameraInfo()
    if (!czmViewer) {
        alert("获取当前视角为空")
        return
    }
    const { position, rotation } = czmViewer
    console.log('position, rotation', position, rotation)
}
const startAtmosphere = () => {
    objm.activeViewer.atmosphere = !objm.activeViewer.atmosphere;
}
const startVideoFusion = () => {
    const sceneObject = objm.createSceneObject(ESVideoFusion)
    // 位置数组

    sceneObject.position = [120.18018925151172, 30.348649969964967, 24.440495203999195]

    // 姿态数组
    sceneObject.rotation = [184.98381094933296, -90.80311524457758, 0.0046638911340093955]

    // 远截面距离起点距离（米）
    sceneObject.far = 1235.9369219586747

    // 显示优先级
    sceneObject.zIndex = 1

    // 视频播放地址，支持像素流和一般视频。
    sceneObject.videoStreamUrl = "https://cdn2-unrealengine-1251447533.file.myqcloud.com/homepage-opener-5a55a50aaa4c.mp4"

    objm.activeViewer.flyIn([120.18018925151172, 30.348649969964967, 100.440495203999195], [190.50914039806125, -86.95594574067758, 359.7826837680836], 0)
    sceneObject.showFrustum = true;
    sceneObject.editing = true;
}
const startModel = () => {
    const sceneObject = objm.createSceneObject(ESGltfModel)
    // 位置
    // [120.1805622319813, 30.349133765582764, 19.718025040316736](3)[192.1801145482139, -48.89611695426548, 359.9742942176642]
    sceneObject.position = [120.1805622319813, 30.349133765582764, 0]

    // 最大缩放比例
    sceneObject.maximumScale = 2

    // 最小像素比例
    sceneObject.minimumPixelSize = 1
    objm.activeViewer.flyIn([120.17973916419592, 30.349505368933983, 53.222527950444515], [121.06901451624985, -17.092764385770643, 359.98687778790287], 0)
}
const startWatch = () => {
    opMove = !opMove;
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
onMounted(() => {
    const dom = xe2Container.value;
    //人生哪得圆满!
    if (!dom) return;
    // //创建一个cesium视口,并且绑定一个div容器
    // const czmViewer = objm.createCesiumViewer(dom)







    //创建一个UE视口,并且绑定一个div容器
    const options = {
        domid: dom,
        uri: "http://126.10.1.210:8086/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7"
    }
    const ueViewer = objm.switchToUEViewer(options)
    // const timestamp = hourToTimestamp(2);
    // objm.activeViewer.currentTime = timestamp
    // objm.createSceneObjectFromJson({
    //     "id": "9812a65f-0de0-4f7b-b234-809c0c2fb8ef",
    //     "type": "ESImageryLayer",
    //     "url": "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
    // });
    // const TerrainLayer = objm.createSceneObject('ESTerrainLayer') as ESTerrainLayer | undefined
    // if (!TerrainLayer) return;
    // // TerrainLayer.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/hzdem30m/TerrainMapServer'
    // TerrainLayer.url = 'http://inner.earthsdk.com/layer.json?h=0'
    // http://t3.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=1352adbdd89d96459810e5844d19749d
    // const imageryLayer = objm.createSceneObjectFromJson({ "id": "f753040a-a739-4463-82ce-067aae56ef8f", "type": "ESImageryLayer", "url": "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}", "zIndex": 3, "name": "谷歌影像", "allowPicking": true, "maximumLevel": 15 });
    // const imageryLayer = objm.createSceneObjectFromJson({

    //     "id": "e134add2-6584-4deb-b29e-7543c4dae9b0",
    //     "type": "ESImageryLayer",
    //     "url": "https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/tile/{z}/{y}/{x}",
    //     "zIndex": 3,
    //     "name": "天地图影像",
    //     "allowPicking": true,
    //     "maximumLevel": 20,
    //     "tileMatrixLabels": [
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "10",
    //         "11",
    //         "12",
    //         "13",
    //         "14",
    //         "15",
    //         "16",
    //         "17",
    //         "18",
    //         "19"
    //     ],
    //     "tilingScheme": {
    //         //此处很重要，很重要。。。
    //         "numberOfLevelZeroTilesX": 2,
    //         "numberOfLevelZeroTilesY": 1
    //     }

    // });

    let imageryObject = objm.createSceneObject('ESImageryLayer') as ESImageryLayer | undefined

    if (!imageryObject) return;
    let matrixIds = [];
    for (let i = 0; i < 19; ++i) {
        matrixIds[i] = i + 1;
    }
    imageryObject.czmTilingSchemeJson = {
        "type": "GeographicTilingScheme",
        "numberOfLevelZeroTilesX": 2,
        "numberOfLevelZeroTilesY": 1
    }
    imageryObject.rectangle = [
        -180,
        -90,
        180,
        90
    ]
    imageryObject.maximumLevel = 19
    imageryObject.minimumLevel = 0
    imageryObject.zIndex = 2
    imageryObject.czmTileMatrixLabels = [
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
        "19"
    ]
    imageryObject.czmImageryProviderType = "wmts"
    imageryObject.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/tile/{TileMatrix}/{TileRow}/{TileCol}';
    // imageryObject.url = 'https://t.hangzhoumap.gov.cn/Tile/ArcGISREST/hztdtlight202112.gis/tile/{TileMatrix}/{TileRow}/{TileCol}';

    // imageryObject.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/WMTS?service=wmts&request=getTile&tilematrixset=worldimage&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'







    // const TerrainLayer = objm.createSceneObject(ESTerrainLayer)
    // if (!TerrainLayer) return;
    // TerrainLayer.name = '平球地形'
    // TerrainLayer.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/hzdem30m/TerrainMapServer'


    const sceneObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject) return;
    sceneObject.url = 'http://126.10.1.210:9003/model/1/tileset.json'
    const sceneObject1 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject1) return;
    sceneObject1.url = 'http://126.10.1.210:9003/model/2/tileset.json'
    const sceneObject3 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject3) return;
    sceneObject3.url = 'http://126.10.1.210:9003/model/3/tileset.json'
    const sceneObject4 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject4) return;
    sceneObject4.url = 'http://126.10.1.210:9003/model/4/tileset.json'
    es3DTileset = sceneObject4;

    // czmViewer.statusChanged.don(status => {
    //     if (status == 'Created') {
    //         objm.activeViewer.innerViewer.sunSkyControlled = true
    //         // 开启深度检测
    //         objm.activeViewer.innerViewer.sceneGlobeDepthTestAgainstTerrain = true
    //         const skyObject = objm.createSceneObject("ESLocalSkyBox") as ESLocalSkyBox | undefined
    //         /**
    //          *  开启自动跟随
    //          * 天空盒样式跟随视角
    //         */
    //         skyObject.autoFollow = true
    //         // 自动不透明度
    //         skyObject.autoOpacityFactor = 200
    //         // 天空盒长宽高
    //         skyObject.size = 100000
    //         skyObject.mode = "sunSets"
    //         console.log('ueViewerstatusChanged')
    //         console.log('objm.activeViewer.currentTime', objm.activeViewer.currentTime)
    //         const timestamp = hourToTimestamp(12);
    //         objm.activeViewer.currentTime = timestamp
    //         // 添加事件监听器，当拖动条的值发生变化时触发
    //         const ipt = document.getElementById("rangeInput");
    //         ipt.addEventListener("input", function () {
    //             const timestamp = hourToTimestamp(+ipt.value);
    //             console.log('objm.activeViewer.currentTime', objm.activeViewer.currentTime)
    //             objm.activeViewer.currentTime = timestamp
    //         });
    //         objm.activeViewer.flyIn([120.13970230856052, 30.330159698750716, 223.75169368810788], [-90.73604583740234, -37.8074836730957, 0], 0)
    //     }
    // });
    ueViewer.statusChanged.don(status => {
        if (status == 'Created') {

            objm.activeViewer.innerViewer.sunSkyControlled = true
            // 开启深度检测
            objm.activeViewer.innerViewer.sceneGlobeDepthTestAgainstTerrain = true
            const skyObject = objm.createSceneObject("ESLocalSkyBox") as ESLocalSkyBox | undefined
            /**
             *  开启自动跟随
             * 天空盒样式跟随视角
            */
            skyObject.autoFollow = true
            // 自动不透明度
            skyObject.autoOpacityFactor = 200
            // 天空盒长宽高
            skyObject.size = 100000
            skyObject.mode = "sunSets"
            console.log('ueViewerstatusChanged')
            console.log('objm.activeViewer.currentTime', objm.activeViewer.currentTime)
            const timestamp = hourToTimestamp(12);
            objm.activeViewer.currentTime = timestamp
            // 添加事件监听器，当拖动条的值发生变化时触发
            const ipt = document.getElementById("rangeInput");
            ipt.addEventListener("input", function () {
                const timestamp = hourToTimestamp(+ipt.value);
                console.log('objm.activeViewer.currentTime', objm.activeViewer.currentTime)
                objm.activeViewer.currentTime = timestamp
            });
            objm.activeViewer.flyIn([120.13970230856052, 30.330159698750716, 223.75169368810788], [-90.73604583740234, -37.8074836730957, 0], 0)
        }
    });



    // 将小时转换为时间戳的方法
    function hourToTimestamp(hour) {
        var now = new Date(); // 获取当前日期时间
        now.setHours(hour, 0, 0, 0); // 将当前日期时间设置为小时数
        return now.getTime();
    }


    /**if (!dom) return;
    const options = {
        domid: dom,
        uri: "http://126.10.1.210:8086/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7"
    }
    const ueViewer = objm.switchToUEViewer(options)
    */
    // if (!sceneObject) return;
    // sceneObject.flyTo();
    // flyTo3DTilest;
    // getCurrentCameraInfo()
})

</script>

<template>

    <div style="width: 100%; height: 100%;" ref="xe2Container"></div>
    <div class="btn">
        <button @click="getCurrentCameraInfo">获取当前视角</button>
        <button @click="flyTo3DTilest">flyTo3DTilest</button>
        <button @click="switchToCesiumViewer">切换为czm</button>
        <button @click="switchToUEViewer">切换为ue</button>
        <button @click="startAtmosphere">开启大气</button>
        <button @click="startVideoFusion">视频融合</button>
        <button @click="startModel">模型创建</button>
        <button @click="startWatch">巡查演示</button>
        <div id="panel">
            <input type="range" min="0" max="24" step="1" value="12" id="rangeInput" />
            <div class="panel-text">
                <p>0</p>
                <p>24</p>
            </div>
        </div>
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

#panel {
    margin-top: 10vh;
}
</style>
