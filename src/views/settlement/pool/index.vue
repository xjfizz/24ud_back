<template>
  <div >
    <div class="app-content">
      <a-card>
        <a-row>
          <!-- <a-col :sm="4">
            <a-input addonBefore="网点编号"  style="width: 200px"
                     defaultValue="" v-model="params.no" @pressEnter="noPressEnter"/>
          </a-col> -->
          <a-col :sm="4" style="margin-left: 5px">
            <a-range-picker @change="onChange" :ranges="ranges"/>
          </a-col>
        </a-row>


      </a-card>
      <!--              <a-card>-->
      <!--                <a-row>-->
      <!--                  <a-col :sm="4">-->
      <!--                    <a-input addonBefore="网点编号"  style="width: 200px" defaultValue="" v-model="params.no" @pressEnter="noPressEnter"/>-->
      <!--                  </a-col>-->
      <!--                  <a-col :sm="4">-->
      <!--                  </a-col>-->
      <!--                </a-row>-->

      <!--              </a-card>-->
      <a-card style="margin-top: 10px">

        <a-table :columns="columns" :dataSource="dataSource">
          <!-- <a slot="refundClick" slot-scope="text, record" href="javascript:;" @click="showList(record.refund,'退回件列表')">{{text}}</a>
          <a slot="problemClick" slot-scope="text, record" href="javascript:;" @click="showList(record.problem,'问题件列表')">{{text}}</a>
          <a slot="incompleteClick" slot-scope="text, record" href="javascript:;" @click="showList(record.incomplete,'未完成列表')">{{text}}</a>
          <a slot="completedClick" slot-scope="text, record" href="javascript:;" @click="showList(record.completed,'已完成列表')">{{text}}</a>
          <a slot="complaintClick" slot-scope="text, record" href="javascript:;" @click="showList(record.complaint,'投诉件列表')">{{text}}</a>
          <a slot="cancelClick" slot-scope="text, record" href="javascript:;" @click="showList(record.cancel,'取消件列表')">{{text}}</a> -->

        <a class="hover_sty" slot="refundClick" slot-scope="text, record" href="javascript:;" @click="showList(record.refund,'退回件列表')">{{text}}</a>
        <a class="hover_sty" slot="problemClick" slot-scope="text, record" href="javascript:;" @click="showList(record.abnormal,'问题件列表')">{{text}}</a>
        <a class="hover_sty" slot="incompleteClick" slot-scope="text, record" href="javascript:;" @click="showList(record.todo,'未完成列表')">{{text}}</a>
        <a class="hover_sty" slot="completedClick" slot-scope="text, record" href="javascript:;" @click="showList(record.done,'已完成列表')">{{text}}</a>
        <a class="hover_sty" slot="complaintClick" slot-scope="text, record" href="javascript:;" @click="showList(record.complaint,'投诉件列表')">{{text}}</a>
        <a class="hover_sty" slot="cancelClick" slot-scope="text, record" href="javascript:;" @click="showList(record.cancel,'取消件列表')">{{text}}</a>

        </a-table>

      </a-card>
    </div>
    <div style="width: 100px">
      <show-list
        style="width: 600px"
        :list="list"
        :title="listTitle"
        :visible="listVisible"
        @close="handleCloseList"
      />
<!--      <show-list-->
<!--        style="width: 600px"-->

<!--        :visible="true"-->
<!--      />-->
    </div>


  </div>

</template>

<script>
import { CommonTable } from '@/components'
import ShowList from './components/list'
import * as CONFIG from './config'
import moment from 'moment'
import ARow from 'ant-design-vue/es/grid/Row'
import Storage from 'store2'

// const columnsActions = CONFIG.columns.filter(item => typeof item.slot === 'boolean')
// console.log(columnsActions)
const mapTitle = {
 // done: '完成件',
 // todo: '未完成件',
 // complaint: '投诉件',
//  refund: '退回件',
 // abnormal: '问题件',
  //cancel: '取消件'
}

