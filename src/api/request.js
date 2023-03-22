import axios from 'axios'

const baseURL = 'https://elm.cangdu.org'
// const baseURL = 'http://localhost:8080/'

const service = axios.create({
  baseURL: baseURL
})

// 重新封装ajax
export default function request (options) {
  // 定义ajax请求的方法，默认是get
  options.method = options.method || 'GET'
  if (options.method.toUpperCase() === 'GET') {
    // get方法的参数用data对象携带
    options.params = options.data
  }

  return service(options)
}
