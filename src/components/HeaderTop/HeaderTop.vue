<template>
  <header class="header-container">
    <span  v-if="gobackShow" >
    <svg-icon name="arrow-left" class="goback" ></svg-icon>
    </span>
    <slot name="left" ></slot>
    <span class="title ellipsis"> {{props.title}}</span>
    <slot name="right" ></slot>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'
const gobackShow = false
const props = defineProps({
  title: String
})
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.header-container {
  padding: 0rem .8rem;
  position: relative;
  width: 100%;
  height: 3.5rem;
  line-height:3.5rem;
  background: $blue;
  .goback {

    width: 1.2rem;
    height: 1.2rem;
    line-height: 3.5rem;
  }

  .title {
    @include center;
    @include sc(1.2rem,#fff);
    width: 5rem;
    text-align: center;
  }

}
</style>
