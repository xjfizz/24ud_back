<template>
  <a-modal :visible="visible" :footer="null" :width="width" @cancel="handleClose">
    <header slot="title">
      <span class="detail-title" v-if="cate===4">
        客诉成功确认
        <i class="danger">*客诉成功后的单据直接进入仲裁</i>
      </span>
      <span class="detail-title" v-if="cate===2">客诉处理</span>
      <span class="detail-title" v-if="cate===3">是否确认解决</span>
    </header>
    <a-row class="cancel-info">
      <a-col span="12">
        <span class="item-label">投诉编号:</span>
        {{row.id}}
      </a-col>
      <a-col span="12">
        <span class="item-label">投诉网点:</span>
        {{row.complainant}}
      </a-col>
      <a-col span="12">
        <span class="item-label">:</span>
        {{row.respondent}}
      </a-col>
      <a-col span="12">
        <span class="item-label">投诉类型:</span>
        {{row.type}}
      </a-col>
    </a-row>
    <div class="upload" v-if="cate!==2">
      <span class="upload-label">上传附件:</span>
      <a-upload name="file" :multiple="true" :action="uploadUrl" @change="handleChange">
        <a-button>
          <a-icon type="upload"/>上传附件
        </a-button>
      </a-upload>
    </div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="备注" :labelCol="labelCol" :wrapper-col="wrapperCol" v-if="cate!==2">
        <a-textarea
          rows="4"
          placeholder="请输入详细描述处理结果"
          v-decorator="[
            'remark',
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
import UploadMixin from '@/mixins/upload'
import { URL_SERVICE_COMPLAINT } from '@/api/url'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplaintDetailForm',
  data() {
    return {
      form: this.$form.createForm(this),
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      url: URL_SERVICE_COMPLAINT
    }
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    cate: {
      type: Number
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
    mask() {
      const { mask } = this.options || {}
      return mask || true
    },
    statusText() {
      const { module } = this
      return module.label
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
          const { row } = this
          const data = {
            logs: [
              {
                user: this.nickname,
                ...values
              }
            ],
            id: row.id,
            state: this.cate
          }
          return this.$http
            .patch(URL_SERVICE_COMPLAINT, data)
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
  mixins: [UploadMixin],
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
.danger {
  color: red;
  font-size: 12px;
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
