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
          <a-form-item label="单位名称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="单位名称"
              v-decorator="[
            'companyName',
            {initialValue: `${fieldValues.companyName}`,
              rules: [{ required: true, message: '车牌号' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="单位类型" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="单位类型"
              v-decorator="[
              'type',
              {
                initialValue: `${fieldValues.type}`,
                rules: [{ required: true, message: '必须单位类型' }]}
            ]"
            >
              <a-select-option value="供应商">供应商</a-select-option>
              <a-select-option value="客户">客户</a-select-option>
              <a-select-option value="内部单位">内部单位</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="联系人" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="请输入联系人"
              v-decorator="[
            'contact',
            {initialValue: `${fieldValues.contact}`,
              rules: [{ required: true, message: '请输入联系人' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="联系电话" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="请输入联系人电话"
              type="number"
              v-decorator="[
            'tel',
            {initialValue: `${fieldValues.tel}`,
              rules: [{ required: true, message: '请输入联系人电话' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item label="公司地址" :label-col="{span: 4}" :wrapper-col="{span: 16}">
            <a-input
              placeholder="请输入公司地址"
              v-decorator="[
            'address',
            {initialValue: `${fieldValues.tel}`,
              rules: [{ required: true, message: '请输入公司地址' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col span="24">
          <a-form-item label="覆盖网点" :label-col="{span: 4}" :wrapper-col="wrapperCol">
            <a-cascader
              :options="cascader"
              expandTrigger="hover"
              placeholder="选择覆盖网点"
              v-decorator="[
            'coverage',
            {initialValue: `${fieldValues.coverage}`,
              rules: [{ required: true, message: '选择覆盖网点' }]}
          ]"
            />
          </a-form-item>
        </a-col>-->
      </a-row>
      <a-form-item class="form-btns">
        <a-button type="primary" html-type="submit">确认</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'

// 临时假数据
const cascader = [
  {
    value: '华东分拨中心',
    lable: '华东分拨中心',
    children: [
      {
        value: '网点A',
        lable: '网点A'
      },
      {
        value: '网点B',
        lable: '网点B'
      },
      {
        value: '网点c',
        lable: '网点c'
      }
    ]
  },
  {
    value: '西南分拨中心',
    lable: '西南分拨中心',
    children: [
      {
        value: '网点A',
        lable: '网点A'
      },
      {
        value: '网点B',
        lable: '网点B'
      },
      {
        value: '网点c',
        lable: '网点c'
      }
    ]
  }
]

export default {
  name: 'TransportForm',
  data() {
    return {
      cascader, // 假数据，待删
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
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
