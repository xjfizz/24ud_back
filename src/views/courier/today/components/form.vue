<template>
  <div>
    <a-modal
      :title="formTitle"
      :visible="visible"
      :footer="null"
      :width="width"
      @cancel="handleClose"
    >
      <a-form :form="FORM" @submit="handleSubmit" v-if="!visibleNext">
        <a-row>
          <a-col span="12">
            <a-form-item label="姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                placeholder="姓名"
                v-decorator="[
            'name',
            {initialValue: fieldValues.name,
              rules: [{ required: true, message: '请输入姓名' }]}
          ]"
              />
            </a-form-item>
          </a-col>
          <a-col span="12" v-if="fieldValues.type===0">
            <a-form-item label="员工工号" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                placeholder="英文+数字（例：YD10001）"
                v-decorator="[
            'gid',
            {initialValue: fieldValues.gid,
              rules: [{ required: true, message: '请输入员工工号' }]}
          ]"
              />
            </a-form-item>
          </a-col>
          <a-col span="10">
            <a-form-item label="手机号码" :label-col="{span:8}" :wrapper-col="{span:15}">
              <a-input
                placeholder="请输入手机号码"
                type="number"
                v-decorator="[
            'phone',
            {initialValue: fieldValues.phone,
              rules: [
              { required: true, message: '请输入手机号码'},
               {pattern: /^1[345789]\d{9}$/g, message: '请输入正确的手机格式'}
               ]
               }

          ]"
              />
            </a-form-item>
          </a-col>
          <a-col span="2">
            <a-tooltip class="tips" placement="topLeft" title="默认初始密码： 123456" arrowPointAtCenter>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </a-col>
          <a-col span="12">
            <a-form-item label="紧急联系人号码" :label-col="{span: 8}" :wrapper-col="{span: 12}">
              <a-input
                placeholder="请输紧急联系人号码"
                v-decorator="[
            'emergencyPeople',
            {initialValue: fieldValues.emergencyPeople,
              rules: [
              { required: true, message: '请输入紧急联系人号码'},
              {pattern: /^1[345789]\d{9}$/g, message: '请输入正确的手机格式'}
               ]
               }

          ]"
              />
            </a-form-item>
          </a-col>
          <div class="full-row">
            <a-col span="8">
              <a-form-item label="证件类型" :label-col="{span: 11}" :wrapper-col="wrapperCol">
                <a-select
                  class="form-item"
                  placeholder="选择证件类型"
                  v-decorator="[
              'certificateType',
              {
                initialValue: fieldValues.certificateType,
                rules: [{ required: true, message: '选择证件类型' }]}
            ]"
                >
                  <a-select-option value="身份证">身份证</a-select-option>
                  <a-select-option value="护照">护照</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item class="form-item">
                <a-radio-group
                  v-decorator="[
                'sex',
                {
                  initialValue: fieldValues.sex+'',
                  rules: [{
                    required: true,
                    message: '必须指定性别',
                  }],
                }
              ]"
                >
                  <a-radio value="1">男</a-radio>
                  <a-radio value="0">女</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col span="11">
              <a-form-item label="证件号" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="请输入18位数字"
                  v-decorator="[
            'identity',
            {initialValue: fieldValues.identity,
              rules: [{ required: true, message: '请输入证件号' }]}
          ]"
                />
              </a-form-item>
            </a-col>
          </div>
          <!-- 当日达 -->
          <template v-if="fieldValues.type===0">
            <a-col span="12">
              <a-form-item label="所属站点" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-cascader
                  class="form-item"
                  expandTrigger="hover"
                  placeholder="选择所属站点"
                  @change="handleChangeSite"
                  style="width:300px"
                  :options="sites"
                  v-decorator="[
              'sites',
              {
                rules: [{ required: true, message: '选择所属站点' }]}
            ]"
                />
              </a-form-item>
            </a-col>
            <!-- <a-col span="12">
              <a-form-item label="负责区域" :label-col="labelCol" :wrapper-col="labelCol">
                <a-select
                  class="form-item"
                  style="width:250px"
                  placeholder="先选择站点，再选择负责区域"
                  :options="areas"
                  v-decorator="[
              'area',
              {
                rules: [{ required: true, message: '负责区域' }]}
            ]"
                ></a-select>
              </a-form-item>
            </a-col> -->
          </template>
          <template v-if="fieldValues.type===1">
            <a-col span="12">
              <a-form-item label="毕业院校" :label-col="labelCol" :wrapper-col="labelCol">
                <a-input
                  style="width: 300px;"
                  placeholder="请输入毕业院校"
                  v-decorator="[
            'school',
            {initialValue: fieldValues.school,
              rules: [
              { required: false, message: '请输入毕业院校'}
               ]
               }

          ]"
                />
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="学历" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-select
                  class="form-item"
                  placeholder="选择学历"
                  v-decorator="[
              'education',
              {
                initialValue: fieldValues.education,
                rules: [{ required: true, message: '选择证件学历' }]}
            ]"
                >
                  <a-select-option value="博士及以上">博士及以上</a-select-option>
                  <a-select-option value="硕士">硕士</a-select-option>
                  <a-select-option value="本科">本科</a-select-option>
                  <a-select-option value="专科">专科</a-select-option>
                  <a-select-option value="高中及以下">高中及以下</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col span="12">
              <a-form-item label="住址" :label-col="labelCol" :wrapper-col="labelCol">
                <a-input
                  style="width: 300px;"
                  placeholder="请输入住址"
                  v-decorator="[
            'address',
            {initialValue: fieldValues.address,
              rules: [
              { required: false, message: '请输入住址'}
               ]
               }

          ]"
                />
              </a-form-item>
            </a-col>

          </template>
        </a-row>
        <a-form-item class="form-btns">
          <!-- <a-button type="primary" html-type="submit">继续添加</a-button> -->
          <a-button type="primary" html-type="submit">下一步</a-button>
        </a-form-item>
      </a-form>
      <a-form   v-else>
        <div v-if="fieldValues.type===0">
          <!--当日达身份验证 -->
          <a-row :span="24">
            <a-col span="8" >
              <a-upload
                :remove="removeFile('front')"
                listType="picture"
                @change="handleUploadChange"
                :beforeUpload="beforeUpload"
              >
                <a-button>
                  <a-icon type="upload"/>上传身份证正面
                </a-button>
              </a-upload>
            </a-col>
            <a-col span="8">
              <a-upload
                :remove="removeFile('front')"
                listType="picture"
                @change="handleUploadChangeF"
                :beforeUpload="beforeUpload"
              >
                <a-button>
                  <a-icon type="upload"/>上传身份证反面
                </a-button>
              </a-upload>
            </a-col>
          </a-row>
          <a-form-item class="form-btns">
            <!-- <a-button type="primary" html-type="submit">继续添加</a-button> -->
            <a-button type="primary" @click="UploadImg(id)">确定</a-button>
          </a-form-item>
          <!--当日达身份验证-end -->
        </div>
        <div v-if="fieldValues.type===1">
          <!--及时达身份验证 -->
          <a-row :span="24">
            <a-col span="8" >
              <a-upload
                :remove="removeFile('front')"
                listType="picture"
                @change="handleUploadChange"
                :beforeUpload="beforeUpload"
              >
                <a-button>
                  <a-icon type="upload"/>上传身份证正面
                </a-button>
              </a-upload>
            </a-col>
            <a-col span="8">
              <a-upload
                :remove="removeFile('front')"
                listType="picture"
                @change="handleUploadChangeF"
                :beforeUpload="beforeUpload"
              >
                <a-button>
                  <a-icon type="upload"/>上传身份证反面
                </a-button>
              </a-upload>
            </a-col>
            <a-col span="8">
              <a-upload
                :remove="removeFile('diplomas')"
                listType="picture"
                @change="handleUploadChangeX"
                :beforeUpload="beforeUpload"
              >
                <a-button>
                  <a-icon type="upload"/>学历证书
                </a-button>
              </a-upload>
            </a-col>
          </a-row>
          <a-form-item class="form-btns">
            <!-- <a-button type="primary" html-type="submit">继续添加</a-button> -->
            <a-button type="primary" @click="UploadImgI()">确定</a-button>
          </a-form-item>
          <!--及时达身份验证-end -->
        </div>

      </a-form>
    </a-modal>
  </div>

