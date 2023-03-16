import Mock from 'mockjs'
import data from './data.json'
import location from './location.json'

// 返回定位信息的接口
Mock.mock(/v1\/cities/, { code: 0, data: location })

// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })
// ratings
Mock.mock('/ratings', { code: 0, data: data.ratings })

// 返回info的接口
Mock.mock('/info', { code: 0, data: data.info })
