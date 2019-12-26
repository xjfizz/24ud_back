/* eslint-disable indent */

import { URL_SETTLEMENT_QUOTE, QUOTE, QUOTE_ADD} from '@/api/url'

// url
export const url = QUOTE
export const url_add = QUOTE_ADD

export const modules = {
  label: '',
  component: 'a-radio',
  // defaultValue: 1,
  field: 'category',
  children: [
    {
      label: '当日达',
      value: 1,
      relation: {
        options: ['city', 'district'],
        columns: ['num', 'orgName', 'orgCity','operations'],
        operations: ['edit', 'delete','detail']
      }
    },
    {
      label: '即时达',
      value: 2,
      relation: {
        options: [],
        columns: ['num', 'orgName', 'orgCity', 'operations'],
        operations: ['edit', 'delete','detail']
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
  },
  // 表单所需要的字段 填写 options的 field字段
  injection: ['field', 'sites']
}

// 所有的表单字段
export const options = [
  {
    field: 'orgName',
    // placeholder: '选择城市',
    slot: 'orgName'
  },
  {
    field: 'orgCity',
    // placeholder: '选择城市',
    slot: 'orgCity'
  },
  {
    field: 'timely',
    // placeholder: '即时达',
    slot: 'timely'
  }
]

// 表单配置

export const tableConfig = {
 // selectAll: false,
  rowKey: 'orgId'
}

export const columns = [
  {
    title: '序号',
    width: '100',
    align:'left',
    customRender:(text,record,index)=>`${index+1}`,
  },
  {
    dataIndex: 'orgName',
    title: '站点名称',
    align:'left',
    width: '200'
  },
  {
    dataIndex: 'orgCity',
    title: '有无计价规则',
    align:'left',
    width: '200',
    slot: true,
  },

  // {
  //   dataIndex: 'payment',
  //   title: '付款方式',
  //   width: '80',
  //   slot: true,
  //   convert: true,
  //   meta: {
  //     convert: [
  //       {
  //         value: 1,
  //         title: '到付'
  //       },
  //       {
  //         value: 2,
  //         title: '寄付'
  //       }
  //     ]
  //   }
  // },
  // {
  //   dataIndex: 'weightMethod',
  //   title: '重量模式',
  //   width: '80',
  //   slot: true,
  //   convert: true,
  //   meta: {
  //     convert: [
  //       {
  //         value: 1,
  //         title: '实际重量'
  //       },
  //       {
  //         value: 2,
  //         title: '四舍五入'
  //       }
  //     ]
  //   }
  // },
  // {
  //   dataIndex: 'time',
  //   title: '有效时间',
  //   slot: true,
  //   width: '200'
  // },
  // {
  //   dataIndex: 'startTime',
  //   title: '创建时间',
  //   width: '200'
  // },
  // {
  //   dataIndex: 'endTime',
  //   title: '更新时间',
  //   width: '200'
  // },
  // {
  //   dataIndex: 'operator',
  //   title: '操作人',
  //   width: '200'
  // },
  {
    title: ''   //此处添加一个空列，让此列去自适应一行宽度
  },
  {
    title: '操作',
    dataIndex: 'operations',
  //  fixed: 'right',
    align:'right',
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
  //batchText: '批量处理',
  content: [
    {
      type: 'edit',
      title: '设置',
      color: 'primary'
    },
    // {
    //   type: 'delete',
    //   title: '删除',
    //   color: 'danger',
    //   batch: true,
    //   component: 's-delete'
    // },
    // {
    //   type: 'detail',
    //   title: '详情',
    //   color: 'primary',
    //  relation: [0, 1, 2]
    // },
  ]
}

export const params = {
  category: 1
}

export const postParams = {
  freight: {},
  operator: '',
  weightMethod: 1,
  city: '',
  district: '',
  startTime: new Date(Date.now()),
  endTime: new Date(Date.now() + 24 * 60 * 60 * 1000)
}
