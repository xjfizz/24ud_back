/* eslint-disable indent */

import {
  URL_MATERIAL_TRANSPORT
} from '@/api/url'

// url
export const url = URL_MATERIAL_TRANSPORT

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
  field: 'companyName',
  addonAfter: '运输单位',
  placehodler: '查询运输公司'
}, {
  component: 's-select',
  placeholder: '运输单位类型',
  field: 'type',
  children: [{
      value: '1',
      title: '类型A'
    },
    {
      value: '2',
      title: '类型B'
    },
    {
      value: '3',
      title: '类型C'
    }
  ]
}, {
  component: 'site-cascader',
  placeholder: '选择网点',
  filter: 'timely',
  field: 'areas'
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
    dataIndex: 'companyName',
    title: '单位名称',
    width: '100'
  },
  {
    dataIndex: 'contact',
    title: '联系人',
    width: '150'
  },
  {
    dataIndex: 'tel',
    title: '联系电话',
    width: '80'
  },
  {
    dataIndex: 'type',
    title: '类型',
    width: '80'
  },
  {
    dataIndex: 'coverage',
    title: '覆盖网点',
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
  address: '',
  companyName: '',
  contact: '',
  coverage: [],
  tel: '',
  type: ''
}
