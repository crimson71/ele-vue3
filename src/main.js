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

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component('svg-icon', SvgIcon)
  .mount('#app')
