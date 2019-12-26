<template>
  <a-modal
    title="公告详情"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
  >
  <a-card :title="row.title" style="width:100%">
     <!-- <a-button :disabled="row.state == 1" type="primary" @click="read" slot="extra">已阅</a-button> -->
          <a-button :disabled="!row.orderCode" type="primary" @click="readOrder" slot="extra">阅览</a-button>
     <!-- <a href="#" slot="extra">more</a> -->

      <a-row>
        <a-col :span="5">订单编号:</a-col>
        <a-col :span="19">{{row.orderCode || '暂无订单'}}</a-col>
       
      </a-row>

      <a-row>
        <a-col :span="2">内容:</a-col>
        <a-col :span="10">{{row.detail}}</a-col>
        <a-col :span="4">已读数量:</a-col>
        <a-col :span="8">{{row.num || 0}}</a-col>
      </a-row>

      <a-row>
        <a-col :span="2">类型:</a-col>
        <a-col v-if="row.type === 1" :span="10">未指派取件人</a-col>
        <a-col :span="4">创建时间:</a-col>
        <a-col :span="8">{{row.createTime}}</a-col>
      </a-row>
  
    </a-card>

  </a-modal>
</template>

<script >

import { MESSAGE, URL_READ_MESSAGE, SEARCHBYID} from '@/api/url'
import { axios } from '@/utils/request'

export default {
  name: 'TransportForm',
  data() {
    return {
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      orderCode:0
    }
  },
  props: {
    url: {
      type: String
    },
    row: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 600
    }
  },
  computed: {
    closable() {
      return true
    },
    mask() {
      const { mask } = this.options || {}
      return mask || true
    }
  },
  mounted(){

    this.init()
  },
  methods: {
    init() {
      console.log('this.row', this.row)
     
    },
    handleClose() {
      this.$emit('close')
    },
     // 获取订单
    getOrder(row) {


        
        // this.visible = false
        // this.visibleOrder = true

        let params = {
          id: row.waybillId
        }

         axios.get(`${SEARCHBYID}/${params.id}`).then(res => {
          console.log(res)

          if(res.data.code == 200) {
            this.orderCode = res.data.data.tdNo
           // this.$set(this,row,'orderCode', res.data.data.tdNo)
            console.log(this.row, this.orderCode)
          }
        })

      },
    read() {
      this.row.state = 1
      let params = {
        id: this.row.id,
      }
       axios.get(`${URL_READ_MESSAGE}/${params.id}`).then(res => {
         if(res.data.code === 200) { 
           this.$message.success('已读')
        }
      })

    },
    // 阅览
    readOrder() {
      this.$emit('close')
      this.$router.push({path: '/order/index'})
      this.$store.dispatch("clickMesage",this.row.orderCode)
      this.$message.success('操作成功')
    }
  }
}
</script>
<style lang="less" scoped>
.form-btns {
  text-align: center;
}
</style>
