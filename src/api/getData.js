import request from './request.js'
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
    url: 'shops',
    data: params
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
