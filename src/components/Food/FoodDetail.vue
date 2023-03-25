<template>
<div class="food-derail-container"
v-if="isShow"
@click="toggleShow">
 food
</div>
</template>

<script setup>
import { defineProps, ref, defineExpose } from 'vue'
const props = defineProps({
  food: Object
})
const isShow = ref(false)
const toggleShow = () => {
  isShow.value = !isShow.value
}
defineExpose({
  toggleShow

})
console.log(props.food)

</script>

<style>

</style>
