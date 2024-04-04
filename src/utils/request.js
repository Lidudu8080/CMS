import axios from 'axios'
import { baseURL } from '@/config'
import { Message } from 'element-ui'

// 创建请求实例
const service = axios.create({
  baseURL,
  timeout: 20000
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['X-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 接口请求失败提示
    if (res.code !== 10000) {
      Message.error(res.message);
    }
    if (res.code === -2) {
      localStorage.removeItem('token')
      window.location.href = location.origin + '/cms-manage/#/login'
    }
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
