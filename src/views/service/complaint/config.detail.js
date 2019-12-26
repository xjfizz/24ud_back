/* eslint-disable indent */

export const category = [{
    label: '网点投诉单',
    value: 1,
    relation: {
      options: ['complainant', 'respondent', 'type', 'isOrder', 'waybillId', 'detail']
    }
  },
  {
    label: '订单投诉单',
    value: 2,
    relation: {
      options: ['respondent', 'type', 'complainant', 'type', 'tel', 'detail']
    }
  }
]

export const items = [{
    label: '投诉网点',
    field: 'complainant',
    cate: 1
  }, {
    label: '被投诉网点',
    field: 'respondent'
  },
  {
    label: '投诉人',
    field: 'complainant',
    cate: 2
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
  }
]

export const operations = [{
    label: '开始处理',
    state: 1,
    cate: 2
  },
  {
    label: '转为质控',
    state: 2,
    cate: 4
  },
  {
    label: '客诉解决',
    state: 2,
    cate: 3
  }
]

export const state = {
  0: {
    label: '客诉失败',
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
    label: '客诉成功',
    type: 'success'
  },
  4: {
    label: '客诉成功',
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

export const formconfig = [

]
