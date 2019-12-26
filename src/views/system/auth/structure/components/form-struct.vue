<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col>
          <a-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                `name`,
                {
                  initialValue: fieldValues.name,
                  rules: [{
                    required: true,
                    message: '请输入用户名',
                  }],
                }
              ]"
              placeholder="请输入用户名"
            />
          </a-form-item>
        </a-col>
<!--        <a-col>-->
<!--          <a-form-item label="类型" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-select-->
<!--              placeholder="选择所属类型"-->
<!--              v-decorator="[-->
<!--                'type',-->
<!--                {-->
<!--                  initialValue: fieldValues.type,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请选择所属类型',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            >-->
<!--              <a-select-option value=1>大区</a-select-option>-->
<!--              <a-select-option value=2>分拨中心</a-select-option>-->
<!--              <a-select-option value=3>站点</a-select-option>-->
<!--              <a-select-option value=4>区域</a-select-option>-->
<!--              <a-select-option value=5>其他</a-select-option>-->
<!--            </a-select>-->
<!--          </a-form-item>-->
<!--        </a-col>-->

        <template v-if="codeDecorator.show">
          <a-form-item label="区域编号" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              v-if="codeDecorator.len === 3"
              class="form-item"
              v-decorator="[
                'code',
                {
                  initialValue: fieldValues.code,
                  rules: [{
                    required: true,
                    message: '区域编号',
                  },
                  {
                    len: 3,
                    message: '请输入三位数编码'
                  }],
                }
              ]"
              placeholder="请输入三位数编码"
            />
            <a-input
              v-else
              class="form-item"
              v-decorator="[
                'code',
                {
                  initialValue: fieldValues.code,
                  rules: [{
                    required: true,
                    message: '区域编号',
                  },
                  {
                    len: 2,
                    message: '请输入两位数编码'
                  }],
                }
              ]"
              placeholder="请输入两位数编号"
            />
          </a-form-item>
        </template>

        <template v-if="level2">
          <a-col>
            <a-form-item label="城市" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                v-decorator="[
                'city',
                {
                  initialValue: fieldValues.city,
                  rules: [{
                    required: true
                  }],
                }
              ]"
                placeholder="请填写当前所在城市"
              />
              <!--  placeholder="可选，新建城市分拨中心时请填写，其余请忽略" -->
            </a-form-item>
          </a-col>
        </template>
        <template v-if="level3">
          <a-col>
            <a-form-item label="负责人" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                v-decorator="[
                'leader',
                {
                  initialValue: fieldValues.leader,
                  rules: [{
                    required: true,
                    message: '请填写负责人名字',
                  }],
                }
              ]"
                placeholder="请填写负责人名字"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="负责人手机" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                type="number"
                v-decorator="[
                'leaderTel',
                {
                  initialValue: fieldValues.leaderTel,
                  rules: [{
                    required: true,
                    message: '请填写负责人手机号码',
                  },
                  {
                    pattern: /^1[3456789]\d{9}$/g,
                    message: '请填写正确的手机号码格式',
                  }],
                }
              ]"
                placeholder="请填写负责人手机号码"
              />
            </a-form-item>
          </a-col>
<!--          <a-col :span="12">-->
<!--            <a-form-item label="网点模式" :label-col="{span: 10}" :wrapper-col="wrapperCol">-->
<!--              <a-radio-group-->
<!--                v-decorator="[-->
<!--                'mode',-->
<!--                {-->
<!--                  initialValue: fieldValues.mode,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请选择网点模式',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--              >-->
<!--                <a-radio value="1">直营</a-radio>-->
<!--                <a-radio value="2">加盟</a-radio>-->
<!--              </a-radio-group>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="启用财务中心" :label-col="{span: 10}" :wrapper-col="wrapperCol">-->
<!--              <a-radio-group-->
<!--                v-decorator="[-->
<!--                'startMoneyCentre',-->
<!--                {-->
<!--                  initialValue: fieldValues.startMoneyCentre,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请选择是否启用财务中心',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--              >-->
<!--                <a-radio :value="true">是</a-radio>-->
<!--                <a-radio :value="false">否</a-radio>-->
<!--              </a-radio-group>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :span="12">-->
<!--            <a-form-item label="启用货到付款" :label-col="{span: 10}" :wrapper-col="wrapperCol">-->
<!--              <a-radio-group-->
<!--                v-decorator="[-->
<!--                'startAllowArrive',-->
<!--                {-->
<!--                  initialValue: fieldValues.startAllowArrive,-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '请选择是否启用启用货到付款',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--              >-->
<!--                <a-radio :value="true">是</a-radio>-->
<!--                <a-radio :value="false">否</a-radio>-->
<!--              </a-radio-group>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </template>
        <a-col :span="24" v-if="level4">
          <a-form-item label="网点模式" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-radio-group
              v-decorator="[
                'mode',
                {
                  initialValue: fieldValues.mode + '',
                
                  rules: [{
                    required: true,
                    message: '请选择网点模式',
                  }],
                }
              ]"
            >
              <a-radio value="1">直营</a-radio>
              <a-radio value="2">加盟</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        </a-form-item>
        <a-col :span="24">
          <a-form-item label="上级类别" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              v-decorator="[
                'parentId',
                {
                  initialValue: fieldValues.parentId,
                  rules: [{
                    message: '上级类别',
                  }],
                }
              ]"
            >
              <a-select-option :value="fieldValues.parentId">默认上级,且不可修改</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script >
import { mapActions } from 'vuex'
import FormMixis from '@/mixins/form'
export default {
  name: 'StructForm',
  data() {
    return {
      wrapperCol: {
        span: 12
      },
      labelCol: {
        span: 6
      },
      reloading: false
    }
  },
  props: {
    url: {
      type: String
    },
    post: {
      type: Boolean,
      default: true
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
      default: 650
    }
  },
  computed: {
    method() {
      return this.post ? 'post' : 'put'
    },
    formTitle() {
      console.log('struct', this.row)
     // const { parentId } = this.row
      console.log('this.row', this.row);
      return !this.post ? `修改栏目` : `添加栏目`
    },
    fieldValues() {
      const { id, parentId, ...props } = this.row
      return {
        ...props,
        parentId: this.post ? id : parentId
      }
    },
    level2() {
      // level2（0-2
      const { level } = this.row
      return this.post ? level < 3 : level < 4
    },
    level3() {
      const { level } = this.row
      return this.post ? level === 3 : level === 4
    },
    level4() {
      const { level } = this.row
      return this.post ? (level >= 0 && level < 3 ): (level > 0 && level < 4)
    },
    codeDecorator() {
      const { level } = this.row
      console.log('level', level, this.post)
      const show = this.post ? level < 4 : (level > 1 || level < 3) && level !== 5
      const len = this.post ? (level === 1 ? 4 : 3) : level == 2 ? 4 : 3
      return {
        show,
        len
      }
    }
  },
  methods: {
    ...mapActions(['GetSite']),
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      let { id, level } = this.row

      if (this.post) {
        return {
          level: ++level,
          ...values
        }
      }
      return {
        id,
        level,
        ...values
      }
    },
    interceptorsSuccess() {
      this.$message.success('成功添加')
      this.GetSite()
      this.handleClose()
    }
  },
  mixins: [FormMixis]
}
</script>
