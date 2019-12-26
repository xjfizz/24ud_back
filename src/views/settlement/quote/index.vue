<template>
  <div class="app-content">
    <a-card>
      <a-row v-show="false">
        <a-col :sm="16" :xs="24">
          <common-module-filter :setting="setting" @change-module="handleModuleChange"></common-module-filter>
        </a-col>
        <a-col :sm="8" :xs="24">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="item in modules.children"
                :key="item.label"
                @click="handleAddFormQuote(item)"
              >{{ item.label }}</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              添加报价
              <a-icon type="down"/>
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
      <common-option-filter :options="configFilters" @change="handleFilterChange">
        <!-- <a-select
          slot="city"
          style="width:200px"
          :options="cityList"
          :allowClear="true"
          placeholder="请选择城市"
          @change="handleChangeCity"
        />
        <a-select
          slot="district"
          style="width:200px"
          :options="districtList"
          :allowClear="true"
          placeholder="请先选择区域"
          @change="handleChangeDistrict"
        ></a-select> -->
      </common-option-filter>
    </a-card>
    <a-card>
      <common-table
        :columns="columns"
        @proxy-action="handleAction"
       :url="url"
        :params="params"
        :operations="operations"
        :options="setting.tableConfig"
        :isPage="false"
        :interceptorsResponse="interceptorsResponse"
      >
        <!-- 拼接的字段在主业务页面插入 -->
        <!-- <template
          slot="region"
          slot-scope="record"
        >{{record.record.city}} {{record.record.district}}</template>

        <template slot="time" slot-scope="record">
          <CommonTime :row="record.record"></CommonTime>
        </template> -->
  
          
        <template slot="orgCity" slot-scope="record">
          <a-tag color="blue"    v-if="record.record.orgCity == 1" >已设置</a-tag>
          <a-tag color="pink"    v-if="record.record.orgCity == 0" >未设置</a-tag>
       </template>
      </common-table>
    </a-card>
    <form-detail
      :cityList="cityList"
      :districtCityList="districtCityList"
      :url="url_add"
      :row="formContent"
      :visible="formVisible"
      @close="handleCloseForm"
    />
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation, CommonModuleFilter, CommonTime } from '@/components'
import FormDetail from './components/form'
import { mapGetters } from 'vuex'

// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'


import * as CONFIG from './config'

export default {
  name: 'Quote',
  data() {
    return {
      url: CONFIG.url,
      url_add: CONFIG.url_add,
      setting: { ...CONFIG },
      configFilters: [...CONFIG.options],
      modules: { ...CONFIG.modules },
      columns: [...CONFIG.columns],
      options:[...CONFIG.options],
      operations: { ...CONFIG.operations },
      moduleType: {},
      postParams: { ...CONFIG.postParams },
      dialogVisible: false,
      params: { ...CONFIG.params },
      formContent: {},
      formVisible: false,
      districtList: []
    }
  },
  computed: {
    ...mapGetters(['siteList', 'nickname']),
    cityList() {
      const city = this.siteList
        .filter(item => item.level === 1)
        .map(item => {
          const { id, city } = item
          return {
            ...item,
            label: city,
            value: city
          }
        })
      return city
    },
    districtCityList() {
      const list = {}
      this.cityList.forEach(item => {
        const { city, children, ...props } = item
        list[city] = {
          city,
          ...props,
          children: children.map(it => {
            const { id, city } = it
            return {
              ...it,
              label: city,
              value: city
            }
          })
        }
      })
      return list
    },
    moduleCate() {
      const { children } = this.modules
      return children.reduce((cate, item) => ((cate[item.value] = item.label), cate), {})
    }
  },
  watch: {
    moduleType() {
      let user = JSON.parse(localStorage.getItem('login_user'))
      let oid = user.orgId
      this.params = { ...this.params, ...this.moduleType, oid }
      delete this.params.category
    }
  },
  methods: {

    handleAddFormQuote(e) {
      const category = e.value
      this.formContent = { ...this.postParams, category }
      this.formVisible = true
    },
    handleAction(row, action) {
      const { type } = action
      if (action.type === 'edit') {
        this.formContent = row
        this.formVisible = true
      }
    },
    handleCloseForm() {
      this.formVisible = false
    },
    handleChangeCity(id) {
      this.districtList = id ? this.districtCityList[id].children : []
      this.params = {...this.params, city: id}
    },
    handleChangeDistrict(district) {
      this.params = {...this.params, district}
    },
   interceptorsResponse(data) {
        let list =  []
  
      list = this.listHandle(data)
      console.log('data',data, list)
      return list
    

    },

    // 数据处理
    listHandle(data) {
      let that = this
         data.forEach(item => {
            if(item.todays) {
             
             item.orgCity = 1
           
            } else {
              item.orgCity = 0
            }
            if(item.children) {
               that.listHandle(item.children)
             }
          })
         return data
     
    },
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    CommonModuleFilter,
    CommonTime,
    FormDetail
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
