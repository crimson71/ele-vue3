import {
  RECEIVE_CITY,
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPE,
  RECEIVE_SHOPS,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_FOOD_INCREASE,
  RECEIVE_FOOD_DECREASE
} from './mutation-types'
import {
  getAddress,
  getFoodTypes,
  getShopList,
  getLocalPosition,
  getGoods,
  getRatings,
  getInfo

} from '../api/getData'

export default {
// 异步获取当前城市,生成geohash
  async getCity ({ commit }) {
    const { data } = await getLocalPosition({ type: 'guesss' })
    if (data.code === 0) {
      const { latitude, longitude } = data.data
      commit(RECEIVE_CITY, { latitude, longitude })
    }
  },

  // 异步获取地址
  async getAddress ({ commit, state }) {
    const { data } = await getAddress(state.geohash)
    if (data) {
      const address = data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  // 异步获取食品分类
  async getFoodType ({ commit, state }) {
    const geohash = state.latitude + ',' + state.longtitude
    const result = await getFoodTypes(geohash)
    if (result.code === 0) {
      const shopList = result.data
      commit(RECEIVE_FOODTYPE, { shopList })
    }
  },
  // 异步获取店铺列表
  async getShopList ({ commit, state }) {
    const { longtitude, latitude } = state
    const result = await getShopList(longtitude, latitude)
    console.log(result, 'shops')
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 异步获取食物
  async getShopGoods ({ commit, state }) {
    const restaurantId = state.shopId
    const { data } = await getGoods({ restaurant_id: restaurantId })

    if (data) {
      const goods = data.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  // 异步获取评价
  async getShopRatings ({ commit, state }) {
    console.log(state.shops)
    const result = await getRatings(state)
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, ratings)
    }
  },
  // 异步获取商家信息
  async getShopInfo ({ commit, state }) {
    const shopid = state.shopId
    console.log(shopid, 'id')
    const { data } = await getInfo(shopid)
    if (data) {
      const info = data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 更新购物车数量
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(RECEIVE_FOOD_INCREASE, { food })
    } else {
      commit(RECEIVE_FOOD_DECREASE, { food })
    }
  }

}
