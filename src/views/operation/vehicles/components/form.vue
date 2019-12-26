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
          <a-form-item label="车牌号" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="输入车牌号"
              v-decorator="[
            'licenseNumber',
            {initialValue: `${fieldValues.licenseNumber}`,
              rules: [{ required: true, message: '车牌号' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="车型" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="选择车型"
              v-decorator="[
              'carType',
              {
                initialValue: `${fieldValues.carType}`,
                rules: [{ required: true, message: '必须选择车型' }]}
            ]"
            >
              <a-select-option value="车型1">车型1</a-select-option>
              <a-select-option value="车型2">车型2</a-select-option>
              <a-select-option value="车型3">车型3</a-select-option>
              <a-select-option value="车型4">车型4</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="运输单位" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="选择运输单位"
              v-decorator="[
              'affiliationCompany',
              {
                initialValue: `${fieldValues.affiliationCompany}`,
                rules: [{ required: true, message: '运输单位' }]}
            ]"
            >
              <a-select-option value="运输单位1">运输单位1</a-select-option>
              <a-select-option value="运输单位2">运输单位2</a-select-option>
              <a-select-option value="运输单位3">运输单位3</a-select-option>
              <a-select-option value="运输单位4">运输单位4</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="司机" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="输入司机姓名"
              v-decorator="[
            'name',
            {initialValue: fieldValues.name}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="司机手机" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="输入司机手机"
              v-decorator="[
            'phone',
            {initialValue: fieldValues.phone,
              rules: [{ pattern: /^1[1345789]\d{9}$/g, message: '请输入正确的手机格式' }]
            }
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="12">
          <a-form-item label="品牌" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="选择车辆品牌"
              v-decorator="[
              'brand',
              {
                initialValue: `${fieldValues.brand}`,
                rules: [{ required: false, message: '选择车辆品牌' }]}
            ]"
            >
              <a-select-option value="大众">大众</a-select-option>
              <a-select-option value="奥迪">奥迪</a-select-option>
              <a-select-option value="卡迪拉克">卡迪拉克</a-select-option>
              <a-select-option value="别克">别克</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="载重量" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              addonAfter="吨"
              placeholder="输入载重量"
              v-decorator="[
            'load',
            {
              initialValue: `${fieldValues.load}`,
              rules: [{ required: false, message: '载重量' }]}
          ]"
            />
          </a-form-item>
        </a-col>
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
export default {
  name: 'TransportForm',
  data() {
    return {
      wrapperCol: {
        span: 16
      },
      labelCol: {
        span: 8
      }
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
    },
    method() {
      return this.row.id ? 'put' : 'post'
    },
    formTitle() {
      console.log(this.row)
      return this.row.id ? '修改车辆' : '添加车辆'
    },
    fieldValues() {
      return {
        ...this.row
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      const { id } = this.row
      if (id) {
        return {
          id,
          ...values
        }
      }
      return values
    }
  },
  mixins: [FormMixis]
}
</script>
<style lang="less" scoped>
.form-btns {
  text-align: center;
}
</style>
