/* eslint-disable indent */

import {
  URL_MATERIAL_VEHICLES
} from '@/api/url'

// url
export const url = URL_MATERIAL_VEHICLES

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

// 所有的表单过滤字段
export const options = [{
  component: 's-input-select',
  field: 'select-search-ignore',
  width: '220',
  value: 'licenseNumber',
  defaultTitle: 'licenseNumber',
  select: {
    width: '100',
    children: [{
      value: 'licenseNumber',
      title: '车牌号'
    }, {
      value: 'carType',
      title: '车辆类型'
    }]
  },
  input: {
    style: {
      width: '60%'
    }
  }
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
    dataIndex: 'licenseNumber',
    title: '车牌号',
    width: '100'
  },
  {
    dataIndex: 'carType',
    title: '车辆类型',
    width: '150',
    // slot: true,
    // convert: true,
    meta: {
      convert: [{
          value: 1,
          title: '已认证'
        },
        {
          value: 2,
          title: '未认证'
        }
      ]
    }
  },
  {
    dataIndex: 'affiliationCompany',
    title: '所属运输单位',
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
  carType: '',
  affiliationCompany: '',
  licenseNumber: '',
  load: '',
  brand: ''
}
