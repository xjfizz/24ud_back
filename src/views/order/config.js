/* eslint-disable indent */

import { ORDER_TODAY, ORDER_JSD } from '@/api/url'

// url
export const url = ORDER_TODAY
export const url_jsd = ORDER_JSD
// export const url = ORDER_TODAY

export const CATEGORY = [
  {
    label: '当日达',
    value: 1,
    children: [1,2, 3, 4, 5,6, 7, 8, 9, 10,51, 0]
  },
  {
    label: '即时达',
    value: 2,
  //  children: [1, 2, 8, 9, 10, 0]
    // children: [1,2, 3, 4, 5,6, 7, 8, 9, 10, 11, 0]
    children: [11, 12, 13, 14,15,16, 17,0]
  }
]

export const Timely = [
  {
    label: '当日达',
    value: 1,
    children: [2, 5]
    // children: [5, 6, 'isOuted']
  }
]

export const siginModules = {
  label: '状态',
  component: 'a-radio',
  defaultValue: 1,
  field: 'category',
  children: [
    {
      label: '当日达',
      value: 1,
      relation: {
        options: ['select-search-ignore', 'state', 'paymentType', 'sourceType' , 'select-picker-ignore'],
        columns: [
          'num',
          'tmNo',
          'startOrgName',
          'receiveSite',
          'payType',
          'picker',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail', 'sign'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '即时达',
      value: 2,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'sourceType' , 'select-picker-ignore'],
        columns: ['num', 'tmNo', 'picker', 'signer', 'signTime', 'payType', 'operations'],
        operations: ['detail'],
        details: ['waybill', 'express', 'charging']
      }
    }
  ]
}

