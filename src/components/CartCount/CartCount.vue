<template>
  <div class="cart-container ml-4">
    <transition name="move">
      <svg-icon
        name="decrease"
        class="decrease icon-entry-remove"
        style="width: 0.8rem; height: 0.8rem"
        @click.stop="handleCount(false)"
        v-if="props.food.count"
      />
    </transition>

    <span class="text-sm" v-if="props.food.count">{{ props.food.count }}</span>

    <svg-icon

      name="add"
      class="increase"
      ref="addIcon"
      style="width: 0.8rem; height: 0.8rem"
      @click.stop="handleCount(true,$event)"
    />

  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance()
const store = useStore()
const props = defineProps({
  food: Object
})

// 购物车按钮点击事件

const handleCount = (isAdd, event) => {
  store.dispatch('updateFoodCount', { isAdd, food: props.food })
  if (isAdd) {
    proxy.$emit('add-cart', event.target)
  }
}

</script>

<style lang="scss" scoped>
@import '../../common/sass/mixin.scss';
.cart-container {
  position: relative;
  height: 1.5rem;
  width: 5rem;
  display: flex;
 .move-enter-active,
 .move-leave-active{
  transition: all .3s ease;
 }
 .move-enter,
 .move-leave-to {
  opacity: 0;
  transform: translateX(-15px) rotate(180deg) ;
 }

  span {
    display: inline-block;
    width: 1.25rem;
    text-align: center;
  }

  .decrease,
  .increase {
    margin-top: 0.25rem;
    fill: $blue;
  }
  .increase {
    position: absolute;
    right: .8rem;
  }

}
</style>
