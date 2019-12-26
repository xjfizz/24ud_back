<template>
  <div>
<!--    <a-card v-if="loading">-->
<!--      <a-skeleton :loading="loading" active/>-->
<!--    </a-card>-->
    <a-card>
      <header>
        <span class="detail-title">投诉单信息</span>
        <span v-if="content.state===4" class="danger-title">*已转为仲裁单</span>
      </header>
      <ul class="detail-list">
        <li>
          <span class="detail-label">投诉编号:</span>
          <span>{{content.id}}</span>
        </li>
        <li>
          <span class="detail-label">被投诉订单编号:</span>
          <span>{{content.waybillId}}</span>
        </li>
        <li>
          <span class="detail-label">被投诉的人/网点:</span>
          <span>{{content.respondent}}</span>
        </li>
        <li>
          <span class="detail-label">投诉发起人的电话:</span>
          <span>{{content.tel}}</span>
        </li>
        <li>
          <span class="detail-label">投诉类型:</span>
          <span>{{content.type}}</span>
        </li>

        <li>
          <span class="detail-label">投诉详情描述:</span>
          <span>{{content.detail}}</span>
        </li>
        <li>
          <span class="detail-label">投诉类别</span>
          <span v-if="content.category == 1">网点投诉</span>
          <span v-else-if="content.category == 2">订单投诉</span>
        </li>
        <li>
          <span class="detail-label">投诉的状态:</span>
          <a-tag color="red" v-if="content.state == 1">未处理</a-tag>
          <a-tag color="blue" v-else-if="content.state == 2">处理中</a-tag>
          <a-tag color="green" v-else-if="content.state == 3">申诉成功</a-tag>
          <a-tag color="pink" v-else-if="content.state == 0">已取消</a-tag>
        </li>
        <li>
          <span class="detail-label">创建时间:</span>
          <span>{{content.createTime}}</span>
        </li>
         <li>
          <span class="detail-label"><a-button type="danger" @click="handle()" :disabled="content.state ==3" >处理</a-button></span>
         
        </li>

<!--        <li v-for="item in list" :key="item.label" :class="item.cls">-->
<!--          <template v-if="item.component">-->
<!--            <component :is="item.component" :id="item.value"></component>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <span class="detail-label">{{item.label}} :</span>-->
<!--            <span>{{item.value}}</span>-->
<!--          </template>-->
<!--        </li>-->
<!--        <li v-if="content.file">-->
<!--          <span class="detail-label">附件</span>-->
<!--          <span><a-icon type="download" /> 附件下载</span>-->
<!--        </li>-->
      </ul>
<!--      <div class="tips" :class="currentState.type">{{currentState.label}}</div>-->
<!--      <a-button-group class="btn-wrap">-->
<!--        <a-button-->
<!--          class="btn-item"-->
<!--          :type="btn.type|| 'primary'"-->
<!--          v-for="btn in btns"-->
<!--          :key="btn.label"-->
<!--          @click="handleFormClick(btn)"-->
<!--        >{{btn.label}}</a-button>-->
<!--      </a-button-group>-->
    </a-card>
<!--    <a-card class="logs" title="操作记录" v-if="dataSource.length">-->
<!--      <a-table rowKey="id" :dataSource="dataSource" :columns="columns"></a-table>-->
<!--    </a-card>-->
<!--    <detail-form :row="content" :cate="formCate" :visible="formlVisible" @close="handleCloseForm"/>-->


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
import DetailForm from './components/detail-form'
import SIsOrder from './components/is-waybill'
import * as CONFIG from './config.detail'
import { URL_SERVICE_COMPLAINT } from '@/api/url'
export default {
  data() {
    return {
      loading: true,
      content: {},
      dataSource: [],
      columns: [...CONFIG.columns],
      detailLabel: '',
      waybillShow: true,
      formlVisible: false,
      formCate: 0,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      remark: '',
      userInfo:{}
    }
  },
  // mixins: [FormMixis],
  computed: {
    btns() {
      const { state } = this.content
      if (!state) return []
      return CONFIG.operations.filter(item => item.state === state)
    },
    list() {
      const { content = {} } = this
      if (!content.category) return []
      const { category } = content
      const { items } = CONFIG
      const [cate] = CONFIG.category.filter(item => item.value === category)
      this.detailLabel = cate.label
      const temps = items.filter(item => {
        return cate.relation.options.some(it => {
          return item.cate === category || item.field === it
        })
      })
      const list = temps.filter(item => item.cate !== category)
      return list.map(item => {
        console.log(item)
        const { field, component } = item
        let value = content[field]
        return {
          ...item,
          value
        }
      })
    },
    currentState() {
      const { content = {} } = this
      return CONFIG.state[content.state] || {}
    }
  },
  created() {
    const { id } = this.$route.params
    this.userInfo = JSON.parse(localStorage.getItem('login_user'))
    this.$http.get(URL_SERVICE_COMPLAINT, { params: { id } }).then(res => {
      if(res.data.code === 200) {
        const  [data]  = res.data.data.rows
        const content = data
        this.content = content
        console.log('this.content', this.content)
      //  this.dataSource = content.logs
      //  this.loading = false
      }
    })
  },
  methods: {
    handleChange(e) {
      this.waybillShow = e
    },
    handleFormClick(e) {
      console.log(e)
      this.formCate = e.cate
      this.formlVisible = true
    },
    handleCloseForm() {
      this.formlVisible = false
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
  components: {
    DetailForm,
    SIsOrder
  }
}
</script>
<style lang="less" scoped>
@danger: #ea0101f0;
@warn: #bd7777;
@success: #3cd488;
header {
  line-height: 30px;
  margin-bottom: 20px;
}
.detail-title {
  font-size: 18px;
  color: #888;
}
.detail-list {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  li {
    width: 50%;
    padding: 10px 0;
  }
  .full {
    width: 100%;
  }
  .detail-label {
    display: inline-block;
    width: 120px;
    color: #999;
  }
}
.btn-wrap {
  display: block;
  text-align: center;
  margin: 0 auto;
  .btn-item {
    margin: 0 5px;
  }
}
.tips {
  position: absolute;
  top: 70px;
  right: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 12px;
  transform: rotate(-45deg);
  color: #fff;
  line-height: 70px;
  text-align: center;
  &.danger {
    background: @danger;
  }
  &.warn {
    background: @warn;
  }
  &.success {
    background: @success;
  }
}
.danger-title {
  margin-left: 20px;
  color: @danger;
}
.logs {
  margin-top: 5px;
}
</style>