export const modules = {
  label: '状态',
  component: 'a-radio',
  defaultValue: 2,
  field: 'state',
  children: [
    // {
    //   label: '待接单',
    //   value: 11,
    //   relation: {
    //     options: ['select-search-ignore', 'paymentType', 'picker'],
    //     columns: [
    //       'num',
    //       'tmNo',
    //       'startOrgName',
    //       'receiveSite',
    //       'payType',
    //       'picker',
    //       'sender',
    //       'senderPhone',
    //       'senderAddress',
    //       'createTime',
    //       'operations'
    //     ],
    //     operations: ['detail','problem', 'cancel'],
    //     details: ['waybill', 'express', 'charging']
    //   }
    // },

    {
      label: '待接单',
      value: 11,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'picker'],
        columns: [
          'num',
          'tmNo',
          'orgName',
          'receiveSite',
          'payType',
         // 'picker',
          'amount',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail', 'pickup','problem', 'cancel'],
        details: ['waybill', 'express', 'charging']
      }
    },

    {
      label: '待取件',
      value: 12,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'picker'],
        columns: [
          'num',
          'tmNo',
          'startOrgName',
          'receiveSite',
          'payType',
          'picker',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail', 'pickup','problem', 'cancel'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '已取件',
      value: 13,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'picker'],
        columns: [
          'num',
          'tmNo',
          'startOrgName',
          'receiveSite',
          'payType',
          'picker',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail','sending', 'problem', 'cancel'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '派送中',
      value: 14,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'picker'],
        columns: [
          'num',
          'tmNo',
          'startOrgName',
          'receiveSite',
          'payType',
          'picker',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail','problem', 'cancel'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '待签收',
      value: 15,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'picker'],
        columns: [
          'num',
          'tmNo',
          'startOrgName',
          'receiveSite',
          'payType',
          'picker',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail', 'sign_js','problem', 'cancel'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '已签收',
      value: 16,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'picker'],
        columns: [
          'num',
          'tmNo',
          'startOrgName',
          'receiveSite',
          'payType',
          'picker',
          'sender',
          'senderPhone',
          'senderAddress',
          'createTime',
          'operations'
        ],
        operations: ['detail','problem', 'cancel'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '待取件',
      value: 1,
      relation: {
        options: [
          'select-search-ignore',
          'paymentType',
          'sourceType',
          'sendSite',
          'sender',
          'select-picker-ignore'
          //  'createTime'
        ],
        columns: [
          'num',
          'tdNo',
         // 'sendSite',
         // 'receiveSite',
          'payType',
          'goodsWeight',
        //  'normal',
        //  'insurance',
        //  'other',
          'sender',
          'senderPhone',
          'senderAddress',
          'sourceType',
          'createTime',
       //   'expectArriveTime',
          'operations'
        ],
        operations: ['detail', 'cancel', 'pickup', 'takeup'],
        details: ['waybill', 'express', 'charging']
      }
    },
    // {
    //   label: '待发件',
    //   value: 3,
    //   relation: {
    //     options: ['select-search-ignore', 'paymentType', 'sourceType', 'sendSiteId', 'picker', 'select-picker-ignore'],
    //     columns: [
    //       'num',
    //       'id',
    //       'sendSite',
    //       'receiveSite',
    //       'paymentType',
    //       'picker',
    //       'sender',
    //       'senderTel',
    //       'sendAddress',
    //       'sourceType',
    //       'createTime',
    //       'expectBusTime',
    //       'operations'
    //     ],
    //     operations: ['detail', 'send'],
    //     details: ['waybill', 'express', 'charging']
    //   }
    // },

   

    {
      label: '待入库',
      value: 2,
      relation: {
        options: ['select-search-ignore', 'payType', 'sourceType', 'receiveSiteId', 'picker'],
        columns: [
          'num',
          'tdNo',
          'payType',
         // 'goodsWeight',
           //  'normal',
           //  'insurance',
           //  'other',
           'sender',
           'senderPhone',
           'senderAddress',
           'receiver',
           'receiverPhone',
           'receiverAddress',
           'sourceType',
           //'expectArriveTime',
           'createTime',
          'operations'
        ],
        operations: ['detail', 'problem', 'normal'],
        details: ['waybill', 'express', 'charging'] 
      }
    },
    {
      label: '待运输',
      value: 3,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'sourceType', 'sendSiteId', 'transportation'],
        columns: [
          'num',
          'tdNo',
          'payType',
          'goodsWeight',
           //  'normal',
           //  'insurance',
           //  'other',
           'sender',
           'senderPhone',
           'sourceType',
           'expectArriveTime',
           'createTime',
          'operations'
        ],
        operations: ['detail', 'transferOutStorage',  'prpblem'],
        // 'out',
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '运输中',
      value: 4,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'sourceType', 'sendSiteId', 'transportation'],
        columns: [
          'num',
          'tdNo',
          'payType',
          'goodsWeight',
           //  'normal',
           //  'insurance',
           //  'other',
           'sender',
           'senderPhone',
           'sourceType',
           'expectArriveTime',
           'createTime',
          'operations'
        ],
        operations: ['detail',  'nextStorage', 'problem'], 
        //  'transferinStorage',
        details: ['waybill', 'express', 'charging']
      }
    },
    
    {
      label: '待出库',
      value: 5,
      relation: {
        options: [
          'select-search-ignore',
          'paymentType',
          'sourceType',
          'sendSiteId',
          'transportation',
          'select-picker-ignore'
        ],
        columns: [
          'num',
          'tdNo',
         // 'tmNo',
           'payType',
         // 'goodsWeight',
           //  'normal',
           //  'insurance',
           //  'other',
           'sender',
           'senderPhone',
           'senderAddress',
           'receiver',
           'receiverPhone',
           'receiverAddress',
           'sourceType',
          // 'expectArriveTime',
           'createTime',
          'operations'
        ],
        operations: ['detail', 'problem','outP', 'outT'],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '待派送',
      value: 51,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'sourceType', 'sendSiteId', 'transportation'],
        columns: [
          'num',
          'tdNo',
          'payType',
          'goodsWeight',
           //  'normal',
           //  'insurance',
           //  'other',
           'sender',
           'senderPhone',
           'sourceType',
           'expectArriveTime',
           'createTime',
          'operations'
        ],
        operations: ['detail', 'out', 'problem'],
        details: ['waybill', 'express', 'charging']
      }
    },
  
    {
      label: '已出库',
      value: 'isOuted', // slot在页面编码
      aliasValue: 6,
      relation: {
        options: ['select-search-ignore', 'paymentType', 'sourceType', 'sendSiteId', 'transportation'],
        columns: [
          'num',
          'id',
          'sendSite',
          'paymentType',
          'transportation',
          'plateNumber',
          'sourceType',
          'departTime',
          'operations'
        ],
        operations: ['detail', 'pick','problem'],
        details: ['waybill', 'express', 'charging']
      }
    },
    // {
    //   label: '待派送',
    //   value: 7,
    //   relation: {
    //     options: [
    //       'select-search-ignore',
    //       'paymentType',
    //       'sendSiteId',
    //       'receiveSiteId',
    //       'storageType',
    //       'select-picker-ignore'
    //     ],
    //     columns: [
    //       'num',
    //       'id',
    //       'sendSite',
    //       'receiveSite',
    //       'paymentType',
    //       'receiver',
    //       'receiverTel',
    //       'storageType',
    //       'storageTime',
    //       'operations'
    //     ],
    //     operations: ['detail', 'sending', 'problem', 'return'],
    //     details: ['waybill', 'express', 'charging']
    //   }
    // },
      {
      label: '派送中',
      value: 6,
      relation: {
        options: [
          'select-search-ignore',
          'paymentType',
          'sendSiteId',
          'receiveSiteId',
          'storageType',
          'select-picker-ignore'
        ],
        columns: [
          'num',
          'tdNo',
         // 'sendSite',
         // 'receiveSite',
          'payType',
          'goodsWeight',
        //  'normal',
        //  'insurance',
        //  'other',
          'sender',
          'senderPhone',
          'senderAddress',
          'sourceType',
          'createTime',
          'expectArriveTime',
          'operations'
        ],
        operations: ['detail','sign', 'problem'],
        details: ['waybill', 'express', 'charging']
      }
    },
    // {
    //   label: '待签收',
    //   value: 8,
    //   relation: {
    //     options: [
    //       'select-search-ignore',
    //       'paymentType',
    //       'sourceType',
    //       'sendSiteId',
    //       'deliver',
    //       'noSignStatus',
    //       'select-picker-ignore'
    //     ],
    //     columns: [
    //       'num',
    //       'id',
    //       'paymentType',
    //       'deliver',
    //       'receiver',
    //       'receiverTel',
    //       'sourceType',
    //       'noSignStatus',
    //       'deliveryTime',
    //       'arrivalDeliveryTime',
    //       'operations'
    //     ],
    //     operations: ['detail', 'cancel'],
    //     details: ['waybill', 'express', 'charging']
    //   }
    // },
    {
      label: '正常签收',
      value: 7,
      relation: {
        options: [
          'select-search-ignore',
          'paymentType',
          'sourceType',
          'sendSiteId',
          'receiveSite',
          'deliver',
          'select-picker-ignore'
          // 'signTime'
        ],
        columns: [
          'num',
          'tdNo',
          'payType',
          //'deliver',
          'sender',
          'receiver',
          'receiverPhone',
          'receiptState',
          'sourceType',
          'remarks',
          'createTime',
          'operations',
        ],
        operations: ['detail','problem',],
        details: ['waybill', 'express', 'charging']
      }
    },
    {
      label: '问题件',
      value: 0,
      relation: {
        options: [
          'select-search-ignore',
          'problemType',
          'operationSiteId'
          //  'problemTime'
        ],
        columns: [
          // 'num',
          // 'waybillId',
          // 'questionDetails',
          // 'questionStatus',
          // 'typeContent',
          // 'remake',
          // 'creatTime',
          // 'operations'
          'num',
          'tdNo',
          'payType',
          //'deliver',
          'sender',
          'receiver',
          'receiverPhone',
          'receiptState',
          'sourceType',
          'remarks',
          'createTime',
          'operations',
        ],
        operations: ['detail', 'returnToNormal'],
        details: ['problem', 'waybill', 'express', 'charging']
      }
    },
    // {
    //   label: '退回件',
    //   value: 11,
    //   relation: {
    //     options: [
    //       'select-search-ignore',
    //       'refundType',
    //       'operationSiteId'
    //       //  'returnTime'
    //     ],
    //     columns: ['num', 'id', 'refundType', 'refundDetail', 'returnTime', 'operationSite', 'operator', 'operations'],
    //     operations: ['detail', 'revoke'],
    //     details: ['problem', 'waybill', 'express', 'charging']
    //   }
    // },
    {
      label: '取消件',
      value: 10,
      relation: {
        options: [
          'select-search-ignore',
          'cancelType',
          'cancelCategory'
          // 'toOperateTime'
        ],
        columns: [
          // 'num',
          // 'id',
          // 'cancelType',
          // 'cancelCategory',
          // 'cancelDetail',
          // 'toOperateTime',
          // 'operator',
          // 'operations'

          'num',
          'tdNo',
          'payType',
          //'deliver',
          'sender',
          'senderAddress',
          'receiver',
          'senderPhone',
          'receiverPhone',
          'receiverAddress',
          //'receiptState',
          'sourceType',
          'remarks',
          'createTime',
          'operations',
        ],
        operations: ['detail'],
        details: ['cancel', 'waybill', 'express', 'charging']
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

// 所有的筛选字段
export const options = [
  {
    // 转运
    component: 's-radio',
    field: 'transferState',
    block: true,
    defaultValue: 0,
    width: '150',
    children: [
      {
        value: 0,
        label: '待派件出库'
      },
      {
        value: 1,
        label: '待转运出库'
      }
    ]
  },
  {
    component: 's-input-select',
    field: 'select-search-ignore',
    width: '220',
    value: 'wbNo',
    defaultTitle: '订单编号',
    select: {
      width: '100',
      children: [
        {
          value: 'wbNo',
          title: '订单编号'
        },
        {
          value: 'sender',
          title: '寄件人姓名'
        },
        {
          value: 'senderPhone',
          title: '寄件人电话'
        },
        {
          value: 'receiver',
          title: '收件人姓名'
        },
        {
          value: 'receiverPhone',
          title: '收件人电话'
        }
      ]
    },
    input: {
      style: {
        width: '60%'
      }
    }
  },
  {
    // 签收状态
    component: 's-select',
    placeholder: '签收状态',
    field: 'state',
    width: '150',
    children: [
      {
        value: 8,
        title: '未签收状态'
      },
      {
        value: 9,
        title: '已签收状态'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '付款方式',
    field: 'payType',
    children: [
      {
        value: '2',
        title: '到付'
      },
      {
        value: '1',
        title: '寄付'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '运单来源',
    field: 'sourceType',
    children: [
      {
        value: 1,
        title: '代下单'
      },
      {
        value: 2,
        title: '客户下单'
      },
      {
        value: 3,
        title: '第三方导入'
      }
    ]
  },
  // {
  //   width: '200px',
  //   component: 'site-cascader',
  //   placeholder: '寄件网点',
  //   field: 'sendSiteId'
  // },
  {
    width: '200px',
    component: 'site-cascader',
    placeholder: '目的网点',
    field: 'receiveSiteId'
  },
  {
    component: 's-input',
    placeholder: '搜索寄件人',
    field: 'sender'
  },
  // {
  //   component: 's-select',
  //   placeholder: '运输单位',
  //   field: 'transportation',
  //   children: [
  //     {
  //       value: '1',
  //       title: 'A公司'
  //     },
  //     {
  //       value: '2',
  //       title: 'B公司'
  //     }
  //   ]
  // },
  {
    component: 's-select',
    placeholder: '问题类型',
    field: 'problemType',
    children: [
      {
        value: '1',
        title: '问题类型1'
      },
      {
        value: '2',
        title: '问题类型2'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '问题件类型',
    field: 'refundType',
    children: [
      {
        value: '1',
        title: '问题件类型1'
      },
      {
        value: '2',
        title: '问题件类型2'
      }
    ]
  },
  {
    width: '200px',
    component: 'site-cascader',
    placeholder: '操作网点',
    field: 'operationSiteId'
  },
  {
    // ??
    component: 's-select',
    placeholder: '入库类型',
    field: 'storageType',
    children: [
      {
        value: '5',
        title: '揽件入库'
      },
      {
        value: '5',
        title: '揽件入库'
      }
    ]
  },
  {
    component: 's-range-picker',
    placeholder: '问题发生时间',
    field: 'problemTime',
    format: 'YYYY-MM-DD',
    width: '210'
  },
  {
    component: 's-select',
    placeholder: '取消类型',
    field: 'cancelType',
    children: [
      {
        value: '1',
        title: '客户取消'
      },
      {
        value: '2',
        title: '网点取消'
      }
    ]
  },
  {
    component: 's-select',
    placeholder: '取消类别',
    field: 'cancelCategory',
    children: [
      {
        value: '1',
        title: '取消类别1'
      },
      {
        value: '2',
        title: '取消类别2'
      }
    ]
  },
  {
    component: 's-picker-select-list',
    field: 'select-picker-ignore',
    width: '420',
    // value: 'id',
    // defaultTitle: 'id',
    select: {
      width: '170',
      placeholder: '选择日期',
      children: [
        {
          value: 'sendDate',
          title: '寄件日期'
        },
        {
          value: 'pickTime',
          title: '取件时间'
        },
        {
          value: 'pickerSendTime',
          title: '发件时间'
        },
        {
          value: 'expectArriveTime',
          title: '期望班车时间'
        },
        {
          value: 'deliveryTime',
          title: '派件时间'
        },
        {
          value: 'signTime',
          title: '签收时间'
        },
        {
          value: 'transportation.arriveTime',
          title: '目的地网点入库时间'
        },
        {
          value: 'transportation.departTime',
          title: '寄件网点出库日期'
        }
      ]
    }
  }
]

// 表单配置

export const tableConfig = {
  selectAll: false,
  rowKey: 'id'
}

export const columns = [
  {
    title: '序号',
    width: '50',
    customRender:(text,record,index)=>`${index+1}`,
  },
  {
    dataIndex: 'waybillId',
    title: '订单编号',
    width: '100'
  },
  {
    dataIndex: 'tdNo',
    title: '订单编号',
    width: '100'
  },
  {
    dataIndex: 'tmNo',
    title: '订单编号',
    width: '100',
  },
  {
    dataIndex: 'startOrgName',
    title: '寄件网点',
    width: '80'
  },
  // {
  //   dataIndex:'orgName',
  //   title: '寄件网点',
  //   width: '80'
  // },

  {
    dataIndex: 'destOrgName',
    title: '目的网点',
    width: '80'
  },
  // {
  //   dataIndex: 'payType',
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
  {
    dataIndex: 'goodsWeight',
    title: '计费重量',
    // slot: true,
    width: '280'
  },
  {
    dataIndex: 'normal',
    title: '标准运费',
    // slot: true,
    width: '280'
  },
  {
    dataIndex: 'insurance',
    title: '保价费',
    width: '280'
  },
  {
    dataIndex: 'other',
    title: '其他运费',
    width: '280'
  },
  {
    dataIndex: 'picker',
    title: '取件人',
    width: '100'
  },
  {
    dataIndex: 'sendOuter',
    title: '发件人',
    width: '100'
  },
  {
    dataIndex: 'sender',
    title: '寄件人姓名',
    width: '300'
  },
  {
    dataIndex: 'senderPhone',
    title: '寄件人电话',
    width: '150'
  },
  {
    dataIndex: 'senderAddress',
    title: '寄件地址',
    width: '200'
  },
  {
    dataIndex: 'deliver',
    title: '派件员',
    width: '280'
  },
  {
    dataIndex: 'receiver',
    title: '收件人姓名',
    width: '280',
    slot: true,
  },
  {
    dataIndex: 'receiverPhone',
    title: '收件人电话',
    width: '280'
  },
  {
    dataIndex: 'receiverAddress',
    title: '收件地址',
    width: '100',
    slot: true,
  },
  // {
  //   dataIndex: 'plateNumber',
  //   title: '车牌号',
  //   width: '200'
  // },
  // {
  //   dataIndex: 'sourceType',
  //   title: '运单来源',
  //   width: '200',
  //   slot: true,
  //   convert: true,
  //   meta: {
  //     convert: [
  //       {
  //         value: 1,
  //         title: '代下单'
  //       },
  //       {
  //         value: 2,
  //         title: '客户下单'
  //       },
  //       {
  //         value: 3,
  //         title: '第三方导入'
  //       }
  //     ]
  //   }
  // },
  {
    dataIndex: 'departTime',
    title: '寄件网点出库日期',
    width: '200'
  },
  {
    dataIndex:'amount',
    title: '金额',
    width: '80'
  },
  {
    dataIndex: 'createTime',
    title: '下单时间',
    width: '380'
  },
  {
    // ??
    dataIndex: 'toSendTime',
    title: '发件日期',
    width: '200'
  },
  {
    dataIndex: 'busTime',
    title: '实际班车时间',
    width: '250'
  },
  {
    dataIndex: 'expectArriveTime',
    title: '期望班车时间',
    width: '280'
  },
  {
    dataIndex: 'storageTime',
    title: '入库日期',
    width: '280'
  },
  {
    dataIndex: 'deliveryTime',
    title: '派送日期',
    width: '280'
  },
  {
    dataIndex: 'receiptState',
    title: '开票状态',
    width: '200',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 1,
          title: '未开票'
        },
        {
          value: 2,
          title: '申请中'
        },
        {
          value: 0,
          title: '已开票'
        }
      ]
    }
  },
  {
    // ??
    dataIndex: 'arrivalDeliveryTime',
    title: '到达送货点时间',
    width: '280'
  },
  {
    dataIndex: 'signTime',
    title: '签收时间',
    width: '280'
  },
  {
    title: '问题类型',
    dataIndex: 'problemType',
    width: '280',
    meta: {
      convert: [
        {
          value: 1,
          title: '问题类型1'
        },
        {
          value: 2,
          title: '问题类型2'
        }
      ]
    }
  },
  {
    title: '问题件详情',
    dataIndex: 'questionDetails',
    width: '280'
  },
  {
    title: '问题件状态',
    dataIndex: 'questionStatus',
    width: '280',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 0,
          title: '未解决'
        },
        {
          value: 1,
          title: '已解决'
        }
      ]
    }
  },
  {
    title: '问题件描述',
    dataIndex: 'typeContent',
    width: '280'
  },
  {
    title: '备注',
    dataIndex: 'remak',
    width: '280'
  },

  {
    title: '操作网点',
    dataIndex: 'operationSite',
    width: '280'
  },
  {
    title: '取消类型',
    dataIndex: 'cancelType',
    width: '280',
    meta: {
      convert: [
        {
          value: 1,
          title: '客户取消'
        },
        {
          value: 1,
          title: '网点取消'
        }
      ]
    }
  },
  {
    title: '取消类别',
    dataIndex: 'cancelCategory',
    width: '280',
    meta: {
      convert: [
        {
          value: 1,
          title: '取消类别1'
        },
        {
          value: 2,
          title: '取消类别2'
        }
      ]
    }
  },
  {
    title: '取消描述',
    dataIndex: 'cancelDetail',
    width: '280'
  },
  {
    title: '取消操作时间',
    dataIndex: 'cancelTime',
    width: '280'
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    width: '280'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    // fixed: 'right',
    align:'center',
    slot: true
  }
]

export const columns_JSD = [
  {
      title: '序号',
    width: '50',
    customRender:(text,record,index)=>`${index+1}`,
  },
  // {
  //   dataIndex: 'waybillId',
  //   title: '订单编号',
  //   width: '100'
  // },
  // {
  //   dataIndex: 'tdNo',
  //   title: '订单编号',
  //   width: '100'
  // },
  {
    dataIndex: 'tmNo',
    title: '订单编号',
    width: '100',
  },
  {
    dataIndex: 'startOrgName',
    title: '寄件网点',
    width: '80'
  },
  {
    dataIndex:'orgName',
    title: '寄件网点',
    width: '80'
  },
  {
    dataIndex:'amount',
    title: '金额',
    width: '80'
  },
  {
    dataIndex: 'destOrgName',
    title: '目的网点',
    width: '80'
  },
  {
    dataIndex: 'payType',
    title: '付款方式',
    width: '80',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 2,
          title: '到付'
        },
        {
          value: 1,
          title: '寄付'
        }
      ]
    }
  },
  {
    dataIndex: 'goodsWeight',
    title: '计费重量',
    // slot: true,
    width: '280'
  },
  {
    dataIndex: 'normal',
    title: '标准运费',
    // slot: true,
    width: '280'
  },
  {
    dataIndex: 'insurance',
    title: '保价费',
    width: '280'
  },
  {
    dataIndex: 'other',
    title: '其他运费',
    width: '280'
  },
  {
    dataIndex: 'picker',
    title: '取件人',
    width: '100'
  },
  {
    dataIndex: 'sendOuter',
    title: '发件人',
    width: '100'
  },
  {
    dataIndex: 'sender',
    title: '寄件人姓名',
    width: '280'
  },
  {
    dataIndex: 'senderPhone',
    title: '寄件人电话',
    width: '280'
  },
  {
    dataIndex: 'senderAddress',
    title: '寄件地址',
    width: '280'
  },
  {
    dataIndex: 'deliver',
    title: '派件员',
    width: '280'
  },
  {
    dataIndex: 'receiver',
    title: '收件人姓名',
    width: '280'
  },
  {
    dataIndex: 'receiverPhone',
    title: '收件人电话',
    width: '280'
  },
  {
    dataIndex: 'receiverAddress',
    title: '收件地址',
    width: '280'
  },
  // {
  //   dataIndex: 'plateNumber',
  //   title: '车牌号',
  //   width: '200'
  // },
  {
    dataIndex: 'sourceType',
    title: '运单来源',
    width: '200',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 1,
          title: '代下单'
        },
        {
          value: 2,
          title: '客户下单'
        },
        {
          value: 3,
          title: '第三方导入'
        }
      ]
    }
  },
  {
    dataIndex: 'departTime',
    title: '寄件网点出库日期',
    width: '200'
  },
  {
    dataIndex: 'createTime',
    title: '下单时间',
    width: '380'
  },
  {
    // ??
    dataIndex: 'toSendTime',
    title: '发件日期',
    width: '200'
  },
  {
    dataIndex: 'busTime',
    title: '实际班车时间',
    width: '280'
  },
  {
    dataIndex: 'expectArriveTime',
    title: '期望班车时间',
    width: '280'
  },
  {
    dataIndex: 'storageTime',
    title: '入库日期',
    width: '280'
  },
  {
    dataIndex: 'deliveryTime',
    title: '派送日期',
    width: '280'
  },
  {
    dataIndex: 'receiptState',
    title: '开票状态',
    width: '200',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 1,
          title: '未开票'
        },
        {
          value: 2,
          title: '申请中'
        },
        {
          value: 0,
          title: '已开票'
        }
      ]
    }
  },
  {
    // ??
    dataIndex: 'arrivalDeliveryTime',
    title: '到达送货点时间',
    width: '280'
  },
  {
    dataIndex: 'signTime',
    title: '签收时间',
    width: '280'
  },
  {
    title: '问题类型',
    dataIndex: 'problemType',
    width: '280',
    meta: {
      convert: [
        {
          value: 1,
          title: '问题类型1'
        },
        {
          value: 2,
          title: '问题类型2'
        }
      ]
    }
  },
  {
    title: '问题件详情',
    dataIndex: 'questionDetails',
    width: '280'
  },
  {
    title: '问题件状态',
    dataIndex: 'questionStatus',
    width: '280',
    slot: true,
    convert: true,
    meta: {
      convert: [
        {
          value: 0,
          title: '未解决'
        },
        {
          value: 1,
          title: '已解决'
        }
      ]
    }
  },
  {
    title: '问题件描述',
    dataIndex: 'typeContent',
    width: '280'
  },
  {
    title: '备注',
    dataIndex: 'remak',
    width: '280'
  },

  {
    title: '操作网点',
    dataIndex: 'operationSite',
    width: '280'
  },
  {
    title: '取消类型',
    dataIndex: 'cancelType',
    width: '280',
    meta: {
      convert: [
        {
          value: 1,
          title: '客户取消'
        },
        {
          value: 1,
          title: '网点取消'
        }
      ]
    }
  },
  {
    title: '取消类别',
    dataIndex: 'cancelCategory',
    width: '280',
    meta: {
      convert: [
        {
          value: 1,
          title: '取消类别1'
        },
        {
          value: 2,
          title: '取消类别2'
        }
      ]
    }
  },
  {
    title: '取消描述',
    dataIndex: 'cancelDetail',
    width: '280'
  },
  {
    title: '取消操作时间',
    dataIndex: 'cancelTime',
    width: '280'
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    width: '280'
  },
  {
    title: '操作',
    dataIndex: 'operations',
    // fixed: 'right',
    align:'certer',
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
  batch: true,
  content: [
    {
      type: 'pickup',
      title: '指派取件员',
      color: 'primary',
    //  batch: true,
    //  modify: true,
      filter: (row) => (!(row.logs[row.logs.length -1].courierId)) && !row.tmNo,
      meta: {
        title: '指派取件员',
        state: 1
      }
    },
    {
      type: 'takeup',
      title: '取件',
      color: 'primary',
      batch: true,
      modify: true,
      filter: (row) => row.logs[row.logs.length -1].courierId,
      meta: {
        title: '取件',
        state: 2
      }
    },
    {
      type: 'transferinStorage',
      title: '转运入库',
      color: 'primary',
      batch: true,
      modify: true,
    //  filter: (row) => row.logs[row.logs.length -1].courierId,
      meta: {
        title: '转运入库',
        state: 5
      }
    },

    {
      type: 'nextStorage',
      //title: '下一站',
      title: '转运入库',
      color: 'primary',
      batch: true,
      modify: true,
    //  filter: (row) => row.logs[row.logs.length -1].courierId,
      meta: {
        title: '转运入库',
        state: 5
      }
    },
 
    {
      type: 'transferOutStorage',
      title: '转运出库',
   
      batch: true,
      modify: true,
    //  filter: (row) => row.logs[row.logs.length -1].courierId,
      meta: {
        title: '转运出库',
        state: 4
      }
    },
    {
      type: 'sign_js',
      title: '签收',
      color: 'primary',
      batch: true,
      modify: true,
   //   filter: (row) => row.state === 6,
      meta: {
        title: '签收',
        state: 6
      }
    },
    {
      type: 'sign',
      title: '签收',
      color: 'primary',
      batch: true,
      modify: true,
   //   filter: (row) => row.state === 6,
      meta: {
        title: '签收',
        state: 7
      }
    },
    {
      type: 'send',
      title: '发件',
      color: 'primary',
      modify: true,
      batch: true,
      meta: {
        title: '发件',
        state: 4
      }
    },
    {
      type: 'detail',
      title: '详情',
      color: 'primary'
    },
    {
      type: 'sending',
      title: '开始派送',
      modify: true,
      batch: true,
      meta: {
        title: '开始派送',
        state: 4
      }
    },
    {
      type: 'normal',
      title: '揽件入库',
      batch: true,
      modify: true,
      meta: {
        title: '揽件入库',
        state: 3
      }
    },
    // {
    //   type: 'normal',
    //   title: '转运入库',
    //   batch: true,
    //   modify: true,
    //   meta: {
    //     title: '转运入库',
    //     state: 5
    //   }
    // },
    {
      type: 'transferNormal',
      title: '正常入库',
      batch: true,
      modify: true,
      meta: {
        title: '正常入库',
        state: 5,
        transportation: {
          transferState: 1
        }
      }
    },
    {
      type: 'out',
      title:  '派件出库',
      batch: true,
      modify: true,
  //  filter: (row) => row.logs[row.logs.length -1].courierId,
      meta: {
        title: '派件出库',
        state: 6 // 
      }
    },
    // {
    //   type: 'out',
    //   title: '转运出库',
    //   batch: true,
    //   modify: true,
    //   filter: (row) => row.transferState === 1,
    //   meta: {
    //     title: '转运出库',
    //     state: 6
    //   }
    // },


    {
      type: 'outP',
      title:  '派件出库',
      batch: true,
      modify: true,
     filter: (row) => row.logs[row.logs.length -1].courierId,
      meta: {
        title: '派件出库',
        state: 6
      }
    },
    {
      type: 'outT',
      title: '转运出库',
      batch: true,
      modify: true,
      filter: (row) => !(row.logs[row.logs.length -1].courierId),
      meta: {
        title: '转运出库',
        state: 4
      }
    },

    {
      type: 'transferProblem',
      title: '异常入库',
      batch: true,
      modify: true,
      meta: {
        title: '异常入库',
        state: 10
      }
    },
    {
      type: 'problem',
      title: '设为问题件',
      batch: true,
      modify: true,
      meta: {
        title: '设为问题件',
        state: 99
      }
    },
    {
      type: 'return',
      title: '设为问题件',
      modify: true,
      meta: {
        title: '设为问题件',
        state: 99
      }
    },
    {
      type: 'returnToNormal',
      title: '设为正常件',
      modify: true,
      meta: {
        title: '设为正常件',
        state: 98
      }
    },
    {
      type: 'revoke',
      title: '已解决',
      color: 'danger'
    },
    {
      type: 'cancel',
      title: '取消',
      color: 'danger',
      modify: true,
      batch: true,
      meta: {
        title: '取消运单',
        state: 10
      }
    }
  ]
}

