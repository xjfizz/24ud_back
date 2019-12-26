/* eslint-disable indent */

import {
  URL_OPERATION_NOTICE,NOTICE
} from '@/api/url'

// url
export const url = NOTICE

export const modules = {
  label: '',
  component: 'a-radio',
  defaultValue: 1,
  field: 'category',
  children: [{
      label: 'APP公告',
      value: 1,
      relation: {
        options: ['title', 'type', 'state', 'picker'],
        columns: ['num', 'title', 'type', 'state', 'operator', 'operations', 'createTime', 'content', 'count'],
        operations: ['detail', 'offonlie', 'edit', 'release', 'delete']
      }
    },
    {
      label: '后台系统公告',
      value: 2,
      relation: {
        options: ['title', 'type', 'state', 'picker'],
        columns: ['num', 'title', 'type', 'state', 'operator', 'operations', 'createTime', 'content', 'count'],
        operations: ['detail', 'offonlie', 'edit', 'release', 'delete']
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
  injection: ['field', 'sites', '']
}

// 所有的表单字段
export const options = [{
    component: 's-input',
    field: 'title',
    width: '220',
    placeholder: '请输入新闻标题',
    input: {
      style: {
        width: '60%'
      }
    }
  }, {
    component: 's-select',
    placeholder: '类型',
    field: 'type',
    children: [{
        title: '普通',
        value: '普通'
      },
      {
        title: '图文',
        value: '图文'
      },
      {
        title: '链接',
        value: '链接'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '状态',
    field: 'state',
    children: [{
        value: 1,
        title: '未发布'
      },
      {
        value: 2,
        title: '已发布'
      },
      {
        value: 3,
        title: '已下线'
      },
      // {
      //   value: 0,
      //   title: '已下线'
      // }
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
  rowKey: 'id'
}

export const columns = [{
  //  dataIndex: 'num',
    title: '序号',
    width: '50',
    customRender:(text,record,index)=>`${index+1}`,
  },
  {
    dataIndex: 'title',
    title: '标题',
    width: '80'
  },

  {
    dataIndex: 'type',
    title: '分类',
    width: '80'
  },
  {
    dataIndex: 'content',
    title: '内容',
    width: '120'
  },
  {
    dataIndex: 'count',
    title: '浏览次数',
    width: '80'
  },
  {
    dataIndex: 'state',
    title: '状态',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [{
          value: 0,
          title: '已过期'
        }, {
          value: 1,
          title: '未发布'
        },
        {
          value: 2,
          title: '已发布'
        },
        {
          value: 3,
          title: '已下线'
        }
      ]
    }
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
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
  relation: 'state',
  batchText: '批量处理',
  content: [
  //   {
  //   type: 'detail',
  //   title: '详情',
  //   color: 'primary',
  //   relation: [0, 2, 3]
  // },
   {
    type: 'offonlie',
    title: '下线',
    color: 'danger',
    relation: [2],
    state: 3
  }, {
    type: 'edit',
    title: '修改',
    color: 'primary',
    relation: [1, 3]
  }, {
    type: 'release',
    title: '发布',
    color: 'primary',
    relation: [1],
    state: 2
  }, {
    type: 'delete',
    title: '删除',
    color: 'danger',
    relation: [0, 1],
    batch: true
  }]
}

export const params = {
  category: 1
}

export const postParams = {
  title: '',
  type: '普通',
  state: 1,
  content: ''
}
