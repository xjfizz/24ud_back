/* eslint-disable indent */

import {
  URL_SYSTEM_AUTH_ROLE
} from '@/api/url'

// url
export const url = URL_SYSTEM_AUTH_ROLE

export const formConfig = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 5
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 12
    }
  }
}

// 所有的表单字段
export const options = [{
  component: 's-input',
  field: 'roleName',
  addonAfter: '版本编号',
  placehodler: '输入版本编号查询'
}]

// 表单配置

export const tableConfig = {
  selectAll: false,
  rowKey: 'id',
  initFetch: true
}

export const columns = [{
    dataIndex: 'num',
    title: '序号',
    width: '50'
  },
  {
    dataIndex: 'roleName',
    title: '版本类型',
    width: '100'
  },
  {
    dataIndex: 'dept',
    title: '版本编号',
    width: '150'
  },
  {
    dataIndex: 'description',
    title: '版本号',
    width: '80'
  },
  {
    dataIndex: 'update',
    title: '是否强制升级',
    width: '80'
  },
  {
    dataIndex: 'time',
    title: '生效时间',
    width: '80'
  },
  {
    dataIndex: 'state',
    title: '状态',
    width: '80'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slot: true
  }
]

/**
 *  表单配置项
 *  @component 属性指定自定义组件 | 通用a-button组件
 *  @batchText 批量任务名
 *  @batch 字段控制添加到批量任务中
 */
export const operations = {
  batchText: '批量处理',
  content: [{
    type: 'edit',
    title: '详情',
    color: 'primary'
  }, {
    type: 'delete',
    title: '删除',
    color: 'danger',
    batch: true,
    component: 's-delete'
  }]
}

export const params = {}

export const postParams = {
}
