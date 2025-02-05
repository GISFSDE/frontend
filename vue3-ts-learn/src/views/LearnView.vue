<script setup lang="ts">
import VueLearn from '../components/VueLearn.vue'
const dddd="dddd";
function removeEventListener(response:string){
    console.log("response",response);
}
</script>

<template>
  <main>
    <VueLearn :faterParam="dddd" @response="removeEventListener"/>
  </main>
</template>
