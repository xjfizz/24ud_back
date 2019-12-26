
const BASE_UPLOAD_URL = process.env.NODE_ENV === 'production' ? '/' : '/api'

// ------------运单-----------------------
// 订单列表
export const URL_ORDERS = '/order/orders'
export const URL_ORDERS_IMPORT = `/todays/waybill/import`

// 面单
export const URL_ORDERS_WAYBILL = `/todays/waybill`

// export const URL_ORDERS = '/order/orders'

// -------------结算-----------------------
// 报价维护
export const URL_SETTLEMENT_QUOTE = '/quote/quotes'
// 报价
export const URL_SETTLEMENT_QUOTE_CLAC = '/quoteToday/calCharges'
export const URL_SETTLEMENT_FINANCE = '/order/orders/totalCharges'
export const URL_SETTLEMENT_SITE_FORM = '/order/orders/siteStatistic' // 网点报表
export const URL_FRANCHISES = '/financeToday' // 加盟商

// -------------客服--------------------
// 投诉管理
export const URL_SERVICE_COMPLAINT = '/complaint'
// export const URL_SERVICE_COMPLAINT = '/complaint/complaints'
 export const URL_SERVICE_COMPLAINT_TYPES = `/complaintType`
// export const URL_SERVICE_COMPLAINT_TYPE_ENABLE = `${URL_SERVICE_COMPLAINT_TYPES}/enable`
// 仲裁管理 arbitrations @/src/views/service/arbitrations/index.vue
export const URL_SERVICE_ARBITRATIONS = '/arbitration/arbitrations'
export const URL_SERVICE_ARBITRATIONS_DOWN = '/arbitration/arbitrations'

// 快件查询
export const URL_SERVICE_SIGN = '/order/orders/sign'

// 数据报表
export const URL_SERVICE_RECORD = '/organization/statement/platform'

// -------------快递员-----------------------
// 当日达快递员理列表
export const URL_COURIER = '/todays/courier'
export const URL_COURIER_ALL = '/todays/courier/all'
// 及时达快递员理列表
export const URL_COURIER_JS = '/timely/courier/condition'
// 当日达快递员-add
export const URL_COURIER_TODAY = '/todays/courier/condition' // 分页
export const URL_COURIER_TODAY_ALL = '/todays/courier/all' // 不分页
// 及时达快递员-add
export const URL_COURIER_JSD = '/timely/courier'
// 及时达批量修改
export const URL_COURIER_SELECT_ALL = '/timely/courier/batch'
// 文件上传
export const URL_FILE = '/file'
// 快递员身份证 反面
export const URL_COURIER_UPLOAD_BACK = `/timely/courier/backUpload`  /*  ${BASE_UPLOAD_URL} */
// 快递员身份证 正面
export const URL_COURIER_UPLOAD = `/timely/courier/idCardUpload`
// 学历证书
export const URL_COURIER_UPLOAD_FRONT_DIPO = `/timely/courier/diplomaUpload`
// 流水
export const URL_COURIER_TRANSACTIONS = '/bill'
// 骑手申请
export const URL_COURIER_APPLIES = '/courier/courierApplies'

// -------------系统-----------------------
// 权限角色
// export const URL_SYSTEM_AUTH_ROLE = '/user/roles'
export const URL_SYSTEM_AUTH_ROLE = '/security/role'
export const URL_SYSTEM_AUTH_ROLE_ALL = '/security/role/all'
// 权限功能菜单 ---管理员--角色
export const URL_SYSTEM_AUTH_ROLES = '/user/roles'
// export const URL_SYSTEM_AUTH_PERMISSION = '/user/permissions'

export const URL_SYSTEM_AUTH_PERMISSION = '/security/authority/tree'

// 部门
// export const URL_SYSTEM_AUTH_DEPARTMENT = '/user/departments'
// export const URL_SYSTEM_AUTH_DEPARTMENT = '/security/role'

