import { createRouter, createWebHashHistory } from 'vue-router'
const Msite = () => import('../views/Miste/Miste.vue')
const Order = () => import('../views/Order/Order.vue')
const Search = () => import('../views/Search/Search.vue')
const Profile = () => import('../views/Profile/Profile.vue')
const Login = () => import('../views/Login/Login.vue')
const PhoneLogin = () => import('../views/Login/Children/PhoneLogin.vue')
const PasswordLogin = () => import('../views/Login/Children/PasswordLogin.vue')

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
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    redirect: '/login/phonelogin',
    children: [
      {
        path: 'phonelogin',
        component: PhoneLogin,
        name: 'phonelogin'
      },
      {
        path: 'passwordlogin',
        component: PasswordLogin,
        name: 'passwordlogin'
      }
    ]

  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
