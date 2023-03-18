<template>
  <div class="shoplist-container">
    <ul class="select-shop">
      <li class="blue" @click="selectShop('优惠大酬宾')"> 优惠大酬宾</li>
      <li @click="selectShop('新用户立减')">新用户立减</li>
      <li @click="selectShop('进店领券')">进店领券</li>

    </ul>
    <ul >
      <router-link to="#" class="shop-li" v-for="item in shopList" :key="item.id">
        <div class="li-left">
          <span v-if="item.is_premium" class="premium">品牌</span>

          <img :src="imgBaseUrl+item.image_path" alt="">
        </div>
        <div class="li-rigth">
          <div class="shop-name ellipsis">{{item.name}}</div>
          <div class="flex justify-between">
            <div class="flex shop-rating">
              <rating-star :rating="item.rating" ></rating-star>
              <div class="text-orange-500 pl-1.5"><span class="text-orange-500 font-bold">{{item.rating}}</span>分</div>
            </div>
            <div class="text-sm">{{item.order_lead_time}} &nbsp;&nbsp;{{item.distance}}</div>
          </div>
          <div class="text-sm text-grey-50 flex justify-between">
            <div>
              <span>月售{{item.recent_order_num}}</span>
            <span>&nbsp;&nbsp;起送￥{{item.float_minimum_order_amount}}</span>

            </div>

            <div class="delivery" v-if="item.delivery_mode">{{item.delivery_mode.text}}</div>
          </div>
          <div class="promotion">
           <span>{{item.promotion_info}}</span>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import RatingStar from '@/components/RatingStar.vue'
import { getShopList } from '@/api/getData'
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
const imgBaseUrl = '//elm.cangdu.org/img/'
const store = useStore()
const useState = computed(() => {
  const latitude = store.state.latitude
  const longitude = store.state.longitude
  return {
    latitude,
    longitude
  }
})
const limit = 20 // 一次获取20条数据
const shopList = ref([]) // 店铺列表
const selectShop = (option) => {
  const newArr = shopList
  newArr.value.forEach(item => {
    if (item.activities) {
      item.activities.forEach(subItem => {
        if (option === subItem.name) {
          newArr.value.push(item)
          console.log(item)
        }
      })
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

  shopList.value = data
}
onBeforeMount(() => {
  initList()
})
</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.shoplist-container {
  .select-shop  {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;
    li {
      font-size: 12px;
      @include wh(80px,30px);
      background: #fff;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;

    }
    .blue {
      background: $blue;
      color: #fff
    }

  }
  .shop-li {
    @include fj(space-between);
    margin-bottom: 10px;
    background: #fff;
    @include borderRadius(10px);
    padding: 10px;

    .li-left {
      position: relative;
      @include wh(26%,100px);
      .premium {
        position: absolute;
        display: block;
        @include wh(50px,20px);
        line-height: 20px;
        text-align: center;
        color: #fff;
        font-weight: 700;
        background: $blue;
        border-radius: 5px;
        top: -5px;
        left: 0px
      }
      img {
        @include wh(100%,100px);
        @include borderRadius(10px);
      }
    }
    .li-rigth {
      @include wh(74%,100px);
      padding-left:10px ;
      .shop-name {
        width: 80%;
        @include sc(18px,#000);
        font-weight: 600;
        margin-bottom: 5px;

      }
      .shop-rating {
        line-height: 100%;
      }
      .delivery {
        color: $blue;
        font-size: 16px;
        font-weight: 700;
      }
      .promotion {
        margin-top: 5px;
        font-size: 12px;

        span {
          color: orange;

        }

      }

    }

  }
}

</style>
