/* eslint-disable indent */

import { FRANCHISEE } from '@/api/url'

// url
export const url = FRANCHISEE

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
    width: '300',
    value: 'orgName',
    defaultTitle: '站点名称',
    select: {
      width: '100',
      children: [
        {
          value: 'orgName',
          title: '站点名称'
        },
        {
          value: 'orgCity',
          title: '所在城市'
        },
        // {
        //   value: 'officialTel',
        //   title: '手机号码'
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
  rowKey: 'orgId',
  initFetch: true
}

export const columns = [
  // {
  //   title: '序号',
  //   width: '100',
  //   customRender:(text,record,index)=>`${index+1}`
  // },
    {
    dataIndex: 'orgName',
    title: '站点名称',
    width: '200'
  },
  {
    dataIndex: 'orgCity',
    title: '有无加盟商',
    align:'left',
    width: '200',
    slot: true,
  },

  // {
  //   dataIndex: 'officialName',
  //   title: '联系人',
  //   width: '150'
  // },
  // {
  //   dataIndex: 'officialTel',
  //   title: '联系人手机号码',
  //   width: '150'
  // },
  // // {
  // //   dataIndex: 'city',
  // //   title: '城市',
  // //   width: '200'
  // // },
  // {
  //   dataIndex: 'level',
  //   title: '加盟商级别',
  //   width: '200',
  //   slot: true,
  //     convert: true,
  //     meta: {
  //         convert: [
  //             {
  //                 value: 0,
  //                 title: '低'
  //             },
  //             {
  //                 value: 1,
  //                 title: '中'
  //             },
  //             {
  //                 value: 2,
  //                 title: '高'
  //             },
  //         ]
  //     }

  // },
  // {
  //   dataIndex: 'joinTime',
  //   title: '加盟时间',
  //   width: '280'
  // },
  {
    title: '操作',
    dataIndex: 'operations',
    align:"right",
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
  content: [
    {
      type: 'edit',
      title: '设置',
      color: 'primary',
      
    }
  ]
}

export const params = {
  // type: 0
}

export const postParams = {
  area: '',
  branches: '',
  certificateNum: '',
  certificateType: '身份证',
  gid: '',
  name: '',
  phone: '',
  sex: '1'
}
