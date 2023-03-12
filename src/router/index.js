import { createRouter, createWebHashHistory } from 'vue-router'
const Msite = () => import('../views/Miste/Miste.vue')
const Order = () => import('../views/Order/Order.vue')
const Search = () => import('../views/Search/Search.vue')
const Profile = () => import('../views/Profile/Profile.vue')

const routes = [
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/msite',
    component: Msite,
    name: 'msite'
  },
  {
    path: '/order',
    component: Order,
    name: 'order'
  },
  {
    path: '/search',
    component: Search,
    name: 'search'
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile'
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
