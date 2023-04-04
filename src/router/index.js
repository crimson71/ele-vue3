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
const MapDisplay = () => import('../views/Map/MapDisplay.vue')
const Coupon = () => import('../views/Coupon/Coupon.vue')
const ActiveCoupon = () => import('../views/Coupon/Children/ActiveCoupon.vue')
const UnactiveCoupon = () => import('../views/Coupon/Children/UnactiveCoupon.vue')
const OrderDetail = () => import('../views/OrederDetail/OrderDetail.vue')

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
    redirect: '/shop/shopgoods',
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
  },
  {
    path: '/map',
    name: 'map',
    component: MapDisplay
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: Coupon,
    redirect: { name: 'active' },
    children: [
      {
        path: 'active',
        component: ActiveCoupon,
        name: 'active'
      },
      {
        path: 'unactive',
        component: UnactiveCoupon,
        name: 'unactive'
      }
    ]

  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: OrderDetail
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
