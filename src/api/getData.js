import request from './request.js'

// 获取位置信息
export const getAddress = (geohash) => {
  return request({
    method: 'get',
    url: `position/${geohash}`
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
