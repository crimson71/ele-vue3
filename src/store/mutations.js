import {
  RECEIVE_CITY,
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPE,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO

} from './mutation-types'
export default {
  [RECEIVE_CITY] (state, { latitude, longitude, geohash }) {
    state.latitude = latitude
    state.longitude = longitude
    state.geohash = latitude + ',' + longitude
  },

  [RECEIVE_ADDRESS] (state, { address }) {
    state.address = address
  },
  [RECEIVE_FOODTYPE] (state, { foodType }) {
    state.foodType = foodType
  },
  [RECEIVE_SHOPS] (state, { shops }) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, { userInfo }) {
    state.userInfo = userInfo
  },
  [RECEIVE_GOODS] (state, { goods }) {
    state.goodsMenu = goods
  },
  [RECEIVE_RATINGS] (state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, { info }) {
    state.info = info
  }

}
