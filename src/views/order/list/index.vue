<template>
  <div class="app-content">
  <a-card>

      <a-row>
        <a-col class="category-list">
          <a-button-group>
            <a-button
              v-for="item in getCategories()"
              :key="item.value"
              :type="item.value===currentCate.value ? 'primary':'default'"
              @click="handleCateChange(item)"
            >{{ item.label }}
            </a-button>
          </a-button-group>
        </a-col>
        <a-col :sm="19" :xs="24">
          <common-module-filter :setting="setting"  @change-module="handleModuleChange"></common-module-filter>
        </a-col>
        <a-col :sm="5" :xs="24">
          <router-link to="/order/add">添加运单</router-link>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item v-for="item in excelList" :key="item.label">
                <a-button @click="handleBatchAction(item)">
                  <a-icon :type="item.icon"/>
                  {{ item.label }}
                </a-button>
              </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>

          <a-button style="margin-left: 8px" @click="printPdf()">打印</a-button>

        </a-col>
      </a-row>
      <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
    </a-card>
    <a-card>
      <common-table
         ref="table"
        :columns="columns"
        @proxy-action="handleAction"
        @selectedRowKeys="handleListenSelectRows"
        :url="url"
        :params="siteParam"
        :operations="operations"
        :options="setting.tableConfig"
        :interceptorsRequest="interceptorsRequest"
        :interceptorsResponse="interceptorsResponse"
      >
         <template slot="receiver" slot-scope="record">
           <p class="overSty">{{record.record.receiver}}</p>
       </template>
       <template slot="receiverAddress" slot-scope="record">
           <p class="overSty">{{record.record.receiverAddress}}</p>
       </template>
      </common-table>
    </a-card>
    <common-detail
      :row="detailContent"
      :config="setting"
      :visible="detailVisible"
      @close="handleCloseDetail"
    ></common-detail>
    <order-modify
      ref="modify"
      :row="detailContent"
      :orderIds="orderIds"
      :url="url"
      :action="orderAction"
      :visible="modifyVisible"
      @close-form="orderFormSubmitClose"
      @close="orderFormClose"
    />
    <order-export
      :rows="dataSource"
      :columns="columns"
      :rowKeys="selectRowKeys"
      :visible="exportVisible"
      @close="handleCloseExport"
    />

    <OrderImport :visible="importVisible" @close="handleCloseImport"/>

    <pickup-form
      v-if="pickupVisible"
      :url="url_pick"
      :row="detailContent"
      :orderIds="orderIds"
      :visible="pickupVisible"
      @close="handleClosePick"
    />
  </div>
</template>

