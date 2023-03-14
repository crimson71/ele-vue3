<template>
  <router-view></router-view>
  <footer-guide class="footer" v-if="$route.meta.showFooter"></footer-guide>

</template>

<script setup>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'

</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
}

</style>
