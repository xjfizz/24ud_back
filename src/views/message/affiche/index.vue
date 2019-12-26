<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="16" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
        </a-col>
        <a-col :sm="8" :xs="24">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="item in modules.children"
                :key="item.label"
                @click="handleGoForm(item, modules)"
              >{{ item.label }}</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              添加公告
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
      <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
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
        <template slot="operator" slot-scope="row">
          <!-- <CommonTime :row="record.record"></CommonTime> -->
          <span>{{row.record.logs[row.record.logs.length-1].user}}</span>
        </template>
      </common-table>
    </a-card>

    <!-- <notice-form :visible="dialogVisible" @close="handleCloseModal" :row="detailContent"></notice-form> -->
    <notice-deatil :visible="detailVisible" @close="handleCloseDetail" :row="detailContent"/>
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'

import NoticeForm from './components/form'
import NoticeDeatil from './components/detail'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from './config'

export default {
  name: 'OperationNotice',
  data() {
    return {
      url: CONFIG.url,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      postParams: { ...CONFIG.postParams },
      dialogVisible: false,
      params: { ...CONFIG.params },
      detailVisible: false,
      detailContent: {}
    }
  },
  computed: {
    moduleCate() {
      const { children } = this.modules
      return children.reduce((cate, item) => ((cate[item.value] = item.label), cate), {})
    }
  },
  methods: {
    handleGoForm(e, module) {
      this.$router.push({
        name: 'AfficheForm',
        query: {
          category: e.value
        }
      })
    },
    handleAction(row, action) {
   const { type } = action
      if (type === 'edit') {
        const { id, category } = row
        this.$router.push({
          name: 'AfficheForm',
          query: {
            id,
            category
          }
        })
      } else if (type === 'detail') {
        this.detailVisible = true
        this.detailContent = row
      } else if(type === 'delete'){
         this.delete(row,action)
      } else {
        // 下线 + 发布 要修改的状态放在配置项中
        const { state } = action
        const { id } = row
        this.$http
          .put(this.url, { state, id })
          .then(res => {
            this.reload()
            this.$message.success('操作成功')
          })
          .catch(error => {
            this.$message.error('系统错误，请稍后再试')
          })
      }
    },
    delete(row,action) {
       const { state } = action
        const { id } = row
        let params = [id]
        
        this.$http
          .delete(this.url, { data:params })
          .then(res => {
            this.reload()
            this.$message.success('操作成功')
          })
          .catch(error => {
            this.$message.error('系统错误，请稍后再试')
          })
    },
    handleCloseModal() {
      this.dialogVisible = false
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
    CommonModuleFilter,
    NoticeForm,
    NoticeDeatil
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
