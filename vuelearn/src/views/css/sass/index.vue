<!-- https://www.sass.hk/docs/ -->
<template>
    <div class='ancestor'>
        ancestor
        <div class='father'>
            father
            <div class='child'>
                child
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {

        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="scss">
// SassScript 支持 6 种主要的数据类型：
// 数字，1, 2, 13, 10px
// 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
// 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
// 布尔型，true, false
// 空值，null
// 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
// maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)

// 变量使用： $+变量名：value  将局部变量转换为全局变量可以添加 !global 声明
$red-color: rgb(243, 10, 10);

.ancestor {

    // sass选择器嵌套
    .child:before {
        color: $red-color;
        content: "使用变量";
    }

    .child::after {
        color: $red-color+200;
        content: "变量计算";
    }
}
</style>
