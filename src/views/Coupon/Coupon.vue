<template>
  <div class="coupon-container">
    <div class="title flex">
      <router-link :to="{name:'profile'}" ><svg-icon name="arrow-left" style="width: 1rem;height: 1rem;fill: #444;"></svg-icon></router-link>

      <span>红包</span>
    </div>
    <div class="tab">
      <router-link class="link " :class="route.name=== 'active' ? 'active': ''" :to="{name:'active',query:{id:userId}}">可用红包</router-link>
      <router-link class="link" :class="route.name=== 'unactive' ? 'active': ''" :to="{name:'unactive',query:{id:userId}}">过期红包</router-link>
    </div>
    <router-view></router-view>

  </div>
</template>

<script setup>
import Cookie from 'js-cookie'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const userId = ref()
userId.value = Cookie.get('userid')
const route = useRoute()
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.coupon-container {
  .title {
    position: relative;
    text-align: center;
    font-size: .8rem;
    line-height: 2rem;
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #eee;
    .svg-icon {
      @include ct;
    }
    span {
      margin:0 auto;
    }
  }
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
