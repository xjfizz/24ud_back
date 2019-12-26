<!--
 * @Author: your name
 * @Date: 2019-11-22 17:32:52
 * @LastEditTime: 2019-12-07 23:59:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\views\settlement\finance\index.vue
 -->
<template>
  <div>
    <a-card>
      <a-range-picker @change="onChange" :ranges="ranges"/>
    </a-card>
    <a-card class="app-content">
      <common-table
        :columns="columns"
        :url="url"
        :params="siteParam"
        :options="options"
        :interceptorsResponse="interceptorsResponse"
      >
        <template slot="index" slot-scope="record">{{record.record.index}}</template>
      </common-table>
    </a-card>
  </div>
</template>

<script>
import { CommonTable } from '@/components'
import { URL_SETTLEMENT_FINANCE } from '@/api/url'
import * as CONFIG from './config'
import moment from 'moment'
import Storage from 'store2'

export default {
  name: 'Record',
  data() {
    return {
      columns: CONFIG.columns,
      url: CONFIG.url,
      params: CONFIG.params,
      options: CONFIG.tableConfig,
      ranges: { "今天": [moment(), moment()], '当月': [moment(), moment().endOf('month')] },
      dataSource: []
    }
  },
  computed:{
    siteParam() {
        const u = Storage.get('login_user')
        const sp = { ...this.params, orgId:u.orgId }
        
        return sp
    }

  },
  methods: {
    interceptorsResponse(data) {
        let list =  []
  
      list = this.listHandle(data)
      console.log('data',data, list)
      return list
    
      // return data.map((item, index) => {
      //   const { id } = item
      //   return {
      //     key: id,
      //     index: ++index,
      //     ...item
      //   }
      // })
    },

    // 数据处理
    listHandle(data) {
      let that = this
         data.forEach(item => {
            if(item.level < 3) {
             
             item.timelyCount = '--'
             item.timelyTotal = '--'
             item.todaysCount = '--'
             item.todaysTotal = '--'
            }
            if(item.children) {
               that.listHandle(item.children)
             }
          })
         return data
     
    },

    onChange(e) {
      const [startTime, endTime] = e.map(item => item.format('YYYY-MM-DD'))
      this.params = { createTimeStart:startTime, createTimeEnd:endTime }
     //this.siteParam = {}
    }
  },
  components: {
    CommonTable
  }
}
</script>

<style scoped lang='less'>
.app-content {
  margin-top: 20px;
}
</style>
