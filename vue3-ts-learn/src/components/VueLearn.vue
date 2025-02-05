
<script lang="ts" setup>
import { reactive, ref } from 'vue';
const prop=defineProps(
    {faterParam:String}
);
// emit() 的第一个参数是事件的名称。其他所有参数都将传递给事件监听器。
// 父组件可以使用 v-on 监听子组件触发的事件
const emit=defineEmits(['response']);
emit('response','response哈哈哈哈');
// reactive() 只适用于对象 (包括数组和内置类型，如 Map 和 Set)。而另一个 API ref() 则可以接受任何值类型。ref 会返回一个包裹对象，并在 .value 属性下暴露内部值。
const number=1;
const title=ref("Variable");
// RefImpl
console.log('title',title);
console.log('title.value',title.value);
const reacNumber=reactive({number:1});
const titleCalss=ref("title");   
</script>
<template>
    <div>
        <!-- 注意我们在模板中访问的 message ref 时不需要使用 .value：它会被自动解包 -->
        <!-- <h1>{{ title.value }}</h1> -->
        <h1 :class="titleCalss">{{ title }}</h1>
        <h1>{{ number }}</h1>
        <h1>{{ reacNumber.number }}</h1>
        <h1>父组件传值:{{ faterParam}}</h1>
    </div>
</template>
<style>
.title {
    color:red;
}
</style>