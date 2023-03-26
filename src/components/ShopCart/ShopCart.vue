<template>
  <div class="shopcart-container flex">
    <div class="img-wrapper" id="cart-img">
      <div>
        <img
          src="../../assets/images/shopcart.png"
          v-if="!useGetter.totalCount"
        />
        <img src="../../assets/images/shopcartactive.png" v-else />
      </div>

      <div class="total-count" v-if="useGetter.totalCount">
        {{ useGetter.totalCount }}
      </div>
    </div>
    <div class="count">
      <p class="price">
        <span class="text-xs">￥</span>{{ useGetter.totalPrice }}
      </p>
      <p class="text-grey-500 text-xs">
        配送费￥{{ useState.shopInfo.float_delivery_fee }}
      </p>
    </div>
    <div class="count-btn">
      <button :class="btnClass">{{ btnTxt }}</button>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const useGetter = computed(() => {
  const totalCount = store.getters.totalCount
  const totalPrice = store.getters.totalPrice
  return {
    totalCount,
    totalPrice
  }
})

const useState = computed(() => {
  const cartFoods = store.state.cartFoods
  const shopInfo = store.state.info
  return {
    cartFoods,
    shopInfo
  }
})

// 结算按钮的文本显示
const btnTxt = computed(() => {
  const minOrder = useState.value.shopInfo.float_minimum_order_amount // 起送费
  const totalPrice = useGetter.value.totalPrice
  return minOrder > totalPrice ? `￥${minOrder}起送` : '去结算'
})
// 结算按钮的颜色
const btnClass = computed(() => {
  const minOrder = useState.value.shopInfo.float_minimum_order_amount // 起送费
  const totalPrice = useGetter.value.totalPrice
  return minOrder > totalPrice ? 'no-enough' : ''
})

</script>
<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.shopcart-container {
  width: 100%;
  height: 3.1rem;
  background: #fff;
  box-shadow: 10px 0 10px #ccc;

  .img-wrapper {
    position: relative;
    img {
      @include wh(2.8rem, 2.8rem);
    }
    .total-count {
      position: absolute;
      padding: 0 0.02rem;
      line-height: 0.8rem;
      text-align: center;
      top: 1rem;
      right: 0.2rem;
      min-width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.8rem;
      background: #ff4b33;
      @include sc(0.5rem, #fff);
    }
  }
  .count {
    width: 60%;
    height: 100%;

    .price {
      padding-top: 0.8rem;
      font-size: 0.7rem;
    }
  }
  .count-btn {
    padding-top: 1rem;
    button {
      padding: 0.09rem 0.6rem;
      height: 1.5rem;
      border-radius: 1.5rem;
      min-width: 3.5rem;
      font-size: 0.5rem;
      color: #fff;
      text-align: center;
      background: $blue;
    }
    .no-enough {
      background: #666;
    }
  }

}
</style>
