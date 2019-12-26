<template>

  <div>
    <a-card>
      <a-row>
        <a-col :span="16">
<!--          <common-option-filter :options="configFilters" @change="handleFilterChange"></common-option-filter>-->
          <a-button type="primary" @click="handleAddForm">新增</a-button>
        </a-col>
        <a-col :sapn="4">
<!--          <a-button type="primary" @click="handleAddForm">新增</a-button>-->
        </a-col>
      </a-row>
    </a-card>

    <a-card>
      <table-list v-if="tableList.length > 0" :tableList="tableList" :tableListInner="tableListInner"  :columns="columns" :columnsInner="columnsInner" @selected="selectTable"  @openEditForm="openEditForm"></table-list>
    </a-card>
    <form-add :options="options"  :modelOptions="modelOptions" @submit="formSubmit" @change="onChange"></form-add>
    <form-edit :options="optionsEdit" :siteList = "options"  :modelOptions="modelOptionsEdit" @submit="formSubmitEdit" @change="onChange"></form-edit>
  </div>
</template>
<script>
  import {tableList, formAdd, formEdit} from './components/index'
  import { BUSTIME , URL_SYSTEM_AUTH_STRUCTURE_ALL} from '@/api/url'
  import { axios } from '@/utils/request'
  import moment from 'moment'
  import { mapGetters } from 'vuex'
  export default {
    components:{
      tableList,
      formAdd,
      formEdit
    },
   data() {
      return {
        userInfo:{},
        tableList:[],
        tableListInner:[
          {carIndex: '1', startTime:'2019-02-14', endTime:'2019-03-14',},
          {carIndex: '2',  startTime:'2019-02-18', endTime:'2019-02-14',},
          {carIndex: '3',  startTime:'2019-02-18', endTime:'2019-02-14',},
        ],
        columns:[
          {
            title: '站点名称',
            dataIndex:'name',
            key:'name'
          },
          {
            title: '站点信息',
            dataIndex:'siteMsg',
            key:'siteMsg'
          },
          {
            title: '操作',
            key: 'operation', 

            width: 100,
            scopedSlots: { customRender: 'action' },
          },
        ],
        columnsInner:[
          {
            // title: '班次',
            // dataIndex:'carIndex',
            // key:'carIndex'
                title: '班次',
                width: '50',
                customRender:(text,record,index)=>`${index+1}`,
          },
          {
            title: '班车开始时间',
            dataIndex:'startTime',
            key:'startTime'
          },
          {
            title: '班车送达时间',
            dataIndex:'endTime',
            key:'endTime'
          },
        ],
        modelOptions:{
          title: '新增班车时间',
          visible: false
        },
        modelOptionsEdit:{
          title: '编辑班车时间',
          visible: false
        },
      
        optionsEdit: {},
        startTime: '',
        endTime: '',
        timeArrayNumber: [
          { startTime: null,  endTime: null,}
        ],
        timeNumber: 1,

      }
    },
    computed: {
        ...mapGetters(['siteListTree', 'topStruct']),
     options() {
      const { siteListTree = [] } = this
      console.log('siteListTree', siteListTree, siteListTree.length)
      return siteListTree.length ? this.formatList(siteListTree) : []
    },
    },

    mounted() {
      this.init()

    },

    methods: {
          formatList(data) {
            console.log('组织树', data)
            if (!Array.isArray(data)) return []
            return data.map(item => {
              const kids = item.level === 2 ? [{ label: '全部', value: '' }].concat(item.children) : item.children
              const children = this.formatList(kids)
              return {
                ...item,
                children
              }
            })
    },
      // 初始化
      init() {
        this.getUserInfo()
      },
      // 获取用户信息
      getUserInfo() {
        this.userInfo = JSON.parse(localStorage.getItem('login_user'))
        this.getList()
        this.getSiteList()
      },
      getSiteList() {
         axios.get(`${URL_SYSTEM_AUTH_STRUCTURE_ALL}?id=${this.userInfo.orgId}`).then(res => {
          const data = res.data.data
         // this.options = this.formatData(data)
           console.log('this.sites', this.options)
        })
      },
      
      // 查询数据处理
      getList() {
        // api
        let params = {
          orgId: this.userInfo.siteIds[0]
        }
      let tableList = []
         axios.get(`${BUSTIME}?orgId=${params.orgId}`,).then(res => {
           if(res.data.code === 200 ) {
              let list = res.data.data.rows
              // list.map((item,index) => {
              //     if(item.times) {
              //         item.times= item.times.map((item1,index1)=> {
              //           return  {key:item.oid + index1 ,id:item1.id, carIndex: index1 + 1, startTime:item1.startTime, endTime:item1.endTime,}
              //         })
              //       }
              //     })
                  this.tableList = list
            }
           
          this.$message.success('查询成功')
          // this.refetch()
        })

        // let tableList = [
        //   {
        //     id:'1',
        //     siteName: 'aaa',
        //     siteMsg:'苏州',
        //     times:[
        //       {id:'11',carIndex: '1', startTime:'07:05:00', endTime:'08:09:00'},
        //       {id:'12',carIndex: '2',  startTime:'09:05:00', endTime:'10:05:00'},
        //       {id:'13',carIndex: '3',  startTime:'11:05:00', endTime:'12:05:00'},
        //     ]},
        //   {
        //     id:'2',
        //     siteName: 'bbb',  siteMsg:'五行',
        //     times:[
        //       {id:'14',carIndex: '2',  startTime:'09:05:00', endTime:'10:05:00'},
        //       {id:'15',carIndex: '3',  startTime:'11:05:00', endTime:'12:05:00'},
        //     ]},
        //   {
        //     id:'3',
        //     siteName: 'ccc',  siteMsg:'南京',
        //     times:[
        //       {id:'16',carIndex: '1', startTime:'07:05:00', endTime:'08:09:00'},
        //     ]}
        // ]
        
  
        // setTimeout( () => {
        //   console.log(tableList)
        //   this.tableList = tableList
        //   console.log(this.tableList)
        // },1500)
      },


     // 选择站点
      onChange(value) {
        console.log('index', value)
      },
      // onChangeStart(time, timeString) {
      //   console.log(time, timeString, this.startTime);
      //    this.startTime = timeString
      // },
      // onChangeEnd(time, timeString) {
      //   console.log(time, timeString);
      //   this.endTime = timeString
      // },
      // 添加时间
      addTime () {
        console.log('添加时间')
        // this.timeNumber++
        this.timeArrayNumber.push(
          { startTime: null,  endTime: null,}
        )
      },
      // 保存时间
      saveTime(item,index) {
        console.log(item,index, this.timeArrayNumber)
        if (item.startTime && item.endTime) {
          let text =  this.compareTime(item.startTime, item.endTime)
          console.log('text', text)
          if(text === -1) {
            return this.$message.error('开始时间大于结束时间');
          } else if (text === 0) {
            return this.$message.error('开始时间等于结束时间');
          } else if (text === 1) {
            console.log('success')
          }
          let startTime= item.startTime.toString().substring(16,24)
          let endTime= item.endTime.toString().substring(16,24)
          console.log('startTime, endTime',startTime, endTime)
        } else {
          return this.$message.error('开始时间和结束时间不能为空');
        }
      },
      // 删除时间
      deleteTime(item,index) {
        console.log(item,index)
        this.timeArrayNumber.splice(index,1)
        console.log('this.timeArrayNumber', this.timeArrayNumber)
      },
      // 比较时间大小
      compareTime(start,end) {
        console.log('start,end', new Date(start),new Date(end))
        let startTime = new Date(start)
        let endTime = new Date(end)
        startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate() + ' ' + startTime.getHours() + ':' + startTime.getMinutes() + ':' + startTime.getSeconds();
        endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate() + ' ' + endTime.getHours() + ':' + endTime.getMinutes() + ':' + endTime.getSeconds();
        startTime =  new Date(Date.parse(startTime.replace("-","/")))
        endTime = new Date(Date.parse(endTime.replace("-","/")))
        let text = startTime - endTime
        console.log('比较时间', startTime, endTime,text)
        if (text > 0 ) {
          return -1 // 开始时间大于结束时间
        } else if(text < 0) {
          return 1 // 开始时间小于结束时间
        } else if(text === 0) {
          return 0 // 开始时间等于结束时间
        }
      },
      // 选择列表
      selectTable(row) {
        console.log('table',row)
      },
      // 新增班车
      formSubmit(form) {
        console.log('formSubmit', form)
        this.modelOptions.visible = false
        this.busTimeAdd(form)

      },
      // 编辑班车保存
      formSubmitEdit(form) {
        console.log('formSubmit', form)
        this.modelOptionsEdit.visible = false
        form.values.time.map(item => {
          if(item.id) {
              this.busTimeEditId(form,item)
          } else {
              this.busTimeEditNoId(form,item)
          }
        })
        setTimeout(() => {
            this.getList()
        }, 500)
        
      },

      // 添加班车时间保存
      busTimeAdd(form) {
        let params = {
         // id:form.id || null,
          oid: form.values.siteName[form.values.siteName.length - 1],
          times:form.values.time
        }
         axios.post(`${BUSTIME}`,params).then(res => {
           if(res.data.code === 200 ) {
             this.$message.success('操作成功')
              console.log('res',res)
              this.getList()
            }
         // this.refetch()
        })
      },
           // 编辑班车时间保存
      busTimeEdit(form) {
        let params = {
         // id:form.id || null,
          id: form.id,
          startTime: form.startTime,
          endTime:form.endTime
        }
         axios.put(`${BUSTIME}`,params).then(res => {
           if(res.data.code === 200 ) {
             this.$message.success('操作成功')
              console.log('res',res)
              this.getList()
            }
         // this.refetch()
        })
      },
       // 编辑班车时间保存有ID
      busTimeEditId(form, item) {
        let params = {
          oid: form.values.siteName[form.values.siteName.length - 1],
          id: item.id,
          startTime: item.startTime,
          endTime:item.endTime
        }
         axios.put(`${BUSTIME}`,params).then(res => {
           if(res.data.code === 200 ) {
         //    this.$message.success('操作成功')
              console.log('res',res)
            //  this.getList()
            }
         // this.refetch()
        })
      },
      // 编辑班车时间保存无ID
      busTimeEditNoId(form, item) {
        let params = {
         // id:form.id || null,
          oid: form.values.siteName[form.values.siteName.length - 1],
          times:[item]
        }
         axios.post(`${BUSTIME}`,params).then(res => {
           if(res.data.code === 200 ) {
           //  this.$message.success('操作成功')
              console.log('res',res)
            //  this.getList()
            }
         // this.refetch()
        })
      },
      // 弹出框
      handleAddForm() {
        this.modelOptions.visible = true
      },
      // 弹出编辑框
      openEditForm(row) {
        console.log(row);
        let options = JSON.parse(JSON.stringify(row))
        options.times.forEach(item => {
          item.startTime =  moment(item.startTime,'HH:mm:ss');
          item.endTime =  moment(item.endTime,'HH:mm:ss');
        })
        this.optionsEdit = options
        this.optionsEdit.siteName = this.getOidTree(this.options, options.oid)
        console.log('options', options, this.options,  this.optionsEdit)
        this.modelOptionsEdit.visible = true
      },


       getOid(oid,sites) {
      console.log('sites', sites)
      sites.map(item => {
        this.OID.push(item.id)
        if(item.id !== oid) {
          if(item.children) {
            this.getOid(oid, item.children)
          }else {
            this.OID = []
          }
        } else {
          console.log(item)
          return this.OID
        }
      })
    },
 // 遍历数组 查找节点的父节点
    getOidTree(data,id) {
      console.log('data',data,id)
      let isHeadQuarters =  true
      if(data[0]) {
         isHeadQuarters = data[0].level == 0 ? true : false
      }
      let b = []
      // tree转一位数组
      function Family(data,id) {
        data.forEach(item => {
          b.unshift(item)
          if(item.children) {
            Family(item.children, id)
          }
        })
        return id
      }
      console.log('b', b)
      let c= []
      function FamilyFun(id) {
       b.forEach(item => {
         if(item.id === id) {
           if(item.parentId) {
             c.unshift(item.parentId)
             FamilyFun(item.parentId)
           }
         }
       })
        console.log('c', c)
        return c

      }
     //  Family(data,id)
      console.log('c', c)
      if(c) {
        FamilyFun(Family(data,id))
      }
      // FamilyFun(Family(data,id))
      c.push(id)
      if(!isHeadQuarters) {
        c.shift()
      }
      console.log('c', c)
      return c
    },

    },
    

  }
</script>
<style lang="less">
  .drive-timeSet {
    margin-top: 40px;
    min-height: 400px;
    .form-item-title {
      font-size: 20px;
      color: #888;
      border-left: 6px #1890ff solid;
      text-indent: 8px;
      line-height: 1.2;
    }
  }

</style>
<style lang="less" scoped>
  .drive-timeSet {
    .main{
      margin-top: 10px;
      .drive-header{
        .selectSite{
          margin-left: 10px;
          width: 263px;
        }
        .addTime{
          margin-left: 10px;
          width: 175px;
        }
      }
      .time-input{
       // margin-left: 69px;
        margin-top: 20px;
        .startTime{
          margin-left: 30px;
        }
        .endTime{
          margin-left: 10px;
        }
        .saveTime{
          margin-left: 10px;
        }
        .deleteTime{
          margin-left: 10px;
        }
      }
    }
  }

</style>
