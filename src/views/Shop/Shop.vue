<template>
  <div class="shop-container"  >
    <shop-header></shop-header>
    <div class="tab">
      <div class="tab-container">
        <div class="tab-item">
          <router-link
            :to="{ name: 'shopgoods' }"
            :class="route.name === 'shopgoods' ? 'link-active' : ''"
          >
            点餐
          </router-link>
        </div>
        <div class="tab-item rating">
          <router-link
            :to="{ name: 'shopratings' }"
            :class="route.name === 'shopratings' ? 'link-active' : ''"
          >
            评价
            <span>{{ useState.shopScore.order_rating_amount }}</span>
          </router-link>
        </div>
        <div class="tab-item">
          <router-link
          :to="{ name: 'shopinfo' }"
          :class="route.name === 'shopinfo' ? 'link-active' : ''"
          >商家</router-link>
        </div>
      </div>
      <div class="invite-friend"><span>好友拼单</span></div>
    </div>

      <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>

  </div>
</template>

<script setup>
import ShopHeader from '@/components/ShopHeader/ShopHeader.vue'

import { useStore } from 'vuex'
import { onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const useState = computed(() => {
  const shopInfo = store.state.info
  const shopScore = store.state.shopScore
  return {
    shopInfo,
    shopScore

  }
})

const shopId = route.query.id
store.state.shopId = shopId
onBeforeMount(() => {
  store.dispatch('getShopInfo')
  store.dispatch('getShopGoods')
  store.dispatch('getshopScore')
  store.dispatch('getRatingTags')
})
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.link-active {
  border-bottom: 2px solid $blue;
}
.shop-container {
  width: 100%;
  padding: 0 0.8rem;
  .tab {
    width: 100%;
    display: flex;
    height: 1.5rem;
    line-height: 1.5rem;
    justify-content: space-between;
    .tab-container {
      font-size: 0.7rem;
      display: flex;
      justify-content: space-between;
      width: 50%;

      .rating {
        position: relative;
        span {
          position: absolute;
          top: -0.3rem;
          right: -1rem;
          font-size: 0.5rem;
          color: #777;
        }
      }
    }
    .invite-friend {
      width: 50%;
      position: relative;

      span {
        top: 0.5rem;
        right: 0rem;
        position: absolute;
        font-size: 0.5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 0.7rem;
        width: 50%;
        text-align: center;
        color: $blue;
        border: 1px solid $blue;
      }
    }
  }
}
</style>
