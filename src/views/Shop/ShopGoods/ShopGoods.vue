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
      <ul ref="rightUl">
        <li v-for="item in useState.shopgoods" :key="item.id" class="right-li">
          <!-- 右侧分类标题 -->
          <div class="font-bold mb-1" style="font-size: 0.5rem">
            {{ item.name }}
            <span class="pl-1" style="color: #999">{{ item.description }}</span>
          </div>
          <ul>
            <li v-for="(foodItem, index) in item.foods" :key="index">
              <div class="food-info">
                <img
                  class="food-img"
                  :src="imgBaseUrl + foodItem.image_path"
                  alt=""
                />
                <div class="food-desc">
                  <h5 class="food-name font-bold" style="font-size: 0.7rem">
                    {{ foodItem.name }}
                  </h5>
                  <p class="desc mt-1.5" style="color: #999; font-size: 0.5rem">
                    {{ foodItem.description }}
                  </p>
                  <p style="color: #999; font-size: 0.5rem" class="mt-1">
                    {{ foodItem.tips }}

                  </p>

                </div>

              </div>
            </li>
          </ul>
          <cart-count class="cart-count"></cart-count>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { imgBaseUrl } from '@/api/getData'
import BScroll from '@better-scroll/core'
import CartCount from '@/components/CartCount/CartCount.vue'

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
  console.log(tops.value)
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
</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';

.shop-goods-container {
  position: relative;
  display: flex;
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
        @include sc(0.5rem, #999);
        padding: 0.5rem;
        height: 2.75rem;
        line-height: 2.75rem;
        text-align: center;
      }
    }
  }
  .right-wrapper {
    width: 75%;
    height: 100vh;
    overflow: hidden;

    ul {
      li {
        ul {
          li {
            .food-info {
              display: flex;
              .food-img {
                @include wh(33%, 100%);
                margin-right: 0.6rem;
              }
            }
            .cart-count {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
