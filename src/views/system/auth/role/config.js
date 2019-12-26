/* eslint-disable indent */

import {
  URL_SYSTEM_AUTH_ROLE, URL_SYSTEM_AUTH_DEPARTMENT
} from '@/api/url'

// url
export const url = URL_SYSTEM_AUTH_ROLE
export const depListUrl = URL_SYSTEM_AUTH_DEPARTMENT

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
  field: 'name',
  addonAfter: '角色名称',
  placeholder: '输入角色名称'
}, {
  component: 's-select',
  placeholder: '所属部门',
  field: 'deptName',
  slot: 'deptName'
}]

// 表单配置

export const tableConfig = {
  selectAll: false,
  rowKey: 'roleId',
  initFetch: true
}

export const columns = [{
    title: '序号',
    width: '50',
    customRender:(text,record,index)=>`${index+1}`
  },
  {
    dataIndex: 'name',
    title: '角色',
    width: '100'
  },
  // {
  //   dataIndex: 'dept',
  //   title: '所属部门',
  //   width: '150'
  // },
  {
    dataIndex: 'roleId',
    title: '角色ID',
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
    title: '编辑',
    color: 'primary'
  }, {
    type: 'delete',
    title: '删除',
    color: 'danger',
    batch: false,
    component: 's-delete'
  }]
}

export const params = {}

export const postParams = {
  dept: '',
  state: 1,
  remark: '',
  roleName: '',
  category: 0
}
