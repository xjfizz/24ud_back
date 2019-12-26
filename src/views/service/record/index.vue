<template>
  <div class="app-content">
    <a-card>
      <a-row>
        <!-- <a-col :sm="4">
          <a-input addonBefore="网点编号"   defaultValue="" v-model="query.no" @pressEnter="noPressEnter"/>
        </a-col> -->
        <a-col :sm="4" style="margin-left: 5px">
          <a-date-picker @change="onChangeDate" placeholder="请输入起始时间" />
        </a-col>
      </a-row>

    </a-card>
    <a-card style="margin-top: 10px">
      
      <a-table :rowKey="row=>row.key" :columns="columns" :dataSource="treeData" >
        <a class="hover_sty" slot="refundClick" slot-scope="text, record" href="javascript:;" @click="showList(record.refund,'退回件列表')">{{text}}</a>
        <a class="hover_sty" slot="problemClick" slot-scope="text, record" href="javascript:;" @click="showList(record.abnormal,'问题件列表')">{{text}}</a>
        <a class="hover_sty" slot="incompleteClick" slot-scope="text, record" href="javascript:;" @click="showList(record.todo,'未完成列表')">{{text}}</a>
        <a class="hover_sty" slot="completedClick" slot-scope="text, record" href="javascript:;" @click="showList(record.done,'已完成列表')">{{text}}</a>
        <a class="hover_sty" slot="complaintClick" slot-scope="text, record" href="javascript:;" @click="showList(record.complaint,'投诉件列表')">{{text}}</a>
        <a class="hover_sty" slot="cancelClick" slot-scope="text, record" href="javascript:;" @click="showList(record.cancel,'取消件列表')">{{text}}</a>

      </a-table>

    </a-card>
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
import { URL_SERVICE_RECORD } from '@/api/url'
import ShowList from '@/views/settlement/pool/components/list'

