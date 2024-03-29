import Cookie from 'js-cookie'
import {
  RECEIVE_CITY,
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPE,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_FOOD_DECREASE,
  RECEIVE_FOOD_INCREASE,
  BALL_CHANGE_SHOW,
  CHANGE_DROP_BALL,
  CLEAR_CART,
  RECEIVE_SHOP_SCORE,
  RECEIVE_SHOP_RATING_TAGS,
  RECEIVE_RATINGS_CONTENT,
  RECEIVE_SEARCH_INFO,
  CLEAR_SEARCH_HISTORY,
  RECEIVE_ORDER,
  RECEIVE_TOKEN

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
  },
  [RECEIVE_FOOD_DECREASE] (state, { food }) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [RECEIVE_FOOD_INCREASE] (state, { food }) {
    if (!food.count) {
      Reflect.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [BALL_CHANGE_SHOW] (state, { index, isShow, el }) {
    state.balls[index].show = isShow
    state.balls[index].el = el
  },
  [CHANGE_DROP_BALL] (state, ball) {
    state.dropBall.push(ball)
  },
  [CLEAR_CART] (state) {
    state.cartFoods.forEach(item => { item.count = 0 })
    state.cartFoods = []
  },
  [RECEIVE_SHOP_SCORE] (state, { shopScore }) {
    state.shopScore = shopScore
  },
  [RECEIVE_SHOP_RATING_TAGS] (state, { shopTags }) {
    state.shopRatingTags = shopTags
  },
  [RECEIVE_RATINGS_CONTENT] (state, { ratingContent }) {
    state.ratingContent = ratingContent
  },
  [RECEIVE_SEARCH_INFO] (state, { searchInfo, kw }) {
    state.searchShops = searchInfo
    if (state.recentSearch.indexOf(kw) === -1) {
      if (state.recentSearch.length < 10) {
        state.recentSearch.unshift(kw)
      } else {
        state.recentSearch.pop()
        state.recentSearch.unshift(kw)
      }
    }
  },
  [CLEAR_SEARCH_HISTORY] (state) {
    state.recentSearch = []
  },
  [RECEIVE_USER_INFO] (state, { userInfo, token }) {
    state.userInfo = userInfo
    state.userId = userInfo.user_id
    state.token = token
    Cookie.set('token', token)
    Cookie.set('userid', userInfo.user_id)
    Cookie.set('userinfo', JSON.stringify(userInfo))
  },
  [RECEIVE_ORDER] (state, { orderInfo }) {
    state.orderInfo = orderInfo
  },
  [RECEIVE_TOKEN] (state) {
    console.log('gettoken')
    state.token = state.token || Cookie.get('token')
  }
}
