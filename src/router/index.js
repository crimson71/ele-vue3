import { createRouter, createWebHashHistory } from 'vue-router'
const Msite = () => import('../views/Msite/Msite.vue')
const Order = () => import('../views/Order/Order.vue')
const Search = () => import('../views/Search/Search.vue')
const Profile = () => import('../views/Profile/Profile.vue')
const Login = () => import('../views/Login/Login.vue')
const PhoneLogin = () => import('../views/Login/Children/PhoneLogin.vue')
const PasswordLogin = () => import('../views/Login/Children/PasswordLogin.vue')
const Shop = () => import('../views/Shop/Shop.vue')
const ShopGoods = () => import('../views/Shop/ShopGoods/ShopGoods.vue')
const ShopRatings = () => import('../views/Shop/ShopRatings/ShopRatings.vue')
const ShopInfo = () => import('../views/Shop/ShopInfo/ShopInfo.vue')

const routes = [
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/msite',
    component: Msite,
    name: 'msite',
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    name: 'order',
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    name: 'search',
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
    meta: {
      showFooter: true
    }
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

  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
    children: [{
      path: 'shopgoods',
      component: ShopGoods,
      name: 'shopgoods'
    },
    {
      path: 'shopratings',
      component: ShopRatings,
      name: 'shopratings'
    },
    {
      path: 'shopinfo',
      component: ShopInfo,
      name: 'shopinfo'
    }

    ]
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
