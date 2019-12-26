<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="19" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
        </a-col>
        <a-col :sm="5" :xs="24">
          <router-link to="/order/add">添加运单</router-link>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item v-for="item in batchList" :key="item.label">
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
        </a-col>
      </a-row>
      <div v-if="params.state === 5" class="switch-transfer">
        <a-radio-group @change="handleSwitchTransfer" defaultValue="0" buttonStyle="solid">
          <a-radio-button value="0">待派件出库</a-radio-button>
          <a-radio-button value="1">待转运出库</a-radio-button>
        </a-radio-group>
      </div>
      <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
    </a-card>
    <a-card>
      <common-table
        :columns="columns"
        @proxy-action="handleAction"
        @selectedRowKeys="handleListenSelectRows"
        :url="url"
        :params="params"
        :operations="operations"
        :options="setting.tableConfig"
        :interceptorsRequest="interceptorsRequest"
        :interceptorsResponse="interceptorsResponse"
      ></common-table>
    </a-card>
    <common-detail
      :row="detailContent"
      :config="setting"
      :visible="detailVisible"
      @close="handleCloseDetail"
    ></common-detail>
    <order-modify
      :row="detailContent"
      :orderIds="orderIds"
      :url="url"
      :siteList="siteListTree"
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
      :url="url"
      :row="detailContent"
      :orderIds="orderIds"
      :visible="pickupVisible"
      @close="handleClosePick"
    />
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'

import CommonDetail from '@/components/common-detail' // 订单详情
import OrderModify from '../components/order-modify' // 订单状态改变
import PickupForm from '../components/pickup-form' // 指定取件员
import OrderExport from '../components/form-export' // 导出订单
import OrderImport from '../components/form-import' // 导入订单

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from '../config'
import { mapGetters } from 'vuex'

export default {
  name: 'order-list',
  data() {
    return {
      currentCate: CONFIG.Timely[0],
      url: CONFIG.url,
      configFilters: [...CONFIG.options],
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      dialogVisible: false,
      params: { ...CONFIG.params },
      batchList: [
        { label: '批量导入', icon: 'upload', action: 'import' },
        { label: '批量导出', icon: 'download', action: 'export' }
      ],
      detailVisible: false,
      detailContent: {},
      modifyVisible: false,
      exportVisible: false,
      dataSource: [],
      selectRowKeys: [],
      importVisible: false,
      isOut: false,
      orderIds: [], // 订单id
      orderAction: {}, // 订单操作
      orderBatch: false, // 订单是否批量操作
      pickupVisible: false // 指派取件员
    }
  },
  computed: {
    ...mapGetters(['siteId', 'siteListTree', 'siteTree']),
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
    }
  },
  watch: {
    moduleType() {
      this.params = { ...this.params, ...this.moduleType, category: this.currentCate.value, transferState: 0 }
    }
  },
  methods: {
    handleCateChange(e) {
      this.currentCate = e
      const category = e.value
      const state = category === 1 ? 2 : 1
      this.params = { category, state }
    },
    handleBatchAction(item) {
      const { action } = item
      if (action === 'export') {
        const { selectRowKeys } = this
        if (!selectRowKeys.length) {
          return this.$message.warn('请先选择需要导出的数据项')
        }
        this.exportVisible = true
      } else {
        this.importVisible = true
      }
    },
    handleModuleChange(modules, options, columns, operations) {
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
      this.isOut = false
      this.operations = operations
    },
    handleAction(row, action, batch) {
      // batch === true 批量操作
      const { type, modify } = action
      this.orderAction = action
      if (batch) {
        // todo 批量操作
        this.detailContent = {}
        this.orderIds = row
        this.modifyVisible = true
        // this.pickupVisible = true
      } else {
        if (type === 'detail') {
          this.viewDetails(row)
        } else if (modify) {
          // 进入modify
          this.modifyAction(row)
        } else if (type === 'pickup') {
          // 指定取件员
          this.detailContent = {}
          this.orderIds = Array.isArray(row) ? row : [row.id]
          this.pickupVisible = true
        }
      }
    },
    handleListenSelectRows(rowkeys, dataSource) {
      this.selectRowKeys = rowkeys
      this.dataSource = dataSource
    },
    viewDetails(row) {
      this.detailVisible = true
      this.detailContent = row
    },
    modifyAction(row) {
      this.modifyVisible = true
      this.detailContent = row
    },
    handleCloseModal() {
      this.dialogVisible = false
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
    },
    interceptorsRequest(params) {
      console.log('params')
      console.log(params)
      const { state, transferState } = params
      if (state === 5 && transferState === 1) {
        // params.currentSiteId = null
        params.currentSiteId = this.siteId
      } else {
        if (state === 6) {
          params.transferState = 1
        }
        params.nextSiteId = this.siteId
      }
      return params
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
    handleUploadchange(event) {
      const { status } = event.file
      if (status === 'done') {
        this.$message.success('导入成功')
      } else if (status === 'uploading ') {
        // todo
      }
    },
    handleClosePick() {
      this.pickupVisible = !this.pickupVisible
      this.params = { ...this.params }
    },
    handleSwitchTransfer(e) {
      const transferState = +e.target.value
      this.params = { ...this.params, transferState }
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
    OrderModify,
    OrderExport,
    PickupForm,
    OrderImport
  }
}
</script>

<style scoped lang='less'>
.switch-transfer {
  margin-bottom: 10px;
}
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
.module-active {
  background: #1890ff;
  border-color: #1890ff;
  color: #fff;
}
</style>
