<template>
  <div class="app-content">
    <a-card>
     <a-row>
       <a-col :span="3">
         <!-- @change="inputChange" -->
         <a-input   @pressEnter="pressEnter"  v-model="userName" placeholder="请输入账号名称"></a-input> 
       </a-col>

       <a-col :span="20" class="header_sty">
         <a-button type="primary" @click="add">增加</a-button>
       </a-col>
     </a-row>

    <div class="main_table">
      <a-table :loading = "loading" :rowKey="row=>row.id" :dataSource="tableList" :pagination="pagination"  :columns="columns"  class="components-table-demo-nested"  @change="handleTableChange">
        
      <template slot="operation" slot-scope="text, record">
        <!-- <a-button type="primary" slot="action" slot-scope="text" href="javascript:;" @click="edit(text)">编辑</a-button>
         <a-button type="primary" slot="action" slot-scope="text" href="javascript:;" @click="edit(text)">删除</a-button> -->
         
         <span class="button_sty"   @click="edit(record)">编辑</span>
         <span  class="button_sty"   @click="del(record)">删除</span>

       </template>
         
      </a-table>
    </div>
       <form-add ref="form" :options="options"  :modelOptions="modelOptions" @addForm="addForm" @onchange="onChange"></form-add>
      <form-edit  :options="options" :row="editRow"  :modelOptions="modelOptionsEdit" @addForm="addForm" @onchange="onChange"></form-edit>

    </a-card>


  </div>
</template>

<script>

import { SITE_MANAGE } from '@/api/url'
import { axios } from '@/utils/request'
import { mapGetters } from 'vuex'
import {formAdd, formEdit} from './component/index'
import CommonPagination from '@/components/common-tools/common-pagination'
export default {
  name: 'siteManage',
      components:{
     // tableList,
      formAdd,
      formEdit,
      CommonPagination
    },
  data() {
    return {
     tableList:[],
      columns:[
          {
            title: '账号名称',
            dataIndex:'userName',
            key:'userName'
          },
          {
            title: '站点名称',
            dataIndex:'orgName',
            key:'orgName'
          },
           {
            title: '手机号',
            dataIndex:'phone',
            key:'phone'
          },
              {
            title: '创建时间',
            dataIndex:'createTime',
            key:'createTime'
          },
          {
            title: '操作',
            key: 'operation', 
            dataIndex: 'operation',
            align:"center",
            width: 200,
            scopedSlots: { customRender: 'operation' },
            
          },
        ],
          pagination:{
            total: 0,
            pageSize: 10,//每页中显示10条数据
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],//每页中显示的数据
            showTotal: total => `共有 ${total} 条数据`,  //分页中显示总的数据
          },
          userInfo:{},
          modelOptions:{
            title: '新增站点账号',
            visible: false
        },
        orgName:'',
         modelOptionsEdit:{
          title: '编辑站点账号',
          visible: false
        },
      
        optionsEdit: {},
        editRow:{},
        page:{},
        loading: false,
        userName:''
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
  created() {
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
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
      this.getList()
    },
    // 获取站点账号列表
    getList() {
      let params = {
        oid: this.userInfo.orgId,
        ...this.page,
        userName: this.userName || ''
       // operateOrgId: this.userInfo.orgId
      }
      this.loading = true

      axios.get(SITE_MANAGE, {params}).then( res => {
        if(res.data.code === 200) {
         // row.status = !row.status
         this.tableList = res.data.data.rows
         this.pagination.total = res.data.data.total
          this.$message.success(res.data.message)
          this.loading = false
       } else{
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log('错误', error)
      })
    },
        // 新增班车
      formSubmit(form) {
        console.log('formSubmit', form)
        this.modelOptions.visible = false
       // this.busTimeAdd(form)

      },
       // 选择站点
      onChange(value) {
        console.log('selected', value)
        this.orgName = value[value.length - 1].name
      },
      // 弹出增加框
      add() {
        this.modelOptions.visible = true
      },
      edit(row) {
        console.log(row)

        this.editRow = row
        this.orgName = row.orgName
        this.editRow.oid = this.getOidTree(this.options, row.oid)
        console.log(this.editRow)
       this.modelOptionsEdit.visible = true
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



      addForm(values) {
        console.log(values)
        let { id, siteName, ...props} = values
        let oid = siteName[siteName.length - 1]
        let method = id ? 'put' : 'post'
        let modelOptionsLable = id ? 'modelOptionsEdit' : 'modelOptions'
        let params = {
          id,
          oid,
          orgName: this.orgName,
          ...props
        }
     axios[method](SITE_MANAGE, params).then( res => {
        if(res.data.code === 200) {
         // row.status = !row.status
          this.$message.success(res.data.message)
          this[modelOptionsLable].visible = false
          this.$refs.form.resetForm()
          this.getList()
       } else{
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log('错误', error)
      })

      },
      // 分页
      handleTableChange(page) {
        console.log(page)
        this.page.page = page.current - 1
        this.page.pageSize = page.pageSize
        this.getList()
      },
      // 删除
      del(row) {
        this.$confirm({
          title: `提示:`,
          content:`确认删除此账号【${row.userName}】?`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {

          let params = {id:row.id || ''}
          let id = [params.id]
          axios.delete(SITE_MANAGE,{data:id}).then( res => {
            if(res.data.code === 200) {
            // row.status = !row.status
              this.$message.success(res.data.message)
              this.getList()
          } else{
              this.$message.error(res.data.message)
            }
          }).catch(error => {
            console.log('错误', error)
          })

          },
          onCancel: () =>{
            console.log('Cancel');
          },
        });
     },
      // 条件查询
      inputChange(row) {
        console.log('inputChange', row, this.userName)
        this.userName = row.data
        this.getList()
      },
      pressEnter(e) {
        console.log('pressEnter', e)
        this.page.page = 0
        this.getList()
      }

  }
    
}
</script>

<style scoped lang='less'>
.app-content {
  //min-width: 1400px;
  width: 100%
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
.header_sty{
  text-align: right
}
.main_table{
  padding: 10px 10px  20px 0px;
}
.button_sty{
  color: #409eff;
  margin-left: 10px;
}
.button_sty:hover{
 cursor: pointer;

}
</style>
