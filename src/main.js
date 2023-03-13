import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/sass/comm.scss'
import SvgIcon from '@/components/Svg.vue'
import './assets/icons'

createApp(App)
  .use(store)
  .use(router)
  .component('svg-icon', SvgIcon)
  .mount('#app')
