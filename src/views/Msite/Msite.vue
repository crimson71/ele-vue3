<template>
  <div class="msite-container">
    <!-- 头部 -->
    <header-top>
      <template v-slot:left>
        <span class="title"> 饿了么 </span>
      </template>
      <template v-slot:right>
        <span class="login"> 登陆 | 注册 </span>
      </template>
    </header-top>
    <!-- 搜索加定位 -->
    <div class="location">
      <span class="lc-title">{{ storeState.latitude}}{{storeState.longitude }}</span>
    </div>

    <router-link :to="{ name: 'search' }" class="search">
      <svg-icon name="search" class="search-icon"></svg-icon>
      <span class="placeholder">请输入关键字</span>
      <input type="button" class="search-bth" value="搜索" />
    </router-link>

    <!-- 导航 -->
    <nav>
      <ul class="food">
        <li class="li">
          <img src="../Msite/images/nav/1.jpg" />
          <span> 美食外卖 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/2.jpg" />
          <span> 超市便利 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/3.jpg" />
          <span> 水果 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/4.jpg" />
          <span> 跑腿 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/5.jpg" />
          <span> 买药 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/6.jpg" />
          <span> 晚餐 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/7.jpg" />
          <span> 甜品饰品 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/8.jpg" />
          <span> 0元领水果 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/9.jpg" />
          <span> 天天爆红包 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/10.jpg" />
          <span> 买菜 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/11.jpg" />
          <span> 鲜花绿植 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/12.jpg" />
          <span> 家常菜 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/13.jpg" />
          <span> 大型超市 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/14.jpg" />
          <span> 天天赚现金 </span>
        </li>
        <li class="li">
          <img src="../Msite/images/nav/1.jpg" />
          <span> 省钱好券 </span>
        </li>
      </ul>
    </nav>
    <!-- 轮播广告区 -->
    <swiper-ad></swiper-ad>

    <!-- 店铺列表 -->
    <shop-list></shop-list>
    <footer-guide class="footer" />
  </div>
</template>

<script setup>
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import SwiperAd from '@/components/SwiperAd/SwiperAd.vue'

import { computed, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const storeState = computed(() => {
  const latitude = store.state.latitude
  const longitude = store.state.longitude
  const address = store.state.address
  return {
    latitude,
    longitude,
    address
  }
})

onBeforeMount(() => {
  store.dispatch('getCity')
})

onMounted(() => {
  store.dispatch('getAddress')
})
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.msite-container {
  width: 100%;
  padding: 0 10px;
  .title {
    color: #fff;
  }
  .login {
    float: right;
    color: #fff;
  }
  .location {
    background: $blue;
    width: 100%;
    height: 30px;
    line-height: 30px;
    .lc-title {
      display: inline-block;
      width: 100%;
      height: 100%;

      border-radius: 10px 10px 0 0;
      background: #fff;
    }
  }

  .search {
    background: #fff;
    display: block;
    position: relative;
    border: 1px solid $blue;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    .search-icon {
      position: absolute;
      top: 6px;
      left: 8px;
      fill: rgba(0, 0, 0, 0.3);
    }

    .placeholder {
      color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 8px;
      left: 38px;
    }
    .search-bth {
      display: inline-block;
      top: -1px;
      right: 0;
      position: absolute;
      background: $blue;
      width: 25%;
      height: 40px;
      border-radius: 20px;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      text-align: center;
    }
  }

  .food {
    background: #fff;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    text-align: center;
    margin-bottom: 10px;

    .li {
      display: flex;
      flex-direction: column;
      color: #666;
      width: 20%;
      font-size: 14px;
      margin-bottom: 5px;
      img {
        margin: auto;
        width: 38px;
        height: 38px;
      }
    }
  }
}
</style>