export default {
  name: 'Record',
  data() {
    return {
      columns: [
        {
          title: '查看单位',
          dataIndex: 'orgName'
        },
        {
          title: '快递员',
          dataIndex: 'courierName'
        },
        // {
        //   title: '退回件',
        //   dataIndex: 'refundCount',
        //   scopedSlots: {
        //     customRender: 'refundClick'
        //   }
        // },
        {
          title: '问题件',
          dataIndex: 'abnormalCount',
          scopedSlots: {
            customRender: 'problemClick'
          }
        },
        {
          title: '未完成',
          dataIndex: 'todoCount',
          scopedSlots: {
            customRender: 'incompleteClick'
          }
        },
        {
          title: '已完成',
          dataIndex: 'doneCount',
          scopedSlots: {
            customRender: 'completedClick'
          }
        },
        // {
        //   title: '投诉件',
        //   dataIndex: 'complaintCount',
        //   scopedSlots: {
        //     customRender: 'complaintClick'
        //   }
        // },
        {
          title: '取消件',
          dataIndex: 'cancelCount',
          scopedSlots: {
            customRender: 'cancelClick'
          }
        },
        // {
        //   title: '欠款',
        //   dataIndex: 'generationOfCharge'
        // },
        // {
        //   title: '总数',
        //   dataIndex: 'totalCount'
        // },
        // {
        //   title: '完成率',
        //   dataIndex: 'completedRate'
        // }
      ],
      url: CONFIG.url,
      // columnsActions,
      params: CONFIG.params,
      options: CONFIG.tableConfig,
      ranges: { 今天: [moment(), moment()], 当月: [moment(), moment().endOf('month')] },
      dataSource: [{}],
      list: [],
      listVisible: false,
      listTitle: '',
      timeId: null

    }
  },
  filters: {
    formatNumber(list) {
      return list ? list.length : 0
    }
  },
  created() {
    this.loadData()
  //  this.times()
  },
  destroyed(){
    clearTimeout(this.timeId)
  },
  methods: {
    getLastSite(){
      const u = Storage.get('login_user')
      if(u.siteIds){
        for (let i = u.siteIds.length; i >= 0; i--) {
          if (u.siteIds[i] != '' && u.siteIds[i] != null){
            return u.siteIds[i]
          }
        }
      }
    },
    loadData(){

      this.$http.get(this.url + `?siteCode=${this.params.no}
      &startTime=${this.params.startTime}&endTime=${this.params.endTime}&orgId=${this.getLastSite()}`).then(res => {
        if(res.data.code == 200) {
          this.deepTree(res.data.data)
          // console.log(res.data)
          console.log(this.dataSource)
        }
      })
    },
    times(){
      const it = this
      this.timeId  = setTimeout(function () {
        it.loadData()
        it.times()
      },3000)
    },
    noPressEnter(){
      this.loadData()
    },
    // deepTree(data) {

    //   this.dataSource = data
    //     .map(it=>{
    //       return {
    //         ...it,
    //         refundCount:0,
    //         problemCount:0,
    //         incompleteCount:0,
    //         completedCount:0,
    //         complaintCount:0,
    //         cancelCount:0,
    //         generationOfCharge:it.generationOfCharge == null ? 0 : it.generationOfCharge,
    //         totalCount:it.totalCount == null ? 0 : it.totalCount,
    //         completedRate:it.completedRate == null ? '0%' : it.completedRate,

    //       }
    //     })
    //     .filter(item => item.level === 3)
    //     .map(item => {
    //       const { id, pid, label, ...props } = item
    //       var ch = []
    //       if(item.courierList != null) {
    //         ch = item.courierList.map( it => {
    //           Object.keys(it).forEach(key => {
    //             if (Array.isArray(it[key])) {
    //               it[key + 'Count'] = it[key].length
    //             }
    //           })
    //           return {
    //             key: it.id,
    //             name: it.name,
    //             ...it
    //           }
    //         })
    //       }

    //       Object.keys(item).forEach(key => {
    //         if (Array.isArray(item[key])) {
    //           item[key + 'Count'] = item[key].length
    //         }
    //       })
    //       return {
    //         key: id,
    //         title: label,
    //         children: ch,
    //         ...item
    //       }
    //     })
    // },

     deepTree(data) {
    //  let { orgId, pid, orgName, ...props } = item
      console.log('data',data)
      data.forEach(item => {
         this.$set(item, 'key', item.orgId)
          this.$set(item, 'courierName', '-')
          this.$set(item, 'todoCount','-')
          this.$set(item, 'doneCount', '-')
          this.$set(item, 'abnormalCount', '-')
          this.$set(item, 'cancelCount', '-')
        if(item.courierList) {
          item.courierList.forEach(item1 => {
            this.$set(item1, 'key', item1.courierId)
         
            this.$set(item1, 'todoCount', item1.todo ? item1.todo.length : 0)
            this.$set(item1, 'doneCount', item1.done  ? item1.done.length : 0)
            this.$set(item1, 'abnormalCount', item1.abnomal  ? item1.abnormal.length : 0)
            this.$set(item1, 'cancelCount',  item1.cancel  ? item1.cancel.length : 0)
          })
           item.children  = item.courierList
        }
       })
       console.log('data', data)
       this.dataSource = data
    
        
    },

    interceptorsResponse(data) {
      return data.map((item, index) => {
        const { id } = item
        return {
          key: id,
          index: ++index,
          ...item
        }
      })
    },
    onChange(e) {
      const [startTime, endTime] = e.map(item => item.format('YYYY-MM-DD'))
      this.params = { startTime, endTime }
    },
    showList(list, title) {
      console.log(this.list)
      if(list && list.length) {
        this.list = list
        this.listTitle = title
        console.log('-----------------------------')
        console.log(this.list)
        this.listVisible = true
      }else{
        this.$message.warn(`暂无数据`)

      }
    },
    handleCloseList() {
      this.listVisible =  false
    }
  },
  components: {
    ARow,
    CommonTable,
    ShowList
  }
}
</script>

<style scoped lang='less'>
.app-content {
  margin-top: 20px;
}
.show {
  color: #1890ff;
}
.hover_sty{
  color: #1890ff
}
</style>
