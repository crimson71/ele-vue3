<template>
  <div class="shoplist-container" ref='shoplist'>

    <ul class="select-shop" :class="{'list-fixed' : ListFixed}" >
      <li class="ellipsis" :class="{'blue':blue === 4}"  @click="orderShop(4)"> 智能排序(默认)</li>
      <li :class="{'blue':blue === 1}" @click="orderShop(1)"> 起送价</li>
      <li :class="{'blue':blue === 2}"  @click="orderShop(2)">配送速度</li>
      <li :class="{'blue':blue === 3}" @click="orderShop(3)">评分</li>
      <li :class="{'blue':blue === 5 }" @click="orderShop(5)">距离最近</li>
      <li :class="{'blue':blue === 6}"  @click="orderShop(6)">销量最高</li>

    </ul>
    <ul >
      <router-link :to="{name:'shop',query:{id:item.id}}" class="shop-li" v-for="item in shopList" :key="item.id">
        <div class="li-left">
          <span v-if="item.is_premium" class="premium">品牌</span>

          <img :src="imgBaseUrl+item.image_path" alt="">
        </div>
        <div class="li-rigth">
          <div class="shop-name ellipsis">{{item.name}}</div>
          <div class="flex justify-between">
            <div class="flex shop-rating">
              <rating-star :rating="item.rating" ></rating-star>
              <div class="text-orange-500 pl-1.5 text-xs"><span class="text-xs text-orange-500 font-bold">{{item.rating}}</span>分</div>
            </div>
            <div class="text-xs ellipsis w-2/5">{{item.order_lead_time}} &nbsp;&nbsp;{{item.distance}}</div>
          </div>
          <div class="text-xs text-grey-50 flex justify-between">
            <div>
              <span>月售{{item.recent_order_num}}</span>
            <span>&nbsp;&nbsp;起送￥{{item.float_minimum_order_amount}}</span>

            </div>

            <div class="delivery text-xs" v-if="item.delivery_mode">{{item.delivery_mode.text}}</div>
          </div>
          <div class="promotion text-xs">
           <span>{{item.promotion_info}}</span>
          </div>
        </div>
      </router-link>
    </ul>
    <div class="redpaper .redpaper-anima"> <img src="../../assets/images/redpaper.gif" alt=""></div>

  </div>
</template>

<script setup>
import RatingStar from '@/components/RatingStar.vue'
import { getShopList } from '@/api/getData'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// const currentInstance = getCurrentInstance()
const imgBaseUrl = '//elm.cangdu.org/img/'
const store = useStore()
const useState = computed(() => {
  const latitude = store.state.latitude
  const longitude = store.state.longitude
  const geohash = store.state.geohash
  return {
    latitude,
    longitude,
    geohash
  }
})

const limit = 20 // 一次获取20条数据
const shopList = ref([]) // 店铺列表
const blue = ref(4)
// const isLoading = ref(false)
// // const loadingEnd = ref(false) // 没有更多数据
// const preventRepeatRequest = ref(false) // 防止重复请求数据

// 店铺排序
const orderShop = async (option) => {
  blue.value = option
  const { data } = await getShopList({
    limit: limit,
    latitude: useState.value.latitude,
    longitude: useState.value.longitude,
    order_by: option
  })

  shopList.value = data
}
// 设定fixed
const ListFixed = ref(false)
const setFixed = () => {
  window.addEventListener('touchmove', () => {
    if (window.scrollY > 554) {
      ListFixed.value = true
    } else {
      ListFixed.value = false
    }
  })
}

// 初始化店铺列表
const initList = async () => {
  const { data } = await getShopList({
    limit: limit,
    latitude: useState.value.latitude,
    longitude: useState.value.longitude
  })
  shopList.value = data.data
  store.state.shops = data.data
}

// const loadMore = async () => {
//   if (loadingEnd.value) {
//     return
//   }
//   if (preventRepeatRequest.value) {
//     return
//   }
//   isLoading.value = true
//   limit += 20
//   const { data } = await getShopList({
//     limit: limit,
//     latitude: useState.value.latitude,
//     longitude: useState.value.longitude
//   })
//   if (data.length < 20) {
//     loadingEnd.value = true
//     return
//   }
//   shopList.value = [...data]
//   isLoading.value = false
// }

onMounted(() => {
  initList()
  setFixed()
})
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
@keyframes move {
  0% {
    transform: translateX(0rem);
  }
  100% {
    transform: translateX(3rem);
  }

}
.text-xs {
  font-size: 0.5rem;
  line-height: 1rem;
}

.shoplist-container {
  .redpaper {
    z-index: 999;
    position: fixed;
    right: 0;
    bottom: 1rem;
    @include wh(4rem,5.2rem);

  }

  .redpaper-anima {
    animation: move 1s ;
  }
  .list-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 98%;
    margin-right: -1rem;
    background: #fff;
  }
  .select-shop  {
    display: flex;
    justify-content: space-between;
    padding: .4rem 0.01rem;
    li {
      font-size: .5rem;
      @include wh(5rem,1rem);
      background: #fff;
      line-height: 1rem;
      text-align: center;
      border-radius: .01rem;

    }
    .blue {
      background: $blue;
      color: #fff
    }

  }
  .shop-li {
    @include fj(space-between);
    margin-bottom: .8rem;
    background: #fff;
    @include borderRadius(.8rem);
    padding: .8rem;

    .li-left {
      position: relative;
      @include wh(26%,4rem);
      .premium {
        position: absolute;
        display: block;
        font-size: .3rem;
        @include wh(1rem,.8rem);
        line-height: .8rem;
        text-align: center;
        color: #fff;
        font-weight: 700;
        background: $blue;
        border-radius: .1rem;
        top: -.1rem;
        left: 0rem
      }
      img {
        @include wh(100%,4rem);
        @include borderRadius(.5rem);
      }
    }
    .li-rigth {
      @include wh(74%,4rem);
      padding-left:.8rem ;
      .shop-name {
        width: 80%;
        @include sc(.8rem,#000);
        font-weight: 600;
        margin-bottom: .1rem;

      }
      .shop-rating {
        line-height: 100%;
      }
      .delivery {
        color: $blue;
        font-size: .5rem;
        font-weight: 700;
      }
      .promotion {
        margin-top: .1rem;
        font-size: .5rem;

        span {
          color: orange;

        }

      }

    }

  }
}

</style>
