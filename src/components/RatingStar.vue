<template>
  <div class="rate-container">
    <div class="star-container ">
        <svg-icon
          name="star-fill"
          v-for="num in 5"
          :key="num"
          style="width: .6rem;height: .6rem;"
          class="grey-star "
        ></svg-icon>
      </div>
    <div class="overflow-hidden relative  h-full" :style="'width:' + (props.rating /5*100) + '%'">
      <div class="star-container ">
        <svg-icon
          name="star-fill"
          v-for="num in 5"
          :key="num"
          style="width: .6rem;height: .6rem;"
          class="orange-star "
        ></svg-icon>
      </div>
    </div>

  </div>

</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  rating: Number
})

</script>

<style lang="scss" scoped>
@import '../common/sass/mixin.scss';
.rate-container {
  position: relative;
  @include wh(3rem,0.95rem);

  .star-container {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;

    .orange-star {

      fill: #ff9a0d;

    }
    .grey-star {
      fill: #d1d1d1;
    }
  }
}
</style>
