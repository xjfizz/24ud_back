/*
 * @Author: your name
 * @Date: 2019-11-22 17:32:52
 * @LastEditTime: 2019-12-06 21:35:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\views\message\config.js
 */
/* eslint-disable indent */

import {
  MESSAGE
} from '@/api/url'

// url
export const url = MESSAGE

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
// export const options = []
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
        value: '0',
        title: '已禁用'
      },
      {
        value: '1',
        title: '未认证'
      },
      {
        value: '2',
        title: '已启用'
      },
    ]
  },
  {
    component: 's-select',
    placeholder: '启用状态',
    field: 'stateDay',
    children: [
      {
        value: '0',
        title: '已禁用'
      },
      {
        value: '1',
        title: '已启用'
      },
      // {
      //   value: '2',
      //   title: '未认证'
      // },
    ]
  }
]


// 表单配置

export const tableConfig = {
  selectAll: false,
  rowKey: 'id',
  initFetch: true
}

export const columns = [{
    customRender:(text,record,index)=>`${index+1}`,
    title: '序号',
    width: '50'
  },
  {
    dataIndex: 'title',
    title: '标题',
    width: '100'
  },



  {
    dataIndex: 'type',
    title: '公告类型',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 1,
          title: '未指派取件人'
        },
      ]
    }
  },

  
  {
    dataIndex: 'describe',
    title: '描述',
    width: '280'
  },
  {
    dataIndex: 'state',
    title: '是否已读',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 0,
          title: '未读'
        },
        {
          value: 1,
          title: '已读'
        },
      ]
    }
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
    width: '100'
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
    type: 'detail',
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

export const postParams = {}
