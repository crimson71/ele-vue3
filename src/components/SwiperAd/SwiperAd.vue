<template>
  <!-- 竖排轮播广告 -->
  <swiper
    :loop="true"
    direction="vertical"
    :autoplay="{
      delay:3000
    }"
    :modules="modules"
    class="vertical-ad"
  >
    <swiper-slide><i class="ad-icon">红包</i> 你有<i class="red"> 28 </i>张,共有 <i class="red"> 288 </i>元 <i class="ad-btn red">去查看</i> </swiper-slide>
    <swiper-slide><i class="ad-icon ad-icon-2">赚豆</i>  今天下<i class="orange"> 2 </i>单,赚 <i class="orange"> 288 </i >吃货豆 <i class="ad-btn orange" style="border: 1px solid orange;">领任务</i> </swiper-slide>

  </swiper>
  <!-- 横排轮播广告 -->
  <swiper
  :loop="true"

    class="fuli-ad"
  >
    <swiper-slide class="fuli-ad">
        <div class="fl-head"><i class="fl-title">今日福利</i><count-down class="count-down"></count-down> <a href="#" class="more">更多红包 ></a> </div>
        <div class="fl-body"><img src="../../assets/ad/hb.png" alt=""></div>
    </swiper-slide>
    <swiper-slide class="fuli-ad">
        <div class="fl-head"><i class="fl-title">今日福利</i> <count-down class="count-down"></count-down><a href="#" class="more">更多红包 ></a> </div>
        <div class="fl-body"><img src="../../assets/ad/hb.png" alt=""></div>
    </swiper-slide>
    <swiper-slide class="fuli-ad">
        <div class="fl-head"><i class="fl-title">今日福利</i><count-down class="count-down"></count-down> <a href="#" class="more">更多红包 ></a> </div>
        <div class="fl-body"><img src="../../assets/ad/hb.png" alt=""></div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper'
import 'swiper/css'
import CountDown from '@/components/CountDown/CountDown.vue'
const modules = [Autoplay]

</script>

<style lang="scss" scoped>
.red {
  color:red;

}
.orange {
  color: orange;

}
.vertical-ad {
    width: 100%;
    height: 30px;
    vertical-align: center;
    background: #fff;
    font-size: 14px;
    margin-bottom: 10px;
    .ad-icon {
      display: inline-block;
      width: 40px;
      height: 20px;
      padding:2px 5px;
      background: red;
      border-radius: 5px;
      text-align: center;
      margin: 5px 5px;
      font-size: 12px;
      font-weight: 700;
      color:#fff

    }
    .ad-icon-2 {
      background:orange;
    }
    .ad-btn {
      margin: 5px 0px;
      float: right;
      width: 60px;
      height:20px;
      line-height: 20px;
      font-size: 10px;
      text-align: center;
      border:1px solid red;
      border-radius: 10px;
      margin-left: 103px;
    }
  }
  .fuli-ad {
    width: 100%;
    height: 138px;
    border-radius: 10px;
    margin-bottom: 10px;
    .fl-head{
      position: relative;
      width: 100%;
      height: 35px;
      font-size: 16px;
      line-height: 35px;
      padding: 0 10px;
      .count-down {
        position: absolute;
        top: 7px;
        left: 103px;
      }
      .more {
        float: right;
        font-size: 14px;
      }
      background: linear-gradient(177deg, pink, white 50%);
      .fl-title {
        font-size: 20px;
        font-weight: 700;
        color: #000;
      }
    }
    .fl-body {
      width: 100%;
      img {
        height: 103px;

      }

    }
  }

</style>
