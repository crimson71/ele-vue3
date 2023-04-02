<template>
  <div class="food-detail-container" v-if="isShow" >
    <div class="close" @click="toggleShow">
      <svg-icon name="close"   style="fill: #666;width: 1rem;height: 1rem;"/>

    </div>

    <div class="food-info">
      <img v-lazy="imgBaseUrl" />
      <div class="food-content">
        <p class="food-name">{{ props.food.name }}</p>
        <p class="food-desc ellipsis">{{ props.food.description }}</p>
        <p class="food-tips">{{ props.food.tips }}</p>
        <p class="flex justify-between">
          <span class="text-orange-500 text-sm">￥{{props.food.price}}</span>
          <cart-count :food="props.food" />

        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineExpose } from 'vue'
import CartCount from '../CartCount/CartCount.vue'
const imgBaseUrl = require('@/static/images/1.png')
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

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.food-detail-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.3);
  .close {
    position: absolute;
    fill: #444;
    top: 0.5rem;
    left: 0.3rem;
  }
  .food-info {
    width: 80%;
    height: 60%;
    @include center;
    background: #fff;
    padding: 0.8rem 0.8rem;
    @include borderRadius(.8rem);
    img {
      height: 40%;
      margin: 0 auto;
      margin-bottom: 10px;
    }
    .food-content {
      .food-name {
        width: 100%;
        font-weight: 700;
        font-size: .8rem;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;

      }
      .food-desc,
      .food-tips {
        font-size: .7rem;
        color:#666;
        margin-bottom: 8px;

      }
    }
  }
}
</style>
