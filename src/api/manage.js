/*
 * @Author: your name
 * @Date: 2019-11-22 17:32:51
 * @LastEditTime: 2019-12-08 19:56:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\api\manage.js
 */
import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  franchisees: '/franchisee/franchisees?type=0',
  orderpdf: '/todays/waybill/print'
}

export default api

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree(parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function getfranchisees() {
  return axios({
    url: api.franchisees,
    method: 'get'
  })
}

export function getPdfUrl(ids) {
  const u = api.orderpdf + '?ids=' + ids.join(',')
  return axios({
    url: u,
    method: 'get'
  })
}

export function printPdf(url) {
  console.log('====url', url)
  return axios({
   url: 'http://127.0.0.1:19996/',
   // url: '/printService',
  //  url: '/printService',
    method: 'post',
    data: url,
    timeout: 0
  })
}
