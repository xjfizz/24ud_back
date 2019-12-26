/* eslint-disable indent */

import {
  URL_USERS
} from '@/api/url'

// url
export const url = URL_USERS

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
  addonAfter: '角色名称',
  placehodler: '输入角色名称'
}, {
  component: 's-select',
  placeholder: '所属部门',
  field: 'type',
  children: [{
      value: '1',
      title: '部门1'
    },
    {
      value: '2',
      title: '部门2'
    },
    {
      value: '3',
      title: '部门3'
    }
  ]
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
    dataIndex: 'userName',
    title: '姓名',
    width: '100'
  },
  {
    dataIndex: 'tel',
    title: '登录帐号',
    width: '150'
  },
  {
    dataIndex: 'dept',
    title: '部门',
    slot: true,
    width: '80'
  },
  {
    dataIndex: 'roleName',
    slot: true,
    title: '角色',
    width: '80'
  },
  {
    dataIndex: 'state',
    title: '状态',
    width: '80',
    convert: true,
    slot: true,
    meta: {
      convert: [{
          value: 1,
          title: '启用'
        },
        {
          value: 0,
          title: '禁用'
        }
      ]
    }
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
    title: '修改',
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
  userName: '',
  tel: '',
  gender: '男',
  password: '',
  dept: '',
  state: 1,
  roleName: ''
}
