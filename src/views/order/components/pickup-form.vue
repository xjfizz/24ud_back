<template>
  <a-modal
    title="指派取件员"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="选择取件员" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="选择取件员"
              v-decorator="[
              'pickerId',
              {rules: [{ required: true, message: '必须选择选择取件员' }]}
            ]"
              :options="couriers"
            ></a-select>
          </a-form-item>
          <a-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-textarea
              rows="4"
              placeholder="请输入备注"
              v-decorator="['remark', { rules: [{ required: false, message: '请输入备注' }] }]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <p :style="{ textAlign: 'center', color: 'red', margin: '20px 0;' }">注：批量操作时只能选择同一个取件员</p>
        <a-col class="btn-groups" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit" class="item-btn">确认添加</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import { URL_COURIER, URL_COURIER_ALL, URL_ORDERS_WAYBILL } from '@/api/url'
import { mapGetters } from 'vuex'

export default {
  name: 'pickup-form',
  data() {
    return {
      wrapperCol: {
        span: 14
      },
      labelCol: {
        span: 10
      },
      couriers: [],
      method: 'put',
      siteId: ''
    }
  },
  props: {
    orderIds: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 600
    },
       row: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    // todo
    // const params = {
    //   type: 0,
    //   branches: this.$store.state.user.siteId
    // }
    let userInfo = JSON.parse(localStorage.getItem('login_user'))
    // let params = {
    //   oid: userInfo.siteIds[0]
    // }
    console.log('row', this.row)
      let params = {
      oid: this.row.startOrgId
    }
    this.$http.get(URL_COURIER_ALL, { params }).then(res => {
      this.couriers = res.data.data.map(item => {
        const { id, name } = item
        return {
          value: id,
          label: name
        }
      })
    })
  },
  computed: {
    ...mapGetters(['nickname', 'userId']),
    closable() {
      return true
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    submitResult(data) {

    },
    interceptors(value) {
      const [id] = this.orderIds
      const { pickerId, remark } = value
      const p = this.couriers.find(item => item.value === pickerId)

      let userInfo = JSON.parse(localStorage.getItem('login_user'))
      let params = {
        wbId:id,
        userName: this.nickname,
        userId: this.userId,
        orgId: userInfo.siteIds[0],
        courierId: pickerId,
        remark,
        state:1// 派件员来取
      }
      return params
        // id,
        // pickerId,
        // picker: p.label,
        // // logs: [
        // //   {
        // //     remark,
        // //     user: this.nickname,
        // //     userId: this.userId
        // //   }
        // // ]
        // logs: [
        //   {
        //     remark,
        //     user: this.nickname,
        //     userId: this.userId
        //   }
        // ]

    }
  },
  mixins: [FormMixis]
}
</script>
