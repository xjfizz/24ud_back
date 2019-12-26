/*
 * @Author: your name
 * @Date: 2019-11-27 18:04:31
 * @LastEditTime: 2019-12-05 12:06:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\mixins\form.js
 */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
export default {
  data() {
    return {
      FORM: this.$form.createForm(this, {
        props: {
          ...this.fieldValues
        }
      }),
      reloading: true
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const  it = this
      this.FORM.validateFields(async (err, values) => {
        if (!err) {
          const { reloading, url, method = 'post' } = this
          if (!it.interceptorsValid(values)) {
            return
          }
          let data = await it.interceptors(values)
            console.log('---0',method, url, data)
            // if(method === 'patch') {
            //     data = JSON.stringify(data)
            //     console.log('---1',method, url, data)
            // }
            // console.log('---2',method, url, data)
            return it.$http[method](url, data)
            .then(res => {
               if(res.data.code === 200) {
                 this.submitResult(data)
                 console.log("-form111--")
                    it.$emit('submit-form', data)
                    if (reloading) {
                        it.reload()
                    }
                    console.log("-form--")
                    it.interceptorsSuccess()
                    it.submitSuccess(res)
                    return res
                } else {
                    this.$message.error(res.data.message)
                }
            })
            .catch(error => {
             // console.log(error)
              it.submitError(error)
            })
        }
        this.$message.warn('请按要求填写')
      })
    },
    interceptors(values) {
      return values
    },
    submitSuccess() {
      this.$message.success('操作成功')
    },

    submitResult(data){

    },
    interceptorsSuccess() {},
    interceptorsValid(data) {
      return true
    },
    submitError(error) {
      // console.error(error.message)
      this.$message.error('系统错误，请稍后再试')
    },
    onValuesChange(props, value) {}
  },
  computed: {
    methodType() {}
  },
  inject: ['reload']
}
