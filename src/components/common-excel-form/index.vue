<template>
  <a-form :form="AntForm" @submit="handleSubmit">
    <a-row>
      <a-col :span="12" v-for="item in options" :key="item.label">
        <a-form-item :wrapperCol="wrapperCol" :labelCol="labelCol" :label="item.label">
          <component :is="`c-${item.component}`" :options="item"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item class="form-btns">
      <a-button type="primary" html-type="submit">确认</a-button>
    </a-form-item>
  </a-form>
</template>
<script >
/* eslint-disable space-before-function-paren */
import CSelect from './select'
import CInput from './input'

export default {
  name: 'excel-form',
  data() {
    return {
      AntForm: this.$form.createForm(this),
      wrapperCol: {
        span: 14
      },
      labelCol: {
        span: 10
      }
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.AntForm.validateFields((err, values) => {
        this.$emit('submit', values)
        // console.log('Received values of form: ', values)
        // if (!err) {
        //   this.$emit('submit', values)
        // }
      })
    }
  },
  components: {
    CSelect,
    CInput
  }
}
</script>
