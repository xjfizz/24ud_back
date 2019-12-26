/* eslint-disable indent */

import { URL_COURIER } from '@/api/url'

// url
export const url = URL_COURIER

export const modules = {
  label: '',
  component: 'a-radio',
  defaultValue: 0,
  field: 'type',
  children: [
    {
      label: '当日达',
      value: 0,
      relation: {
        options: ['select-search-ignore', 'branches', 'type', 'area'],
        columns: [
          'num',
          'name',
          'phone',
          'branches',
          'state',
          'area',
          'money',
          'loginTime',
          'createTime',
          'operations'
        ],
        operations: ['detail', 'edit', 'stop', 'restart']
      }
    }
  ]
}

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
export const options = [
  {
    component: 's-input-select',
    field: 'select-search-ignore',
    width: '220',
    value: 'name',
    defaultTitle: '姓名',
    select: {
      width: '90',
      children: [
        {
          value: 'name',
          title: '姓名'
        },
        {
          value: 'phone',
          title: '手机号码'
        }
      ]
    },
    input: {
      style: {
        width: '60%'
      }
    }
  },
  {
    width: '200px',
    component: 's-cascader',
    placeholder: '所属站点',
    field: 'branches',
    slot: 'sites'
  },
  {
    width: '200px',
    component: 's-cascader',
    placeholder: '负责区域',
    field: 'area',
    slot: 'area'
  },
  {
    component: 's-select',
    placeholder: '认证状态',
    field: 'state',
    children: [
      {
        value: '1',
        title: '未认证'
      },
      {
        value: '2',
        title: '已认证'
      }
    ]
  }
]

// 表单配置
// 没有用modules或者modules.children < 2,initFetch设置 true

export const tableConfig = {
  selectAll: false,
  rowKey: 'id',
  initFetch: true
}

export const columns = [
  {
    dataIndex: 'num',
    title: '序号',
    width: '50'
  },
  {
    dataIndex: 'name',
    title: '姓名',
    width: '100'
  },
  {
    dataIndex: 'phone',
    title: '手机号码',
    width: '150'
  },
  {
    dataIndex: 'state',
    title: '账户状态',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 2,
          title: '已认证/已启用'
        },
        {
          value: 1,
          title: '未认证'
        },
        {
          value: 0,
          title: '已禁用'
        }
      ]
    }
  },
  {
    dataIndex: 'branches',
    title: '所属网点',
    width: '200',
    slot: true
  },
  {
    dataIndex: 'area',
    title: '负责区域',
    width: '200',
    slot: true
  },
  {
    dataIndex: 'money',
    title: '账户余额',
    slot: true,
    width: '280'
  },
  {
    dataIndex: 'loginTime',
    title: '最近登录时间',
    slot: true,
    width: '280'
  },
  {
    dataIndex: 'createTime',
    title: '注册时间',
    width: '280'
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
  relation: 'state',
  content: [
    {
      type: 'detail',
      title: '详情',
      color: 'primary',
      relation: [0, 1, 2]
    },
    {
      type: 'edit',
      title: '编辑',
      color: 'primary',
      relation: [0, 1, 2]
    },
    {
      type: 'stop',
      title: '禁用',
      color: 'danger',
      relation: [2],
      state: 0,
      batch: true
    },
    {
      type: 'restart',
      title: '启用',
      color: 'primary',
      state: 2,
      relation: [0],
      batch: true
    }
  ]
}

export const params = {
  type: 0
}

export const postParams = {
  area: '',
  branches: '',
  certificateNum: '',
  certificateType: '身份证',
  gid: '',
  name: '',
  phone: '',
  sex: '1'
}
