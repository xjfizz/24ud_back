<template>
  <div class="components-form">
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col :span="12" v-if="params.category === 1">
          <a-form-item label="所属网点" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader :options="siteOptions" placeholder="选择区域" class="form-item"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="目的区域" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader :options="siteOptions" placeholder="选择目的区域" class="form-item"/>
          </a-form-item>
        </a-col>
        <!-- </a-row> -->
        <!-- <a-row :gutter="24"> -->
        <a-col :span="12">
          <a-form-item label="费项类别" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="费项类别"
              :allowClear="true"
              v-decorator="[
                'type',
                { 
                  initialValue: `${fieldValues.type}`,
                  rules: [{ required: true, message: '必须选择费项类别' }
                ]}
              ]"
            >
              <a-select-option value="1">派件费</a-select-option>
              <a-select-option value="2">中转费</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="付款方式" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="付款方式"
              v-decorator="[
              'payment',
              {initialValue: `${fieldValues.payment}`,
                rules: [{ required: true, message: '必须选择付款方式' }]}
            ]"
            >
              <a-select-option value="2">到付</a-select-option>
              <a-select-option value="1">寄付</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- </a-row>
        <a-row :gutter="24">-->
        <a-col :span="12">
          <a-form-item label="重量模式" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="重量模式"
              v-decorator="[
                'weightMethod',
                {
                  initialValue: `${fieldValues.weightMethod}`,
                  rules: [{ required: true, message: '必须选择重量模式' }]}
                ]"
            >
              <a-select-option value="1">四舍五入</a-select-option>
              <a-select-option value="2">实际重量</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="选择日期" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-range-picker
              class="form-item"
              clearText
              format="YYYY-MM-DD"
              v-decorator="['picker',
                {
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }]"
            />
          </a-form-item>
        </a-col>
        <!-- </a-row>
        <a-row :gutter="24">-->
        <a-col :span="12">
          <a-form-item label="最低费用" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              addonAfter="RMB/KM"
              type="number"
              v-decorator="[
                `firstPrice`,
                {
                  initialValue: `${fieldValues.firstPrice || 0}`,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="首重(kg)" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              addonAfter="KG"
              type="number"
              placeholder="请输入数字"
              v-decorator="[
                'firstWeight',
                {
                  initialValue: `${fieldValues.additional || 0}`,
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
          <a-form-item label="附加费" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              placeholder="请输入数字"
              addonAfter="RMB/KM"
              v-decorator="[
                'additional',
                {
                  initialValue: `${fieldValues.additional || 0}`,
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
          <a-form-item label="重量封顶(kg)" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              addonAfter="KG"
              type="number"
              v-decorator="[
                `topWeight`,
                {
                  initialValue: `${fieldValues.firstPrice || 0}`,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
        <!-- </a-row>
        <a-row>-->
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import FormMixis from '@/mixins/form'
import { range2ymd } from '@/utils/time'
const range = range2ymd('2018-09-08', '2019-03-01')

export default {
  data() {
    return {
      width: '150px',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      siteOptions: [
        {
          value: '1',
          label: '西南分拨中心',
          children: [
            {
              value: '2',
              label: '四川',
              children: [
                {
                  value: '3',
                  label: '成都'
                }
              ]
            }
          ]
        },
        {
          value: '6',
          label: '华东分拨中心',
          children: [
            {
              value: '8',
              label: '苏州',
              children: [
                {
                  value: '9',
                  label: '姑苏'
                }
              ]
            }
          ]
        }
      ],
      areaOptions: [
        {
          value: '1',
          label: 'Zhejiang',
          children: [
            {
              value: '2',
              label: 'Hangzhou',
              children: [
                {
                  value: '3',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: '6',
          label: 'Jiangsu',
          children: [
            {
              value: '8',
              label: 'Nanjing',
              children: [
                {
                  value: '9',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => {}
    },
    mode: {
      type: String,
      default: 'post'
    },
    values: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [FormMixis],
  computed: {
    method() {
      if (this.mode === 'edit') return 'put'
      return this.mode
    },
    fieldValues() {
      const { method, values, params } = this
      if (method === 'put') {
        const picker = range2ymd(values.String, values.endTime)
        return { ...values, ...values.freight }
      }
      return params
    }
  },
  methods: {
    interceptors(values) {
      const { picker, additional, firstPrice, firstWeight, topWeight, type, ...args } = values
      const freight = { additional, firstPrice, firstWeight, topWeight }
      const [startTime, endTime] = picker
      return {
        ...this.params,
        ...args,
        type: +type,
        freight,
        startTime: startTime.format('YYYY-MM-DD'),
        endTime: endTime.format('YYYY-MM-DD')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.components-form {
  margin: 20px 0;
  .form-item {
    width: 200px;
  }
}
</style>