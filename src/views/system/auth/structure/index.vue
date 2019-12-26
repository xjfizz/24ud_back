<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :span="6">
          <StructureList @select="handleSelectSite"/>
        </a-col>
        <a-col :span="16" :offset="1">
          <a-row>
            <a-row class="hd">
              <a-col :span="10">
                <common-option-filter :options="setting.options" @change="handleFilterChange"></common-option-filter>
              </a-col>
              <a-col :span="4" :offset="8">
                <a-button type="primary" @click="handleAddUser">添加员工账号</a-button>
              </a-col>
            </a-row>
            <a-col>
              <common-table
                :columns="columns"
                @proxy-action="handleAction"
                :url="url"
                :params="params"
                :operations="operations"
                :options="setting.tableConfig"
              >
                <template
                  slot="dept"
                  slot-scope="record"
                >{{record.record.role && record.record.role.dept}}</template>


                  <template
                  slot="status"
                  slot-scope="record"
                >
                 <a-switch :checked="record.record.status" checkedChildren="启用" unCheckedChildren="禁用" @change="startOrDisable(record.record)" />
                 <!-- @change="handlOrder" -->
                </template>
                <template
                  slot="roleName"
                  slot-scope="record"
                >{{record.record.role && record.record.role.roleName}}</template>
              </common-table>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <form-user :url="url" :row="formContent" :visible="formVisible" @close="handleCloseForm"/>
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonDialog, CommonModuleFilter } from '@/components'
import { CHANGE_ACCOUNT_STATUS } from '@/api/url'

import FormUser from './components/form-user'
import StructureList from './components/structure'
import FormMixis from '@/mixins/form'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'
import { mapGetters } from 'vuex'

import * as CONFIG from './config'

export default {
  name: 'Structure',
  data() {
    return {
      url: CONFIG.url,
      setting: { ...CONFIG },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      postParams: { ...CONFIG.postParams },
      formVisible: false,
      params: { ...CONFIG.params },
      formContent: {},
      userInfo:{}
    }
  },
  computed: {
    ...mapGetters(['siteTree']),
    moduleCate() {
      const { children } = this.modules
      return children.reduce((cate, item) => ((cate[item.value] = item.label), cate), {})
    },
    isApplyShow() {
      return this.params.category === 1
    }
  },
  created() {
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
  },
  methods: {
    handleAddUser() {
      this.formContent = this.postParams
      this.formVisible = true
    },
    handleAction(row, action) {
      const { type } = action
      if (action.type === 'edit') {
        this.formContent = row
        this.formVisible = true
      } else if(action.type === 'restart') {

          let that = this
          this.$confirm({
          title: `提示:`,
          content:`确认${action.title}此账号【${row.username}】?`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
             that.reStart(row)
          },
          onCancel: () =>{
            console.log('Cancel');
          },
        });
      } else if(action.type === 'disable') {

      }
    },
    startOrDisable(row) {
           let that = this
          let title = '启用'
           switch(row.status) {
             case true: 
              title = '禁用';
              break;
              case false:
                title = '启用';
                break;
           }
          this.$confirm({
          title: `提示:`,
          content:`确认${title}此账号【${row.username}】?`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
             that.reStart(row)
          },
          onCancel: () =>{
            console.log('Cancel');
          },
        });
    },
    // 启用账号
    reStart(row) {
      let params = {
        userId: row.userId,
        operateOrgId: this.userInfo.orgId
      }

      this.$http.put(CHANGE_ACCOUNT_STATUS, params).then( res => {
        if(res.data.code === 200) {
          row.status = !row.status
          this.$message.success(res.data.message)
       } else{
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log('错误', error)
      })

    },
    handleCloseForm() {
      this.formVisible = false
    },
    handleSelectSite(orgId) {
      console.log('ji', orgId)
      if (orgId) {
       this.params = { orgId }
      }
    },
    onSearch() {},
    handleFilterChange(params) {
          console.log('params11',params,optionsConfig)
        const {
          setting: optionsConfig
        } = this
        let primaries = {}
        if (optionsConfig.isprimary) {
          primaries = this.filterPrimary(optionsConfig)
        }
        this.params = {
          ...primaries,
        // ...this.params,
          ...params
        }
          console.log(this.params);
      },
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonModuleFilter,
    FormUser,
    StructureList
  }
}
</script>

<style scoped lang='less'>
.app-content {
  //min-width: 1400px;
  width: 100%;
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
.hd {
  padding: 10px;
  .offset {
    margin-left: 30px;
  }
}
</style>
