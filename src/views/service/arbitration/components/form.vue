<template>
  <div class="components-form">
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <a-form-item hidden>
        <a-input v-decorator="['category',{ initialValue:`${fieldValues.category}`}]" />
      </a-form-item>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="被投诉网点" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader :options="siteOptions" placeholder="请选择" class="form-item"/>
          </a-form-item>
        </a-col>
         <a-col :span="12">
          <a-form-item label="投诉类型" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="请选择"
              :allowClear="true"
              v-decorator="[
                'type',
                { initialValue:`${fieldValues.type}`,
                  rules: [{ required: true, message: '必须选择费项类别' }
                  ]}
              ]"
            >
              <a-select-option value="1">派件费</a-select-option>
              <a-select-option value="2">中转费</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="params.category === 1">
          <a-form-item label="投诉网点" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader :options="siteOptions" placeholder="请选择" class="form-item"/>
          </a-form-item>
        </a-col>
        <!-- </a-row> -->
        <!-- <a-row :gutter="24"> -->
        <a-col :span="12" v-if="params.category === 2">
          <a-form-item label="投诉人" :label-col="labelCol" :wrapper-col="wrapperCol">
           <a-input
              class="form-item"
              v-decorator="[
                `complainant`,
                {
                  initialValue: `${fieldValues.complainant}`,
                  rules: [{
                    required: true,
                    message: '投诉人不能为空',
                  }],
                }
              ]"
              placeholder="请输投诉人"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="params.category === 2">
          <a-form-item label="投诉人电话" :label-col="labelCol" :wrapper-col="wrapperCol">
           <a-input
              class="form-item"
              v-decorator="[
                `tel`,
                {
                  initialValue: `${fieldValues.tel}`,
                  rules: [{
                    required: true,
                    message: '投诉人不能为空',
                  }],
                }
              ]"
              placeholder="请输投诉人电话"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12" v-if="params.category === 1">
          <a-form-item label=" " :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol" >
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="有关订单" :label-col="labelCol" :wrapper-col="wrapperCol" >
            <a-switch 
            checkedChildren="是" 
            unCheckedChildren="否"
            @change='handlOrder'/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="订单编号" :label-col="labelCol" :wrapper-col="wrapperCol" v-show="aboutOrder">
            <a-input
              class="form-item"
              placeholder="请输入订单编号"
            />
          </a-form-item>
        </a-col>
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
import {mapGetters} from 'vuex'

const range = range2ymd('2018-09-08', '2019-03-01')
export default {
  data() {
    return {
      aboutOrder: false,
      width: '150px',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
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
    ...mapGetters(['nickName']),
    method() {
      if (this.mode === 'edit') return 'put'
      return this.mode
    },
    fieldValues() {
      const { method, values, params } = this
      if (method === 'put') {
        const picker = range2ymd(values.String, values.endTime)
        return { ...values }
      }
      console.log(params)
      return params
    }
  },
  methods: {
    // interceptors(values) {
    //   const { picker, ...args } = values
    //   const [startTime, endTime] = picker
    //   return {
    //     ...this.params,
    //     ...args,
    //     startTime: startTime.format('YYYY-MM-DD'),
    //     endTime: endTime.format('YYYY-MM-DD')
    //   }
    // },
    handlOrder() {
      this.aboutOrder = !this.aboutOrder
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