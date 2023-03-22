import Mock from 'mockjs'
import data from './data.json'
import location from './location.json'
import shopList from './shopList.json'
import shopMenu from './shopMenu.json'

// 返回定位信息的接口
Mock.mock(/v1\/cities/, 'get', (options) => {
  console.log(options)
  return {
    data: location,
    code: 0,
    message: 'success'
  }
})

// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })
// ratings
Mock.mock('/ratings', { code: 0, data: data.ratings })

// 返回info的接口
Mock.mock('/info', { code: 0, data: data.info })

// 返回shopList接口
Mock.mock(/shopping\/restaurants/, 'get', (options) => {
  console.log(options)

  return {
    data: shopList,
    code: 0,
    message: 'success'
  }
})

// 返回shopinfo接口

// 返回shopMenu接口
Mock.mock(/shopping\/v2\/menu/, 'get', (options) => {
  console.log(options)

  return {
    data: shopMenu,
    code: 0,
    message: 'success'
  }
})
