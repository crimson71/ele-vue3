<template>

    <router-view></router-view>
  <footer-guide class="footer" v-if="$route.meta.showFooter"></footer-guide>

</template>

<script setup>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onBeforeMount(() => {
  store.dispatch('getCity')
})

</script>

<style lang="scss">

  .footer {
  position: fixed;
  bottom: 0;
  left: 0;
}

</style>