<script>
  import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'
  import { URL_ORDERS_WAYBILL, QUESTION_LIST } from '@/api/url'
  import { mapGetters } from 'vuex'
  import CommonDetail from '@/components/common-detail' // 订单详情
  import OrderModify from '../components/order-modify' // 订单状态改变
  import PickupForm from '../components/pickup-form' // 指定取件员
  import OrderExport from '../components/form-export' // 导出订单
  import OrderImport from '../components/form-import' // 导入订单
  import Storage from 'store2'
  // 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
  import ModuleMixin from '@/mixins/module'
  import { getPdfUrl, printPdf } from '@/api/manage'
  import * as CONFIG from 
  '../config'

  export default {
    name: 'OrderList',
    data() {
      return {
        categories: [...CONFIG.CATEGORY],
        currentCate: CONFIG.CATEGORY[0],
        url: CONFIG.url,
        url_jsd: CONFIG.url_jsd,
        url_pick: URL_ORDERS_WAYBILL + '/scan',
        configFilters: [...CONFIG.options],
        columns: [...CONFIG.columns],
        columns_JSD: [...CONFIG.columns_JSD],
        operations: { ...CONFIG.operations },
        params: { ...CONFIG.params },
        batchList: [
          { label: '批量导入', icon: 'upload', action: 'import' },
          { label: '批量导出', icon: 'download', action: 'export' }
        ],
        detailVisible: false,
        detailContent: {},
        modifyVisible: false,
        exportVisible: false,
        importVisible: false,
        dataSource: [],
        selectRowKeys: [],
        importLoading: false,
        orderIds: [], // 订单id
        orderAction: {}, // 订单操作
        orderBatch: false, // 订单是否批量操作
        pickupVisible: false // 指派取件员
      }
    },
    computed: {
     ...mapGetters(['isNewMessage', 'isClickMessage']),
      setting() {
        const childrenFilters = this.currentCate.children
        const { modules, CATEGORY, ...ARGS } = CONFIG
        const { children, ...args } = modules
        const defaultValue = this.currentCate.value === 1 ? 2 : 1
        const childrens = children.filter(item => childrenFilters.includes(item.value))
        const CurrentModule = {
          ...args,
          defaultValue,
          children: childrens
        }
        return {
          ...ARGS,
          modules: CurrentModule
        }
      },
      siteParam() {
        const u = Storage.get('login_user')
        const sp = { ...this.params }
        if (u.siteIds) {
          for (let i = u.siteIds.length - 1; i >= 0; i--) {
            if (u.siteIds[i] !== null && u.siteIds[i] !== '') {
              sp.orgId = u.siteIds[i]
              break
            }
          }
        }
        return sp
      },
      excelList() {
        const { state } = this.params
        const { batchList } = this
        return state === 2 ? batchList : batchList.filter(item => item.action !== 'import')
      }
    },
    watch: {
      currentCate() {
        this.params = { ...this.params,  }
      },
      moduleType() {
        this.params = { ...this.params, ...this.moduleType }
      },
      isNewMessage(newValue, oldValue) {
          console.log('isNewMessage', newValue, oldValue)
         //  this.$refs.table.fetch()
      },
      isClickMessage(newValue, oldValue) {
          console.log('isClickMessage', newValue, oldValue)
          this.params.wbNo = newValue
          this.handleCateChange({value:1,label: '当日达', children:[1,2,3,4,5,6,7,8,9,10,51,0]})
          
          setTimeout(() =>{
            this.$refs.table.fetch({wbNo: newValue,state: 1})
          },1000)
           
      }
    },
    methods: {

      clicktest() {
        console.log('setting', this.setting)
      },
      handleCateChange(e) {
        this.currentCate = e
        console.log(e)
       const category = e.value
        this.url = category === 1 ? CONFIG.url : CONFIG.url_jsd
       // this.columns = category === 1 ? this.columns : this.columns_JSD
        console.log(this.url, this.columns)
      },
      getCategories() {
        // const u = Storage.get('login_user')
        // console.log('u', u)
        // u.role = {category: 1}
        //  console.log(u)
        // if (u.role.category == 0) {
        //   console.log('this.categories', this.categories)
        //   return this.categories
        // } else if (u.role.category == 1) {
        //   // this.params.category = .value
        //   this.handleCateChange(this.categories[0])
        //   console.log('this.categories', [this.categories[0]])
        //   return [this.categories[0]]
        // } else {
        //   this.handleCateChange(this.categories[1])
        //   console.log('this.categories', [this.categories[1]])
        //   return [this.categories[1]]
        // }
        // console.log('this.categories', this.categories)
        return this.categories
      },
      printPdf() {
        const ids = this.selectRowKeys
        const zs = this
        if (ids!=null && ids.length>0) {
          getPdfUrl(ids).then(rs => {
            console.log(rs.data)
            const hide = zs.$message.loading('正在打印', 0)
            printPdf(rs.data.data).then(rs => {
              console.log(rs)
              hide()
              zs.$message.success(rs)
            }).catch(e => {
              hide()
              zs.$message.error('打印失败：请启动打印服务')
            })
          })
        }else {
          zs.$message.error('请选择要打印的面单')
        }
      },
      handleBatchAction(item) {
        const { action } = item
        if (action === 'export') {
          const { selectRowKeys } = this
          if (!selectRowKeys.length) {
            this.$message.warn('请先选择需要导出的数据项')
            return
          }
          this.exportVisible = true
        } else {
          console.log(item)
          this.importVisible = true
        }
      },
      handleAction(row, action, batch) {
         console.log(row, action, batch, ModuleMixin)

     // 比较当前站点和目的站点是否一致
        let userInfo = JSON.parse(localStorage.getItem('login_user'))
        // batch === true 批量操作
        const { type, modify } = action
        this.orderAction = action
        console.log(row, action, batch, ModuleMixin)
        if (batch) {
          // todo 批量操作
        //  this.detailContent = {}
          this.orderIds = row
          this.modifyVisible = true
          // this.pickupVisible = true
        } else {
          if (type === 'detail') {
            this.detailContent = row
            this.viewDetails(row)
          } else if (modify) {
            // 进入modify
            if(action.type == 'transferOutStorage') {
              row.transferState = 1
            } else{
               row.transferState = 0
            }
            this.modifyAction(row)
          } else if (type === 'pickup') {
            console.log(row)
            this.detailContent = row
           if(row.logs) {
               let logs = row.logs
                if(logs[logs.length - 1].courierId) {
              return this.$message.warning(`当前订单已经${logs[logs.length - 1].detail}`)
            }
            }
            // 指定取件员
           //  this.detailContent = {}
            this.orderIds = Array.isArray(row) ? row : [row.id]
            this.pickupVisible = true
          } else if (type === 'revoke') {
            this.passQuestion(row)
          }
        }
      },
      passQuestion(row) {
        let {id, ...prop} = row
        let params = {
         id,
         
         ...prop,
         questionStatus: 1,
        }
         this.$http
              .put(`${QUESTION_LIST}`, params)
              .then(res => {
               if(res.data.code === 200) {
               console.log('this.questionList', this.questionList)
               this.$refs.table.fetch()
               }
                
              })
              // eslint-disable-next-line handle-callback-err
              .catch(error => this.$message.error('系统错误，请稍后再试'))
      },
      handleListenSelectRows(rowkeys, dataSource) {
        console.log('rowkeys', rowkeys, dataSource)
        this.selectRowKeys = rowkeys
        this.dataSource = dataSource
      },
      viewDetails(row) {
        this.detailVisible = true
     //  this.detailContent = row
       console.log('row',row)
       
      },
      modifyAction(row) {
        this.modifyVisible = true
        console.log('row',row)
        this.detailContent = row
        this.$refs.modify.setGoodsWeight(row)
      },
      handleCloseDetail() {
        this.detailVisible = false
      },
      orderFormSubmitClose() {
        this.modifyVisible = false
        this.params = { ...this.params }
      },
      orderFormClose() {
        this.modifyVisible = false
      },
      handleCloseExport() {
        this.exportVisible = false
      },
      handleCloseImport() {
        this.importVisible = false
        this.$refs.table.fetch()
      },
      interceptorsRequest(data) {
        console.log(data)
        const { state } = data
       if (state === 5) {
          data.transfer = 1
        } else if(state === 0) {
          data.state = null
        }
        if(state === 51) {
          data.state = 5
          data.transfer = 0
        }
        // if(state === 3) {
        //   data.transfer = 1 // 待运输
        // }
        //if(state === 4) {
          //data.transfer = 1 运输中
       // }
        return data
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
        return source
      },
      handleClosePick() {
        this.pickupVisible = !this.pickupVisible
        this.params = { ...this.params }
      },
      handleModuleChange(modules, options, columns, operations) {
        console.log(modules, options, columns, operations)
        this.detailContent.state = modules.state
        if(modules.state == 0) {
          this.detailContent.state = null
        //  this.url = QUESTION_LIST
         // this.columns = CONFIG.columns_question
         modules.state = 99
          console.log('this.columns',   this.columns )
        } else {
          this.url = this.currentCate.value === 1 ? CONFIG.url : CONFIG.url_jsd
          // debugger
        }

        // 及时达状态 [11,12, 13, 14,15,16, 17,0]
        if(modules.state === 11) {
          modules.state = 1
        } else if(modules.state === 12) {
          modules.state = 2
        }else if(modules.state === 13) {
          modules.state = 3
        }else if(modules.state === 14) {
          modules.state = 4
        }else if(modules.state === 15) {
          modules.state = 5
        }else if(modules.state === 16) {
          modules.state = 6
        }else if(modules.state === 17) {
          modules.state = 7
        }
        // if(modules.state === 51) {
        //   modules.state = 5
        // }

        this.moduleType = {
          ...modules
        }
        this.params = {
          ...modules
        }
        this.configFilters = []
        this.columns = []
        this.$nextTick(() => {
          this.configFilters = options
          this.columns = columns
        })
        this.operations = operations
        
        console.log('this.detailContent', this.detailContent)

      },
    },
    mixins: [ModuleMixin],
    components: {
      CommonOptionFilter,
      CommonTable,
      CommonOperation,
      CommonDialog,
      CommonModuleFilter,
      CommonDetail,
      OrderModify,
      OrderExport,
      PickupForm,
      OrderImport
    }
  }
</script>

<style scoped lang='less'>
  .category-list {
    margin: 10px 0;
  }

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
