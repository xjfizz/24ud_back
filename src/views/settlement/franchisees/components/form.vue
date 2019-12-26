<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
  >
    <a-form :form="FORM" @submit="handleSubmit">
      <a-row>
        <!-- <a-col span="12">
          <a-form-item label="加盟商" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="加盟商"
              v-decorator="[
            'name',
            {initialValue: fieldValues.name,
              rules: [{ required: true, message: '请输入加盟商' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="联系人" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="联系人"
              v-decorator="[
            'officialName',
            {initialValue: fieldValues.officialName,
              rules: [{ required: true, message: '请输入加盟商联系人' }]}
          ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="联系人手机号码" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              placeholder="请输入联系人手机号码"
              type="number"
              v-decorator="[
            'officialTel',
            {initialValue: fieldValues.officialTel,
              rules: [
              { required: true, message: '请输入联系人手机号码'},
               {pattern: /^1[345789]\d{9}$/g, message: '请输入正确的手机格式'}
               ]
               }

          ]"
            />
          </a-form-item>
        </a-col> -->

        <!-- <a-col :span="12">
          <a-form-item label="区域" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-cascader
              :options="regions"
              placeholder="选择市区"
              @change="changeRegions"
              v-decorator="[
                'selectRegions',
                {
                  rules: [{
                    required: true,
                    message: '选择市区',
                  }],
                }
              ]">
           </a-cascader>
            <a-tag v-for="(area,index) in selectArea" closable @close="removeArea(index)">{{area}}</a-tag>


          </a-form-item>
        </a-col> -->

      </a-row>
      <a-tabs defaultActiveKey="1" > <!-- @change="callback" -->
        <a-tab-pane tab="当日达" key="1">
          <a-row>

            <a-col :span="12">
              <a-form-item label="分拨中心分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="分拨中心分成"
                  addonAfter="%"
                  v-decorator="[
            'today-allocation',
            {initialValue: fieldValues['today-allocation']}
          ]"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="派件员" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="派件员分成"
                  addonAfter="%"
                  v-decorator="[
            'today-deliver',
            {initialValue: fieldValues['today-deliver']}
          ]"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="寄件网点分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="寄件网点分成"
                  addonAfter="%"
                  v-decorator="[
            'today-sendSite',
            {initialValue: fieldValues['today-sendSite']}
          ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="收件员" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="收件员分成"
                  addonAfter="%"
                  v-decorator="[
            'today-picker',
            {initialValue: fieldValues['today-picker']}
          ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="干线分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="干线分成"
                  addonAfter="%"
                  v-decorator="[
            'today-transportation',
            {initialValue: fieldValues['today-transportation']}
          ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="总部分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="总部分成"
                  addonAfter="%"
                  disabled
                  v-decorator="[
            'today-center',
            {initialValue:'5'}
          ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="派件网点" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="派件网点"
                  addonAfter="%"
                  v-decorator="[
                  'today-receiveSite',
            {initialValue: fieldValues['today-receiveSite']}
          ]"
                />
              </a-form-item>
            </a-col>


          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="即时达" key="2" forceRender>
          <a-row>

            <a-col :span="12">
              <a-form-item label="分拨中心分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="分拨中心分成"
                  addonAfter="%"
                  v-decorator="[
            'timely-allocation',
            {initialValue: fieldValues['timely-allocation']}
          ]"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="业务员分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="派件员分成"
                  addonAfter="%"
                  v-decorator="[
            'timely-courier',
            {initialValue: fieldValues['timely-courier']}
          ]"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="站点分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="站点分成"
                  addonAfter="%"
                  v-decorator="[
            'timely-site',
            {initialValue: fieldValues['timely-site']}
          ]"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="总部分成" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input
                  placeholder="总部分成"
                  addonAfter="%"
                  disabled
                  v-decorator="[
            'timely-center',
            {initialValue: '5'}
          ]"
                />
              </a-form-item>
            </a-col>

          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item class="form-btns">
        <!-- <a-button type="primary" html-type="submit">继续添加</a-button> -->
        <a-button type="primary" html-type="submit">确认</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import UploadMixin from '@/mixins/upload'
import { URL_COURIER_UPLOAD_BACK, URL_COURIER_UPLOAD_FRONT, URL_COURIER_UPLOAD_FRONT_DIPO ,FRANCHISEE_JSD, FRANCHISEE} from '@/api/url'
import { regions } from '@/utils/regions'

