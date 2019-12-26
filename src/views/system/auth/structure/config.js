/* eslint-disable indent */

import {
  URL_USERS
} from '@/api/url'

// url
export const url = URL_USERS

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
  component: 's-input-select',
  field: 'select-search-ignore',
  width: '420',
  value: 'username',
  defaultTitle: 'username',
  select: {
    width: '100',
    children: [{
      value: 'username',
      title: '用户名'
    }, {
      value: 'phone',
      title: '手机'
    },{
        value: 'nickname',
        title: '昵称'
    }
    ]
  },
  input: {
    placeholder: '请输入关键词查询',
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
    title: '序号',
    width: '50',
    customRender:(text,record,index)=>`${index+1}`
  },
  {
    dataIndex: 'username',
    title: '用户名',
    width: '50'
  },
  {
    dataIndex: 'nickname',
    title: '昵称',
    width: '100'
  },
  // {
  //   dataIndex: 'dept',
  //   title: '部门',
  //   slot: true,
  //   width: '50'
  // },
    {
        dataIndex: 'phone',
       // slot: true,
        title: '手机号',
        width: '50'
    },
  // {
  //   dataIndex: 'roleName',
  //   slot: true,
  //   title: '角色',
  //   width: '50'
  // },
  {
    dataIndex: 'status',
    title: '状态',
    width: '50',
   // convert: true,
    slot: true,
    // meta: {
    //   convert: [{
    //       value: true,
    //       title: '启用'
    //     },
    //     {
    //       value: false,
    //       title: '禁用'
    //     }
    //   ]
    // }
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
  // batchText: '批量处理',
  content: [{
    type: 'edit',
    title: '修改',
    color: 'primary'
  }, 
  
  // {
  //     type: 'restart',
  //     title: '启用',
  //     color: 'primary',
  //   }
 
  ]
}

export const params = {
  // siteIds: '5c91a326fdb49f3e340123f7'
}

export const postParams = {
  userName: '',
  tel: '',
  gender: '男',
  password: '',
  dept: '',
  state: 1,
  roleName: ''
}