export const params = {
  //category: 1,
  state: 2,
 // querySiteId: ''
}

export const postParams = {}

export const detailTitle = {
  problem: '问题信息',
  waybill: '运单信息',
  express: '寄收件信息',
  charging: '计费信息',
  cancel: '取消信息'
}

// 查看详情字段， 在详情组件进根据belong字段行过滤,belong字段必须在modules -> children -> details中注册
export const detailOptions = [
  // 运单信息
  {
    label: '寄件网点',
    field: 'startOrgName',
    belong: 'waybill'
  },
  {
    label: '目的网点',
    field: 'destOrgName',
    belong: 'waybill'
  },
  {
    label: '下单时间',
    field: 'createTime',
    belong: 'waybill'
  },
  // {
  //   label: '寄件日期',
  //   field: 'createTime',
  //   belong: 'waybill'
  // },
  {
    label: '运单来源',
    field: 'sourceType',
    belong: 'waybill',
    convert: true,
    meta: {
      convert: [
        {
          value: 1,
          title: '代下单'
        },
        {
          value: 2,
          title: '客户下单'
        },
        {
          value: 3,
          title: '第三方导入'
        }
      ]
    }
  },
  {
    label: '运单金额',
    field: 'amount',
    belong: 'waybill'
  },
  // {
  //   // ??
  //   label: '时效类型',
  //   field: 'category',
  //   belong: 'waybill',
  //   convert: true,
  //   meta: {
  //     convert: [
  //       {
  //         value: 1,
  //         title: '当日达'
  //       },
  //       {
  //         value: 2,
  //         title: '即时达'
  //       }
  //     ]
  //   }
  // },
  {
    label: '付款方式',
    field: 'payType',
    belong: 'waybill',
    convert: true,
    meta: {
      convert: [
        {
          value: 2,
          title: '到付'
        },
        {
          value: 1,
          title: '寄付'
        }
      ]
    }
  },
  {
    label: '期望班车时间',
    field: 'expectArriveTime',
    belong: 'waybill'
  },
  // {
  //   label: '取件人',
  //   field: 'picker',
  //   belong: 'waybill'
  // },
  {
    label: '货物',
    belong: 'waybill',
    field: 'goodsInfo'
    // join: true,
    // meta: {
    //   join: ['goodsInfo', 'reckonWeight']
    // }
  },
  {
    label: '重量',
    belong: 'waybill',
    // field: 'reckonWeight',
    field: 'goodsWeight',
    replaceTpl: '{$} kg'
  },
  {
    label: '客户备注',
    field: 'remark',
    belong: 'waybill',
    full: true
  },
  // 寄收件人信息
  {
    label: '寄件人姓名',
    field: 'sender',
    belong: 'express'
  },
  {
    label: '寄件人电话',
    field: 'senderPhone',
    belong: 'express'
  },
  {
    label: '寄件地址',
    field: 'senderAddress',
    belong: 'express',
    full: true
  },
  {
    label: '收件人姓名',
    field: 'receiver',
    belong: 'express'
  },
  {
    label: '收件人电话',
    field: 'receiverPhone',
    belong: 'express'
  },
  {
    label: '收件地址',
    field: 'receiverAddress',
    belong: 'express',
    full: true
  },
  // 计费信息
  {
    label: '计费重量',
    field: 'goodsWeight',
    belong: 'charging',
    replaceTpl: '{$} kg'
  },
  // {
  //   label: '保价费',
  //   field: 'insurance',
  //   belong: 'charging',
  //   replaceTpl: '{$} 元'
  // },
  // {
  //   label: '标准运费',
  //   field: 'normal',
  //   belong: 'charging',
  //   replaceTpl: '{$} 元'
  // },
  // {
  //   label: '其他运费',
  //   field: 'other',
  //   belong: 'charging',
  //   replaceTpl: '{$} 元'
  // },
  // 问题信息
  {
    label: '问题类型',
    field: 'questionType',
    belong: 'problem'
  },
  {
    label: '问题发生时间',
    field: 'problemTime',
    belong: 'problem'
  },
  // {
  //   label: '操作网点',
  //   field: 'operationSite',
  //   belong: 'problem'
  // },
  // {
  //   label: '操作人',
  //   field: 'operator',
  //   belong: 'problem'
  // },
  {
    label: '问题描述',
    field: 'questionDetails',
    belong: 'problem',
    full: true
  },
  // 取消信息
  {
    label: '取消类别',
    field: 'cancelCategory',
    belong: 'cancel'
  },
  {
    label: '操作时间',
    field: 'toOperateTime',
    belong: 'cancel'
  },
  {
    label: '取消类型',
    field: 'cancelType',
    belong: 'cancel'
  },
  {
    label: '操作人',
    field: 'operator',
    belong: 'cancel'
  },
  {
    label: '取消描述',
    field: 'cancelDetail',
    belong: 'cancel',
    full: true
  }
]
