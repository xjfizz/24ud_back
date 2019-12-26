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
<!--            <a-cascader-->
<!--              :allowClear="true"-->
<!--              expandTrigger="hover"-->
<!--              style="width: 300px;"-->
<!--              slot="sites"-->
<!--              placeholder="选择所属站点"-->
<!--              :options="siteListTree"-->
<!--              @change="onChangeSite"-->
<!--            />-->
<!--             <a-select placeholder="选择所属区域" slot="area" :options="areas" style="width: 150px;"/>-->
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
        ref="table"
        :columns="columns"
        @proxy-action="handleAction"
        :url="urlToday"
        :params="siteParam"
        :operations="operations"
        :options="setting.tableConfig"
        :interceptorsResponse="interceptorsResponse"
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
      :joinList = "joinList"
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
import { URL_SYSTEM_AUTH_STRUCTURE_ALL ,FRANCHISEE} from '@/api/url'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入

import ModuleMixin from '@/mixins/module'
import { mapState, mapGetters } from 'vuex'
import Storage from 'store2'

import * as CONFIG from './config'
import { parse } from 'path'
export default {
  name: 'CourierMange',
  data() {
    return {
      url: CONFIG.url,
      url_js: CONFIG.url_js,
      urlToday: CONFIG.urlToDay,
      urlJSD: CONFIG.urlJSD,
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
      id2labels: {}, // id和label的映射
      type: 1, // 当日达/即时达,
      joinList: [],// 加盟商列表
    }
  },
  filters: {
    formatId2Label(id, labels) {
      return id ? labels[id] : '--'
    }
  },
  computed: {
    ...mapGetters(['siteListTree', 'siteList', 'siteListTreeAll']), // todo
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
      console.log('sp', sp)
     // delete sp.type
     this.type = sp.type
      let params = JSON.parse(JSON.stringify(sp))
      console.log('sp', sp, params)
       delete params.type
       console.log('params', params)
      if(sp.type == 0) {
        this.urlToday =  CONFIG.urlToDay
        this.operations = { ...CONFIG.operationsDay }
        let data = JSON.parse(JSON.stringify(params))
        data.state = params.stateDay
        delete data.stateDay
        return data
      } else if(sp.type == 1) {
        this.urlToday = CONFIG.url_js
        return params
      }

    },

  },
  mounted() {
    console.log('siteListTree',mapGetters, this.siteListTree,this.siteList, this.siteListTreeAll)
    // this.$http.get(URL_SYSTEM_AUTH_STRUCTURE_ALL).then(res => {
    //   const [all] = res.data
    //   this.sites = this.formatData(all.children)
    // })
    this.sites = this.formatData(this.siteListTreeAll)
    this.getJoinList()
    setTimeout( () => {
      console.log('this.sites', this.sites)
    },500)

  },
  methods: {
       interceptorsResponse(data) {
         let source = data
         if(this.type == 0 ) {
          source = data.map(row => {
          const { state, ...props } = row
          return {
            ...props,
           stateDay: state
          }
        })
         }
        console.log('response', this.type, source)
        return source
      },
    handleViewDetail(row) {
      this.detailContent = row
      this.detailVisible = true
    },
    formatData(data) {
      return data.map(item => {
        const { name, level, id } = item
        console.log('item', item)
        let children = []
        if (level !== 4) {
          children = this.formatData(item.children || [])
        } else {
          console.log('item.children-------', item.children)
          this.allAreas[id] = this.formatArea(item.children || [])
          setTimeout( () => {
            console.log('allAreas',this.allAreas)
          },500)
        }
        this.id2labels[id] = name
        return {
          label: name,
          id,
          value: id,
          children
        }
      })
    },

     handleFilterChange(params) {
   
      const {
        setting: optionsConfig
      } = this
      let primaries = {}
      if (optionsConfig.isprimary) {
        primaries = this.filterPrimary(optionsConfig)
      }
       console.log('params', params, primaries, this.params)
       if(params.name) {
         delete this.params.phone
       } else if(params.phone) {
          delete this.params.name
       }
      this.params = {
         ...primaries,
        ...this.params,
        ...params
      }
        console.log(this.params);
    },

    formatArea(data) {
      console.log('data', data)
      return data.map(item => {
        const { id, name } = item
        this.id2labels[id] = name
        return {
          value: id,
         label: name
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
      console.log(row,action)
      
      let { type, state } = action
      if(row.stateDay == 0 || row.stateDay) {
        this.url = CONFIG.url
     
      } else {
        this.url = CONFIG.urlJSD
      }
      if (type === 'detail') {
        this.handleViewDetail(row)
      } else if (type === 'edit') {
        const { type } = row
        const [category] = this.modules.children.filter(item => item.value === type)
        console.log(this.params);
        this.formContent = { ...row, category, type: this.params.type }
        this.formVisible = true
      } else if (type === 'stop' || type === 'restart' || type === 'enable') {
        //const  id  = row
        



        this.$confirm({
          title: `提示:`,
          content:`确认${action.title}此账号【${row.name}】?`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
          this.$http.put(this.url,  row ).then(res => {
            if(res.data.code == 200) {
               row.state = state
               row.stateDay = state
               this.$message.success('操作成功')
             // this.reload()
            } else {
               this.$message.success(res.data.message)
            }

        })

          },
          onCancel: () =>{
            console.log('Cancel');
          },
        });


      }
    },
    handleCloseForm() {
      this.formVisible = false
      console.log('this.siteParam', this.siteParam, this.formContent)
      this.$refs.table.fetch(this.siteParam)
      // this.urlToday =  this.urlToday
      // this.handleModuleChange()
    },
    handleCloseDetail() {
      this.detailVisible = false
    },



      // 获取加盟商列表
    getJoinList() {
      let user = JSON.parse(localStorage.getItem('login_user'))
      let params = {
        oid: user.orgId
      }

      let that = this
      this.$http.get(`${FRANCHISEE}?oid=${params.oid}`,).then( res => {

        if(res.data.code == 200) {
         
         let joinList = that.joinTransfer(res.data.data)
         that.joinList = joinList
    
         console.log('joinList', joinList)
     
        } else{
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log('错误', error)
      })
    },
    // 加盟商数据
    joinTransfer(data) {
     let list =  this.joinListHandle(data)
        console.log('list', list)
        return list
    },
    joinListHandle(data) {
      data.map(item => {
        this.$set(item, 'label', item.orgName)
        this.$set(item, 'value', item.orgId)
        this.$set(item, 'key', item.orgId)
          if(item.children) {
                 this.joinTransfer(item.children)
          } else {
            item.children = []
          }
      })
      return data
   
    },

    // handleModuleChange(value) {
    //   console.log(value);
    // }
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
