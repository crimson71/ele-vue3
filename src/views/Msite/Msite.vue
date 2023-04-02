<template>
  <div class="msite-container" >
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
      <p class="lc-title">
        <svg-icon name="location" style="width: 1rem;height: 1rem;"></svg-icon>

        <span >{{ storeState.address.address }}</span>

        <span class="text-xs float-right px-1 " style="font-size: .2rem;line-height: 2rem;">美食果蔬医药.30分钟送达</span>
      </p>
    </div>

    <router-link :to="{name:'search'}" class="search">
      <svg-icon name="search" class="search-icon" style="width: 1rem;height: 1rem;"></svg-icon>
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
    <shop-list ></shop-list>
    <footer-guide class="footer" />
  </div>
</template>

<script setup>
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue'
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import SwiperAd from '@/components/SwiperAd/SwiperAd.vue'
import { onBeforeMount, computed } from 'vue'
import ShopList from '@/components/ShopList/ShopList.vue'
import { useStore } from 'vuex'

const store = useStore()
onBeforeMount(() => {
  store.dispatch('getAddress')
})
const storeState = computed(() => {
  const address = store.state.address
  return { address }
})

</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.msite-container {
  width: 100%;
  padding: 0 0.1rem;

  .title {
    color: #fff;
  }
  .login {
    float: right;
    color: #fff;
  }
  .location {
    display: flex;
    justify-content: space-between;
    background: $blue;
    width: 100%;
    @include font(2rem, 2rem);
    background: $blue;

    .lc-title {
      background: #fff;
      border-radius: 1rem 1rem 0 0;
      @include sc(.6rem, #666);
      display: inline-block;
      line-height: 2rem;
      width: 100%;
      height: 2rem;

      .svg-icon {
        vertical-align: middle;
        fill: #666;
        display: inline;
      }
    }
  }

  .search {
    background: #fff;
    display: block;
    position: relative;
    border: 1px solid $blue;
    width: 100%;
    height: 2rem;
    border-radius: 1rem;
    .search-icon {
      position: absolute;
      top: .5rem;
      left: .2rem;
      fill: rgba(0, 0, 0, 0.3);
    }

    .placeholder {
      color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: .2rem;
      left: 2rem;
    }
    .search-bth {
      display: inline-block;
      top: -0.01rem;
      right: 0;
      position: absolute;
      background: $blue;
      width: 25%;
      height: 2rem;
      border-radius: 1rem;
      color: #fff;
      font-weight: 700;
      font-size: 1rem;
      text-align: center;
    }
  }

  .food {
    background: #fff;
    padding-top: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    text-align: center;
    margin-bottom: 0.7rem;

    .li {
      display: flex;
      flex-direction: column;
      color: #666;
      width: 20%;
      font-size: 0.5rem;
      margin-bottom: 0.1rem;
      img {
        margin: auto;
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
