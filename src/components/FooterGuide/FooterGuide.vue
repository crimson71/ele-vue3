<template>
  <div class="footer-container">

      <router-link :to="{ name: 'msite' }" class="link">
        <svg-icon name="home" :class="{ active: $route.name === 'msite' }" />
        <span>首页</span>
        </router-link>

      <router-link :to="{ name: 'search' }" class="link">
        <svg-icon name="search" :class="{ active: $route.name === 'search' }"/>
        <span>搜索</span>
      </router-link>
      <router-link :to="{name:'order'}" class="link">
        <svg-icon name="order" :class="{ active: $route.name === 'order' }"/>
      <span>订单</span>
      </router-link>

      <router-link :to="{name:'profile'}" class="link" >
        <svg-icon name="profile" :class="{ active: $route.name === 'profile' }"/>
      <span>我的</span>
      </router-link>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {

  setup () {
    const num = ref(1)
    let svgClass = ''
    const clickIcon = () => {
      svgClass = 'active-icon'
    }
    return {
      num,
      clickIcon,
      svgClass
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.footer-container {
  z-index: 999;
  width: 100%;
  display: flex;
  height: 62.8px;
  padding-top: 8px;
  justify-content: space-between;
  background: #fff;
  text-align: center;
  .link {
    width: 25%;
    display: flex;
    font-size: 10px;
    flex-direction: column;
    justify-content: space-between;
    .svg-icon {
      margin: auto;
      @include wh(28px, 28px);
      fill: rgba(0, 0, 0, 0.5);
      margin-bottom: 2px;
    }
    .active {
      fill: $blue;
    }
  }
}
</style>
