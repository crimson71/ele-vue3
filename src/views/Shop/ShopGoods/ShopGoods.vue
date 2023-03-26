<template>
  <div class="shop-goods-container">
    <div class="left-wrapper">
      <ul class="left">
        <!-- 左侧分类 -->
        <li
          v-for="(item, index) in useState.shopgoods"
          :key="index"
          :class="currentIndex === index ? 'current' : ''"
          @click="clickLeftMenu(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="right-wrapper">
      <!-- 右侧分类 -->
      <ul ref="rightUl" class="rightUl">
        <!-- 大类li -->
        <li v-for="(item, index) in useState.shopgoods" :key="index" class="right-li">
          <ul>
            <!-- 详细商品 -->
            <li class="h-4 leading-4 text-base mb-2 font-bold" style="font-size: 0.6rem;">
              {{ item.name }}
              <span class="pl-1 text-xs text-gray-500">{{ item.description }}</span>
            </li>
            <li v-for="(foodItem, index) in item.foods" :key="index" @click="showFoodDetail(foodItem)">
              <div class="food-img-wrapper">
                <img :src="imgBaseUrl" alt="" />
              </div>
              <div class="food-info">
                <p class="food-name">
                  {{ foodItem.name }}
                </p>
                <p class="ellipsis text-gray-500 text-xs">{{ foodItem.description }}</p>
                <p class="text-gray-500 text-xs">{{foodItem.tips}}</p>
                <div class="flex justify-between">
                  <p class="text-orange-600 price">
                  ￥{{ foodItem.price }}
                  </p>
                  <CartCount :food="foodItem" ref="cartCount" @add-cart="drop"/>

                </div>

              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <FoodDetail :food=" food" ref="foodDetail" class="food-detail"/>
    <ShopCart ref="shopCart" class="shop-cart" />
    <div class="ball-container">
      <div v-for="(item,index) in balls" :key="index">
        <transition
        @before-enter="handleBeforEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
        name="drop">
        <div class="ball" v-show="item.show">
          <div class="inner inner-hook"></div>

        </div>

        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import CartCount from '@/components/CartCount/CartCount.vue'
import FoodDetail from '@/components/Food/FoodDetail.vue'
import ShopCart from '@/components/ShopCart/ShopCart.vue'
// import imgBaseUrl from '@/assets/images/'

const imgBaseUrl = require('@/static/images/1.png')
// const { proxy } = getCurrentInstance()
const store = useStore()
const useState = computed(() => {
  const shopgoods = store.state.goodsMenu
  return {
    shopgoods
  }
})

const scrollY = ref(0) // 右侧滑动的Y坐票
const tops = ref([]) // 右侧li的top

// 收集scrollY
const bsLeft = ref()
const bsRight = ref()

onMounted(async () => {
  await nextTick()
  bsLeft.value = new BScroll('.left-wrapper', {
    click: true // 开启click事件
  })
  bsRight.value = new BScroll('.right-wrapper', {
    probeType: 1, // 惯性也会滑动
    click: true
  })
  initScroll()
  initTops()
})
// 初始化scroll
const initScroll = () => {
  bsRight.value.on('scroll', ({ x, y }) => {
    scrollY.value = Math.abs(y)
    console.log(scrollY.value, 'scrolly')
  })
  // 滚动结束时的坐标
  bsRight.value.on('scrollEnd', ({ x, y }) => {
    scrollY.value = Math.abs(y)
    console.log(scrollY.value, 'scrolly2')
  })
}
const rightUl = ref()
const initTops = () => {
  let top = 0
  tops.value.push(top)
  const rightLis = rightUl.value.getElementsByClassName('right-li')
  Array.prototype.slice.call(rightLis).forEach((li) => {
    top += li.clientHeight
    tops.value.push(top)
  })
  console.log(tops.value, 'tops')
}
// 查找当前右侧li下标
const currentIndex = computed(() => {
  const index = tops.value.findIndex((top, index) => {
    return scrollY.value >= top && scrollY.value < tops.value[index + 1]
  })
  return index
})

// 左侧menu点击事件
const clickLeftMenu = (index) => {
  const y = tops.value[index]
  console.log(y, 'y')
  scrollY.value = -y
  bsRight.value.scrollTo(0, scrollY.value, 300)
  console.log(index)
}

