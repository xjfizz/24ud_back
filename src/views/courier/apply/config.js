/* eslint-disable indent */

import {
  URL_COURIER, URL_COURIER_JS,URL_COURIER_JSD, URL_COURIER_SELECT_ALL
} from '@/api/url'

// url
export const url = URL_COURIER_JS
export const url_edit = URL_COURIER_JSD
export const url_edit_select = URL_COURIER_SELECT_ALL

export const CATEGORY = [
  {
    label: '即时达',
    value: 2
  }
]

export const modules = {
  label: '认证状态',
  component: 'a-radio',
  defaultValue: '',
  field: 'state',
  children: [{
    label: '全部',
    value: '',
    relation: {
      options: [],
      columns: ['num', 'name', 'phone', 'certificateType', 'createTime', 'state', 'operations'],
      operations: ['detail', 'examine']
    }
  },
    {
      label: '待认证',
      value: 1,
      relation: {
        options: [],
        columns: ['num', 'name', 'phone', 'certificateType', 'createTime', 'state', 'operations'],
        operations: ['examine']
      }
    },
    {
      label: '认证成功',
      value: 2,
      relation: {
        options: [],
        columns: ['num', 'name', 'phone', 'certificateType', 'createTime', 'state', 'operations'],
        operations: ['detail']
      }
    },
    {
      label: '认证失败',
      value: 0,
      relation: {
        options: [],
        columns: ['num', 'name', 'phone', 'certificateType', 'createTime', 'state', 'operations'],
        operations: ['detail']
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

// 所有的表单筛选字段
export const options = []

// 表单配置

export const tableConfig = {
  selectAll: false,
  rowKey: 'id'
}

export const columns = [{
  customRender:(text,record,index)=>`${index+1}`,
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
    dataIndex: 'certificateType',
    title: '申请认证项',
    width: '300'
  },
  {
    dataIndex: 'createTime',
    title: '申请时间',
    width: '200'
  },
  {
    dataIndex: 'state',
    title: '认证状态',
    width: '280',
    slot: true,
    convert: true,
    meta: {
      convert: [{
        value: 1,
        title: '等待认证'
      },
        {
          value: 2,
          title: '认证成功'
        },
        {
          value: 0,
          title: '失败'
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
  relation: 'state',
  content: [{
    type: 'detail',
    title: '审核',
    color: 'primary',
    relation: [0, 2]
  }, {
    type: 'examine',
    title: '审核',
    color: 'danger',
    relation: [1]
  },
  //     {
  //     type: 'examine',
  //     title: '驳回',
  //     color: 'danger',
  //     relation: [0,1,2],
  //     state: 2,
  //     batch: true
  // }, {
  //         type: 'examine',
  //         title: '通过',
  //         color: 'danger',
  //         relation: [0, 1, 2],
  //         state: 2,
  //         batch: true
  // },
  ]
}

export const params = {
  type: 1
}

export const postParams = {}
