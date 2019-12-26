<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :span="16">
          <common-option-filter :options="configFilters" @change="handleFilterChange">
<!--            <a-select-->
<!--              allowClear-->
<!--              @change="handleChangeDept"-->
<!--              placeholder="选择所属部门"-->
<!--              slot="deptName"-->
<!--              :options="deptNames"-->
<!--              style="width: 150px;"-->
<!--            />-->
          </common-option-filter>
        </a-col>
        <a-col :sapn="4">
          <a-button style="margin-right: 5px;" type="primary" @click="handleAddFormRole">新增角色</a-button>
<!--          <a-button type="primary" @click="handleAddDept">部门管理</a-button>-->
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <common-table
        :columns="columns"
        @proxy-action="handleAction"
        @delete="delate"
        :url="url"
        :params="params"
        :operations="operations"
        :options="setting.tableConfig"
        ref="table"
      ></common-table>
    </a-card>
    <form-role
      :treeData="treeData"
      :url="url"
      :deptNames="deptNames"
      :permissionTree="permissionTree"
      :permissions="permissions"
      :row="formContent"
      :visible="formVisible"
      @close="handleCloseForm"
    />
<!--    <form-depart-->
<!--      :url="dep_url"-->
<!--      :row="departments"-->
<!--      :visible="departmentVisible"-->
<!--      @refetch="handleFetch"-->
<!--      @close="handleAddDept"-->
<!--    />-->
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonModuleFilter } from '@/components'
import { URL_SYSTEM_AUTH_DEPARTMENT, URL_SYSTEM_AUTH_PERMISSION, ROLE_REMOVE } from '@/api/url'
import FormRole from './components/form'
import FormDepart from './components/depart-form'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from './config'

export default {
  name: 'depart-form',
  data() {
    return {
      url: CONFIG.url,
      urlList:CONFIG.depListUrl,
      dep_url: URL_SYSTEM_AUTH_DEPARTMENT,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      postParams: { ...CONFIG.postParams },
      formVisible: false,
      params: { ...CONFIG.params },
      formContent: {},
      treeData: [],
      departmentVisible: false,
      departments: [],
      deptNames: [],
      permissionTree: [],
      permissions: {}
    }
  },
  computed: {
    moduleCate() {
      const { children } = this.modules
      return children.reduce((cate, item) => ((cate[item.value] = item.label), cate), {})
    }
  },
  mounted() {
   // this.getDepartment()
    this.getPerssion()
  },
  methods: {
    handleAddFormRole() {
      this.formContent = this.postParams
      this.formVisible = true
    },
    handleAction(row, action) {
      console.log(row,action)
      const { type } = action
      if (action.type === 'edit') {
        this.formContent = row
        this.formVisible = true
      } else if(action.type == 'delete') {
        //Todo
        this.handleRole(row)
      }
    },
    // 删除角色
    handleRole(row) {
      let params ={
        id: row.roleId
      }
        this.$http.delete(`${ROLE_REMOVE}/${params.id}`).then(res => {
          if(res.data.code === 200) {
            this.$refs.table.fetch()
            this.$message.success(res.data.message)
          } else {
            this.$message.success(res.data.message)
          }
      })
    },
    handleCloseForm() {
      this.formVisible = false
    },
    handleAddDept() {
      this.departmentVisible = !this.departmentVisible
    },
    handleFetch() {
      this.getDepartment()
    },
    getDepartment() {
      this.$http.get(URL_SYSTEM_AUTH_DEPARTMENT).then(res => {
        const { data } = res
        this.departments = data
        this.deptNames = data.map(item => {
          const { id, deptName } = item
          return {
            value: deptName,
            label: deptName
          }
        })
      })
    },
    getPerssion() {
      this.$http.get(URL_SYSTEM_AUTH_PERMISSION).then(res => {
        console.log(res)
        if(res.data.code == 200) {
          this.permissionTree = this.formatTreeData(res.data.data)
          console.log(this.permissionTree)
        }

      })
    },
    handleChangeDept(e) {
      this.params = { ...this.params, dept: e }
    },
    formatTreeData(data) {
      return data.map(item => {
        const { authorityId, name, children } = item
        let kids = []
        if (children) {
          this.permissions[authorityId] = { ...item } // 有子父权限增加
          kids = this.formatTreeData(children)
        } else {
          this.permissions[authorityId] = { ...item }
        }
        return {
          title: name,
          key: authorityId,
          value: authorityId,
          ...item,
          children: kids
        }
      })
    },
    // 单项删除
    delate(value) {
      console.log('delate', value)
      this.$http.delete(`${this.url}/${value.roleId}`)
        .then(res => {
          this.fetch()
          this.$message.success('删除成功！')
        })
        .catch(error => {
          this.$message.error('操作失败，请稍后再试')
        })
    }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    FormRole,
    CommonModuleFilter,
    FormDepart
  }
}
</script>

<style scoped lang='less'>
</style>
