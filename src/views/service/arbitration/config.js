/* eslint-disable indent */

import {
  URL_SERVICE_ARBITRATIONS
} from '@/api/url'

// url
export const url = URL_SERVICE_ARBITRATIONS

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
    placeholder: '请输入仲裁编号',
    addonBefore: '仲裁编号',
    field: 'id'
  }, {
    component: 's-select',
    placeholder: '仲裁类型',
    field: 'arbitrationType',
    children: [{
        value: '1',
        title: '待受理'
      },
      {
        value: '2',
        title: '受理中'
      },
      {
        value: '3',
        title: '已处理'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '仲裁状态',
    field: 'state',
    children: [{
        value: 1,
        title: '未处理'
      },
      {
        value: 2,
        title: '处理中'
      },
      {
        value: 3,
        title: '已处理'
      },
      {
        value: 4,
        title: '已质控'
      }
    ]
  }, {
    component: 'site-cascader',
    placeholder: '来源网点',
    field: 'sourceId'
  }
  //  {
  //   component: 's-picker-select',
  //   field: 'select-ignore',
  //   width: '300',
  //   value: 'no',
  //   defaultTitle: '生效日期',
  //   select: {
  //     width: '100',
  //     children: [{
  //       value: 'no',
  //       title: '生效日期'
  //     }, {
  //       value: 'name',
  //       title: '更新日期'
  //     }]
  //   },
  //   picker: {
  //     width: '100px'
  //   }
  // }
]

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
    dataIndex: 'id',
    title: '仲裁编号',
    width: '100'
  },
  {
    dataIndex: 'arbitrationType',
    title: '仲裁类型',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [{
          value: 1,
          title: '类型1'
        },
        {
          value: 2,
          title: '类型2'
        }
      ]
    }
  },
  {
    dataIndex: 'complaintId',
    title: '投诉编号',
    width: '120'
  },
  {
    dataIndex: 'source',
    title: '来源网点',
    width: '120'
  },
  {
    dataIndex: 'renewalTime',
    title: '更新时间',
    width: '120'
  },
  {
    dataIndex: 'state',
    title: '仲裁状态',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [{
          value: 1,
          title: '待受理'
        },
        {
          value: 2,
          title: '受理中'
        },
        {
          value: 3,
          title: '已处理'
        }
      ]
    }
  },
  {
    dataIndex: 'operationPerson',
    title: '操作人',
    width: '200',
    slot: true
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
  relate: 'state',
  content: [{
    type: 'detail',
    title: '详情',
    color: 'primary'
  }, {
    type: 'cancel',
    title: '取消',
    color: 'danger',
    batch: true,
    auth: [1, 2]
  }]
}

export const params = {}

export const postParams = {
  category: 1,
  id: '',
  respondent: '',
  complainant: '',
  type: '',
  tel: '',
  waybillId: '',
  state: 0,
  detail: '',
  logs: [],
  operateTime: '',
  createTime: '',
  startTime: '',
  endTime: '',
}
