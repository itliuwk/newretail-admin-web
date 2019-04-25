import axios from 'axios'
import { Message } from 'element-ui'
import { BASE_API } from '../config';
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getCookie } from './cookie';
import myalert from './alert';

// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getCookie('access_token')) {
      config.headers['Authorization'] = `Bearer ${getCookie('access_token')}`
    }

    //如果参数value是空，就不需要传给后台
    if (config.params) {
      var _params = JSON.parse(JSON.stringify(config.params))
      _.map(_params, (value, key) => {
        if (!value && typeof value != "number"/* 排斥数字判断 */ && typeof value !== 'boolean'/* 排斥boolean判断 */) {
          delete _params[key]
        }
      })

      // if (getCookie('access_token')) {
      //   _params.access_token = getCookie('access_token')
      // }
      config.params = _params
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data

  //   if (res.code == 401) {
  //     debugger
  //     window.location.href = "#/login"
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status == 401) {
      myalert.fail("登录失效，请重新登录!!")
      setTimeout(() => {
        window.location.href = "#/login"
      }, 1000);

    }
    return Promise.reject(error)
  }
)

export default service
