<template>
  <div class="order-container">
    <div class="order-header">
      <router-link :to="{ name: 'msite' }" class="link">
        <svg-icon
          name="arrow-left"
          style="width: 1rem; height: 1rem; fill: #000"
        ></svg-icon>
        <h1>饿了么</h1>
      </router-link>
    </div>
    <div class="order-body">
      <h3 class="order-title">全部订单</h3>
      <ul class="order-content">
        <router-link
          to="#"
          v-slot="{ navigate }"
          v-for="(item, index) in useState.orderInfo"
          :key="index"
          class="link"
        >
          <li @click="navigate" @keypress.enter="navigate" role="link" class="order-item-li">
            <div class="shop-name">
              <div class="shop-img">
                <img :src="imgBaseUrl + item.restaurant_image_url" alt="" />
              </div>
              <span>{{ item.restaurant_name }}</span>
            </div>
            <div class="order-info">
              <ul>
                <li
                  v-for="(goodsItem, index) in item.basket.group[0]"
                  :key="index"
                  class="goods-li"
                >
                  <span class="goods-name">{{ goodsItem.name }}</span>
                  <span>x{{ goodsItem.quantity }}</span>
                  <span>{{ goodsItem.price }}</span>
                </li>
                <li class="packing_pee">
                  <span>{{ item.basket.packing_fee.name }}</span>
                  <span>x{{ item.basket.packing_fee.quantity }}</span
                  ><span>￥{{ item.basket.packing_fee.price }}</span>
                </li>
                <p class="amount">
                <span>总计：{{ item.total_quantity }}</span>
                <span>总价：￥{{ item.total_amount }}</span>
              </p>
              </ul>

            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
  <footer-guide class="footer" />
</template>

<script setup>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import { onMounted, computed, ref } from 'vue'
import Cookie from 'js-cookie'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const imgBaseUrl = '//elm.cangdu.org/img/'
// const userInfo = JSON.parse(Cookie.get('userinfo'))
const router = useRouter()
const store = useStore()
const userId = ref()
const checkLoginState = () => {
  if (!Cookie.get('token')) {
    // 没有登陆跳转到登陆页面
    return router.push({ name: 'passwordlogin' })
  }
  userId.value = parseInt(JSON.parse(Cookie.get('userid')))
  store.dispatch('getOrderInfo', { id: userId.value, limit: 10 })
}
onMounted(() => {
  checkLoginState()
})
const useState = computed(() => {
  const orderInfo = store.state.orderInfo
  return {
    orderInfo
  }
})
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.order-container {
  padding: 0.8rem 0.8rem;
  width: 100%;
  .order-header {
    .link {
      position: relative;
      display: flex;
      .svg-icon {
        @include ct;
      }
      h1 {
        margin-left: 1rem;
        font-size: 0.8rem;
      }
    }
  }
  .order-body {
    width: 100%;
    .order-title {
      width: 100%;
      @include sc(.8rem,#000);
      text-align: center;
      height: 1.5rem;
      font-weight: 600;
      border-bottom: 1px solid #eee;
      margin-bottom: .5rem;
    }
    .order-content{
      .link{
        .order-item-li{
          background: #fff;
          margin-bottom: .5rem;
          padding: .5rem;
          @include borderRadius(5px);
          .shop-name {
            display: flex;
            height: 1.5rem;
            .shop-img {
              width: 1rem;
              height: 1rem;
              margin-right: .5rem;

            }
            span {
              font-size: .8rem;
              font-weight: 700;
            }

          }
          .order-info {
            ul {
              .goods-li,
              .packing_pee,
              .amount {
                margin-bottom: .2rem;
                display: flex;
                justify-content: space-between;
                @include sc(.7rem,#999);
              }
              .packing_pee {
                margin: .5rem 0;
                border-bottom: 1px solid #eee;
                padding-top: .5rem;

              }

            }
          }

        }
      }

    }
  }
}
</style>
