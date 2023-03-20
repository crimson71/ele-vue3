<template>
<div class="shop-goods-container">

    <ul class="left">
      <li v-for="item in useState.shopgoods" :key="item.id">

        {{item.name}}</li>

    </ul>

  <div class="right">
    123

  </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const useState = computed(() => {
  const shopgoods = store.state.goods
  return {
    shopgoods
  }
})
</script>

<style lang="scss" scoped>
@import '../../../common/sass/mixin.scss';
.shop-goods-container {
  display: flex;
  .left {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include sc(0.5rem,#777);
    li {
      padding: 0.7rem;
    }

  }
  .rigth{
    width: 75%;
  }
}
</style>
