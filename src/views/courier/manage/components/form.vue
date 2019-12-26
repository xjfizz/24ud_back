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



           <a-col span="12"  v-if="fieldValues.type===1">
              <a-form-item label="所属加盟商" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-cascader
                  class="form-item"
                  expandTrigger="hover"
                  placeholder="选择所属加盟商"
                 
                  style="width:300px"
                  :options="joinList"
                  changeOnSelect
                  v-decorator="[
              'franchiseeList',
              {
              initialValue: fieldValues.franchiseeId,
                rules: [{ required: true, message: '选择所属加盟商' }]}
            ]"
                />
              </a-form-item>
            </a-col>

          <a-col span="12">
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
<!--          <a-col span="2">-->
<!--            <a-tooltip class="tips" placement="topLeft" title="默认初始密码： 123456" arrowPointAtCenter>-->
<!--              <a-icon type="info-circle"/>-->
<!--            </a-tooltip>-->
<!--          </a-col>-->
          <a-col span="10">
            <a-form-item label="账号密码" :label-col="{span:8}" :wrapper-col="{span:15}">
              <a-input
                placeholder="请输入密码"
                v-decorator="[
            'password',
            {
              rules: [
               { required: false, message: '请输入账号密码'},
               ]
               }

          ]"
              />
            </a-form-item>
          </a-col>
          <a-col span="2" v-if="fieldValues.type===0">
            <a-tooltip class="tips" placement="topLeft" title="默认初始密码： 666666" arrowPointAtCenter>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </a-col>
          <a-col span="2" v-if="fieldValues.type===1">
            <a-tooltip class="tips" placement="topLeft" title="默认初始密码： 123456" arrowPointAtCenter>
              <a-icon type="info-circle"/>
            </a-tooltip>
          </a-col>
          <a-col span="12">
            <a-form-item label="紧急联系人姓名" :label-col="{span: 8}" :wrapper-col="{span: 12}">
              <a-input
                placeholder="请输紧急联系人姓名"
                v-decorator="[
            'emergencyPeople',
            {initialValue: fieldValues.emergencyPeople,
              rules: [
              { required: false, message: '请输紧急联系人姓名'},
               ]
               }

          ]"
              />
            </a-form-item>
          </a-col>
          <a-col span="12">
            <a-form-item label="紧急联系人号码" :label-col="{span: 8}" :wrapper-col="{span: 12}">
              <a-input
                placeholder="请输紧急联系人号码"
                v-decorator="[
            'emergencyPhone',
            {initialValue: fieldValues.emergencyPhone,
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
                <!--  changeOnSelect -->
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
              initialValue: fieldValues.oid,
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
              'areaId',
              {
                rules: [{ required: false, message: '负责区域' }]}
            ]"
                ></a-select>
              </a-form-item>
            </a-col> -->
            <a-col span="12">
              <a-form-item label="账号状态" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-radio-group
                      v-decorator="[
                'state',
                {
                  initialValue: fieldValues.state + '',
                  rules: [{
                    required: true,
                    message: '选择账号状态',
                  }],
                }
              ]"
                    >
                      <a-radio value="1">启用</a-radio>
                      <a-radio value="0">禁用</a-radio>
                    </a-radio-group>
              </a-form-item>
            </a-col>
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

            <a-col span="12">
            <a-form-item label="押金"  :label-col="labelCol" :wrapper-col="labelCol">
              <a-input
                 style="width: 200px;"
                placeholder="请输入押金金额"
                v-decorator="[
            'deposit',
            {initialValue: fieldValues.deposit,
              rules: [
              { required: false, message: '请输入押金金额'},
             ]
               }

          ]"
              />
            </a-form-item>
          </a-col>

              <a-col span="12" v-if="fieldValues.type===0">
              <a-form-item  label="账号状态" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-radio-group
                      v-decorator="[
                'state',
                {
                  initialValue: fieldValues.state + '',
                  rules: [{
                    required: true,
                    message: '选择账号状态',
                  }],
                }
              ]"
                    >
                      <a-radio value="1">启用</a-radio>
                      <a-radio value="0">禁用</a-radio>
                    </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col span="12" v-if="fieldValues.type===1">
              <a-form-item  label="账号状态" :label-col="labelCol" :wrapper-col="wrapperCol_state">
                    <a-radio-group
                      v-decorator="[
                'state',
                {
                  initialValue: fieldValues.state + '',
                  rules: [{
                    required: true,
                    message: '选择账号状态',
                  }],
                }
              ]"
                    >
                      <a-radio value="2">启用</a-radio>
                      <a-radio value="0">禁用</a-radio>
                       <a-radio value="1">未认证</a-radio>
                    </a-radio-group>
              </a-form-item>
            </a-col>



           

          </template>
        </a-row>
        <a-form-item class="form-btns">
          <!-- <a-button type="primary" html-type="submit">继续添加</a-button> -->
          <a-button type="primary" html-type="submit">确定</a-button>
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
            <a-button type="primary" @click="UploadImg()">确定</a-button>
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
import { URL_COURIER_UPLOAD_BACK, URL_COURIER_UPLOAD, URL_COURIER_UPLOAD_FRONT_DIPO, URL_COURIER, URL_COURIER_JSD, URL_FILE, URL_COURIER_JS , FRANCHISEE} from '@/api/url'
import ACol from "ant-design-vue/es/grid/Col";
import { parse } from 'path';


