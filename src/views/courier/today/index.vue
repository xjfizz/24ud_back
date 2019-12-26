<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="20" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
        </a-col>
        <!-- <a-col :sm="2" :xs="24" v-if="isApplyShow">
          <a-button type="primary">申请列表</a-button>
        </a-col> -->
      </a-row>
      <a-row>
        <a-col :span="20">
          <common-option-filter :options="configFilters" @change="handleFilterChange">
            <a-cascader
              :allowClear="true"
              expandTrigger="hover"
              style="width: 300px;"
              slot="sites"
              placeholder="选择所属站点"
              :options="siteListTree"
              @change="onChangeSite"
            />
            <!-- <a-select placeholder="选择所属区域" slot="area" :options="areas" style="width: 150px;"/> -->
          </common-option-filter>
        </a-col>
        <a-col :span="2">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="item in modules.children"
                :key="item.label"
                @click="handleAddForm(item)"
              >{{ item.label }}</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              添加账号
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <common-table
        :columns="columns"
        @proxy-action="handleAction"
        :url="url"
        :params="siteParam"
        :operations="operations"
        :options="setting.tableConfig"
      >
        <template
          slot="branches"
          slot-scope="record"
        >{{record.record.courier.branches }}</template>
        <template
          slot="area"
          slot-scope="record"
        >{{record.record.courier.area | formatId2Label(id2labels)}}</template>
        <template slot="money" slot-scope="record">{{record.record.money || '暂无' }}</template>
        <template slot="loginTime" slot-scope="record">{{record.record.loginTime || '从未登录' }}</template>
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
import { URL_SYSTEM_AUTH_STRUCTURE_ALL } from '@/api/url'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入

import ModuleMixin from '@/mixins/module'
import { mapState, mapGetters } from 'vuex'
import Storage from 'store2'

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
    siteParam() {
      const u = Storage.get('login_user')
      const sp = { ...this.params }
      for (let i = u.siteIds.length - 1; i >= 0; i--) {
        if (u.siteIds[i] !== null && u.siteIds[i] !== '') {
          sp.oid = u.siteIds[i]
          break
        }
      }
      return sp
    }
  },
  mounted() {
    this.$http.get(URL_SYSTEM_AUTH_STRUCTURE_ALL).then(res => {
      const [all] = res.data
      this.sites = this.formatData(all.children)
      console.log('this.sites', this.sites)
    })
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
    handleAddForm(item) {
      this.formContent = { ...this.postParams, type: item.value, category: item }
      this.formVisible = true
    },
    handleAction(row, action) {
      const { type, state } = action
      if (type === 'detail') {
        this.handleViewDetail(row)
      } else if (type === 'edit') {
        const { type } = row
        const [category] = this.modules.children.filter(item => item.value === type)
        this.formContent = { ...row, category }
        this.formVisible = true
      } else if (type === 'stop' || type === 'restart') {
        const { id } = row
        this.$http.patch(this.url, { id, state }).then(res => {
          this.reload()
        })
      }
    },
    handleCloseForm() {
      this.formVisible = false
    },
    handleCloseDetail() {
      this.detailVisible = false
    }
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
