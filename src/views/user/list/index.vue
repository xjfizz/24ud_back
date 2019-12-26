<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :span="16">
          <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
        </a-col>
        <a-col :sapn="4">
          <a-button type="primary" @click="handleAddUser">添加员工账号</a-button>
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
      >
        <template slot="dept" slot-scope="record">{{record.record.role && record.record.role.dept}}</template>
        <template
          slot="roleName"
          slot-scope="record"
        >{{record.record.role && record.record.role.roleName}}</template>
      </common-table>
    </a-card>
    <form-user :url="url" :row="formContent" :visible="formVisible" @close="handleCloseForm"/>
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
import FormUser from './components/form'

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
      modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      moduleType: {},
      postParams: { ...CONFIG.postParams },
      formVisible: false,
      params: { ...CONFIG.params },
      formContent: {}
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
    handleAddUser() {
      this.formContent = this.postParams
      this.formVisible = true
    },
    handleAction(row, action) {
      const { type } = action
      if (action.type === 'edit') {
        console.log(row)
        this.formContent = row
        this.formVisible = true
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
    CommonModuleFilter,
    FormUser
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
