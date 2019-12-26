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
        <a-col :span="12">
          <a-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              v-decorator="[
                `userName`,
                {
                  initialValue: `${fieldValues.userName}`,
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
        <a-col :span="12">
          <a-form-item label="性别" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-radio-group
              v-decorator="[
                `gender`,
                {
                  initialValue: `${fieldValues.gender}`,
                  rules: [{
                    required: true
                  }],
                }
              ]"
            >
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="登录账号" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="number"
              placeholder="手机号码即为登录账号"
              v-decorator="[
                'tel',
                {
                  initialValue: `${fieldValues.tel}`,
                  rules: [{
                    required: true,
                    message: '请输入手机号码'
                  },
                  {
                    pattern: /^1[35789]\d{9}$/g,
                    message: '请输入合法手机号码'
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="登录密码" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="1"
              :max="100000"
              class="form-item"
              placeholder="默认密码123456"
              v-decorator="[
                'password',
                {
                  initialValue: `${fieldValues.password}`,
                  rules: [{
                    required: true,
                    message: '请输入密码',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属部门" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              placeholder="选择所属部门"
              v-decorator="[
                'dept',
                {
                  initialValue: `${fieldValues.dept}`,
                  rules: [{
                    required: true,
                    message: '请选择部门',
                  }],
                }
              ]"
            >
              <a-select-option value="IT部">IT部</a-select-option>
              <a-select-option value="物流部">物流部</a-select-option>
              <a-select-option value="人事部">人事部</a-select-option>
              <a-select-option value="财务部">财务部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              placeholder="选择角色"
              v-decorator="[
                'roleName',
                {
                  initialValue: `${fieldValues.roleName}`,
                  rules: [{
                    required: true,
                    message: '请选择角色',
                  }],
                }
              ]"
            >
              <a-select-option value="管理员">管理员</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-radio-group
              v-decorator="[
                'state',
                {
                  initialValue: `${fieldValues.state}`,
                  rules: [{
                    required: true
                  }],
                }
              ]"
            >
              <a-radio value=1>启用</a-radio>
              <a-radio value=2 >禁用</a-radio>
            </a-radio-group>
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
import FormMixis from '@/mixins/form'

export default {
  name: 'QuoteForm',
  data() {
    return {
      wrapperCol: {
        span: 12
      },
      labelCol: {
        span: 6
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
    postParams: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 850
    }
  },
  computed: {
    method() {
      return this.row.id ? 'put' : 'post'
    },
    formTitle() {
      const { id } = this.row
      const title = id ? `修改账号` : `添加账户`
      return id ? `修改账号` : `添加账户`
    },
    fieldValues() {
      console.log('row--->')
      const { role = {}, id, ...params } = this.row
      return {
        userName: 'xxx'
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    interceptors(values) {
      const { id } = this.row
      const { roleName, dept, ...params } = values

      const post = {
        ...params,
        role: {
          roleName,
          dept
        }
      }
      if (id) {
        return {
          id,
          ...post
        }
      }
      return post
    }
  },
  mixins: [FormMixis]
}
</script>
<style lang="less" scoped>
.form-title {
  .form-title-label {
    font-size: 18px;
    font-weight: 700;
    color: #146bda;
  }
  .form-title-id {
    padding-left: 20px;
    font-size: 12px;
  }
}
.form-btns {
  text-align: center;
}
</style>
