<template>
  <a-modal
    :title="title"
    :visible="visible"
    :footer="null"
    :width="800"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <div class="components-form">
      <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
        <a-form-item hidden>
          <a-input v-decorator="['category',{ initialValue:fieldValues.category}]"/>
        </a-form-item>
        <a-row :gutter="24">
<!--          <a-col :span="12">-->
<!--            <a-form-item label="被投诉网点" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--              <a-cascader-->
<!--                expandTrigger="hover"-->
<!--                style="width: 100%;"-->
<!--                v-decorator="[-->
<!--                'respondent',-->
<!--                {-->
<!--                  rules: [{ required: true, message: '被投诉网点' }-->
<!--                  ]}-->
<!--              ]"-->
<!--                :options="siteListTree"-->
<!--                placeholder="请选择被投诉网点"-->
<!--                class="form-item"-->
<!--                changeOnSelect-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="12">
            <a-form-item label="投诉类型" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-cascader
                expandTrigger="hover"
                :options="compalintType"
                placeholder="选择投诉类型"
                v-decorator="[
                'type',
                {
                  rules: [{ required: true, message: '必须选择费项类别' }
                  ]}
              ]"
              ></a-cascader>
            </a-form-item>
          </a-col>
<!--          <a-col :span="12" v-if="params.category === 1">-->
<!--            <a-form-item label="投诉网点" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--              <a-cascader-->
<!--                style="width: 100%;"-->
<!--                v-decorator="[-->
<!--                'complainants',-->
<!--                {-->
<!--                  rules: [{ required: true, message: '必须选择投诉网点' }-->
<!--                  ]}-->
<!--              ]"-->
<!--                :options="siteListTree"-->
<!--                placeholder="请选择"-->
<!--                class="form-item"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12" v-if="params.category === 2">-->
<!--            <a-form-item label="投诉人" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--              <a-input-->
<!--                class="form-item"-->
<!--                v-decorator="[-->
<!--                'complainants',-->
<!--                {-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '投诉人不能为空',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--                placeholder="请输投诉人"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :span="12" >
            <a-form-item label="投诉人电话" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                v-decorator="[
                `tel`,
                {
                  initialValue: fieldValues.tel,
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
<!--          <a-col :span="12" >-->
<!--            <a-form-item label=" " :colon="false" :label-col="labelCol" :wrapper-col="wrapperCol"></a-form-item>-->
<!--          </a-col>-->
          <a-col :span="12">
            <a-form-item label="有关订单" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-switch checkedChildren="是" unCheckedChildren="否" @change="handlOrder"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="订单编号"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              v-show="aboutOrder"
            >
              <a-input class="form-item" placeholder="请输入订单编号"
                       v-decorator="[
                'waybillId',
                {
                  rules: [{
                    required: false,
                    message: '请输入订单编号',
                  }],
                }
              ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="账号类型"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-select  v-decorator="[
                'category',
                {
                  rules: [{
                    required: true,
                    message: '账号类型',
                  }],
                }
              ]"
                         placeholder="请选择账号类型">
                <a-select-option v-for="item in userType" :key="item.value"
                >{{item.name}}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="详情" :label-col="{span: 3}" :wrapper-col="{span: 21}">
              <a-textarea
                v-decorator="[
                'detail',
                {
                  rules: [{
                    required: true,
                    message: '请输入投诉描述',
                  }],
                }
              ]"
                placeholder="请输入投诉描述"
              />
            </a-form-item>
            <a-form-item label="备注" :label-col="{span: 3}" :wrapper-col="{span: 21}">
              <a-textarea
                rows="4"
                placeholder="请输入备注"
                v-decorator="['remark']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" :style="{ textAlign: 'center' }">
            <a-button type="primary" html-type="submit">确认</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-modal>
</template>
<script>
import FormMixis from '@/mixins/form'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      aboutOrder: false,
      width: '150px',
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
      userType:[
        {name: '当日达', value: 1},
        {name: '即时达', value: 2},
      ]
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    compalintType: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: () => false
    }
  },
  mixins: [FormMixis],
  computed: {
    ...mapGetters(['siteListTree', 'id2Label', 'nickname', 'userId']),
    fieldValues() {
      const { params } = this
      return params
    },
    title() {
      console.log(this.siteListTree)
      const label = this.params.label
      return `添加${label}`
    }
  },
  mounted() {
    // this.$http()
  },
  methods: {
    handlOrder() {
      this.aboutOrder = !this.aboutOrder
    },
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      const { id2Label } = this
      let { type, respondents, category, complainants, remark, ...props } = values
      // const respondentId = respondents.slice().pop()
      // const respondent = id2Label[respondentId].label
      // let complainant = complainants
      // let complainantId = ''
      // if (category === 1) {
      //   complainantId = complainants.slice().pop()
      //   complainant = id2Label[complainantId].label
      // }
     // category = String(category)
      return {
        ...props,
        type: type.slice().pop(),
        remark,
        category,
        // respondent,
        // respondentId,
        // complainantId,
        // complainant,
        // logs: [
        //   {
        //     user: this.nickname,
        //     remark,
        //     userId: this.userId
        //   }
        // ]
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
