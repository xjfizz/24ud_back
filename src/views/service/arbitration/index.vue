<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="16" :xs="24">
          <a-radio-group buttonStyle="solid" v-model="rgVal">
            <a-radio-button value="1">投诉网点</a-radio-button>
            <a-radio-button value="2">被投诉网点</a-radio-button>

          </a-radio-group>
        </a-col>
      </a-row>
      <a-row>
        <a-col :sm="21" :xs="24">
          <!-- <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter> -->
          <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>
        </a-col>
        <!-- <a-col :sm="3" :xs="24">
          <a-button @click="handleSetMoney">投诉类型设置</a-button>
        </a-col> -->
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
        <!-- 拼接的字段在主业务页面插入 -->
        <!-- <template slot="time" slot-scope="record">
          <CommonTime :row="record.record"></CommonTime>
        </template>-->
        <template slot="operator" slot-scope="row">
          <!-- <CommonTime :row="record.record"></CommonTime> -->
          <span>{{row.record.logs[row.record.logs.length-1].user}}</span>
        </template>
      </common-table>
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

  // 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
  import ModuleMixin from '@/mixins/module'
  import Storage from 'store2'

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
        },
        rgVal: '1'
      }
    },
    watch: {
      moduleType() {
        this.params = { ...this.params, ...this.moduleType }
      }
    },
    computed: {
      siteParam() {
        const u = Storage.get('login_user')
        const sp = { ...this.params }
        if (u.siteIds) {
          let querySiteId
          for (let i = u.siteIds.length - 1; i >= 0; i--) {
            if (u.siteIds[i] !== null && u.siteIds[i] !== '') {
              querySiteId = u.siteIds[i]
              break
            }
          }
          if (this.rgVal == 1) {
            sp.complainantId = querySiteId
          } else {
            sp.respondentId = querySiteId
          }
        }

        return sp
      }
    },
    methods: {
      handleAddFormQuote(e, module) {
        const { type, value } = e
        this.dialogVisible = true
      },
      handleSetMoney() {
      },
      handleAction(row, action) {
        const { type } = action
        if (action.type === 'detail') {
          this.$router.push({
            path: `/service/arbitration/${row.id}`
          })
        }
      },
      changeRg(e) {

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
