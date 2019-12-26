<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :span="16">
          <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
        </a-col>
        <a-col :sapn="4">
          <a-button type="primary">新建版本</a-button>
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
    <common-dialog :visible="dialogVisible" @close="handleCloseModal" :width="700"></common-dialog>
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
import FormQuote from './components/formquote'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from './config'

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
      moduleType: {},
      postParams: { ...CONFIG.postParams },
      dialogVisible: false,
      params: { ...CONFIG.params },
      modalOptions: {
        modal: 'form-quote',
        title: '',
        values: {}
      }
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
    handleAddFormQuote(e, module) {
      const { type, value } = e
      this.postParams[module.field] = value
      this.modalOptions = {
        ...this.modalOptions,
        modal: 'form-quote',
        type,
        title: `添加报价 / ${e.label}`
      }
      console.log(this.modalOptions)
      this.dialogVisible = true
    },
    handleSetMoney() {
      this.modalOptions = {
        ...this.modalOptions,
        modal: 'money',
        title: '费项类型设置'
      }
      this.dialogVisible = true
    },
    handleEditForm(row) {
      const { field } = this.modules
      const value = row[field]
      this.postParams[field] = value
      console.log(row)
      this.modalOptions = {
        modal: 'form-quote',
        mode: 'edit',
        values: row,
        title: `修改报价 / ${this.moduleCate[value]}`
      }
      this.dialogVisible = true
    },
    handleAction(row, action) {
      const { type } = action
      if (action.type === 'edit') {
        this.handleEditForm(row)
      }
    },
    handleCloseModal() {
      this.dialogVisible = false
    }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    FormQuote,
    CommonModuleFilter,
    CommonTime
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
