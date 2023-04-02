<template>
  <ul class="activecoupon-container">
    <li class="coupon-li" v-for="item in coupon" :key="item.id">
    <div class="name">{{ item.name }}</div>
    <div class="validity-periods">{{ item.description_map.validity_periods }}</div>
    <div class="sum-condition">{{ item.description_map.sum_condition }}</div>
    <div class="phone">{{ item.description_map.validity_delta }}</div>

    </li>
  </ul>
  </template>

<script setup>
import { useRoute } from 'vue-router'
import { getUnactiveCoupon } from '@/api/getData'
import { onMounted, ref } from 'vue'
const route = useRoute()
const coupon = ref()
const userId = route.query.id
const getCoupon = async (obj) => {
  const { data } = await getUnactiveCoupon(obj)
  coupon.value = data
}
onMounted(() => {
  getCoupon({ user_id: userId, limit: 10, offset: 0 })
})

</script>

  <style lang="scss" scoped>
  @import '../../../common/sass/mixin.scss';
  .activecoupon-container {
    width: 100%;
    .coupon-li {
      position: relative;
      width: 90%;
      height: 6rem;
      background: url('@/assets/images/couponbg.jpg') no-repeat center;
      background-size: 80%;
      .name {
        position: absolute;
        top: 1.5rem;
        left: 3rem;
        @include sc(1rem,#000)
      }
      .validity-periods {
        position: absolute;
        top: 3rem;
        left: 3rem;
        @include sc(.6rem,red)
      }
      .sum-condition {
        position: absolute;
        top: 1rem;
        right: 1.8rem;
        color: #fff;
        font-size: .6rem;
      }
      .phone {
        position: absolute;
        top: 4rem;
        right: 1.8rem;
        color: #fff;
        font-size: .5rem;
      }
    }
  }

  </style>
