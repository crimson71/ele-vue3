import request from './request.js'
export const imgBaseUrl = '//elm.cangdu.org/img/'
export const getLocalPosition = (type) => {
  return request({
    method: 'get',
    url: '/v1/cities',
    data: type
  })
}

// 获取位置信息
export const getAddress = (geohash) => {
  return request({
    method: 'get',
    url: `v2/pois/${geohash}`
  })
}

// 获取食品分类
export const getFoodTypes = () => {
  return request({
    method: 'get',
    url: 'index_category'
  })
}

// 获取商铺列表
export const getShopList = (params) => {
  return request({
    method: 'get',
    url: 'shopping/restaurants',
    data: params
  })
}

// 获取食物目录
export const getGoods = (params) => {
  return request({
    method: 'get',
    url: 'shopping/v2/menu',
    data: params

  })
}

// 获取店铺评价
export const getRatings = (params) => {
  return request({
    method: 'get',
    url: `ugc/v2/restaurants/${params.restaurant_id}`

  })
}
export const getInfo = (params) => {
  return request({
    method: 'get',
    url: `shopping/restaurant/${params}`

  })
}

// 短信登陆
export const phoneLogin = (params) => {
  return request({
    method: 'post',
    url: 'login',
    data: params
  })
}
// 获取店铺总体评价
export const getShopScore = (params) => {
  return request({
    url: `ugc/v2/restaurants/${params}/ratings/scores`,
    method: 'get'
  })
}

// 获取评价tags
export const getRatingTags = (params) => {
  return request({
    url: `https://elm.cangdu.org/ugc/v2/restaurants/${params}/ratings/tags`,
    method: 'get'
  })
}

export const getRatingContent = (params) => {
  return request({
    url: `https://elm.cangdu.org/ugc/v2/restaurants/${params.restaurant_id}/ratings`,
    method: 'get',
    data: params
  })
}
// 搜索结果
export const getSearchInfo = (params) => {
  return request({
    url: 'v4/restaurants',
    method: 'get',
    data: params
  })
}
