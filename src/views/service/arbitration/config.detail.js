/* eslint-disable indent */

export const aitems = [{
    label: '仲裁编号',
    field: 'id'
  },
  {
    label: '仲裁类型',
    field: 'arbitrationType'
  },
  {
    label: '生效时间',
    field: 'createTime'
  },
  {
    label: '操作人',
    field: 'operationPerson'
  },
  {
    label: '更新时间',
    field: 'updateTime'
  },
  {
    label: '详情描述',
    field: 'arbitrationDescribe',
    state: 3,
    cls: 'full'
  }
]

export const items = [{
    label: '投诉网点',
    field: 'complainant'
  }, {
    label: '被投诉网点',
    field: 'respondent'
  },
  {
    label: '投诉人电话',
    field: 'tel'
  },
  {
    label: '投诉类型',
    field: 'type'
  },
  {
    label: '运单编号',
    field: 'waybillId',
    component: 's-is-order',
    cls: 'full'
  },
  {
    label: '详情描述',
    field: 'detail',
    cls: 'full'
  },
  {
    label: '附件',
    field: ''
  }
]

export const operations = {
  1: {
    label: '开始处理',
    state: 2,
    title: '开始处理'
  },
  2: {
    label: '点击处理完成',
    state: 3,
    title: '处理完成提示'
  }
}

export const state = {
  0: {
    label: '取消',
    type: 'success'
  },
  1: {
    label: '未处理',
    type: 'danger'
  },
  2: {
    label: '处理中',
    type: 'warn'
  },
  3: {
    label: '已处理',
    type: 'success'
  }
}

export const columns = [{
    title: '操作人',
    dataIndex: 'user'
  },
  {
    title: '操作项',
    dataIndex: 'item'
  },
  {
    title: '操作时间',
    dataIndex: 'time'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  }
]
