/* eslint-disable indent */

import {
  URL_SERVICE_COMPLAINT, COMPLAINT
} from '@/api/url'

// url
export const url = COMPLAINT

export const modules = {
  label: '',
  component: 'a-radio',
  defaultValue: null,
  field: 'category',
  children: [{
      label: '投诉列表',
      value: null,
      relation: {
        options: ['select-ignore', 'type', 'state', 'picker'],
        columns: ['num', 'id', 'type', 'detail', 'operateTime', 'state', 'operator', 'operations'],
        operations: ['detail', 'edit']
      }
    },
    // {
    //   label: '被投诉列表',
    //   value: 2,
    //   relation: {
    //     options: ['select-ignore', 'type', 'state'],
    //     columns: ['num', 'id', 'type', 'detail', 'operateTime', 'state', 'operator', 'operations'],
    //     operations: ['detail']
    //   }
    // }
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
  injection: ['field', 'sites', '']
}

// 所有的表单字段
export const options = [{
    component: 's-input-select',
    field: 'select-ignore',
    width: '220',
    value: 'id',
    placeholder: '请输入单号',
    select: {
      width: '100',
      children: [{
        value: 'id',
        title: '投诉编号'
      }, {
        value: 'waybillId',
        title: '运单编号'
      }]
    },
    input: {
      style: {
        width: '60%'
      }
    }
  }, {
    component: 's-select',
    placeholder: '11投诉类型',
    field: 'type',
    slot: 'complaint-type',
    children: [{
        value: '1',
        title: '类型1'
      },
      {
        value: '2',
        title: '类型2'
      },
      {
        value: '3',
        title: '类型3'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '投诉状态',
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
      },
      {
        value: 0,
        title: '已取消'
      }
    ]
  }, {
    component: 's-range-picker',
    placeholder: '起止时间',
    field: 'picker',
    format: 'YYYY-MM-DD',
    width: '210'
  }
]

// 表单配置

export const tableConfig = {
  selectAll: false,
  rowKey: 'id',
  noIndex: true
}

export const columns = [{
    customRender:(text,record,index)=>`${index+1}`,
    title: '序号',
    width: '50'
  },
  {
    dataIndex: 'id',
    title: '投诉编号',
    width: '100'
  },
  {
    dataIndex: 'type',
    title: '投诉类型',
    width: '80'
  },
  {
    dataIndex: 'detail',
    title: '投诉描述',
    width: '120'
  },
  {
    dataIndex: 'operateTime',
    title: '操作时间',
    // slot: true,
    width: '280'
  },
  {
    dataIndex: 'state',
    title: '投诉状态',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [{
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
        },
        {
          value: 0,
          title: '已取消'
        }
      ]
    }
  },
  {
    dataIndex: 'operator',
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
  content: [{
    type: 'detail',
    title: '详情',
    color: 'primary'
    // batch: true
  },
  {
    type: 'edit',
    title: '处理',
    color: 'primary'
    // batch: true
  }]
}

export const params = {
 // category: 1
}

export const postParams = {
 // category: 1,
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
  label: ''
}
