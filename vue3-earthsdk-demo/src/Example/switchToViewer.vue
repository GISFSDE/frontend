<script setup lang='ts'>
import { ESObjectsManager } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
import { onMounted, ref } from 'vue';
import { ES3DTileset, ESImageryLayer, ESTerrainLayer, ESLocalSkyBox, ESVideoFusion, ESGltfModel, ESHuman, ESPolygonFlattenedPlane, ESExcavate, ESWidget } from 'esobjs-xe2-plugin/dist-node/esobjs-xe2-plugin-main';
const xe2Container = ref<HTMLDivElement>()
// const objm = getESObjectsManager()
const objm = new ESObjectsManager();
var humanObject = objm.createSceneObject(ESHuman)
// window.g_objm = objm


import axios from 'axios'
var opMove = false;
var createModel = false;
var is3DTilesShow = false;
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

objm.viewerCreatedEvent.don((viewer) => {
    viewer.clickEvent.don((e) => {
        // 鼠标拾取位置，平滑移动
        viewer.pickPosition(e.screenPosition).then(res => {
            console.log('点击创建模型', res)
            // 
            axios.get(`https://zlbkjzz.hzsgis.com:8094/incitybrain/B8EBAF81285E9247EB8C8945C2D27FA4/PBS/rest/services/gcs330100g3099_qsmzq_xzyzt/Mapserver/identify?sr=4326&layers=all&tolerance=3
                &returnGeometry=true&imageDisplay=631,634,96&mapExtent=120.33248558909287,30.34055177772749,120.34604058165566,30.354171215579775&geometry={%22x%22:
                    ${res[0]},%22y%22:${res[1]},%22spatialReference%22:{%22wkid%22:4326}}&geometryType=esriGeometryPoint&f=json`
            ).then(result => {
                console.log('result', result);
                if (result.data && result.data.results[0]) {
                    let tdm = result.data.results[0].attributes.tdm;

                    axios.get(`http://localhost:8080/findByTdm/api/tdm/${tdm}F0`
                    ).then(result => {
                        console.log('result', result);
                        // const sceneObject = objm.createSceneObject(ESWidget)
                        // // 设置位置
                        // sceneObject.position = res
                        // // 属性信息
                        // sceneObject.info = {
                        //     "title": "示例教程-部件标注", ...result.data.results[0].attributes
                        //     // "这里是部件的内容": "earthSDK示例教程-部件标注"
                        // }

                    })
                }
            })
            if (createModel) {
                console.log('点击创建模型1', res)

                const sceneObject = objm.createSceneObject(ESGltfModel)
                sceneObject.position = res
                // 最大缩放比例
                sceneObject.maximumScale = 2
                // 最小像素比例
                sceneObject.minimumPixelSize = 1
                sceneObject.flyTo();
                // let target = deepClone(res);
                // target[0] = target[0] - 0.0005;
                // target[1] = target[1] - 0.0008;
                // target[2] = 76.4281746479911
                // objm.activeViewer.flyIn(target, [144.02309711825225, -28.17072769370796, 0.1322856279501359], 0)

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

// const json = {
//     "root": {
//         "children": [
//             {
//                 "name": "Cesium基础场景",
//                 "children": [
//                     {
//                         "name": "谷歌影像",
//                         "sceneObj": {
//                             "id": "c2c8311e-6e50-47a2-b764-1c82f2d0e251",
//                             "type": "ES3DTileset",
//                             "name": "ES3DTileset1",
//                             "allowPicking": false,
//                             "maximumScreenSpaceError": 32,
//                             "url": "http://126.10.1.210:9003/model/1/tileset.json"
//                         },
//                         "children": []
//                     },
//                     {
//                         "name": "谷歌影像",
//                         "sceneObj": {
//                             "id": "c2c8311e-6e50-47a2-b764-1c82f2d0e252",
//                             "type": "ES3DTileset",
//                             "name": "ES3DTileset2",
//                             "allowPicking": false,
//                             "maximumScreenSpaceError": 32,
//                             "url": "http://126.10.1.210:9003/model/2/tileset.json"
//                         },
//                         "children": []
//                     },
//                     {
//                         "name": "谷歌影像",
//                         "sceneObj": {
//                             "id": "c2c8311e-6e50-47a2-b764-1c82f2d0e253",
//                             "type": "ES3DTileset",
//                             "name": "ES3DTileset3",
//                             "allowPicking": false,
//                             "maximumScreenSpaceError": 32,
//                             "url": "http://126.10.1.210:9003/model/3/tileset.json"
//                         },
//                         "children": []
//                     },
//                     {
//                         "name": "谷歌影像",
//                         "sceneObj": {
//                             "id": "c2c8311e-6e50-47a2-b764-1c82f2d0e254",
//                             "type": "ES3DTileset",
//                             "name": "ES3DTileset4",
//                             "allowPicking": false,
//                             "maximumScreenSpaceError": 32,
//                             "url": "http://126.10.1.210:9003/model/4/tileset.json",
//                             // "show": false,
//                         },
//                         "children": []
//                     }

//                 ]
//             }
//         ]
//     }
// }
// // 针对项目场景中更新十分频繁的，涉及业务逻辑的场景对象建议统一使用ESObjectsManager来管理；涉及存储和导出的、不会频繁更新的场景对象可以存储到场景树中ESObjectsManager.sceneTree，例如地形，影像，固定视角等
// //获取内置默认场景树
// const sceneTree = objm.sceneTree

// //设置树json
// sceneTree.json = { ...json }
// const tree1 = objm.createSceneTree('tree1')


// const jsons = {
//     "id": "e211f45f - bed9 - 4898 - 8ae4- 8f4ba7cba447",
//     "type": "ESImageryLayer",
//     "url": "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
//     "name": "谷歌影像"
// }

// const currentTreeItem = objm.getSceneTree('tree1').root;
// const sceneObjTreeItem = sceneTree.createSceneObjectTreeItemFromJson(jsons, currentTreeItem, 'Inner')




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
        uri: "http://126.10.1.210:8080/",
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

    createModel = !createModel;

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
const startBaiMo = () => {
    const baiMoObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    baiMoObject.url = "https://image.giiiis.com/shanghai/tileset.json"

    /**-------------------------------------科技感模式设置--------------------------------------------**/

    // 科技感模式设置
    baiMoObject.materialMode = 'technology'
    objm.activeViewer.flyIn([120.18156639030802, 30.345430270311326, 21.709691272981487], [185.83759529203098, -7.648565841725815, 0.0013616815675382002], 0)
}
const startFlat = () => {
    const flatObject = objm.createSceneObject('ESPolygonFlattenedPlane') as ESPolygonFlattenedPlane | undefined
    //设置挖坑的3dtileset对象的id
    flatObject.targetID = "c2c8311e-6e50-47a2-b764-1c82f2d0e254"
    flatObject.points = []
    flatObject.editing = true

}
const startHole = () => {
    // const flatObject = objm.createSceneObject('ESPolygonFlattenedPlane') as ESPolygonFlattenedPlane | undefined
    const excavateObject = objm.createSceneObject(ESExcavate)
    excavateObject.targetID = "c2c8311e-6e50-47a2-b764-1c82f2d0e254"

    excavateObject.editing = false
    excavateObject.points = [[
        120.16999152070005,
        30.354644033737383,
        0
    ], [
        120.15067426739226,
        30.353214418719027,
        -1.3969838619232178e-9
    ], [
        120.15136699059069,
        30.36159156444283,
        0
    ], [
        120.15891912391068,
        30.36578336997267,
        0
    ], [
        120.16792828498417,
        30.36724211085038,
        0
    ], [
        120.17165635282457,
        30.365156722402254,
        -1.3969838619232178e-9
    ]]
    excavateObject.editing = true
}
// const start3DTiles = () => {
//     is3DTilesShow = !is3DTilesShow;
//     if (is3DTilesShow) {
//         const sceneObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
//         if (!sceneObject) return;
//         sceneObject.url = 'http://126.10.1.210:9003/model/1/tileset.json'
//         const sceneObject1 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
//         if (!sceneObject1) return;
//         sceneObject1.url = 'http://126.10.1.210:9003/model/2/tileset.json'
//         const sceneObject3 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
//         if (!sceneObject3) return;
//         sceneObject3.url = 'http://126.10.1.210:9003/model/3/tileset.json'
//         const sceneObject4 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
//         if (!sceneObject4) return;
//         sceneObject4.url = 'http://126.10.1.210:9003/model/4/tileset.json'
//         es3DTileset = sceneObject4;
//         es3DTileset.materialMode = 'technology'
//     } else {
//         es3DTileset.show = false;
//     }
// }
onMounted(() => {
    const dom = xe2Container.value;
    //人生哪得圆满!
    if (!dom) return;
    // //创建一个cesium视口,并且绑定一个div容器
    // const czmViewer = objm.createCesiumViewer(dom)







    //创建一个UE视口,并且绑定一个div容器
    const options = {
        domid: dom,
        uri: "http://126.10.1.211:9007/",
        app: "9a1eab97cc7546ffb1764b2916e3eda7",
        // sunIntensity: 251000,
    }
    const ueViewer = objm.switchToCesiumViewer(options)
    // ueViewer.sunIntensity = 8
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

    // let imageryObject = objm.createSceneObject('ESImageryLayer') as ESImageryLayer | undefined

    // if (!imageryObject) return;
    // let matrixIds = [];
    // for (let i = 0; i < 19; ++i) {
    //     matrixIds[i] = i + 1;
    // }
    // imageryObject.czmTilingSchemeJson = {
    //     "type": "GeographicTilingScheme",
    //     "numberOfLevelZeroTilesX": 2,
    //     "numberOfLevelZeroTilesY": 1
    // }
    // imageryObject.rectangle = [
    //     -180,
    //     -90,
    //     180,
    //     90
    // ]
    // imageryObject.maximumLevel = 19
    // imageryObject.minimumLevel = 0
    // imageryObject.zIndex = 2
    // imageryObject.czmTileMatrixLabels = [
    //     "1",
    //     "2",
    //     "3",
    //     "4",
    //     "5",
    //     "6",
    //     "7",
    //     "8",
    //     "9",
    //     "10",
    //     "11",
    //     "12",
    //     "13",.
    //     "14",
    //     "15",
    //     "16",
    //     "17",
    //     "18",
    //     "19"
    // ]
    // imageryObject.czmImageryProviderType = "wmts"
    // imageryObject.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/tile/{TileMatrix}/{TileRow}/{TileCol}';
    // imageryObject.url = 'https://t.hangzhoumap.gov.cn/Tile/ArcGISREST/hztdtlight202112.gis/tile/{TileMatrix}/{TileRow}/{TileCol}';

    // imageryObject.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/worldimage/Mapserver/WMTS?service=wmts&request=getTile&tilematrixset=worldimage&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'

    // 通过json创建一个影像图层
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


    const sceneObject = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject) return;
    sceneObject.url = 'http://126.10.1.210:9003/model/3/tileset.json'
    sceneObject.editing = false;

    const sceneObject1 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject1) return;
    sceneObject1.url = 'http://126.10.1.210:9003/model/1/tileset.json'
    sceneObject1.editing = false;

    // const sceneObject3 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    // if (!sceneObject3) return;
    // sceneObject3.url = 'http://126.10.1.210:9003/model/3/tileset.json'
    // sceneObject3.id = 'c2c8311e-6e50-47a2-b764-1c82f2d0e254'
    // sceneObject3.editing = false;
    const eS3DTileset = objm.createSceneObjectFromJson({
        "id": "c2c8311e-6e50-47a2-b764-1c82f2d0e254",
        "type": "ES3DTileset",
        "name": "ES3DTileset",
        "allowPicking": true,
        "url": "http://126.10.1.210:9003/model/2/tileset.json"
    })
    const sceneObject4 = objm.createSceneObject('ES3DTileset') as ES3DTileset | undefined
    if (!sceneObject4) return;
    sceneObject4.url = 'http://126.10.1.210:9003/model/4/tileset.json'
    sceneObject4.editing = false;
    sceneObject4.maximumScreenSpaceError = 128;
    es3DTileset = sceneObject4;

    // es3DTileset = ES3DTilesets;
    // const redLine = objm.createSceneObjectFromJson({
    //     "id": "b32d0a12-4511-45ae-b398-aaf965b4d4561",
    //     "type": "ESImageryLayer",
    //     "url": "https://zlbkjzz.hzsgis.com:8094/incitybrain/B8EBAF81285E9247EB8C8945C2D27FA4/PBS/rest/services/kg_ghdk/Mapserver/tile/{TileMatrix}/{TileRow}/{TileCol}",
    //     "options": {
    //         "type": "wmts",
    //         "tileMatrixLabels": [
    //             "1",
    //             "2",
    //             "3",
    //             "4",
    //             "5",
    //             "6",
    //             "7",
    //             "8",
    //             "9",
    //             "10",
    //             "11",
    //             "12",
    //             "13",
    //             "14",
    //             "15",
    //             "16",
    //             "17",
    //             "18",
    //             "19",
    //             "20"
    //         ],
    //         "tilingScheme": {
    //             "type": "GeographicTilingScheme",
    //             "numberOfLevelZeroTilesX": 2,
    //             "numberOfLevelZeroTilesY": 1
    //         }
    //     },
    //     "name": "ESImageryLayer_b32d1",
    //     "allowPicking": true
    // });
    const xzyzt = objm.createSceneObjectFromJson({
        "id": "b32d0a12-4511-45ae-b398-aaf965b4d45611",
        "type": "ESImageryLayer",
        "url": "https://zlbkjzz.hzsgis.com:8094/incitybrain/B8EBAF81285E9247EB8C8945C2D27FA4/PBS/rest/services/gcs330100g3099_qsmzq_xzyzt/Mapserver/tile/{TileMatrix}/{TileRow}/{TileCol}",
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
        "name": "ESImageryLayer_b32d11",
        "allowPicking": true
    });


    // const TerrainLayer = objm.createSceneObject(ESTerrainLayer)
    // if (!TerrainLayer) return;
    // TerrainLayer.name = '平球地形'
    // TerrainLayer.url = 'https://cb.hangzhoumap.gov.cn/26EA6F0EF53CF2A145773FD47072CFA6DF32242B193A67629E351E06A8B69BBD13D37C85C05BE58C7AB60EE9A00FE1D1/PBS/rest/services/hzdem30m/TerrainMapServer'



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
            objm.activeViewer.flyIn([
                120.1552001311425,
                30.370288718802406,
                531.9413836537668
            ], [
                152.64848898036388,
                -32.62203449107452,
                0.000822100891157131
            ], 0)
            objm.activeViewer.atmosphere = false;
            objm.activeViewer.sun = true;

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
        <button @click="getCurrentCameraInfo" v-show="true">获取当前视角</button>
        <button @click="flyTo3DTilest" v-show="true">flyTo3DTilest</button>
        <button @click="switchToCesiumViewer" v-show="true">切换为czm</button>
        <button @click="switchToUEViewer" v-show="true">切换为ue</button>
        <button @click="startAtmosphere" v-show="true">开启大气</button>
        <button @click="startVideoFusion" v-show="true">视频融合</button>
        <button @click="startModel" v-show="true">模型创建</button>
        <button @click="startWatch" v-show="true">巡查演示</button>
        <button @click="startBaiMo" v-show="true">白膜科技感</button>
        <button @click="startFlat" v-show="true">压平</button>
        <button @click="startHole">裁剪</button>
        <div id="panel" v-show="true">
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
    left: 3%;
    top: 5rem;
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
