/*
 * @Author: your name
 * @Date: 2019-11-22 17:32:52
 * @LastEditTime: 2019-12-07 21:34:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\views\settlement\finance\config.js
 */
/* eslint-disable indent */

import { ORGANIZATION_FINANCE } from '@/api/url'

// url
export const url = ORGANIZATION_FINANCE

// 表单配置

export const tableConfig = {
  noIndex: true,
  rowKey: 'orgId',
  initFetch: true
}

export const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   slot: 'index'
  // },
  {
    title: '站点名',
    dataIndex: 'orgName'
  },
  {
    title: '当日达总单数',
    dataIndex: 'todaysCount',
    // slot: true,
    // convert: true,
    // meta: {
    //   convert: [
    //     {
    //       value: 0,
    //       title: '---'
    //     },
    //  ]
    // }
  },
  {
    title: '当日达总营业额',
    dataIndex: 'todaysTotal'
  },
  {
    title: '即时达总单数',
    dataIndex: 'timelyCount'
  },
  {
    title: '即时达总营业额',
    dataIndex: 'timelyTotal'
  },
 
]

export const params = {}
