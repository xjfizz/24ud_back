import axios from 'axios'
import store from '@/store'
import Storage from 'store2'
import router from '../router'
// import { Message } from 'ant-design-vue'

import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? 'https://api.24ud.cn' : '/api', // api base_url
  // baseURL: 'https://api.24ud.cn',
  timeout: 20000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
    console.log(config)
    if(config.url.indexOf('19996') == -1) {
      config.url = '/api' + config.url
    }
    // const token = Storage.get(ACCESS_TOKEN)
  // if (token) {
  //   config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改

    /**
     * No-login set authorization -start
     *
     *
     **/

   // if (config.url != '/api/login' || config.url != '/login' || config.url.indexOf('19996') == -1) {
        let authorization = localStorage.getItem('authorization')
        config.headers.authorization = authorization
  //  } 

     if(config.url.indexOf('19996') > -1) {
      delete config.headers.authorization
    }

    /**
     * No-login set authorization -end
     *
     *
     **/
  // }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
    console.log('response', response)
    /**
     * login get authorization -start
     *
     *
     **/
        if (response.config.url == '/api/login' || response.config.url == '/login') {
            let authorization = response.headers.authorization
            localStorage.setItem('authorization', authorization)
        }

    /**
     * login get authorization -end
     *
     *
     **/
    /**
     * 强制登录
     */
        if(response.data.code == 401 || response.data.code == 5002 || response.data.code == 5003 || response.data.code == 403  ) {
            notification.error({
                message: 'Forbidden',
                description: response.data.message
            })
            localStorage.clear()
            setTimeout( () => {
               // debugger
               //  router.replace({
               //      path: '/login',
               //  })
                window.location.reload()
            }, 500)
        }


  const {
    data,
    headers,
    config
  } = response

  const {
    method
  } = config

  let res = {
    data
  }
  if (method === 'get') {
    res = {
      ...res,
      pageSize: +headers['x-pagesize'],
      pageNo: +headers['x-pageno'],
      totalCount: +headers['x-totalcount']
    }
  }
  return res
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
