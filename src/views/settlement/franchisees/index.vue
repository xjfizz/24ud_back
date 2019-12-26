<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="2" :xs="24" v-if="isApplyShow">
          <a-button type="primary">申请列表</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="20">
          <!-- <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter> -->
        </a-col>
        <!-- <a-col :span="2">
          <a-button style="margin-left: 8px" @click="handleAddForm">添加加盟商</a-button>
        </a-col> -->
      </a-row>
    </a-card>
    <a-card>
      <common-table
        :columns="columns"
        @proxy-action="handleAction"
        :url="url"
        :params="params"
        :operations="operations"
        :options="setting.tableConfig"
        :isPage="false"
        :interceptorsResponse="interceptorsResponse"
      >
        <template slot="district" slot-scope="record">
          <!-- <a-button>
          {{ record.record.districts.length }}
          </a-button>-->
          <a-popover title="区域范围">
            <template slot="content">
              {{ record.record.districts.join('-') }}
            </template>
            <a-button>{{ record.record.districts.length }}</a-button>
          </a-popover>
        </template>


        <template slot="orgCity" slot-scope="record">
          <a-tag color="blue"    v-if="record.record.orgCity == 1" >已设置</a-tag>
          <a-tag color="pink"    v-if="record.record.orgCity == 0" >未设置</a-tag>
       </template>
      </common-table>
    </a-card>
    <courier-form
      :url="url"
      :row="formContent"
      :sites="siteListTree"
      :allAreas="allAreas"
      :visible="formVisible"
      @close="handleCloseForm"
    />
    <courier-detail
      :id2labels="id2labels"
      :row="detailContent"
      :visible="detailVisible"
      @close="handleCloseDetail"
    />
  </div>
</template>

<script>
import {
  CommonOptionFilter,
  CommonTable,
  CommonOperation,
  CommonDialog,
  CommonModuleFilter,
  CommonTime
} from '@/components'
import CourierForm from './components/form'
import CourierDetail from './components/detail'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入

import ModuleMixin from '@/mixins/module'
import { mapState, mapGetters } from 'vuex'

import * as CONFIG from './config'
import { get } from 'http'
export default {
  name: 'CourierMange',
  data() {
    return {
      url: CONFIG.url,
      url_add: CONFIG.url,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      postParams: { ...CONFIG.postParams },
      formVisible: false,
       params: {
         oid:JSON.parse(localStorage.getItem('login_user')).orgId
         },
      formContent: { ...CONFIG.postParams },
      detailVisible: false,
      detailContent: {}, // 详情数据
      areas: [], // 所有区域
      allAreas: {}, // 站点id-区域[]的映射
      sites: [], // 所有站点
      id2labels: {} // id和label的映射
    }
  },
  filters: {
    formatId2Label(id, labels) {
      return id ? labels[id] : '--'
    }
  },
  computed: {
    ...mapGetters(['siteListTree']), // todo
    isApplyShow() {
      return this.params.type === 1
    },
    // params() {
    //   let orgId = JSON.parse(localStorage.getItem('login_user')).orgId

    //   return{
    //     oid: orgId
    //   }
    // }
  },
  methods: {
    handleViewDetail(row) {
      this.detailContent = row
      this.detailVisible = true
    },
    formatData(data) {
      return data.map(item => {
        const { label, level, id } = item
        let children = []
        if (level !== 3) {
          children = this.formatData(item.children || [])
        } else {
          this.allAreas[id] = this.formatArea(item.children || [])
        }
        this.id2labels[id] = label
        return {
          label: label,
          id,
          value: id,
          children
        }
      })
    },
    formatArea(data) {
      return data.map(item => {
        const { id, label } = item
        this.id2labels[id] = label
        return {
          value: id,
          label
        }
      })
    },
    onChangeSite(e, option) {
      const branches = e.slice().pop() || ''
      this.params = { ...this.params, branches }
    },
    handleAddForm() {
      this.formContent = { ...this.postParams }
      this.formVisible = true
    },
    handleAction(row, action) {
      console.log(row,action)
      const { type, state } = action
      if (type === 'edit') {
        this.formContent = { ...row }
        this.formVisible = true
        // this.handleViewDetail(row)
      }
    },
    handleCloseForm() {
      this.formVisible = false
    },
    handleCloseDetail() {
      this.detailVisible = false
    },
       interceptorsResponse(data) {
        let list =  []
  
      list = this.listHandle(data)
      console.log('data',data, list)
      return list
    

    },

    // 数据处理
    listHandle(data) {
      let that = this
         data.forEach(item => {
            if(item.todays) {
             
             item.orgCity = 1
           
            } else {
              item.orgCity = 0
            }
            if(item.children) {
               that.listHandle(item.children)
             }
          })
         return data
     
    },
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    CourierForm,
    CommonModuleFilter,
    CourierDetail
  },
  inject: ['reload']
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
