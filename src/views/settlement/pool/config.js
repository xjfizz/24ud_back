/*
 * @Author: your name
 * @Date: 2019-11-22 17:32:52
 * @LastEditTime: 2019-12-07 21:51:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\views\settlement\pool\config.js
 */
/* eslint-disable indent */

import { ORGANIZATION_POOL } from '@/api/url'

// url
export const url = ORGANIZATION_POOL

// 表单配置

export const tableConfig = {
  noIndex: true,
  rowKey: 'key',
  initFetch: true
}

export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    slot: 'index'
  },
  {
    title: '站点名',
    dataIndex: 'label'
  },
  {
    title: '完成率',
    dataIndex: 'completedRate'
  },
  {
    title: '完成',
    dataIndex: 'completed',
    slot: true
  },
  {
    title: '未完成',
    dataIndex: 'incomplete',
    slot: true
  },
  {
    title: '投诉',
    dataIndex: 'complaint',
    slot: true
  },
  {
    title: '退回件',
    dataIndex: 'refund',
    slot: true
  },
  {
    title: '问题件',
    dataIndex: 'problem',
    slot: true
  },
  {
    title: '取消件',
    dataIndex: 'cancel',
    slot: true
  },{
    title: '欠款',
    dataIndex: 'generationOfCharge'
  },
  {
    title: '总数',
    dataIndex: 'totalCount'
  }
]

export const params = {
  no:'',
  endTime:'',
  startTime:''
}
