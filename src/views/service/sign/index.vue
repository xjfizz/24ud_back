<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="19" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
        </a-col>
      </a-row>
      <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
    </a-card>
    <a-card>
      <common-table
        :columns="columns_sign"
        @proxy-action="handleAction"
        :url="url"
        :params="siteParam"
        :operations="operations"
        :options="setting.tableConfig"
      >
       <template slot="receiverAddress" slot-scope="record">
           <p class="overSty">{{record.record.receiverAddress}}</p>
       </template>
       <template slot="receiver" slot-scope="record">
         <p class="overSty">
           {{record.record.receiver}}
         </p>
       </template>
      </common-table>
      
      </common-table>
    </a-card>
    <common-detail
      :row="detailContent"
      :config="detailSetting"
      :visible="detailVisible"
      @close="handleCloseDetail"
    ></common-detail>

    <order-modify
      :row="detailContent"
      :orderIds="orderIds"
      :url="setting.url"
      :action="orderAction"
      :visible="modifyVisible"
      @close-form="orderFormSubmitClose"
    @close="orderFormClose"
    />
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'
import OrderModify from '@/views/order/components/order-modify'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'
import CommonDetail from '@/components/common-detail' // 订单详情
import { ORDER_TODAY, ORDER_JSD } from '@/api/url'
import Storage from 'store2'

import * as CONFIG from '@/views/order/config'
const { siginModules, modules, ...props } = CONFIG
const Setting = { modules: siginModules, ...props }

export default {
  name: 'Quote',
  data() {
    console.log("CONFIG",CONFIG)
    return {
      userInfo:{},
      url: ORDER_TODAY,
      setting: { ...Setting },
      detailSetting: { ...CONFIG },
      configFilters: [...Setting.options],
      modules: { ...Setting.siginModules },
      columns: [...Setting.columns],
      operations: { ...Setting.operations },
      moduleType: {},
      dialogVisible: false,
      params: { ...Setting.params },
      detailContent: {},
      detailVisible: false,
      modifyVisible: false,
      orderAction: {},
      orderIds: [],
      columns_sign:[
        {
          title: '序号',
          width: '50',
          customRender:(text,record,index)=>`${index+1}`,
        },
        {
          dataIndex: 'tdNo',
          title: '订单编号',
          width: '100'
        },
        {
          dataIndex: 'startOrgName',
          title: '寄件网点',
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
          dataIndex: 'deliver',
          title: '派件员',
          width: '280'
        },
        {
          dataIndex: 'receiver',
          title: '收件人姓名',
          width: '280',
          slot:true
        },
        {
          dataIndex: 'receiverPhone',
          title: '收件人电话',
          width: '280'
        },
        {
          dataIndex: 'receiverAddress',
          title: '收件地址',
          width: '280',
          slot:true
        },
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
          title: '操作',
          dataIndex: 'operations',
          // fixed: 'right',
          slot: true
        }
      ]
    }
  },
  computed: {
    moduleCate() {
      const { children } = this.modules
      return children.reduce((cate, item) => ((cate[item.value] = item.label), cate), {})
    },
    siteParam() {
      const u = Storage.get('login_user')
      const sp = { ...this.params }
      if (u.siteIds) {
        for (let i = u.siteIds.length - 1; i >= 0; i--) {
          if (u.siteIds[i] !== null && u.siteIds[i] !== '') {
          //  sp.querySiteId = u.siteIds[i]
            break
          }
        }
      }
      console.log('sp',sp)
      if(sp.category == 1) {
        this.url = ORDER_TODAY
      }else if(sp.category == 2) {
        this.url = ORDER_JSD
      }
      let {category,...prop} = sp
      let params = {
        state:7,
        ...prop
      }
      return {...params, orgId: u.orgId}
    }
  },
  created() {
    this.userInfo = localStorage.getItem('login_user')
  },
  methods: {
    handleAction(row, action, batch) {
      this.orderAction = action
      const { type } = action
      console.log(action)
      if (type === 'sign') {
        this.modifyVisible = true
        this.detailContent = row
      } else {
        if (type === 'detail') {
          this.viewDetails(row)
        } else {
          this.detailContent = row
          this.detailVisible = true
        }
      }
    },

    viewDetails(row) {
      this.detailVisible = true
      this.detailContent = row
      console.log('row', row)
    },
    handleCloseDetail() {
      this.detailVisible = false
    },
    interceptorsResponse(data) {
      const source = data.map(row => {
        const { charges = {}, transportation = {}, accident = {}, ...props } = row
        return {
          ...props,
          ...transportation,
          ...charges,
          ...accident,
          charges,
          transportation,
          accident
        }
      })
      return []
    },
    orderFormClose() {
      this.modifyVisible = false
    },
    orderFormSubmitClose() {
      this.modifyVisible = false
      this.params = { ...this.params }
    }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    CommonModuleFilter,
    CommonDetail,
    OrderModify
  }
}
</script>

<style scoped lang='less'>
.selection-module {
  display: inline-block;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  &.active {
    background: #409eff;
    color: #fff;
  }
}
</style>