export default {
  name: 'Record',
  data() {
    return {
      query:{
        no: '',
        beginTime:''
      },
      columns: [
        {
          title: '查看单位',
          dataIndex: 'orgName',
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
        }
      ],
      treeData: [],
      list: [],
      listVisible: false,
      listTitle: '',
      timeId: null,
      userInfo:{}

    }
  },
  created() {
    
    this.userInfo = JSON.parse(JSON.stringify('login_user'))
    this.loadData()
    //this.times()
  },
  destroyed(){
    clearTimeout(this.timeId)
  },
  methods: {
    loadData(){
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
      console.log('userInfo',  this.userInfo)
      this.$http.get(URL_SERVICE_RECORD+`?siteCode=${this.query.no}&startTime=${this.query.beginTime}&orgId=${this.userInfo.orgId}`).then(res => {
        if(res.data.code == 200) {
          console.log(res.data)
          this.deepTree(res.data.data)
          console.log(this.treeData)
        }
      })
    },
    times(){
      const it = this
      this.timeId  =setTimeout(function () {
        it.loadData()
        it.times()
      },3000)
    },
    handleAddUser() {
      this.formContent = this.postParams
      this.formVisible = true
    },
    onChangeDate(date,dateString){
      // console.log(dateString);
      this.query.beginTime = dateString
      this.loadData()
    },
    noPressEnter(){
      this.loadData()
    },
    handleModuleChange(){

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
    handleSelectSite(siteIds) {
      this.params = { siteIds }
    }, // 待优化
    // deepTree(data) {
    //   console.log('tree')
    //   data = data.map(it => {
    //     return {
    //       ...it,
    //       refundCount:0,
    //       problemCount:0,
    //       incompleteCount:0,
    //       completedCount:0,
    //       complaintCount:0,
    //       cancelCount:0,
    //     }
    //   })
    //   const level_3 = data
    //     .filter(item => item.level === 4)
    //     .map(item => {
    //       const { orgId, pid, orgName, ...props } = item
    //       var ch = []
    //       if(item.courierList != null) {
    //         ch = item.courierList.map( it => {
    //           Object.keys(it).forEach(key => {
    //             if (Array.isArray(it[key])) {
    //               it[key + 'Count'] = it[key].length
    //               item[key + 'Count'] += it[key].length
    //               if(item[key] == null){
    //                 item[key] = []
    //               }
    //               it[key].forEach(i =>{
    //                 item[key].push(i)
    //               })

    //             }
    //           })
    //           return {
    //             key: it.orgId,
    //             name: it.orgName,
    //             ...it
    //           }
    //         })
    //       }

    //       return {
    //         key: orgId,
    //         title: orgName,
    //         children: ch,
    //         ...item
    //       }
    //     })
    //   const level_2 = data
    //     .filter(item => item.level === 3)
    //     .map(item => {
    //       const { orgId, pid, orgName, level, ...props } = item
    //       const children = level_3.filter(item => item.pid === orgId)

    //       children.forEach(it => {
    //         Object.keys(it).forEach(key => {
    //           if (Array.isArray(it[key])) {
    //             if(item[key] == null) {
    //               item[key] = []
    //             }
    //             item[key + 'Count'] += it[key + 'Count']
    //             // item[key].push(it[key])
    //           }
    //         })
    //       })

    //       // children.forEach(it => {
    //       //   Object.keys(it).filter(k => k.endsWith('Count')).forEach(k => {
    //       //     if(item[k]){
    //       //       item[k] = 0
    //       //     }
    //       //     item[k] += it[k]
    //       //   })
    //       //   // Object.keys(props).forEach(key => {
    //       //   //   // const count = item[key] ? +item[key] : 0
    //       //   //   props[key] = +props[key]
    //       //   //   props[key] += item[key]
    //       //   // })
    //       // })
    //       return {
    //         key: orgId,
    //         title: orgName,
    //         ...item,
    //         children,
    //         ...props
    //       }
    //     })
    //   const level_1 = data
    //     .filter(item => item.level === 2)
    //     .map(item => {
    //       const { orgId, pid, level, orgName, ...props } = item
    //       const children = level_2.filter(item => item.pid === orgId)
    //       // children.forEach(item => {
    //       //   Object.keys(props).forEach(key => {
    //       //     const count = item[key] ? Number() : 0
    //       //     console.log(props[key])
    //       //     props[key] = +props[key]
    //       //     props[key] += item[key]
    //       //   })
    //       // })

    //       return {
    //         key: orgId,
    //         title: orgName,
    //         ...item,
    //         children,
    //         ...props
    //       }
    //     })
    //   this.treeData = data
    //     .filter(item => item.level === 1)
    //     .map(item => {
    //       const { orgId, pid, orgName, level, ...props } = item
    //       const children = level_1.filter(item => item.pid === orgId)

    //       return {
    //         key: orgId,
    //         title: orgName,
    //         children,
    //         ...props
    //       }
    //     })
    //     console.log('this.treeData', this.treeData)
    //   this.treeData.forEach(root => {
    //     root.children.forEach(v1 =>{
    //       v1.children.forEach(v2 =>{
    //         v2.children.forEach(v3 =>{
    //           Object.keys(v3).filter(k3=>k3.endsWith('Count')).forEach(k3=>{
    //             v2[k3] += v3[k3]
    //           })
    //         })
    //         Object.keys(v2).filter(k=>k.endsWith('Count')).forEach(k=>{
    //           v1[k] += v2[k]
    //         })
    //       })
    //       Object.keys(v1).filter(k=>k.endsWith('Count')).forEach(k=>{
    //         root[k] += v1[k]
    //       })
    //       })
    //     })

    // },


     deepTree(data) {
      console.log('tree')
      data.forEach(item0 => {
        this.$set(item0, 'key', item0.orgId)
        this.$set(item0, 'courierName', '-')
        this.$set(item0, 'todoCount','-')
        this.$set(item0, 'doneCount', '-')
        this.$set(item0, 'abnormalCount', '-')
        this.$set(item0, 'cancelCount', '-')
        if(item0.children) {
          item0.children.forEach(item1 => {
             this.$set(item1, 'key', item1.orgId)
             
            this.$set(item1, 'courierName', '-')
            this.$set(item1, 'todoCount','-')
            this.$set(item1, 'doneCount', '-')
            this.$set(item1, 'abnormalCount', '-')
            this.$set(item1, 'cancelCount', '-')
            if(item1.children) {
              item1.children.forEach(item2 => {
                 this.$set(item2, 'key', item2.orgId)
        
                this.$set(item2, 'courierName', '-')
                this.$set(item2, 'todoCount','-')
                this.$set(item2, 'doneCount', '-')
                this.$set(item2, 'abnormalCount', '-')
                this.$set(item2, 'cancelCount', '-')
                if(item2.children) {
                  item2.children.forEach(item3 => {
                     this.$set(item3, 'key', item3.orgId)
                     this.$set(item3, 'courierName', '-')
                    this.$set(item3, 'todoCount','-')
                    this.$set(item3, 'doneCount', '-')
                    this.$set(item3, 'abnormalCount', '-')
                    this.$set(item3, 'cancelCount', '-')
                    item3.children.forEach(item4 => {
                       this.$set(item4, 'key', item4.orgId)
                       this.$set(item4, 'courierName', '-')
                      this.$set(item4, 'todoCount','-')
                      this.$set(item4, 'doneCount', '-')
                      this.$set(item4, 'abnormalCount', '-')
                      this.$set(item4, 'cancelCount', '-')
                    console.log(item4)
                    if(item4.courierList) {
                      item4.courierList.forEach(item5 => {
                        this.$set(item5, 'key', item5.courierId)
                        this.$set(item5, 'todoCount', item5.todo ? item5.todo.length : 0)
                        this.$set(item5, 'doneCount', item5.done  ? item5.done.length : 0)
                        this.$set(item5, 'abnormalCount', item5.abnomal  ? item5.abnormal.length : 0)
                        this.$set(item5, 'cancelCount', item5.cancel  ? item5.cancel.length : 0)
                     })
                    }
                    this.$set(item4, 'children', item4.courierList)
                  })
                  })
                }
              })
            }
          })
        }
      })
      console.log('data',data )
      this.treeData = data


    },

    showList(list, title) {
      console.log({list,title})
      if(list && list.length) {
        this.list = list
        this.listTitle = title
        console.log('-----------------------------')
        this.listVisible = true
      }else{
        this.$message.warn(`暂无数据`)

      }
    },
    handleCloseList() {
      this.listVisible = false
    }
  },
  components: {

    ShowList
  }
}
</script>

<style scoped lang='less'>
.app-content {
  margin-top: 50px;
  min-width: 1400px;
  background: #fff;
}
.hover_sty{
  color: #1890ff
}
</style>
