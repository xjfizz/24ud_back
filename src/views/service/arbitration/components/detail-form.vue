<template>
  <a-modal :visible="visible" :footer="null" :width="width" @cancel="handleClose">
    <header slot="title">
      <span class="detail-title">{{btn && btn.title}}</span>
    </header>
    <a-row class="cancel-info">
      <a-col span="12">
        <span class="item-label">仲裁编号:</span>
        {{row.id}}
      </a-col>
      <a-col span="12">
        <span class="item-label">投诉编号:</span>
        {{row.complaintId}}
      </a-col>
      <a-col span="12">
        <span class="item-label">仲裁类型:</span>
        {{row.arbitrationType}}
      </a-col>
      <a-col span="12">
        <span class="item-label">来源网点:</span>
        {{row.complainant}}
      </a-col>
    </a-row>
    <div v-if="state === 3" class="upload">
      <span class="upload-label">上传附件:</span>
      <a-upload name="file" :multiple="true" :action="upload" @change="handleChange">
        <a-button>
          <a-icon type="upload"/>上传附件
        </a-button>
      </a-upload>
    </div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="备注" :labelCol="labelCol" :wrapper-col="wrapperCol" v-if="state === 3">
        <a-textarea
          rows="4"
          placeholder="请输入详细描述处理结果"
          v-decorator="[
            'arbitrationDescribe',
            {rules: [{ required: true, message: '请输入详细描述处理结果' }]}
          ]"
        />
      </a-form-item>
      <a-form-item class="form-btns">
        <a-button type="primary" html-type="submit">确认</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script >
import { URL_SERVICE_ARBITRATIONS } from '@/api/url'
import { mapGetters } from 'vuex'

export default {
  name: 'ArbitrationDetailForm',
  data() {
    return {
      form: this.$form.createForm(this),
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      }
    }
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    btn: {
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
    ...mapGetters(['nickname']),
    closable() {
      return true
    },
    state() {
      const { btn = {} } = this
      return btn.state || ''
    },
    upload() {
      const { row } = this
      return `/api/arbitration/${row.id}/upload`
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const { row, state } = this
          const operationPerson = row.operationPerson || `测试用户${parseInt(Math.random() * 10)}`
          const data = {
            operationPerson,
            id: row.id,
            state,
            logs: [
              {
                user: this.nickname
              }
            ]
          }
          if (state === 3) {
            data.arbitrationDescribe = row.arbitrationDescribe
          }
          return this.$http
            .patch(URL_SERVICE_ARBITRATIONS, data)
            .then(res => {
              this.$message.success('操作成功')
              this.reload()
              this.$emit('submit-form')
            })
            .catch(error => {
              this.$message.error('系统错误，请稍后再试')
            })
        }
        this.$message.warn('请按要求填写')
      })
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  },
  inject: ['reload']
}
</script>
<style lang="less" scoped>
.upload {
  padding: 20px 0;
  .upload-label {
    margin-right: 20px;
  }
}
.cancel-info {
  margin: 20px 0;
  .item-label {
    display: inline-block;
    width: 80px;
  }
}
.form-btns {
  text-align: center;
}
</style>
