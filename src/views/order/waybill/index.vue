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
          <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
<!--          <a-select defaultValue="加盟商名称" style="width: 120px" @change="handleChange">-->
<!--            <a-select-option  v-for="(item, index) in selectArr" :value="item.value" :key="index">{{item.title}}</a-select-option>-->
<!--          </a-select>-->
<!--          <a-input size="small" v-model="searchKey" placeholder="请输入关键字" style="display: inline-block;height: 32px;width: 200px" @pressEnter="pressEnter"/>-->

        </a-col>
        <a-col :span="2">
          <a-button style="margin-left: 8px" @click="handleAddForm">添加面单</a-button>
        </a-col>
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
      ></common-table>
    </a-card>
    <courier-form
      :url="url"
      :row="formContent"
      :sites="siteListTree"
      :allAreas="allAreas"
      :visible="formVisible"
      @close="handleCloseForm"
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
import { URL_ORDERS_WAYBILL} from '@/api/url'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入

import ModuleMixin from '@/mixins/module'
import { mapState, mapGetters } from 'vuex'

import * as CONFIG from './config'
export default {
  name: 'CourierMange',
  data() {
    return {
      url: CONFIG.url,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      postParams: { ...CONFIG.postParams },
      formVisible: false,
      params: { ...CONFIG.params },
      formContent: { ...CONFIG.postParams },
      detailVisible: false,
      detailContent: {}, // 详情数据
      areas: [], // 所有区域
      allAreas: {}, // 站点id-区域[]的映射
      sites: [], // 所有站点
      id2labels: {},// id和label的映射
      selectArr:[
        {
          value: 'franchiseeName',
          title: '加盟商名称'
        },
        // {
        //   value: 'remaining',
        //   title: '剩余面单'
        // },
        {
          value: 'createTime',
          title: '购买时间'
        }
      ],
      searchKey: '',
      selectType: 'franchiseeName',
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
    }
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
    handleChange(value) {
      console.log(`selected ${value}`);
      this.selectType = value
    },
    pressEnter() {
      console.log('---', this.selectType, this.searchKey)
      let data = {
      }
      console.log('URL_COURIER_UPLOAD_FRONT', data)
      this.$http['get'](URL_ORDERS_WAYBILL, data).then( res => {
        if(res.data.code === 200) {
        } else {
          return  this.$message.success('查询失败!')
        }
        console.log(res)
      }).catch(error => {
        console.log('错误')
      })

    }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    CourierForm,
    CommonModuleFilter
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
