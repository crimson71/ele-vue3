<template>
  <div class="shop-info-container">
    <div class="shop-info">
      <div class="info-left">
        <h1 class="info-title">{{useState.shopInfo.name}}</h1>
        <router-link class="info-content" :to="{name:'map'}">
          <svg-icon name="location" class="icons" ></svg-icon>
          {{useState.shopInfo.address}}
        </router-link>
        <h3 class="info-content"></h3>
      <h3 class="info-content">  <svg-icon name="time" class="icons"></svg-icon>
        周一到周日{{ openTime}}
        </h3>

      </div>
      <div class="info-right">
        <svg-icon name="tel" style="width: 1rem;height: 1rem;" class="tel-icon"></svg-icon>
      </div>

    </div>
    <div class="shop-support">
      <h1 class="info-title">商家承诺</h1>
      <h3 class="support-title">食品安全 <svg-icon name="heart" class="icons ml-5"/><span class="info-content">{{useState.shopInfo.supports[0].name}}</span></h3>
      <h3 class="support-title">物流保障 <svg-icon name="service" class="icons ml-5" /><span class="info-content">{{useState.shopInfo.supports[1].name}}</span></h3>
      <h3 class="support-title">基础服务 <svg-icon name="piaoju" class="icons ml-5"/><span class="info-content"> {{useState.shopInfo.supports[2].name}}</span></h3>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const useState = computed(() => {
  const shopInfo = store.state.info
  return {
    shopInfo
  }
})
const openTime = computed(() => {
  const timeStr = useState.value.shopInfo.opening_hours[0].replace('/', '--')

  return timeStr
})

</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';
.shop-info-container {
  margin-top: 1rem;
  .info-title {

    @include sc(1rem,#000);
    font-weight: 700;
    margin-bottom: .8rem;
  }
  .info-content {
    @include sc(.6rem,#999);
    display: flex;
  }
  .icons {
    fill:#999;
    width: .8rem;
    height: .8rem;

  }
  .shop-info {
    display: flex;
    justify-content: space-between;
    background: #fff;
    @include borderRadius(5px);
    .tel-icon {
      fill: $blue;
    }
  }
  .shop-support {
     background: #fff;
     margin-top: 1rem;
    @include borderRadius(5px);
    .support-title {
      @include sc(.7rem,#000);
      margin-bottom: .7rem;
      display: flex;
      .info-content {
        margin-left: .5rem;
      }
    }

  }
}

</style>