export default {
  name: 'TransportForm',
  data() {
    return {
      userInfo:{},
      selectArea:[],
      wrapperCol: {
        span: 16
      },
      labelCol: {
        span: 8
      },
      regionInput: '',
      areas: [],
      regions,
      centerPrec: 5 // 总部分成
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
      return this.row.orgId ? 'patch' : 'post'
    },
    formTitle() {
      const { orgId = '' } = this.row
      const it = orgId ? '修改' : '添加'
      return `${it}加盟商`
    },
    fieldValues() {
       console.log(this.row)
      const { orgId, ...props } = this.row



     if(this.row.todays) {
          this.todaysId = this.row.todays.todayId || ''
      }
      if(this.row.timely) {
         this.timelyId = this.row.timelyId || ''
      }

      // if (this.row.districts) {
      //   this.selectArea = this.row.districts
      // }
      if (orgId) {
        const { todays ={}, timely={} } = this.row
        const fv = {}
        Object.keys(todays).forEach(k => {
          fv['today-' + k] = Number.parseFloat(todays[k]) * 100
        })
        Object.keys(timely).forEach(k => {
          fv['timely-' + k] = timely[k] * 100
        })
        console.log('props',fv, props )
        return {
          ...props,
          ...fv
        }
      }
      return {
        ...props
      }
    }
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    // 获取本级站点
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
    },
    changeRegions(value, res) {
      console.log(value)
      console.log(res)
      if(value.length < 2){
        return
      }
      this.$http.get('/franchisee/franchisees/check/districts?district='+value[2]).then(res => {
        console.log(res)
        if(res.data.code == '0'){
          this.$message.warn(res.data.msg)
        }else{
          console.log('value[2]', value[2], this.selectArea)
          this.selectArea.push(value[2])
          console.log('this.selectArea', this.selectArea)
        }
      })
    },
    removeArea( index ){
      this.selectArea.remove(index)
    },
    interceptorsValid(values) {
      const { name, officialTel, officialName, selectRegions, ...props } = values
      console.log(values)
      const todaySum = Object.keys(values).filter(k => k.startsWith('today-')).reduce((t , k) => {
        if (values[k] != null && !Number.isNaN(values[k])) {
          return t + Number.parseFloat(values[k])
        } else {
          return t
        }
      },0)
      if ( todaySum !== 100) {
        this.$message.warn(`当日达分成比例出错，当前合计比例${todaySum}%,请重新填写`)
        return false
      }

      const timelySum = Object.keys(values).filter(k => k.startsWith('timely-')).reduce((t , k) => {
        if (values[k] != null && !Number.isNaN(values[k])) {
          return t + Number.parseFloat(values[k])
        } else {
          return t
        }
      },0)
      if ( timelySum !== 100) {
        this.$message.warn(`即时达分成比例出错，当前合计比例${timelySum}%,请重新填写`)
        return false
      }

      return true
    },
    interceptors (values) {
      console.log(values)
      const { orgId } = this.row


      const todayF = {}
      Object.keys(values).filter(k => k.startsWith('today-')).forEach(k => {
        todayF[k.replace('today-', '')] = Number.parseFloat(values[k]) / 100
      })
      const timelyF = {}
      Object.keys(values).filter(k => k.startsWith('timely-')).forEach(k => {
        timelyF[k.replace('timely-', '')] = Number.parseFloat(values[k]) / 100
      })
      const data = {
      //  districts: this.selectArea,
        todays: {
          ...todayF,
           todayId: this.todaysId || ''
        },
        timely: {
          ...timelyF,
          timelyId: this.timelyId || ''
        },
        oid:orgId,
      //  ...values
      }

      return orgId ? { oid: orgId, ...data } : data
    },
//  handleSubmit(e) {
//       e.preventDefault()
//       const  it = this
//      debugger
//     },

handleSubmit(e) {
       e.preventDefault()
      const  it = this
      this.FORM.validateFields(async (err, values) => {
        if (!err) {
          const { reloading } = this
          console.log('row', this.row)
          let method_today = this.row.todays ? 'put' : 'post'
          let method_timely = this.row.timely ? 'put' : 'post'
          console.log('!it.interceptorsValid(values)', values, !it.interceptorsValid(values))
         if (!it.interceptorsValid(values)) {
            return
          }

           let data = await it.interceptors(values)
         console.log('---0', data)
            // if(method === 'patch') {
            //     data = JSON.stringify(data)
            //     console.log('---1',method, url, data)
            // }
            // console.log('---2',method, url, data)
            let {oid, timely, todays} =data
           it.$http[method_today](FRANCHISEE, {oid, ...todays})
            .then(res => {
               if(res.data.code === 200) {
                 this.todaysId = ''
                 this.timelyId = ''
                } else if (res.data.code === 400) {
                  this.$message.warn(res.data.message)
                }  else {
                      this.$message.warn('请按要求填写')
                }
            })
            .catch(error => {
             // console.log(error)
              this.todaysId = ''
              this.timelyId = ''
              it.submitError(error)
            })


            it.$http[method_timely](FRANCHISEE_JSD, {oid, ...timely})
            .then(res => {
               if(res.data.code === 200) {
                  this.$message.success('操作成功')
                this.todaysId = ''
                this.timelyId = ''
                this.handleClose()
               if (reloading) {
                   it.reload()
                 }
                }else if (res.data.code === 400) {
                  this.$message.warn(res.data.message)
                } else {
                      this.$message.warn('请按要求填写')
                      this.todaysId = ''
                      this.timelyId = ''
                }
            })
            .catch(error => {
             // console.log(error)
              it.submitError(error)
            })

        }

      })
    },


  },
  mixins: [FormMixis]
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
