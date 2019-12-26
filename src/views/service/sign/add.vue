<template>
  <a-card class="components-add">
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">基本信息</h2>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="派件方式"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-radio-group
              v-decorator="[
                `sendMethod`,
                {
                  rules: [{
                    required: true,
                    message: '必须指定派件方式',
                  }],
                }
              ]"
            >
              <a-radio :value="1">系统指派</a-radio>
              <a-radio :value="2">手动指派</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="寄件日期" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-date-picker
              class="form-item"
              clearText
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="['toSendTime',
                {
                  rules: [{
                    required: true,
                    message: '必须选择寄件日期',
                  }],
                }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="实际班车时间" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-date-picker
              class="form-item"
              clearText
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="['busTime',
                {
                  rules: [{
                    required: true,
                    message: '必须选择班车时间',
                  }],
                }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="货物信息" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="货物信息"
              v-decorator="[
              'goodsInfo',
              {rules: [{ required: true, message: '必须选择货物信息' }]}
            ]"
            >
              <a-select-option value="1">文件</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="付款方式"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-radio-group :defaultValue="1">
              <a-radio :value="1">寄付</a-radio>
              <a-radio :value="2">到付</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="客户备注" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-textarea
              rows="4"
              placeholder="限100字以内"
              v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">寄收件信息</h2>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="寄件人"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              class="form-item"
              type="text"
              v-decorator="[
                `toSender`,
                {
                  rules: [{
                    required: true,
                    message: '寄件人不为空',
                  }],
                }
              ]"
              placeholder="请输入寄件人姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="寄件人电话" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="number"
              v-decorator="[
                'toSenderPhone',
                {
                  rules: [{
                    required: true,
                    message: '寄件人电话不为空',
                  }],
                }
              ]"
              placeholder="请输入寄件人电话"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="收件人"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              class="form-item"
              type="text"
              v-decorator="[
                'toRecipient',
                {
                  rules: [{
                    required: true,
                    message: '收件人不为空',
                  }],
                }
              ]"
              placeholder="请输入收件人姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="收件人电话" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="number"
              v-decorator="[
                'toRecipientPhone',
                {
                  rules: [{
                    required: true,
                    message: '收件人电话不为空',
                  }],
                }
              ]"
              placeholder="请输入收件人电话"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">计费信息</h2>
        </a-col>
        <a-col :span="12">
          <a-form-item label="计费重量" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              addonAfter="公斤"
              type="number"
              placeholder="请输入数字"
              v-decorator="[
                'toActualWeight',
                {
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="保价费" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              addonAfter="元"
              type="number"
              placeholder="请输入数字"
              v-decorator="[
                'toValueCost',
                {
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="其他运费" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              addonAfter="元"
              type="number"
              placeholder="请输入数字"
              v-decorator="[
                'toOtherCost',
                {
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="btn-groups">
          <a-button @click="handleCancel" class="item-btn">取 消</a-button>
          <a-button type="primary" html-type="submit" class="item-btn">确认添加</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script>
import FormMixin from '@/mixins/form'

export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 12 }
      }
    }
  },
  computed: {
    count() {
      return this.expand ? 11 : 7
    }
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.FORM.validateFields((error, values) => {
        console.log(values)
      })
    },

    handleReset() {
      this.form.resetFields()
    },

    handleCancel() {
      this.$router.go(-1)
    }
  },
  mixins: [FormMixin]
}
</script>
<style lang="less">
.components-add {
  margin-top: 40px;
  .form-item-title {
    font-size: 20px;
    color: #888;
    border-left: 6px #1890ff solid;
    text-indent: 8px;
    line-height: 1.2;
  }
}
.ant-form-item-label {
  text-align: left !important;
}
.btn-groups {
  margin-top: 40px;
  text-align: center;
  .item-btn {
    margin: 0 6px;
    width: 120px;
  }
}
</style>