export default {
  name: 'TransportForm',
  components: {ACol},
  data() {
    return {
      wrapperCol: {
        span: 12
      },
      wrapperCol_state:{
        span: 16
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      areas: [],
      upload_back: URL_COURIER_UPLOAD_BACK,
      upload_front: URL_COURIER_UPLOAD,
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
      OID: [],
      form:{},
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
    joinList:{
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
      return this.row.id ? 'put' : 'post'
    },
    formTitle() {
      const { category = {}, id, type } = this.row
      const action = id ? '修改' : '添加'
      let text = ''
      if(type===0) {
        text = '当日达'
      } else {
        text = '即时达'
      }
      return `${action}${text}快递员`
    },
    fieldValues() {
      let { category, courier, oid,franchiseeId,stateDay,state,  ...props   } = this.row
      console.log(this.row,stateDay == 0 )
    //  const { gid } = courier || {}
      console.log('sites', this.sites, oid, this.joinList)
       oid = this.getOidTree(this.sites,oid)
       franchiseeId = this.getOidTreeJ(this.joinList,franchiseeId)
     // oid = ['1', '2', '48270e06e0a24b55a4bb1ef4b4fa1ac5']
     state = (stateDay == 0  || stateDay)? stateDay: state
      console.log(oid, state);
      return {
        ...props,
        oid,
        state,
        franchiseeId
      }
    }
  },

  methods: {
    getOid(oid,sites) {
      console.log('sites', sites)
      sites.map(item => {
        this.OID.push(item.id)
        if(item.id !== oid) {
          if(item.children) {
            this.getOid(oid, item.children)
          }else {
            this.OID = []
          }
        } else {
          console.log(item)
          return this.OID
        }
      })
    },
  

  // 遍历数组 查找节点的父节点
    getOidTree(data,id) {
      console.log('data',data)
      let isHeadQuarters =  true
      if(data[0]) {
         isHeadQuarters = data[0].level == 0 ? true : false
      }
      let b = []
      // tree转一位数组
      function Family(data,id) {
        data.forEach(item => {
          b.unshift(item)
          if(item.children) {
            Family(item.children, id)
          }
        })
        return id
      }
      console.log('b', b)
      let c= []
      function FamilyFun(id) {
       b.forEach(item => {
         if(item.id === id) {
           if(item.parentId) {
             c.unshift(item.parentId)
             FamilyFun(item.parentId)
           }
         }
       })
        console.log('c', c)
        return c

      }
     //  Family(data,id)
      console.log('c', c)
      if(c) {
        FamilyFun(Family(data,id))
      }
      // FamilyFun(Family(data,id))
      c.push(id)
      if(!isHeadQuarters) {
        c.shift()
      }
      console.log('c', c)
      return c
    },


      // 遍历数组 查找节点的父节点
    getOidTreeJ(data,id) {
      console.log('data',data,id)
      let isHeadQuarters =  true
      if(data[0]) {
         isHeadQuarters = data[0].level == 0 ? true : false
      }
      let b = []
      // tree转一位数组
      function Family(data,id) {
        data.forEach(item => {
          b.unshift(item)
          if(item.children) {
            Family(item.children, id)
          }
        })
        return id
      }
      console.log('b', b)
      let c= []
      function FamilyFun(id) {
       b.forEach(item => {
         if(item.orgId === id) {
           if(item.orgPid) {
             c.unshift(item.orgPid)
             FamilyFun(item.orgPid)
           }
         }
       })
        console.log('c', c)
        return c

      }
     //  Family(data,id)
      console.log('c', c)
      if(c) {
        FamilyFun(Family(data,id))
      }
      // FamilyFun(Family(data,id))
      c.push(id)
      if(!isHeadQuarters) {
        c.shift()
      }
      console.log('c', c)
      return c
    },

    handleChangeSite(e) {
      console.log('---',e, this.allAreas)
      const sid = e.slice().pop()
      this.areas = this.allAreas[sid]
    },
    handleClose() {
      this.$emit('close')
      this.visibleNext = false
    },
    interceptors(values) {
      const { sites = [],franchiseeList =[], areaId, areaName, gid, education, school, address, diplomas, ...props } = values
      const { type, id } = this.row

      const data = {
        type,
        education,
        school,
        ...props
      }

      if (id) {
        data.id = id
      }

      if (type === 0) {
        const oid = sites.slice().pop()
        return {
          state: 1,
          oid,
          // branches,
          areaName,
          areaId,
          gid,
          ...data
        }
      } else {
        // const franchiseeId = franchiseeList.slice().pop()
          const franchiseeId = franchiseeList[franchiseeList.length -1]
    
        return {
          state: 1,
          franchiseeId: franchiseeId,
          // timelyCourier: {
          //   idCards: { ...this.idCards },
          //   education,
          //   school,
          //   address,
          //   diplomas
          // },
          ...data
        }
      }
    },
    handleUploadChange(e) {
     console.log('img', e, e.fileList[0].size)
      console.log('uploadImgP', this.uploadImgP)
      this.imageUrlF = e.file
      // this.getBase64(e.file).then(res => {
      //   this.imageUrl = res
      // });
    },
    handleUploadChangeF(e) {
      console.log('img', e, e.fileList[0].size)
      console.log('uploadImgP', this.uploadImgP)
      this.imageUrlB = e.file
      // this.getBase64(e.file).then(res => {
      //   this.imageUrlF = res
      // });
    },
    handleUploadChangeX(e) {
      console.log('img', e, e.fileList[0].size)
      console.log('uploadImgP', this.uploadImgP)
      this.imageUrlX = e.file
      // this.getBase64(e.file).then(res => {
      //   this.imageUrlX = res
      // });
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
      e.preventDefault();
      console.log('提交表单', e, this.fieldValues)
      // this.UploadImg()
      const  it = this



    this.FORM.validateFields(async (err, values) => {
        if (!err) {
          const data = await it.interceptors(values)
          console.log('Received values of form: ', values, URL_COURIER);
          this.form = JSON.parse(JSON.stringify(values))
          if(this.row.id) {
           
            this.submit(data)
          } else {
            if(this.fieldValues.type == 0) {
            
              this.submit(data)
            } else {
              this.visibleNext = true
            }
          }
        }
      });
    },
    // 提交表单-添加快递员信息
    submit(data) {
      let urlType = this.row.id ? 'put' : 'post'
      console.log('data',data)
      let url = URL_COURIER
      if(this.fieldValues.type == 0) {
        url = URL_COURIER
      } else {
        url = URL_COURIER_JSD
        console.log('data.franchiseeList', data.franchiseeList)
        if(data.franchiseeList) {
        data.franchiseeId = data.franchiseeList[data.franchiseeList.length -1]
        }
      }
      this.$http[urlType](url, data).then( res => {
        if(res.data.code === 200) {
          this.$message.success(res.data.message)
         // this.row = {}
          this.visibleNext = false
         // this.fieldValues = {}
           this.FORM.resetFields();
          this.$emit('close')
          console.log(res)
        } else{
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log('错误')
      })
    },

 
 // 手动上传图片
    UploadImg() {
      console.log('手动上传', this.fileList, this.imageUrl,this.form)
       let dataF = {
        id: this.form.phone || '',
        file: this.imageUrlF || ''
      }
      let formDataF = new FormData()
      formDataF.append('file', dataF.file)
      formDataF.append('tel', dataF.id)
      formDataF.append('type', '1')
      this.$http['post'](`${URL_COURIER_UPLOAD}`, formDataF).then( res => {
        if(res.data.code === 200) {
          this.form.front = res.data.data.path
        //  this.$emit('close')
        //  this.visibleNext = false
        } else {
          return  this.$message.success('上传失败!')
        }
        console.log(res)
      }).catch(error => {
        console.log('错误')
      })


      let dataB = {
        id: this.form.phone || '',
        file: this.imageUrlB || ''
      }
      let formDataB = new FormData()
      formDataB.append('file', dataB.file)
      formDataB.append('tel', dataB.id)
      formDataB.append('type', '2')
      this.$http['post'](`${URL_COURIER_UPLOAD}`, formDataB).then( res => {
        if(res.data.code === 200) {
          this.form.back = res.data.data.path
        //  this.$emit('close')
          //this.visibleNext = false
        } else {
          return  this.$message.success('上传失败!')
        }
        console.log(res)
      }).catch(error => {
        console.log('错误')
      })


      let dataX = {
        id: this.form.phone || '',
        file: this.imageUrlX || ''
      }
      let formDataX= new FormData()
      formDataX.append('file', dataX.file)
      formDataX.append('id', dataX.id)
      this.$http['post'](`${URL_FILE}`, formDataX).then( res => {
        if(res.data.code === 200) {
          this.form.diploma = res.data.data
        //  this.$emit('close')
         // this.visibleNext = false
        } else {
          return  this.$message.success('上传失败!')
        }
        console.log(res)
      }).catch(error => {
        console.log('错误')
      })
      setTimeout( () => {
        this.submit(this.form)
      },2000)
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
          this.form.diploma = res.data
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
