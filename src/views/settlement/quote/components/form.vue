<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="width"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <!-- {{cityList}} -->
    <header slot="title" class="form-title">
      {{formTitle.title}} 
      <span class="form-title-label">{{formTitle.label}}</span>
      <!-- <span v-if="formTitle.orgId" class="form-title-id">ID: {{formTitle.orgId}}</span> -->
    </header>
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
    
     <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="当日达" key="1">
       
      <a-row :gutter="24">
       
       
        <a-col :span="12">
          <a-form-item label="重量模式" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="重量模式"
              v-decorator="[
                'todays-weightMethod',
                {
                  initialValue: fieldValues['todays-weightMethod'] ? `${fieldValues['todays-weightMethod']}` : '0',
                  rules: [{ required: true, message: '必须选择重量模式' }]}
                ]"
            >
              <a-select-option value="0">实际重量</a-select-option>
              <a-select-option value="1">四舍五入</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item label="选择日期" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-range-picker
              class="form-item"
              clearText
              format="YYYY-MM-DD"
              v-decorator="['todays-picker',
                {
                  initialValue: fieldValues['todays-picker'],
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }]"
            />
          </a-form-item>
        </a-col> -->
        <a-col :span="12">
          <a-form-item label="基础运费" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="minAccount"
              class="form-item"
              addonAfter="RMB"
           
              v-decorator="[
                `todays-basePrice`,
                {
                  initialValue: fieldValues['todays-basePrice'] ? `${fieldValues['todays-basePrice']}` : '',
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="续重价格" :label-col="labelCol" :wrapper-col="wrapperCol">
            <!--           type="number" -->
            <a-input
              :min="minAccount"
              :max="100000"
              class="form-item"
              placeholder="请输入数字"
              addonAfter="KG/RMB" 
         
              v-decorator="[
                'todays-additionalWeight',
                {
                  initialValue: fieldValues['todays-additionalWeight'] ? `${fieldValues['todays-additionalWeight']}` : '',
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="首重重量" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              addonAfter="KG"
           
              :min="minAccount"
              v-decorator="[
                `todays-firstWeight`,
                {
                  initialValue:  fieldValues['todays-firstWeight'] ? `${fieldValues['todays-firstWeight']}` : '',
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="重量封顶" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              addonAfter="KG"
            
              :min="minAccount"
              v-decorator="[
                `todays-topWeight`,
                {
                  initialValue:fieldValues['todays-topWeight'] ? `${fieldValues['todays-topWeight']}` : '',
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
       
        <!-- <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-col> -->
      </a-row>

       
        </a-tab-pane>
      <a-tab-pane tab="及时达" key="2" forceRender>
       

     <a-row :gutter="24">
       
       
        <a-col :span="12">
          <a-form-item label="重量模式" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-select
              class="form-item"
              placeholder="重量模式"
              v-decorator="[
                'timely-weightMethod',
                {
                  initialValue: fieldValues['timely-weightMethod'] ? `${fieldValues['timely-weightMethod']}` : '0',
                  rules: [{ required: true, message: '必须选择重量模式' }]}
                ]"
            >
              <a-select-option value="0">实际重量</a-select-option>
              <a-select-option value="1">四舍五入</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <!-- <a-form-item label="选择日期" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-range-picker
              class="form-item"
              clearText
              format="YYYY-MM-DD"
              v-decorator="['timely-picker',
                {
                  initialValue: fieldValues['timely-picker'],
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }]"
            />
          </a-form-item> -->
        </a-col>
        <a-col :span="12">
          <a-form-item label="基础运费" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="minAccount"
              class="form-item"
              addonAfter="RMB"
           
              v-decorator="[
                `timely-basePrice`,
                {
                  initialValue: fieldValues['timely-basePrice'] ? `${fieldValues['timely-basePrice']}` : '',
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="续重价格" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="minAccount"
              :max="100000"
              
              class="form-item"
              placeholder="请输入数字"
              addonAfter="KG/RMB"
             
              v-decorator="[
                'timely-additionalWeight',
                {
                  initialValue: fieldValues['timely-additionalWeight'] ? `${fieldValues['timely-additionalWeight']}` : '',
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="首重重量" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              addonAfter="KG"
            
              :min="minAccount"
              v-decorator="[
                `timely-firstWeight`,
                {
                  initialValue:   fieldValues['timely-firstWeight'] ? `${fieldValues['timely-firstWeight']}` : '' ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="重量封顶" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              addonAfter="KG"
            
              :min="minAccount"
              v-decorator="[
                `timely-topWeight`,
                {
                  initialValue:   fieldValues['timely-topWeight'] ? `${fieldValues['timely-topWeight']}` : '' ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
              placeholder="请输入数字"
            />
          </a-form-item>
        </a-col>
   
          <a-col :span="12">
            <a-form-item label="第一段路程区间" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                addonAfter="KM"
              
                :min="minAccount"
                v-decorator="[
                `timely-firstDistance`,
                {
                  initialValue: fieldValues['timely-firstDistance'] ? `${fieldValues['timely-firstDistance']}` : '' ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
                placeholder="请输入数字"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="第一段路程区间价格" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                addonAfter="RMB"
             
                :min="minAccount"
                v-decorator="[
                `timely-firstDistancePrice`,
                {
                  initialValue:  fieldValues['timely-firstDistancePrice'] ? `${fieldValues['timely-firstDistancePrice']}` : '' ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
                placeholder="请输入数字"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="第二段路程区间" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                addonAfter="KM"
              
                :min="minAccount"
                v-decorator="[
                `timely-secondDistance`,
                {
                  initialValue:  fieldValues['timely-secondDistance'] ? `${fieldValues['timely-secondDistance']}` : '' ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
                placeholder="请输入数字"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="第二段路程区间价格" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                class="form-item"
                addonAfter="RMB"
              
                :min="minAccount"
                v-decorator="[
                `timely-secondDistancePrice`,
                {
                  initialValue:  fieldValues['timely-secondDistancePrice'] ? `${fieldValues['timely-secondDistancePrice']}` : '' ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
                placeholder="请输入数字"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="距离附加费" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input
                :min="minAccount"
                :max="100000"
                class="form-item"
                addonAfter="KG/RMB"
              
                placeholder="请输入数字"
                v-decorator="[
                'timely-additionalDistance',
                {
                  initialValue:  fieldValues['timely-additionalDistance'] ? `${fieldValues['timely-additionalDistance']}` : 0 ,
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
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
import { range2ymd, getRangeNow } from '@/utils/time'
import { mapGetters } from 'vuex'
import { URL_SETTLEMENT_QUOTE, QUOTE, QUOTE_ADD, QUOTE_ADD_TIME} from '@/api/url'

const CATE = {
  1: '当日达',
  2: '即时达'
}

export default {
  name: 'quote-form',
  data() {
    return {
      wrapperCol: {
        span: 14
      },
      labelCol: {
        span: 10
      },
      districtList: [],
      minAccount: 0,
      userInfo:{},
      todaysId: '',
      timelyId: ''
    }
  },
  props: {
    // url: {
    //   type: String
    // },
    cityList: {
      type: Array,
      default: () => []
    },
    districtCityList: {
      type: Object,
      default: () => {}
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
      default: 900
    }
  },
  computed: {
    ...mapGetters(['siteList', 'nickname']),
    category() {
      return this.row.category
    },
    method() {
      return this.row.orgId ? 'put' : 'post'
    },
    url() {
      //return this.row.category === 1 ? QUOTE_ADD : QUOTE_ADD_TIME
      return QUOTE
    },
    formTitle() {
      const { orgId, category } = this.row
      const title = orgId ? `修改报价` : `添加报价`
      const label = CATE[category]
      return {
        title,
        label,
        orgId
      }
    },
    fieldValues() {
    //  const { id, freight, weightMethod, city, district, category, startTime, endTime } = this.row
   //   const picker = range2ymd(startTime, endTime)
      // return {
      //   ...freight,
      //   weightMethod,
      //   city,
      //   district,
      //   category,
      //   picker,
      //   region: [city, district]
      // }

       console.log(this.row)
      const { orgId, ...props } = this.row
      if(this.row.todays) {
          this.todaysId = this.row.todays.id || ''
      }
      if(this.row.timely) {
         this.timelyId = this.row.timely.id || ''
      }
      
      // if (this.row.districts) {
      //   this.selectArea = this.row.districts
      // }
      if (orgId) {
        const { todays ={}, timely={} } = this.row
        const fv = {}
        Object.keys(todays).forEach(k => {
          fv['todays-' + k] = Number.parseFloat(todays[k])
        })
        Object.keys(timely).forEach(k => {
          fv['timely-' + k] = timely[k]
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
    //  if(!this.row.timely) {
    //      this.row.timely.weightMethod = '0'
    //  }
    //   if(!this.row.todsys) {
    //      this.row.todsys.weightMethod = '0'
    //  }
    //  console.log('row',this.row)

     return this.row
    }
  },
  created(){
    this.getUserinfo()
  },
  methods: {
    handleClose() {
       this.todaysId = ''
       this.timelyId = ''
      this.$emit('close')
    },
    handleChange(id) {
      this.districtList = id ? this.districtCityList[id].children : []
    },
    // 获取用户信息
    getUserinfo() {
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
    },
    interceptors(values) {
      // const { id, category } = this.row
      // const { picker, weightMethod, city, district, ...freight } = values
      // const [start, end] = picker
      // const startTime = start.format('YYYY-MM-DD')
      // const endTime = end.format('YYYY-MM-DD')
      // const operator = this.nickname
      // const post = {
      //  // category,
      //   operator,
      //   // startTime,
      //   // endTime,
      //   // city,
      //   // district,
      //   // weightMethod,
      //   // ...freight,
      //   oid:this.userInfo.orgId
      // }
      // if (id) {
      //   return {
      //     id,
      //     ...post
      //   }
      // }
      // return post


        console.log(values)
      const { orgId } = this.row


      const todayF = {}
      Object.keys(values).filter(k => k.startsWith('todays-')).forEach(k => {
        todayF[k.replace('todays-', '')] = Number.parseFloat(values[k]) 
        // / 100
      })
      const timelyF = {}
      Object.keys(values).filter(k => k.startsWith('timely-')).forEach(k => {
        timelyF[k.replace('timely-', '')] = Number.parseFloat(values[k]) 
        // / 100
      })
      const data = {
      //  districts: this.selectArea,
        todays: {
          ...todayF,
          id: this.todaysId || ''
        },
        timely: {
          ...timelyF,
          id: this.timelyId || ''
        },
        oid:orgId,
      //  ...values
      }
      return orgId ? { oid: orgId, ...data } : data


    },

  handleSubmit(e) {
      e.preventDefault()
      const  it = this
      this.FORM.validateFields(async (err, values) => {
        if (!err) {
          const { reloading } = this
          let method_today = this.row.todays ? 'put' : 'post'
          let method_timely = this.row.timely ? 'put' : 'post'
          console.log('!it.interceptorsValid(values)', values, !it.interceptorsValid(values))
         let isPass = this.formPass(values)
          if(!isPass) {
            return this.$message.warn('请按要求填写')
          }
         if(Number(values['todays-topWeight']) <= Number(values['todays-firstWeight'])  ) {
            return  this.$message.warn('当日达重量封顶不能低于首重重量')
          }
          if(Number(values['timely-topWeight']) <= Number(values['timely-firstWeight'])  ) {
            return  this.$message.warn('即时达重量封顶不能低于首重重量')
          }

           let data = await it.interceptors(values)
         console.log('---0', data)
            // if(method === 'patch') {
            //     data = JSON.stringify(data)
            //     console.log('---1',method, url, data)
            // }
            // console.log('---2',method, url, data)
            let {oid, timely, todays} =data
           it.$http[method_today](QUOTE_ADD, {oid, ...todays})
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


            it.$http[method_timely](QUOTE_ADD_TIME, {oid, ...timely})
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
      //    interceptors(values) {
      //     return values
      //   },
       interceptorsValid(data) {
          return true
        },

    // handleSubmit() {
    //   debugger
    // },
    submitSuccess(res) {
      const { error_msg } = res.data
      const method = error_msg ? 'error' : 'success'
      this.$message[method](error_msg || '操作成功')
    },
    // 非空判断
    formPass(value) {
      let isPass = true
      console.log(value)
      Object.keys(value).forEach(item => {
        console.log('i:', item, value[item] )
        if(value[item] == 'undefined') {
          console.log('isPass')
          isPass = false
        }
      })
      return isPass
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
