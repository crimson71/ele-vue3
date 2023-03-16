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
// 异步获取当前城市
  async getCity ({ commit, state }) {
    const { data } = await getLocalPosition({ type: 'guesss' })
    if (data) {
      const { latitude, longitude } = data
      commit(RECEIVE_CITY, { latitude, longitude })
    }
  },

  // 异步获取地址
  async getAddress ({ commit, state }) {
    const geohash = state.latitude + ',' + state.longtitude
    const result = await getAddress(geohash)
    if (result.code === 0) {
      const address = result.data
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
