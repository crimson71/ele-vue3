import {
  RECEIVE_CITY,
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPE,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  getAddress,
  getFoodTypes,
  getShopList,
  getLocalPosition
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
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_SHOPS, { address })
    }
  }

}
