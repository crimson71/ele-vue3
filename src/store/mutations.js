import {
  RECEIVE_CITY,
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPE,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO

} from './mutation-types'
export default {
  [RECEIVE_CITY] (state, { latitude, longitude, geohash }) {
    state.latitude = latitude
    state.longitude = longitude
    state.geohash = geohash
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
  }

}