// 显示商品详情
const food = ref()
const foodDetail = ref()
const showFoodDetail = (foodItem) => {
  food.value = foodItem
  foodDetail.value.toggleShow()
  console.log(foodDetail, 'foodDeatail')
}

// 添加购物车动画
const balls = ref([{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }])
const dropBalls = ref([])
const drop = (el) => {
  console.log(el)

  for (let i = 0; i < balls.value.length; i++) {
    const ball = balls.value[i]
    if (!ball.show) {
      ball.show = true
      ball.el = el
      dropBalls.value.push(ball)
      return
    }
  }
}

const handleBeforEnter = (el) => {
  let count = balls.value.length
  while (count--) {
    const ball = balls.value[count]
    console.log(ball.el)
    if (ball.show) {
      //  getBoundingClientRect()获取小球相对于视窗的位置，屏幕左上角坐标为0，0
      const rect = ball.el.getBoundingClientRect()
      // 小球x方向位移= 小球距离屏幕左侧的距离-外层盒子距离水平的距离
      const x = rect.left + 32
      // 负数，因为是从左上角向下
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = 'block'
      el.style.webkitTransform = `translate3d(0,${y}px,0)`
      el.style.transform = `translate3d(0,${y}px,0)`
      // 获取内层盒子
      const inner = el.getElementsByClassName('inner-hook')[0]
      // 设置内层盒子，即小球水平方向的距离
      inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      inner.style.transform = `translate3d(${x}px,0,0)`
    }
  }
}
const handleEnter = (el, done) => {
  // const rf = el.offsetHeight
  nextTick(() => {
    el.style.webkitTransform = 'translate3d(0, 0, 0)'
    el.style.transform = 'translate3d(0, 0, 0)'
    const inner = el.getElementsByClassName('inner-hook')[0]
    inner.style.webkitTransform = 'translate3d(0, 0, 0)'
    inner.style.transform = 'translate3d(0, 0, 0)'
    // Vue为了知道过渡的完成，必须设置相应的事件监听器。
    // 如果没有这一句那将不会执行handleAfterEnter
    el.addEventListener('transitionend', done)
  })
}
const handleAfterEnter = (el) => {
  // 完成一次动画就删除一个dropBalls的小球
  const ball = dropBalls.value.shift()
  if (ball) {
    ball.show = false
    // 如果没有这一句，小球到达终点后过一小段时间后才消失
    // 具体原因也是搞不清楚，上面也已经false掉了
    el.style.display = 'none'
  }
}

</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';

.shop-goods-container {
  position: relative;
  display: flex;
  .food-detail {
    @include allcover;
  }
  .current {
    color: $blue !important;
    background: #fff;
  }
  .left-wrapper {
    width: 25%;
    height: 100vh;
    overflow: hidden;

    .left {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      li {
        @include sc(0.5rem, #444);
        height: 2.75rem;
        padding: 0.5rem;

        text-align: center;
      }
    }
  }
  .right-wrapper {
    width: 75%;
    height: 100vh;
    overflow: hidden;
    .rightUl {
      li {
        ul {
          li {
            display: flex;
            .food-img-wrapper {
              position: relative;
              width: 33%;
              @include wh(6rem, 6rem);
              .food-img {
                @include wh(4rem, 4rem);
                @include borderRadius(5px);
              }
            }
            .food-info {
              width: 67%;
              padding: 0 5px;
              .food-name {
                font-size: 0.7rem;
                color: #191919;
                font-weight: 700;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              .price {
                @include font(.8rem,.8rem)
              }
            }
          }
        }
      }
    }
  }
  .shop-cart {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .ball-container {
    .ball {
       position: fixed ;
       left: 32px;
       bottom: 22px;
       z-index: 999;
       .drop-enter-active,
       .drop-leave-active {
        transition: all .8s cubic-bezier(0.49,-0.49,0.75,0.41)
       }
       .inner {
         width: 16px;
           height: 16px;
           border-radius: 50%;
           background: rgb(0,160,220);
           transition: all .8s;
       }

    }

  }
}
</style>
