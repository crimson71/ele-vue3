import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/sass/comm.scss'
import SvgIcon from '@/components/Svg.vue'
import './assets/icons'
import '@/mock/mockServer'
import '@/index.css'
import '@/config/rem.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyload from 'vue-lazyload'
window.forceWebGL = true

const loadimage = require('./assets/images/loading.gif')
// router.beforeEach((to, from, next) => {
//   store.dispatch('getToken')
//   const token = store.state.token
//   if (!token && to.name !== 'login') {
//     next({ name: 'login' })
//   } else { next() }
// })

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VueLazyload, {
    preLoad: 1.3,
    loading: loadimage,
    attempt: 1
  })
  .component('svg-icon', SvgIcon)
  .mount('#app')
