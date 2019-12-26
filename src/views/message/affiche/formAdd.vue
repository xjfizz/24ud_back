<template>
  <a-card :title="formTitle.label" class="components-add">
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">基本信息</h2>
        </a-col>
        <a-col :span="24">
          <a-form-item class="form-item" label="标题" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="text"
              v-decorator="[
                'title',
                {
                  initialValue: fieldValues.title,
                  rules: [{
                    required: true,
                    message: '标题不为空',
                  }],
                }
              ]"
              placeholder="标题内容限20字"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item class="form-item" label="分类" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-radio-group
              v-decorator="[
                'type',
                {
                  initialValue: fieldValues.type,
                  rules: [{
                    required: true,
                    message: '必须指定派件方式',
                  }],
                }
              ]"
              @change="handleChangeRadio"
            >
              <a-radio value="普通">普通</a-radio>
              <a-radio value="图文">图文</a-radio>
              <a-radio value="链接">链接</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="生效日期" :label-col="{span: 4}" :wrapper-col="wrapperCol">
            <a-range-picker
              class="form-item"
              clearText
              v-decorator="['picker',
                {
                  initialValue: fieldValues.picker,
                  rules: [{
                    required: true,
                    message: '必须选择生效日期',
                  }],
                }]"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">内容</h2>
        </a-col>
        <a-col :span="24">
          <a-form-item class="form-item" label="主图" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-upload
              listType="picture"
             @change="handleUploadChange"
              :beforeUpload="beforeUpload"
              :action="url_upload"
              v-decorator="['img', {
              valuePropName: 'img'
        }]"
            >
              <a-button>
                <a-icon type="upload"/>图片上传
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="请输入内容"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            v-if="typeContent==='普通'"
          >
            <a-textarea
              rows="4"
              placeholder="限1000字以内"
              v-decorator="[
            'content',
            {initialValue: fieldValues.content,rules: [{ required: true, message: '请输入内容' }]}
          ]"
            />
          </a-form-item>

          <!-- CommonEditor -->
          <a-form-item
            label="图文"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            v-if="typeContent==='图文'"
          >
            <common-editor @input="handleInputEditor" :value="fieldValues.content"/>
            <a-textarea
              class="editor-content"
              v-decorator="[
            'content',
            {initialValue: fieldValues.content,rules: [{ required: true, message: '请输入内容' }]}
          ]"
            />
          </a-form-item>
          <a-form-item
            label="链接"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            v-if="typeContent==='链接'"
          >
            <a-input
              addonBefore="Https://"
              addonAfter=".com"
              v-decorator="[
            'content',
            {rules: [{ required: true, message: '请输入链接' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item
            class="form-item"
            label="发布时间"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-radio-group
              v-decorator="[
                'state',
                {
                  initialValue: `${fieldValues.state}`,
                  rules: [{
                    required: true,
                    message: '发布时间',
                  }],
                }
              ]"
            >
              <a-radio value="1">暂不发布，放入未发布的列表中</a-radio>
              <a-radio value="2">立即发布</a-radio>
            </a-radio-group>
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
import CommonEditor from '@/components/common-editor'
import { postParams, url } from './config'
import { URL_AFFICHE_UPLOAD } from '@/api/url'
import FormMixin from '@/mixins/form'
import moment from 'moment'

const CATE = {
  1: {
    label: 'APP公告'
  },
  2: {
    label: '系统公告'
  }
}
export default {
  data() {
    return {
      url,
      url_upload: URL_AFFICHE_UPLOAD,
      id: '',
      fields: {},
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 18
      },
      typeContent: '普通',
      fileList: [],
      editContent: '',
      userInfo:{}, // 富文本内容
      imageUrl: '',
      imageFile: null
    }
  },
  computed: {
    route() {
      const { params } = this.$route
      return {
        params
      }
    },
    fieldValues() {
      if (this.id) {
        const { releaseTime, lastTime } = this.fields
        const picker = [moment(releaseTime), moment(lastTime)]
        return { ...this.fields, picker }
      } 
      return {
        ...postParams
      }
    },
    category() {
      const { query = {} } = this.$route
      const { category = 1, id } = query
      if (id) {
        this.id = id
        this.loadFetchForm()
      } else {
        this.resetForm()
      }
      return category
    },
    formTitle() {
      const { category } = this
      return CATE[category]
    },
    method() {
      return this.$route.query.id ? 'put' : 'post'
    }
  },
  created() {
    this.init()
  },
  methods: {

    resetForm() {
       this.FORM.resetFields();
        // this.options.times = [
        //   { startTime: null,  endTime: null,}
        // ]
      },
    init() {
      
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
   //   this.url_upload = `${URL_AFFICHE_UPLOAD}?id=${this.userInfo.orgId}`
      
    },
    handleInputEditor(html) {
      this.fieldValues.content = html
    },
    handleChangeRadio(e) {
      this.typeContent = e.target.value
    },
    handleCancel() {
      this.$router.go(-1)
    },
    loadFetchForm() {
      this.$http.get(this.url, { params: { id: this.id } }).then(res => {
        const [data] = res.data.data.rows
        this.fields = data
      })
    },
    interceptors(values) {
   const { picker, ...args } = values
      const [startTime, endTime] = picker
      let img = this.imageUrl
    
 
      let data = {
        category: this.category,
        ...args,
        img,
        releaseTime: startTime.format('YYYY-MM-DD'),
        lastTime: endTime.format('YYYY-MM-DD')
      }
      if (this.id) {
        data.id = this.id
      }

      return data
    },

    beforeUpload(file) {
     return false;
    },

    handleUploadChange(e) {
      console.log('img', e, e.fileList[0].size)
      console.log('uploadImgP', this.uploadImgP)
      this.imageFile = e.file
      if(this.imageFile) {
        this.UploadImg()
      }
    },
        UploadImg() {
      console.log('手动上传', this.fileList, this.imageUrl,this.form)
       let data = {
        id:'notice/' + this.userInfo.orgId || '',
        file: this.imageFile || ''
      }
      let formData = new FormData()
      formData.append('file', data.file)
      formData.append('id', data.id)
       this.$http['post'](`${this.url_upload}`, formData).then( res => {
        if(res.data.code === 200) {
          this.imageUrl = res.data.data
        //  this.$emit('close')
        //  this.visibleNext = false
        } else {
          return  this.$message.success('上传失败!')
        }
        console.log(res)
      }).catch(error => {
        console.log('错误')
      })
        },
     submitResult(data) {
          console.log('data', data)
          this.$router.push({path:'/message/affiche'})
     }

  },
  mixins: [FormMixin],
  components: {
    CommonEditor
  }
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
.tips {
  color: #ff0000;
  color: 12px;
}
.editor-content {
  display: none;
}
</style>