<template>
  <div class="search-container">
    <div class="search-box">
      <router-link :to="{name:'msite'}" >
        <svg-icon name="arrow-left"/>
      </router-link>
      <input type="text" placeholder="请输入搜索内容" v-model="keyword">
      <button>搜索</button>
    </div>
    <div class="search-history" >
      <div class="title">历史搜索</div>
      <!-- <ul v-if="useState.recentSearch">
        <li></li>
      </ul> -->
    </div>
  </div>

</template>

<script setup>

import { ref } from 'vue'
// import { useStore } from 'vuex'
//
const keyword = ref()
// const store = useStore()
// const useState = computed(() => {
//   const recentSearch = store.state.recentSearch
//   return {
//     recentSearch
//   }
// })
</script>

<style>

</style>
