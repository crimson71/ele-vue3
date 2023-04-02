import {
  RECEIVE_CITY,
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPE,
  RECEIVE_SHOPS,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_FOOD_INCREASE,
  RECEIVE_FOOD_DECREASE,
  CHANGE_DROP_BALL,
  BALL_CHANGE_SHOW,
  CLEAR_CART,
  RECEIVE_SHOP_SCORE,
  RECEIVE_SHOP_RATING_TAGS,
  RECEIVE_RATINGS_CONTENT,
  RECEIVE_SEARCH_INFO,
  CLEAR_SEARCH_HISTORY,
  RECEIVE_USER_INFO

} from './mutation-types'
import {
  getAddress,
  getFoodTypes,
  getShopList,
  getLocalPosition,
  getGoods,
  getRatings,
  getInfo,
  getShopScore,
  getRatingTags,
  getRatingContent,
  getSearchInfo,
  login

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
  },
  // 同步更新購物車小球狀態
  changeBallShow ({ commit }, ballState) {
    const { index, isShow, el } = ballState
    commit(BALL_CHANGE_SHOW, { index, isShow, el })
  },
  changeDropBall ({ commit }, ball) {
    commit(CHANGE_DROP_BALL, ball)
  },
  // 清空购物车
  clearCart ({ commit }) {
    commit(CLEAR_CART)
  },
  // 异步获取店铺总体评分
  async getshopScore ({ commit, state }) {
    const shopId = state.shopId
    const { data } = await getShopScore(shopId)
    const shopScore = data
    console.log(shopScore)
    commit(RECEIVE_SHOP_SCORE, { shopScore })
  },
  // 异步获取店铺评价tags
  async getRatingTags ({ commit, state }) {
    const shopId = state.shopId
    const { data } = await getRatingTags(shopId)
    const shopTags = data
    commit(RECEIVE_SHOP_RATING_TAGS, { shopTags })
  },
  // 异步获取评价内容
  async getRatingContent ({ commit }, obj, callBack) {
    const { data } = await getRatingContent(obj)
    const ratingContent = data
    commit(RECEIVE_RATINGS_CONTENT, { ratingContent })
    callBack && callBack()
  },
  // 异步获取搜索结果
  async getSearchinfo ({ commit, state }, kw) {
    const { data } = await getSearchInfo({ geohash: state.geohash, keyword: kw })
    const searchInfo = data
    commit(RECEIVE_SEARCH_INFO, { searchInfo, kw })
  },
  // 清空搜索历史
  clearSearchHistory ({ commit }) {
    commit(CLEAR_SEARCH_HISTORY)
  },
  async getUserInfo ({ commit }, obj) {
    const { data } = await login(obj)
    console.log(data)
    const userInfo = data.data
    commit(RECEIVE_USER_INFO, { userInfo })
  }

}
