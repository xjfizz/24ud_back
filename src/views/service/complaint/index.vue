<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <a-col :sm="16" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
        </a-col>
        <a-col :sm="8" :xs="24">
          <a-button style="margin-left: 8px"
                    @click="handleAddFormQuote()"
          >添加投诉
          </a-button>

          <a-button @click="handleCompalintType">投诉类型设置</a-button>
        </a-col>
      </a-row>
      <common-option-filter :options="configFilters" @change="handleFilterChange">
        <div slot="complaint-type">
          <a-cascader
            expandTrigger="hover"
            :options="compalintType"
            placeholder="投诉类型"
            @change="handleChangeType"
          ></a-cascader>
        </div>
      </common-option-filter>
    </a-card>
    <a-card>
      <common-table
        ref="table"
        :columns="columns"
        @proxy-action="handleAction"
        :url="url"
        :params="siteParam"
        :operations="operations"
        :options="setting.tableConfig"
      >
        <template slot="operator" slot-scope="row">
          <span>{{row | formatUser}}</span>
        </template>
      </common-table>
    </a-card>

    <compalint-form
      :visible="dialogVisible"
      :url="url"
      :compalintType="compalintType"
      @close="handleCloseModal"
      :params="postParams"
    />

    <CompalintType
      :nodes="compalintTypeList"
      :treeData="compalintOriginType"
      :visible="compalintTypeVisible"
      @close="handleCloseType"
      @refetch="fetchType"
    />

       <a-modal
      title="操作备注"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-textarea v-model="remark" placeholder="请输入备注" :rows="4" />
    </a-modal>

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
import CompalintForm from './components/addForm'
import CompalintType from './components/type'
import Storage from 'store2'

import { URL_SERVICE_COMPLAINT_TYPES, URL_SERVICE_COMPLAINT } from '@/api/url'
// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'


import * as CONFIG from './config'

// import * as CONFIG from '@/views/order/config'
// const { siginModules, modules, ...props } = CONFIG
// const Setting = { modules: siginModules, ...props }

export default {
  name: 'Comlaint',
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
      dialogVisible: false,
      params: { ...CONFIG.params },
      compalintType: [],
      compalintOriginType: [],
      compalintTypeList: [],
      compalintTypeVisible: false,
      visible: false,
      confirmLoading: false,
      remark: '',
      userInfo:{},
      content:{},
    }
  },
  watch: {
    moduleType() {
      this.params = { ...this.params, }/* ...this.moduleType  */
    }
  },
  filters: {
    formatUser(row) {
      const logs = row.record.logs || []
      const last = logs.slice().pop() || {}
      return last.user || '---'
    }
  },
  mounted() {
    this.fetchType()
    //this.$refs.table.fetch()
  },
  created() {
    this.fetchType()
    this.userInfo = JSON.parse(localStorage.getItem('login_user'))
   // this.$refs.table.fetch()
  },
  computed: {
    siteParam(){
      let {startTime, endTime, ...props} = this.params
      let params = {
        createTimeStart: startTime || null,
        createTimeEnd: endTime || null,
        ...props
      }
      return params

    },
  },
  methods: {
    handleAddFormQuote(e, module) {
      // const { label, value } = e
      // this.postParams.category = value
      // this.postParams.label = label
      console.log(this.postParams)
      this.dialogVisible = true
    },
    handleCompalintType() {
      this.compalintTypeVisible = true
    },
    handleAction(row, action) {
      const { type } = action
      console.log(action)
      if (action.type === 'detail') {

        this.$store.dispatch('ToggleMultiTab', false)
       this.$router.push({ path: `/service/arbitration/${row.id}` })
      //   this.$router.push({ name: 'Record' })
      } else if(action.type == 'edit') {
        this.content= row
        this.visible = true
      }
    },
    handleCloseModal() {
      this.dialogVisible = false
    },
    fetchType() {
      this.$http.get(URL_SERVICE_COMPLAINT_TYPES).then(res => {
        const { data } = res.data
        this.compalintType = this.formatOriginData(data, false)
        this.compalintOriginType = this.formatOriginData(data)
        this.flatTree()
      })
    },
    handleChangeType(e) {
      console.log('e',e)
      const [type] = e
      this.params = { ...this.params, type: type }
    },
    formatOriginData(data, flag = true) {
      return data.map(item => {
        const temps = item.subComplaintTypes || []
        const childs = flag ? temps : temps.filter(item => item.state === 1)
        const children = this.formatOriginData(childs)
        const { typeName, typeId } = item
        return {
          ...item,
         // children,
          label: typeName,
          value: typeName,
          title: typeName,
          key: typeId,
          slots: { title:typeId }
        }
      })
    },
    flatTree() {
      // 平展数据
      const list = []
      function flat(data) {
        data.forEach(item => {
          const { children = [], ...props } = item
          list.push({ ...props, children })
          if (children.length) {
            flat(children)
          }
        })
      }
      flat(this.compalintOriginType)
      this.compalintTypeList = list
      console.log(list)
    },
    handleCloseType() {
      this.compalintTypeVisible = false
    },

        submit() {
      this.content.state = 3
      let params = {
       complaint:this.content,
       complaintLogs:{
         complaintId:this.content.id,
         logState: 0,
         remark: this.remark,
         userName: this.userInfo.username
       }
      }
      this.$http.put(URL_SERVICE_COMPLAINT, params).then(res => {
      if(res.data.code === 200) {
        this.visible = false
         this.$message.success(res.data.message)
      
      }
    })
    },
    handle() {
      this.visible = true
    },
      handleOk(e) {
       this.submit()
      },
      handleCancel(e) {
          this.visible = false;
      },

  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonDialog,
    CompalintForm,
    CommonModuleFilter,
    CompalintType
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
