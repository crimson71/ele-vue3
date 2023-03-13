<template>
  <header class="header-container">
    <span  v-if="gobackShow" >
    <svg-icon name="arrow-left" class="goback" ></svg-icon>
    </span>
    <slot name="left" ></slot>
    <span class="title ellipsis">{{props.title}}</span>
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
  padding: 0px 10px;
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $blue;
  .goback {

    width: 20px;
    height: 20px;
    line-height: 50px;
  }

  .title {
    @include center;
    @include sc(20px,#fff);
    width: 100px;
    text-align: center;
  }

}
</style>
