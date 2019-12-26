/*
 * @Author: your name
 * @Date: 2019-11-27 11:31:03
 * @LastEditTime: 2019-12-08 14:22:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\api\login.js
 */
import api from './index'
import {
  axios
} from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    // url: '/user/users/login',
    url: '/login',
    method: 'post',
    data: parameter
  })
}

export function getInfo (uid) {
  return axios({
    // url: `/security/currentUser/${uid}`,
      url: `/security/currentUser`,
    // url: `/user/users/info/UD703192`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return axios({
    url: '/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function userRegister (data) {
  return axios({
    url: api.Register,
    method: 'post',
    data
  })
}
