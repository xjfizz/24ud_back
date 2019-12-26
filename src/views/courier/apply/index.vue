<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="20" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
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
    <apply-form :row="applyContent" :url="url_edit_select" :visible="formVisible" @close="handleCloseModal"/>
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'
import ApplyForm from './components/form'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from './config'

export default {
  name: 'Quote',
  data() {
    return {
      url: CONFIG.url,
      url_edit: CONFIG.url_edit,
      url_edit_select: CONFIG.url_edit_select,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      moduleType: {},
      postParams: { ...CONFIG.postParams },
      params: { ...CONFIG.params },
      formVisible: false,
      applyContent: {}
    }
  },
  computed: {
    moduleCate() {
      const { children } = this.modules
      return children.reduce((cate, item) => ((cate[item.value] = item.label), cate), {})
    },
    isApplyShow() {
      console.log(this.params)
      return this.params.category === 1
    }
  },
  watch: {
    moduleType() {
      this.params = { ...this.params, ...this.moduleType }
    }
  },
  methods: {
    handleAction(row, action) {
      console.log(row)
      this.applyContent = row
       this.formVisible = true
    },
    handleCloseModal() {
      this.formVisible = false
    }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    ApplyForm,
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
