<template>
  <div class="shop-header-container">
    <div class="goback" @click="goBack">
      <svg-icon name="arrow-left" style="width: 0.7rem;height: 0.7rem;"></svg-icon>
    </div>
    <div class="shop-info">
      <div class="info-top">
        <div class="top-left">
          <h3 class="shop-name">
            {{ useState.shopInfo.name }}
          </h3>
          <div class="intro mb-1 mt-1">
            <span class=" text-orange-500">{{ useState.shopInfo.rating }}分&nbsp;</span>
            <span>蜂鸟快送&nbsp;</span>
            <span>月售{{ useState.shopInfo.recent_order_num }}&nbsp;</span>
            <span>配送费￥{{ useState.shopInfo.float_delivery_fee }}</span>

          </div>
        </div>
        <div class="top-right">
          <img :src="imgBaseUrl + useState.shopInfo.image_path" alt="" />
        </div>
      </div>
      <div class="info-bottom">
        <span class="text-red-400" style="font-size: 0.5rem;" v-for="(item,index) in  useState.shopInfo.activities" :key="index">{{item.description}}</span>

      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const imgBaseUrl = '//elm.cangdu.org/img/'
const useState = computed(() => {
  const shopInfo = store.state.info
  return {
    shopInfo
  }
})

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.shop-header-container {
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: 100%;
  padding: 0 0.5rem;
  .goback {
    padding: 0.5rem 0;
  }

  .shop-info {
    background: #fff;
    padding: 0.5rem;
    @include borderRadius(10px);
    .info-top {
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      .top-left {
        .shop-name {
          @include sc(0.8rem,#000)
        }
        .intro {
          font-size: 0.5rem
        }
      }
      .top-right {
        img {
          @include wh(2.3rem, 2.3rem);
          @include borderRadius(10px);
        }
      }
    }
  }
}
</style>
