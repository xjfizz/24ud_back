<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :span="16">
          <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
        </a-col>
        <a-col :sapn="4">
          <a-button type="primary" @click="handleAddForm">新增</a-button>
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
      ></common-table>
    </a-card>
    <transport-form :url="url" :row="formContent" :visible="formVisible" @close="handleCloseForm"/>
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'
import TransportForm from './components/form'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from './config'
import Storage from 'store2'

export default {
  name: 'Quote',
  data() {
    return {
      url: CONFIG.url,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      // modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      postParams: { ...CONFIG.postParams },
      formVisible: false,
      params: { ...CONFIG.params },
      formContent: { ...CONFIG.postParams }
    }
  },

  computed: {
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
  methods: {
    handleEditForm(row) {
      this.formContent = row
      this.formVisible = true
    },
    handleAddForm() {
      this.formContent = this.postParams
      this.formVisible = true
    },
    handleAction(row, action) {
      const { type } = action
      if (action.type === 'edit') {
        this.handleEditForm(row)
      }
    },
    handleCloseForm() {
      this.formVisible = false
    }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    TransportForm,
    CommonModuleFilter
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
