/* eslint-disable indent */

import { URL_ORDERS_WAYBILL } from '@/api/url'

// url
export const url = URL_ORDERS_WAYBILL

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
        columns: ['num', 'name', 'officialName', 'officialTel', 'joinTime', 'city', 'district', 'operations'],
        operations: ['detail', 'stop', 'restart']
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
    value: 'franchiseeName',
    defaultTitle: '网点',
    select: {
      width: '90',
      children: [
        {
          value: 'franchiseeName',
          title: '加盟商'
        },
        // {
        //   value: 'remaining',
        //   title: '剩余面单'
        // },
        // {
        //   value: 'createTime',
        //   title: '购买时间'
        // }
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
    dataIndex: 'franchiseeName',
    title: '加盟商名称',
    width: '100'
  },
  {
    dataIndex: 'remaining',
    title: '剩余面单',
    width: '150'
  },  {
    dataIndex: 'index',
    title: '当前面单',
    width: '150'
  },
  {
    dataIndex: 'startNum',
    title: '面单号段起始',
    width: '200'
  },
  {
    dataIndex: 'endNum',
    title: '面单号段结束',
    width: '200'
  },
  {
    dataIndex: 'createTime',
    title: '购买时间',
    width: '280'
  }
  // {
  //   title: '操作',
  //   dataIndex: 'operations',
  //   slot: true
  // }
]

/**
 *  表单配置项
 *  @component 属性指定自定义组件 | 通用a-button组件
 *  @batchText 批量任务名
 *  @batch 字段控制添加到批量任务中
 */
export const operations = {
  content: [
    {
      type: 'detail',
      title: '详情',
      color: 'primary'
    }
  ]
}

export const params = {}

export const postParams = {

}
