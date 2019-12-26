<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
  >
    <a-form :form="FORM" @submit="handleSubmit">
      <a-row>
        <a-col span="12">
          <a-form-item label="加盟商" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              expandTrigger="hover"
              placeholder="选择加盟商"
              style="width:300px"
              @change = 'selectFranchisees'
              :options="franchisees"
              v-decorator="[
              'franchiseeId',
              {
                rules: [{ required: true, message: '选择加盟商站点' }]}
            ]"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="数量" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input placeholder="购买数量" v-decorator="[
            'count'
          ]"/>
          </a-form-item>
        </a-col>

        <!-- <a-col :span="12">
          <a-form-item label="起始号段" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input placeholder="请输入号段" v-decorator="[
            'startNum'
          ]"/>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item label="结束号段" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="请输入结束号段"
              v-decorator="[
            'endNum',
            {initialValue: fieldValues.endNum}
          ]"
            />
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-form-item class="form-btns">
        <a-button type="primary" html-type="submit">确认</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import UploadMixin from '@/mixins/upload'
import { URL_COURIER_UPLOAD_BACK, URL_COURIER_UPLOAD_FRONT, URL_COURIER_UPLOAD_FRONT_DIPO } from '@/api/url'
import { regions } from '@/utils/regions'
import { mapGetters } from 'vuex'
import {getfranchisees} from '@/api/manage'
export default {
  name: 'TransportForm',
  data() {
    return {
      wrapperCol: {
        span: 16
      },
      labelCol: {
        span: 8
      },
      franchisees: [],
      areas: [],
      regions,
      franchiseeName: '',
      centerPrec: 5 // 总部分成
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
      default: 900
    }
  },
  created: function(){
    console.log("cc")
    getfranchisees().then(rs => {
      console.log(rs)
      this.franchisees = rs.data.map(it => {
        return {title: it.name, value:it.id , obj:it}
      })
    })
  },
  computed: {
    ...mapGetters(['siteListTree', 'id2Label']),
    closable() {
      return true
    },
    mask() {
      const { mask } = this.options || {}
      return mask || true
    },
    method() {
      return this.row.id ? 'patch' : 'post'
    },
    formTitle() {
      const { id = '' } = this.row
      const it = id ? '修改' : '添加'
      return `${it}面单`
    },
    fieldValues() {
      const { id, ...props } = this.row
      return {
        ...props
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    selectFranchisees(val,opt){
      console.log(val)
      console.log(opt)
      //
      this.franchiseeName = opt.data.props.obj.officialName
    },
    interceptors(values) {
      console.log(values)
      const { franchiseeId, ...props } = values
      const { id } = this.row

      // const siteId = siteIds.slice().pop()
      // const site = this.id2Label[siteId].title
      const franchiseeName =  this.franchiseeName
      return {
        franchiseeId,
        franchiseeName,
        ...props
      }
    }
  },
  mixins: [FormMixis]
}
</script>
<style lang="less" scoped>
.form-btns {
  text-align: center;
}
.tips {
  margin: 9px 0 40px;
}
.full-row {
  display: block;
  width: 100%;
  float: left;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}
</style>
