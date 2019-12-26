<template>
  <div class="app-content">
      
    <a-card>
      <div class='header_main'>
           <a-col :span="12">

            <a-select  style="width: 200px" placeholder="请选择消息状态" @change="selectType" :allowClear=true>
              <a-select-option value="0">未读</a-select-option>
              <a-select-option value="1">已读</a-select-option>
            </a-select>
        </a-col>
      </div>

      <div class="main_table">
        <common-table
          ref="table"
          :columns="columns"
          @proxy-action="handleAction"
          :url="url"
          :params="params"
          :operations="operations"
          :options="setting.tableConfig"
        ></common-table>
      </div>

    </a-card>
    <notice-detail ref="form" v-if="noticeContent.id" :row="noticeContent" :visible="dialogVisible" @close="handleCloseModal"/>
  </div>
</template>

<script>
import { CommonOptionFilter, CommonTable, CommonOperation } from '@/components'
import NoticeDetail from './components/detail'
// 混入切换模式的方法 @handleModuleChange @handleFilterChange 必须引入
import ModuleMixin from '@/mixins/module'

import * as CONFIG from './config'
import { SEARCHBYID } from '@/api/url'
import { axios } from '@/utils/request'

export default {
  name: 'MessageNotice',
  data() {
    return {
      url: `${CONFIG.url}?userId=${(JSON.parse(localStorage.getItem('login_user')).userId)}`,
      setting: { ...CONFIG },
      columns: [...CONFIG.columns],
      operations: { ...CONFIG.operations },
      dialogVisible: false,
      params: { ...CONFIG.params },
      noticeContent: {}
    }
  },
  computed: {
    isApplyShow() {
      console.log(this.params)
      return this.params.category === 1
    }
  },
  methods: {
    handleAction(row, action) {
      const { type } = action
      if(action.type == 'delete') {
        this.del(row)
      } else {
        this.getOrder(row)
     }

    },

       // 获取订单
    getOrder(row) {
      let params = {
        id: row.waybillId
      }

      axios.get(`${SEARCHBYID}/${params.id}`).then(res => {
      console.log(res)

      if(res.data.code == 200) {
         row.orderCode = res.data.data.tdNo
       // this.row.$set(this.row,'orderCode', res.data.data.tdNo)
        this.noticeContent = row
        this.dialogVisible = true
        setTimeout( () => {
          this.$refs.form.read()
        },500)
        }
      })
    },

    handleCloseModal() {
      this.dialogVisible = !this.dialogVisible
    },
       // 删除
      del(row) {
        this.$confirm({
          title: `提示:`,
          content:`确认删除此消息?`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {

          let params = {id:row.id || ''}
          let id = [params.id]
          this.$http.delete(CONFIG.url,{data:id}).then( res => {
            if(res.data.code === 200) {
            // row.status = !row.status
              this.$message.success(res.data.message)
              this.$refs.table.fetch()
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
     // 消息已读未读
     selectType(value) {
       console.log(value)
       this.params.state = value
       this.$refs.table.fetch()
     }
  },
  mixins: [ModuleMixin],
  components: {
    CommonOptionFilter,
    CommonTable,
    CommonOperation,
    NoticeDetail
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
.main_table{
  margin-top: 70px;
}
</style>