// -----------------组织架构-----
// 组织架构-增加
export const URL_SYSTEM_AUTH_STRUCTURE = '/organization'// 增加组织架构
export const URL_SYSTEM_AUTH_STRUCTURE_POLOGON = '/organization/polygon'// 增加区域地图
export const URL_SYSTEM_AUTH_STRUCTURE_BRO = '/organization/bro&parent'//获取同级和上级所有组织
// export const URL_SYSTEM_AUTH_STRUCTURE_ALL = `${URL_SYSTEM_AUTH_STRUCTURE}/allHighest`
// 组织架构tree
export const URL_SYSTEM_AUTH_STRUCTURE_ALL = `/organization/trees`
// export const URL_SYSTEM_AUTH_STRUCTURE_ALLList = `/chart/organizations/allHighest`
export const URL_SYSTEM_AUTH_STRUCTURE_ALLList = `/organization/trees`
export const URL_SYSTEM_AUTH_STRUCTURE_CHILDREN = '/organizations/children'
export const URL_SYSTEM_AUTH_STRUCTURE_TOP = '/organizations/highest'

// -------------用户-----------------------
// 权限角色
// export const URL_USERS = '/user/users'
export const URL_USERS = '/user'

// ---------------运营---------------------

// 车辆管理
export const URL_MATERIAL_VEHICLES = '/company/vehicles'
export const URL_MATERIAL_TRANSPORT = '/company/transports'

// 区域选择
export const URL_AREA_SITE_AREATS = 'http://192.168.1.104:8084/siteAreas'

// --------------消息----------------------
// 车辆管理
export const URL_MESSAGES = '/message/messages'
// 公告管理
export const URL_OPERATION_NOTICE = '/notice/notices'
export const URL_AFFICHE_UPLOAD = `/file`
export const URL_ORDER_INFO = '/order/orders/'
export const URL_ORG_CHILD_ = '/chart/organizations/child'
export const URL_ORG_ALL_CHILD_ = '/chart/organizations/allHighestNotArea'
export const URL_COMPANY = '/company/transports'

export const URL_READ_MESSAGE= '/message/read'

/**
* 运单
* */
// 当日达
export const ORDER_TODAY= '/todays/waybill'
export const ORDER_TODAY_SCAN= '/todays/waybill/scan'
export const ORDER_JSD= '/timely/waybill'

// 加盟商
export const FRANCHISEE= '/financeToday'
export const FRANCHISEE_JSD= '/financeTimely'

// 客服
 // 投诉管理
export const COMPLAINT= '/complaint'

export const BUSTIME= '/expect/time'

// 问题件类型

export const QUESTION= '/question/type'

export const QUESTION_ADD= '/question/Waybill'
export const QUESTION_LIST= '/question/Waybill'

// 公共管理
export const NOTICE = '/notice'

// 系统消息
// export const MESSAGE = '/message/findMessage'
export const MESSAGE = '/message'

 // 计价规则
 export const QUOTE = '/quoteToday/findAll'
// export const QUOTE = '/quoteToday'

  // 计价规则-add
  export const QUOTE_ADD = '/quoteToday'
  // 计价规则-add
  export const QUOTE_ADD_TIME = '/quoteTimely'

  //提现申请
  export const WITHDRAWAL = '/withdrawal/audit'
  //驳回申请
  export const WITHDRAWAL_REJECT = '/withdrawal/audit/reject'

   // 财务报表
   export const ORGANIZATION_FINANCE = '/organization/statement/finance'

  // 网点报表
   export const ORGANIZATION_POOL = '/organization/statement/site'

   // 账号启用/禁用
   export const CHANGE_ACCOUNT_STATUS = '/user/changeStatus'

   // 角色删除
   export const ROLE_REMOVE = '/security/role'

   // 站点管理
   export const SITE_MANAGE = '/station/user'

   // 根据订单编号查询
   export const SEARCHBYID = '/todays/waybill/id'

   // 根据id查询消息列表
   export const URL_MESSAGES_USERID = '/message/userId'
