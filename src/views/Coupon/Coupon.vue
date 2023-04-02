<template>
  <div class="coupon-container">
    <div class="tab">
      <router-link class="link " :class="route.name=== 'active' ? 'active': ''" :to="{name:'active',query:{id:userId}}">可用红包</router-link>
      <router-link class="link" :class="route.name=== 'unactive' ? 'active': ''" :to="{name:'unactive',query:{id:userId}}">过期红包</router-link>
    </div>
    <router-view></router-view>

  </div>
</template>

<script setup>
import Cookie from 'js-cookie'
import { useRoute } from 'vue-router'
const userId = Cookie.get('userId')
const route = useRoute()
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.coupon-container {
  width: 100%;
  .tab {
    width: 50%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-around;

    .link {
      @include sc(.8rem,#000);

    }
    .active {
      border-bottom: 2px solid $blue;
    }

  }
  }
</style>
