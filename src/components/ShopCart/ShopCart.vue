<template>
  <div class="shopcart-container">
    <div class="shopcart-list">
      <div class="list-header">
        <h1>已选商品</h1>
        <span class="clear">
          <svg-icon
            name="clear"
            class="clear-icon"
            style="width: 0.7rem; height: 0.7rem"
          ></svg-icon>
          清空</span
        >
      </div>
      <div class="list-content">
        <ul>
          <li v-for="(item,index) in useState.cartFoods" :key="index">
            <img :src="imgBaseUrl" alt="" />
            <div class="list-right">
              <h4 class="food-name">{{item.name }}</h4>
              <div class="food-info">
                <div class="food-price">￥{{item.price}}</div>
                <cart-count :food="item"></cart-count>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="shopcart-main">
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

    <!-- 購物車小球 -->
    <div class="ball-container">
      <transition
        v-for="(ball, index) in useState.balls"
        :key="index"
        name="drop"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import CartCount from '@/components/CartCount/CartCount.vue'
const imgBaseUrl = require('@/static/images/1.png')
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
  const balls = store.state.balls
  const dropBall = store.state.dropBall
  return {
    cartFoods,
    shopInfo,
    balls,
    dropBall
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
// 控制小球動畫
const beforeEnter = (el) => {
  let count = useState.value.balls.length
  while (count--) {
    const ball = useState.value.balls[count]
    if (ball.show) {
      // getBoundingClientRect返回值是一个 DOMRect 对象, 此包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。
      // 除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)

      // 小球外层控制y轴的运动轨迹,translate3d()可以开启硬件加速
      el.style.display = 'block'
      el.style.transform = `translate3d(0px,${y}px,0)`

      // 内层小球控制x轴运动轨迹,内外层运动方式是不一样的, y轴贝塞尔曲线, x轴匀速.
      const inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = `translate3d(${x}px, 0px,0)`
    }
  }
}
const enter = (el, done) => {
  nextTick(() => {
    el.style.webkitTransform = 'translate3d(0, 0,0)'
    el.style.transform = 'translate3d(0, 0,0)'
    const inner = el.getElementsByClassName('inner-hook')[0]
    inner.style.webkitTransform = 'translate3d(0, 0,0)'
    inner.style.transform = 'translate3d(0, 0,0)'
    el.addEventListener('transitionend', done)
  })
}
const afterEnter = (el) => {
  // 删除数组第一个元素, 并返回第一个元素,因对象都是指向地址,所以操作dropBall数组也就操作了balls数组
  const ball = useState.value.dropBall.shift()
  if (ball) {
    ball.show = false
    el.style.display = 'none'
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.shopcart-container {
  width: 100%;

  background: #fff;
  box-shadow: 10px 0 10px #ccc;
  .shopcart-list {
    width: 100%;
    padding: 0.8rem 0.8rem;
    .list-header {
      display: flex;
      justify-content: space-between;
      h1 {
        font-size: 0.7rem;
        font-weight: 700;
      }
      .clear {
        display: flex;
        font-size: 0.6rem;
        color: #999;
        .clear-icon {
          margin: 0.04rem 0.2rem 0 0;
          fill: #999;
        }
      }
    }
    .list-content {
      ul {
        li {
          display: flex;
          height: 4rem;
          margin-bottom: 5px;
          img {
            width: 25%;
            height: 100%;
            @include borderRadius(5px)
          }
          .list-right {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 75%;
            .food-name {
              font-size: .7rem;
              font-weight: 700;
              margin-bottom: 1rem;
            }
            .food-info {
              vertical-align:bottom;

              display: flex;
              justify-content: space-between;
              .food-price {
                color: red;
                font-size: .5rem;

              }

            }
          }
        }
      }
    }
  }
  .shopcart-main {
    display: flex;

    height: 3.1rem;
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

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
}
</style>
