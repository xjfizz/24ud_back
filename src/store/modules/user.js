/* eslint-disable space-before-function-paren */
import Storage from 'store2'
import { login, logout, getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { USER_NAME, USER_SITE_ID, USER_USER_ID } from '../mutation-types'
let loginInfo = {}

const user = {
  state: {
    token: '',
    name: Storage.get(USER_NAME) || '',
    welcome: '',
    avatar: '/avatar2.jpg',
    roles: [],
    info: {},
    siteId: Storage.get(USER_SITE_ID) || '',
    userId: Storage.get(USER_USER_ID) || '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, id) => {
      state.userId = id
      Storage.set(USER_USER_ID, id)
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
      Storage.set(USER_NAME, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_SITE_ID: (state, ids) => {
      state.siteId = ids.slice().pop()
      Storage.set(USER_SITE_ID, state.siteId)
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
              console.log(response)
            const result = response.data
            if(result.code != 200) {
                reject(result.message)
                return
            }
            console.log(response)
            Storage.set(ACCESS_TOKEN, result.userId, 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.data.userId)
            commit('SET_USER_ID', result.data.userId)
            commit('SET_NAME', {
              name: result.data.nickname,
              welcome: welcome()
            })
            commit('SET_AVATAR', '/avatar2.jpg')
            Storage.set('uid', result.data.userId)
              /* 新版本处理*/
              let permissionList = []
              result.data.authorityTree.forEach(item => {
                  permissionList.push(item.code)
                  if(item.children) {
                      item.children.forEach(item1 => {
                          permissionList.push(item1.code)
                      })
                  }
              })
              result.data.siteIds = [ result.data.orgId]
              result.data.permissionList = permissionList
              loginInfo =  result.data
              console.log('loginInfo', loginInfo)
              /* 新版本处理-end*/
              Storage.set('login_user', result.data)
            // Storage.set('login_user', result.data)
            // commit('SET_ROLES', [result.role])
            // commit('SET_SITE_ID', result.siteIds)
              console.log('3333')
            resolve(result)
          }).catch(error => {
            console.error(error)
            reject(error)
          })
      })
    }
    ,

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const uid = Storage.get('uid')
          // console.log('this.user.loginInfo', [loginInfo])
          // commit('SET_ROLES', [loginInfo])
          // resolve(loginInfo)
        getInfo(uid)
          .then(response => {
              console.log(response)
            const role = response.data
            // role.permissionList = role.permissions.map(permission => {
            //   return permission.permissionId
            // })
              /* 新版本处理*/
              let permissionList = []
              role.data.authorityTree.forEach(item => {
                  permissionList.push(item.code)
                  if(item.children) {
                      item.children.forEach(item1 => {
                          permissionList.push(item1.code)
                      })
                  }
              })
              role.data.permissionList = permissionList
              role.data.siteIds = [ response.data.orgId]
              /* 新版本处理-end*/
              commit('SET_ROLES', [role.data])
            resolve(role.data)
          })
          .catch(error => {
              resolve(error)
            //reject(error)
          })
      })
    }
    ,

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Storage.clearAll()

        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    }
  }
}

export default user
