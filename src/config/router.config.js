/* eslint-disable space-in-parens */
/* eslint-disable indent */
import {
  UserLayout,
  BasicLayout,
  // RouteView,
  BlankLayout,
  PageView
} from '@/layouts'

export const asyncRouterMap = [
  {
    // path: '/',
    // name: 'index',
      path: '/',
      name: 'index',
    component: BasicLayout,
    meta: {
      title: '主页'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        // hidden: true,
        component: () => import('@/views/home'),
        meta: {
          title: '分析',
          icon: 'bar-chart',
          permission: ['Home']
        }
      },
      // 运单
      {
        path: '/order',
        redirect: '/order/index',
        component: PageView,
        meta: {
          title: '运单',
          icon: 'form',
          permission: ['ORDER_LIST', 'ORDER_ADD', 'OrderTransfer']
        },
        children: [
          {
            path: '/order/index',
            name: 'OrderList',
            component: () => import('@/views/order/list'),
            meta: {
              title: '运单列表',
              icon: 'ordered-list',
              keepAlive: true,
              permission: ['ORDER_LIST']
            }
          },
          {
            path: '/order/add',
            name: 'OrderAdd',
            component: () => import('@/views/order/add'),
            meta: {
              title: '添加运单',
              icon: 'form',
              keepAlive: true,
              permission: ['ORDER_ADD']
            }
          },
          {
            path: '/order/transfer',
            name: 'OrderTransfer',
            component: () => import('@/views/order/transfer/'),
            meta: {
              title: '当日达转运',
              icon: 'ordered-list',
              keepAlive: true,
              permission: ['OrderTransfer']
            }
          },
          {
            path: '/order/waybill',
            name: 'Waybill',
            component: () => import('@/views/order/waybill/'),
            meta: {
              title: '面单号段',
              icon: 'ordered-list',
              keepAlive: true,
              permission: ['Waybill']
            }
          }
        ]
      },
      // 客服
      {
        path: '/service',
        component: PageView,
        meta: {
          title: '客服',
          icon: 'customer-service',
          permission: [
            'ComplaintList',
            'ComplaintDetail',
            'ArbitrationList',
            'ArbitrationDetail',
            // 'ArbitrationDetail',
            'ProgressQuery',
            'SignQuery',
            'Record'
          ]
        },
        children: [
          {
            path: '/service/complaint',
            name: 'ComplaintList',
            meta: {
              title: '投诉列表',
              icon: 'info-circle',
              permission: ['ComplaintList']
            },
            component: () => import('@/views/service/complaint')
          },
          {
            path: '/service/arbitration/:id',
            name: 'ComplaintDetail',
            hidden: true,
            component: () => import('@/views/service/complaint/detail'),
            meta: {
              title: '投诉详情',
            //  icon: 'info-circle',
              permission: ['ComplaintDetail']
            }
          },
          {
            path: '/service/arbitration',
            name: 'ArbitrationList',
            component: () => import('@/views/service/arbitration'),
            meta: {
              title: '质控列表',
              icon: 'drag',
              permission: ['ArbitrationList']
            }
          },
          {
            path: '/service/arbitration/:id',
            name: 'ArbitrationDetail',
            hidden: true,
            component: () => import('@/views/service/arbitration/detail'),
            meta: {
              title: '质控详情',
              permission: ['ArbitrationDetail']
            }
          },
          {
            path: '/service/progress',
            name: 'ProgressQuery',
            meta: {
              title: '快件跟踪查询',
              icon: 'zoom-in',
              permission: ['ProgressQuery']
            },
            component: () => import('@/views/service/progress')
          },
          {
            path: '/service/sign',
            name: 'SignQuery',
            meta: {
              title: '签收查询',
              icon: 'zoom-in',
              permission: ['SignQuery']
            },
            component: () => import('@/views/service/sign')
          },
          {
            path: '/service/record',
            name: 'Record',
            meta: {
              title: '平台数据',
              icon: 'line-chart',
              permission: ['Record']
            },
            component: () => import('@/views/service/record')
          }
        ]
      },
      // 快递员
      {
        path: '/courier',
        component: PageView,
        meta: {
          title: '快递员',
          icon: 'user',
          permission: ['CourierList', 'CourierApply' ,'TodayCourier']
        },
        children: [
          {
            path: '/courier',
            name: 'CourierList',
            component: () => import('@/views/courier/manage'),
            meta: {
              title: '快递员管理',
              icon: 'user',
              permission: ['CourierList']
            }
          },
          {
            path: '/courier/apply',
            name: 'CourierApply',
            component: () => import('@/views/courier/apply'),
            meta: {
              title: '骑手申请',
              icon: 'user-add',
              permission: ['CourierApply']
            }
          },
          {
            path: '/courier/today',
            name: 'TodayCourier',
            component: () => import('@/views/courier/today'),
            meta: {
              title: '当日达骑手',
              icon: 'user-add',
              permission: ['TodayCourier']
            }
          }
        ]
      },
      // 结算
      {
        path: '/settlement',
        redirect: '/settlement/quote',
        component: PageView,
        meta: {
          title: '结算',
          icon: 'form',
          permission: ['Quote', 'Total', 'SiteForm', 'Franchisee']
        },
        children: [
          {
            path: '/settlement/quote',
            name: 'Quote',
            component: () => import('@/views/settlement/quote'),
            meta: {
              title: '计价规则',
              keepAlive: true,
              icon: 'money-collect',
              permission: ['Quote']
            }
          },
          {
            path: '/settlement/finance',
            name: 'Total',
            component: () => import('@/views/settlement/finance'),
            meta: {
              title: '财务报表',
              icon: 'money-collect',
              keepAlive: true,
              permission: ['Total']
            }
          },
          {
            path: '/settlement/pool',
            name: 'SiteForm',
            component: () => import('@/views/settlement/pool'),
            meta: {
              title: '网点报表',
              icon: 'money-collect',
              keepAlive: true,
              permission: ['SiteForm']
            }
          },
          {
            path: '/settlement/franchisees',
            name: 'Franchisee',
            component: () => import('@/views/settlement/franchisees'),
            meta: {
              title: '加盟商',
              icon: 'solution',
              keepAlive: true,
              permission: ['Franchisee']
            }
          }
        ]
      },
      // 系统
      {
        path: '/system',
        redirect: '/system/auth',
        component: PageView,
        meta: {
          title: '系统',
          icon: 'setting',
          permission: ['SystemAuthRole', 'SystemAuthStructure', 'SystemApp', 'SITE_MANAGE']
        },
        children: [
          {
            path: '/system/role',
            name: 'SystemAuthRole',
            component: () => import('@/views/system/auth/role'),
            meta: {
              title: '角色管理',
              keepAlive: true,
              icon: 'trademark',
              permission: ['SystemAuthRole']
            }
          },
          {
            path: '/system/structure',
            name: 'SystemAuthStructure',
            // hidden: true,
            component: () => import('@/views/system/auth/structure'),
            meta: {
              title: '组织架构',
              keepAlive: true,
              icon: 'cluster',
              permission: ['SystemAuthStructure']
            }
          },
          {
            path: '/system/siteManage',
            name: 'siteManage',
            // hidden: true,
            component: () => import('@/views/system/auth/siteManage'),
            meta: {
              title: '巴枪账号管理',
              keepAlive: true,
              icon: 'user-add',
              permission: ['SITE_MANAGE']
            }
          },
          {
            path: '/system/app',
            hidden: true,
            name: 'SystemApp',
            component: () => import('@/views/system/app/version'),
            meta: {
              title: 'APP管理',
              keepAlive: true,
              icon: 'android',
              permission: ['SystemApp']
            }
          }
        ]
      },
      // 运营
      {
        path: '/operation',
        component: PageView,
        meta: {
          title: '运营',
          icon: 'folder',
          permission: ['AreaMap', 'Transport', 'VehiclesTransport', 'driveTimeSet']
        },
        children: [
          {
            path: '/operation/area',
            name: 'AreaMap',
            component: () => import('@/views/operation/area'),
            meta: {
              title: '网点区域分配',
              icon: 'compass',
              keepAlive: true,
              permission: ['AreaMap']
            }
          },
          {
            path: '/operation/transport',
            name: 'Transport',
            component: () => import('@/views/operation/transport'),
            meta: {
              title: '运输单位管理',
              icon: 'shop',
              keepAlive: true,
              permission: ['Transport']
            }
          },
          {
            path: '/operation/vehicles',
            name: 'VehiclesTransport',
            component: () => import('@/views/operation/vehicles'),
            meta: {
              title: '车辆管理',
              icon: 'car',
              keepAlive: true,
              permission: ['VehiclesTransport']
            }
          },
            {
                path: '/operation/driveTimeSet',
                name: 'driveTimeSet',
                component: () => import('@/views/operation/driveTimeSet'),
                meta: {
                    title: '班车时间设置',
                    icon: 'compass',
                    keepAlive: true,
                    // permission: ['driveTimeSet']
                }
            },
        ]
      },
      // 消息
      {
        path: '/message',
        component: PageView,
        redirect: '/message/notice',
        meta: {
          title: '消息',
          icon: 'bell',
          permission: ['MessageAffiche', 'AfficheForm', 'MessageNotice','detail']
        },
        children: [
          {
            path: '/message/affiche',
            name: 'MessageAffiche',
            component: () => import('@/views/message/affiche'),
            meta: {
              title: '公告管理',
              icon: 'snippets',
              permission: ['MessageAffiche']
            }
          },
          {
            path: '/message/affiche/form',
            name: 'AfficheForm',
            hidden: true,
            component: () => import('@/views/message/affiche/form'),
            meta: {
              title: '公告编辑',
              permission: ['AfficheForm']
            }
          },
            {
                path: '/message/detail/detail',
                name: 'detail',
                component: () => import('@/views/message/detail/detail'),
               // hidden: true,
                meta: {
                    title: '系统详情',
                    permission: ['detail']
                }
            },
          {
            path: '/message/notice',
            name: 'MessageNotice',
            component: () => import('@/views/message'),
            meta: {
              title: '系统消息',
              icon: 'sound',
              permission: ['MessageNotice']
            }
          }
        ]
      },
      {
        path: '/moneyManage',
        name: 'moneyManage',
        // hidden: true,
        component: () => import('@/views/moneyManage'),
        meta: {
          title: '钱包',
          icon: 'pay-circle',
          permission: ['money-manage']
        }
      },
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {

    path: '/user',
    component: UserLayout,
   // redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import( /* webpackChunkName: "user" */ '@/views/user/Register')
      // },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () => import( /* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      // }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/home')
      }
    ]
  },

  // {
  //   path: '/404',
  //   component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  // }
]