</template>

<script >
  import FormMixis from '@/mixins/form'
  import UploadMixin from '@/mixins/upload'
  import { URL_COURIER_UPLOAD_BACK, URL_COURIER_UPLOAD_FRONT, URL_COURIER_UPLOAD_FRONT_DIPO, URL_COURIER } from '@/api/url'
  import ACol from "ant-design-vue/es/grid/Col";


  export default {
    name: 'TransportForm',
    components: {ACol},
    data() {
      return {
        wrapperCol: {
          span: 12
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        areas: [],
        upload_back: URL_COURIER_UPLOAD_BACK,
        upload_front: URL_COURIER_UPLOAD_FRONT,
        upload_diplo_front: URL_COURIER_UPLOAD_FRONT_DIPO,
        idCards: {},
        diplomas: '', // 学历证书
        disabled: {
          back: false,
          front: false
        },
        visibleNext: false,
        FORM: this.$form.createForm(this),
        uploadImgP: '',
        fileList: [],
        imageUrl: '',
        imageUrlF: '',
        imageUrlX: '',
        id: '',
        oid:'',
        oidName: ''
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
      visible: {
        type: Boolean,
        default: false
      },
      sites: {
        type: Array,
        default: () => []
      },
      allAreas: {
        type: Object,
        default: () => {}
      },
      width: {
        type: Number,
        default: 900
      }
    },
    computed: {
      closable() {
        return true
      },
      mask() {
        const { mask } = this.options || {}
        return mask || true
      },
      method() {
        return this.row.id ? 'patch' : 'post'
      },
      formTitle() {
        const { category = {}, id } = this.row
        const action = id ? '修改' : '添加'
        return `${action}${category.label}快递员`
      },
      fieldValues() {
        const { category, courier, ...props } = this.row
        console.log(this.row)
        const { gid } = courier || {}
        return {
          ...props,
          gid
        }
      }
    },
    methods: {
      handleChangeSite(e) {
        console.log('e', e, this.sites)

        const sid = e.slice().pop()
        this.oid = sid
        this.sites.forEach(item => {
          if(item.id ===  this.oid) {
            this.oidName = item.label
          }
        })
        this.areas = this.allAreas[sid]
        console.log('this.areas', this.oid)
      },
      handleClose() {
        this.$emit('close')
        this.visibleNext = false
      },
      interceptors(values) {
        const { sites = [], area, areaName, gid, education, school, address, diplomas, ...props } = values
        const { type, id } = this.row

        const data = {
          type,
          ...props
        }

        if (id) {
          data.id = id
        }

        if (type === 0) {
          // const oid = sites.slice().pop()
          const branches = this.oidName
          let oid = this.oid
          return {
            state: 2,
            courier: {
              oid,
              branches,
              areaName,
              area,
              gid,
            },
            ...data
          }
        } else {
          return {
            state: 2,
            timelyCourier: {
              idCards: { ...this.idCards },
              education,
              school,
              address,
              diplomas
            },
            ...data
          }
        }
      },
      handleUploadChange(e) {
        console.log('img', e, e.fileList[0].size)
        console.log('uploadImgP', this.uploadImgP)
        this.getBase64(e.file).then(res => {
          this.imageUrl = res
        });
      },
      handleUploadChangeF(e) {
        console.log('img', e, e.fileList[0].size)
        console.log('uploadImgP', this.uploadImgP)
        this.getBase64(e.file).then(res => {
          this.imageUrlF = res
        });
      },
      handleUploadChangeX(e) {
        console.log('img', e, e.fileList[0].size)
        console.log('uploadImgP', this.uploadImgP)
        this.getBase64(e.file).then(res => {
          this.imageUrlX = res
        });
      },
      beforeUpload(file) {
        return false;
      },
      removeFile(key) {
        this.disabled[key] = false
      },
      // 确定
      handleOk(e) {
        console.log(e);
        this.visibleNext = false
      },
      // 下一步
      next(e) {
        console.log('next', e)
      },
      // 提交表单
      handleSubmit (e) {
        console.log('this.site', this.sites)
        e.preventDefault();
        console.log('提交表单', e, this.fieldValues)
        // this.UploadImg()
        const  it = this
        this.FORM.validateFields(async (err, values) => {
          if (!err) {
            const data = await it.interceptors(values)
            console.log('Received values of form: ', values, URL_COURIER);
            let urlType = this.row.id ? 'patch' : 'post'
            console.log('data',data)
            it.$http[urlType](URL_COURIER, data).then( res => {
              if(res.data.code == 200) {
                console.log(res)
                 // this.visible = false
                  this.visibleNext = true
                 this.imgRes = res.data
                // this.UploadImg(res.data.id)
              } else {
                  this.$message.warning(res.data.message)
              }
              
            }).catch(error => {
              console.log('错误')
            })
          }
        });
      },
      // 手动上传图片
      UploadImg() {
        console.log('手动上传', this.fileList, this.imageUrl)
        let data = {
          id: this.imgRes.id || '',
          base64: this.imageUrl || ''
        }
        console.log('URL_COURIER_UPLOAD_FRONT', data)
        this.$http['post'](URL_COURIER_UPLOAD_FRONT, data).then( res => {
          if(res.data.code === 200) {
            // this.$message.success('上传成功!')
            // this.visible = false
            this.$emit('close')
            this.visibleNext = false
          } else {
            return  this.$message.success('上传失败!')
          }
          console.log(res)
        }).catch(error => {
          console.log('错误')
        })

        let dataFront = {
          id: this.imgRes.id || '',
          base64: this.imageUrlF || ''
        }
        console.log('URL_COURIER_UPLOAD_FRONT', dataFront)
        this.$http['post'](URL_COURIER_UPLOAD_BACK, dataFront).then( res => {
          if(res.data.code === 200 ) {
            // this.$message.success('上传成功!')
            // this.visible = false
            this.$emit('close')
            this.visibleNext = false
          } else {
            return  this.$message.success('上传失败!')
          }
          console.log(res)
        }).catch(error => {
          console.log('错误')
        })

      },
      // 手动上传图片
      UploadImgI() {
        console.log('手动上传', this.fileList, this.imageUrl)
        let data = {
          id: this.imgRes.id || '',
          base64: this.imageUrl || '',
          school: this.imgRes.timelyCourier.school || '',
          education: this.imgRes.timelyCourier.education || ''
        }
        console.log('URL_COURIER_UPLOAD_FRONT', data)
        this.$http['post'](URL_COURIER_UPLOAD_FRONT, data).then( res => {
          if(res.data.code === 200) {
            // this.$message.success('上传成功!')
            // this.visible = false
            this.$emit('close')
            this.visibleNext = false
          } else {
            return  this.$message.success('上传失败!')
          }
          console.log(res)
        }).catch(error => {
          console.log('错误')
        })

        let dataFront = {
          id: this.imgRes.id || '',
          base64: this.imageUrlF || '',
          school: this.imgRes.timelyCourier.school || '',
          education: this.imgRes.timelyCourier.education || ''
        }
        console.log('URL_COURIER_UPLOAD_FRONT', dataFront)
        this.$http['post'](URL_COURIER_UPLOAD_BACK, dataFront).then( res => {
          console.log('res',res)
          if(res.data.code === 200) {
            // this.$message.success('上传成功!')
            // this.visible = false
            this.$emit('close')
            this.visibleNext = false
          } else {
            return  this.$message.success('上传失败!')
          }
          console.log(res)
        }).catch(error => {
          console.log('错误')
        })


        /* 学历*/
        let dataX = {
          id: this.imgRes.id || '',
          base64: this.imageUrlX || '',
          school: this.imgRes.timelyCourier.school || '',
          education: this.imgRes.timelyCourier.education || ''
        }
        console.log('URL_COURIER_UPLOAD_FRONT', dataX)
        this.$http['post'](URL_COURIER_UPLOAD_FRONT_DIPO, dataX).then( res => {
          console.log('res',res)
          if(res.data.code === 200) {
            // this.$message.success('上传成功!')
            // this.visible = false
            this.$emit('close')
            this.visibleNext = false
          } else {
            return  this.$message.success('上传失败!')
          }
          console.log(res)
        }).catch(error => {
          console.log('错误')
        })

      },
      // 转base64
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
    },
    // mixins: [FormMixis]
  }
</script>
<style lang="less" scoped>
  .form-btns {
    text-align: center;
  }
  .tips {
    margin: 9px 0 40px;
  }
  .full-row {
    display: block;
    width: 100%;
    float: left;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
</style>
