<template>
  <a-card class="components-add">
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit" >
      <a-row :gutter="24">

        <a-col>
          <h2 class="form-item-title">基本信息</h2>
        </a-col>
        <a-col :span="12">
          <a-col :span="12">
            <a-form-item
              class="form-item"
              label="取件方式"
              :label-col="{span: 7}"
              :wrapper-col="{span: 17}"
            >
              <a-radio-group
                @change="changePick"
                v-decorator="[
                'autoAssign',
                {
                  initialValue: false,
                  rules: [{
                    required: true,
                    message: '必须指定派件方式',
                  }],
                }
              ]"
              >
<!--                <a-radio :value="true">系统指派</a-radio>-->
                <a-radio :value="false">手动指派</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="10" v-if="isPick">
            <a-form-item>
              <a-select
                class="form-item"
                placeholder="选择取件员"
                labelInValue
                v-decorator="[
              'selectPicker',
              {rules: [{ required: false, message: '必须选择选择取件员' }]}
            ]"
                :options="couriers"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-col>
        <a-col :span="12">
          <!-- <a-col :span="12">
            <a-form-item label="期望送达时间":label-col="{span: 12}" :wrapper-col="{span: 12}">
              <a-time-picker
                placeholder="起始时间"
                v-decorator="['busStart',                 {
                  rules: [{
                    required: true,
                    message: '期望送达开始时间',
                  }],
                }]"
              ></a-time-picker>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item >
              <a-time-picker
                placeholder="终止时间"
                v-decorator="['busEnd', {
                                rules: [{
                    required: true,
                    message: '选择送达最迟时间',
                  }],
            }]"
              ></a-time-picker>
            </a-form-item>
          </a-col> -->

            <a-col :span="12">
              <a-form-item label="期望送达时间":label-col="{span: 12}" :wrapper-col="{span: 12}">
                <a-select
                  class="form-item"
                  placeholder="选择班车时间"
                  labelInValue
                  v-decorator="[
                  'expectArriveTime',
                   {rules: [{ required: true, message: '必须选择班车时间' }]}
                 ]"
                  :options="timesTree"
                ></a-select>
              </a-form-item>
            </a-col>

            
        </a-col>


<!--        <a-col :span="12">-->
<!--          <a-form-item label="寄件日期" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-date-picker-->
<!--              class="form-item"-->
<!--              clearText-->
<!--              format="YYYY-MM-DD"-->
<!--              v-decorator="['sendDate',-->
<!--                {-->
<!--                  rules: [{-->
<!--                    required: true,-->
<!--                    message: '必须选择寄件日期',-->
<!--                  }],-->
<!--                }]"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->

        <a-col :span="12">
          <a-form-item label="货物信息" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              placeholder="货物信息"
              v-decorator="[
              'goodsInfo',
              {rules: [{ required: true, message: '必须填写货物信息' }]}
            ]"
            />
            <!-- <a-select-option value="物品">物品</a-select-option>
              <a-select-option value="文件">文件</a-select-option>
            </a-select>-->
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="付款方式"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-radio-group
              v-decorator="[
                `payType`,
                {
                  initialValue: 1,
                  rules: [{
                    required: true,
                    message: '付款方式不能为空',
                  }],
                }
              ]"
            >
              <a-radio :value="1">寄付</a-radio>
              <a-radio :value="2">到付</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

      </a-row>

      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">寄收件信息</h2>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="寄件人"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              class="form-item"
              type="text"
              v-decorator="[
                `sender`,
                {
                  rules: [{
                    required: true,
                    message: '寄件人不为空',
                  }],
                }
              ]"
              placeholder="请输入寄件人姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="寄件人电话" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="number"
              v-decorator="[
                'senderPhone',
                {
                  rules: [{
                    required: true,
                    message: '寄件人电话不为空',
                  },                  {
                    pattern: /^1[345789]\d{9}$/g,
                    message: '请填写正确的手机号码格式',
                  }],
                }
              ]"
              placeholder="请输入寄件人电话"
            />
          </a-form-item>
        </a-col>
        <a-col span="9">
          <a-form-item
            class="address-wrap"
            label="寄件人地址"
            :label-col="{span: 8}"
            :wrapper-col="{span: 16}"
          >
            <a-cascader
              :options="regions"
              @change="handleChangeRegion"
              v-decorator="[
                'sendrRegions',
                {
                  rules: [{
                    required: true,
                    message: '寄件人详细地址',
                  }],
                }
              ]"
              placeholder="选择省市区"
              style="width: 220px;"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item class="address-wrap" label :wrapper-col="{span: 24}">
            <!--   v-model="sendAddressDetail" -->
            <a-input
           
              class="form-item"
              v-decorator="[
                'sAddress',
                {
                   rules: [{
                    required: true,
                    message: '寄件人详细地址',
                  }],
                }
              ]"
              placeholder="请输入寄件人详细地址"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            class="form-item"
            label="收件人"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-input
              class="form-item"
              type="text"
              v-decorator="[
                'receiver',
                {
                  rules: [{
                    required: true,
                    message: '收件人不为空',
                  }],
                }
              ]"
              placeholder="请输入收件人姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="收件人电话" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              class="form-item"
              type="number"
              v-decorator="[
                'receiverPhone',
                {
                  rules: [{
                    required: true,
                    message: '收件人电话不为空',
                  },                  {
                    pattern: /^1[345789]\d{9}$/g,
                    message: '请填写正确的手机号码格式',
                  }],
                }
              ]"
              placeholder="请输入收件人电话"
            />
          </a-form-item>
        </a-col>

        <a-col :span="9">
          <a-form-item label="收件人地址" :label-col="{span: 8}" :wrapper-col="{span: 16}">
            <a-cascader
              :options="regions"
              @change="handleChangeRegionR"
              v-decorator="[
                'receiverRegions',
                {
                  rules: [{
                    required: true,
                    message: '选择省市区',
                  }],
                }
              ]"
              placeholder="选择省市区"
              style="width: 220px;"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item class="address-wrap" label :wrapper-col="{span: 24}">
            <!--     v-model="receiverAddressDetail" -->
            <a-input
        
              class="form-item"
              v-decorator="[
                'rAddress',
                {
                 rules: [{
                    required: true,
                    message: '收件人详细地址',
                  }],
                }
              ]"
              placeholder="请输入收件人详细地址"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col>
          <h2 class="form-item-title">计费信息</h2>
        </a-col>
        <a-col :span="12">
          <a-form-item label="计费重量" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input
              :min="0"
              :max="100000"
              class="form-item"
              addonAfter="公斤"
              type="number"
              placeholder="请输入数字"
              @change="handleCalcPrice($event,'goodsWeight')"
              v-decorator="[
                'goodsWeight',
                {
                  rules: [{
                    required: true,
                    message: '请输入数字',
                  }],
                }
              ]"
            /><!--   @change="handleCalcPrice($event,'goodsWeight')" -->
          </a-form-item>
        </a-col>
<!--        <a-col :span="12">-->
<!--          <a-form-item label="保价费" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-input-->
<!--              :min="0"-->
<!--              :max="100000"-->
<!--              class="form-item"-->
<!--              addonAfter="元"-->
<!--              type="number"-->
<!--              @change="handleCalcTotal($event,'insurance')"-->
<!--              placeholder="请输入数字"-->
<!--              v-decorator="[-->
<!--                'insurance',-->
<!--                {-->
<!--                  initialValue: 0,-->
<!--                  rules: [{-->
<!--                    required: false,-->
<!--                    message: '请输入数字',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col :span="12">-->
<!--          <a-form-item label="其他运费" :label-col="labelCol" :wrapper-col="wrapperCol">-->
<!--            <a-input-->
<!--              :min="0"-->
<!--              :max="100000"-->
<!--              class="form-item"-->
<!--              addonAfter="元"-->
<!--              type="number"-->
<!--              @change="handleCalcTotal($event,'other')"-->
<!--              placeholder="请输入数字"-->
<!--              v-decorator="[-->
<!--                'other',-->
<!--                {-->
<!--                  initialValue: 0,-->
<!--                  rules: [{-->
<!--                    required: false,-->
<!--                    message: '请输入数字',-->
<!--                  }],-->
<!--                }-->
<!--              ]"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
       <a-col :span="12">
         <a-form-item label="合计运费" :label-col="labelCol" :wrapper-col="wrapperCol">
           <a-input v-model="amount" disabled class="form-item" addonAfter="元" type="number" :placeholder="total"/>
         </a-form-item>
<!--          &lt;!&ndash; 合计运费: {{totalAmount}}元 &ndash;&gt;-->
       </a-col>
        <a-col :span="12">
          <a-form-item label="客户备注" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-textarea
              rows="4"
              placeholder="限100字以内"
              v-decorator="[
                'remarks',
                {
                  rules: [{
                    max: 100,
                    message: '限100字以内',
                  }],
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="btn-groups">
          <a-button @click="handleCancel" class="item-btn">取 消</a-button>
          <a-button type="primary" html-type="submit" class="item-btn">确认添加</a-button>
          <a-button type="primary" class="item-btn" @click="handleReset">重置</a-button>
<!--          <a-button type="primary" class="item-btn" @click="handlePrint"></a-button>-->
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script>
import FormMixin from '@/mixins/form'
import { regions } from '@/utils/regions'
import { URL_ORDERS, URL_SETTLEMENT_QUOTE_CLAC, URL_COURIER_ALL, ORDER_TODAY, BUSTIME } from '@/api/url'
import { mapGetters } from 'vuex'
import AddressGeo from './components/geo'
import io from 'socket.io-client'
import {getPdfUrl,printPdf} from '@/api/manage'
import ACol from "ant-design-vue/es/grid/Col";
export default {
  components: {ACol},
  mixins: [FormMixin],
  data() {
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 12
      },
      isPick: true,
      couriers: [],
      url: ORDER_TODAY,
      regions,
      totalAmount: 0,
      baseAmount: 0,
      total: 0,
      sendrRegions: [],
      receiverRegions: [],
      geocoder: null,
      socket: null,
      // reloading: false,
      userInfo:{},
      receiverAddressDetail: '',
      sendAddressDetail: '',
      amount: 0,
      timesTree:[],
    }
  },
  computed: {
    ...mapGetters(['siteId', 'id2Label']),

  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem('login_user'))
    this.userInfo = userInfo
    const params = {
      oid: userInfo.siteIds[0]
    }
    AMap.plugin(['AMap.Geocoder'], () => {
      this.geocoder = new AMap.Geocoder()
    })
    this.$http.get(URL_COURIER_ALL, { params }).then(res => {
      this.couriers = res.data.data.map(item => {
        const { id, name } = item
        return {
          value: id,
          label: name
        }
      })
    })
    this.getTimeList();
    //this.socket = io('http://localhost:3000')
    // this.socket.on('connect', () => {
    //   console.log('connect success')
    // })
  },
  destroyed() {},
  methods: {
    handlePrint() {
      // console.log('-----print---')
      // this.socket.emit('print', {
      //   printMachine: 'TSC TTP-244 Pro',
      //   // url: 'http://192.168.1.179:9100/index.html'
      //   url: 'file:///F:/TEST/pdf/index.html'
      // })
    },
    changePick(e) {
      console.log(e)
      this.isPick = !e.target.value
    },
    getLocation(address) {

      return new Promise(resolve => {
        this.geocoder.getLocation(address, (status, result) => {
          // console.log(result)
          if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            const { lat, lng } = lnglat
            resolve({
              x: lng,
              y: lat
            })
          }
        })
      })
    },
    handleChangeRegion(e) {
      this.sendrRegions = e
    },
    handleChangeRegionR(e) {
      this.receiverRegions = e
    },
    handleCalcTotal(e, filed) {
      const fieldValues = this.FORM.getFieldsValue()
      const { other = 0, insurance = 0 } = { ...fieldValues, [filed]: e.target.value }
      this.total = this.totalAmount + +other + +insurance
    },
    async handleCalcPrice(e, filed) {
      const fieldValues = this.FORM.getFieldsValue()
      const sendrRegions = this.sendrRegions
       const receiverRegions = this.receiverRegions
      const goodsWeight = e.target.value
      if (sendrRegions.length == 0) {
        return this.$message.warn('请先选择寄件地址')
      }

    
      const senderAddress = `${sendrRegions.join('')} ${fieldValues.sAddress}`
      const receiverAddress = `${receiverRegions.join('')} ${fieldValues.rAddress}`

      const senderLocation = await this.getLocation(senderAddress)
      const receiverLocation = await this.getLocation(receiverAddress)


     let distance = await this.getDistance(senderLocation.x, senderLocation.y, receiverLocation.x, receiverLocation.y);
      console.log(senderLocation, receiverLocation, distance)
    

      if (!goodsWeight) {
        return
      }
      const [p, city, district] = sendrRegions
      this.$http
        .post(URL_SETTLEMENT_QUOTE_CLAC, {
        //  category: 1,
         // city,
       //   district,
           point:{
             x:senderLocation.x,
             y:senderLocation.y,
           },
          weight: goodsWeight,
          distance: distance / 1000,
          oid: this.userInfo.orgId
        })
        .then(res => {
          // const { totalAmount, baseAmount } = res.data
          // this.totalAmount = totalAmount
          // this.baseAmount = baseAmount
          // const fieldValues = this.FORM.getFieldsValue()
          // const { other = 0, insurance = 0 } = fieldValues
          if(res.data.code == 200) {
           this.amount = res.data.data.totalAmount
           } else {
             this.$message.warning(res.data.message)
           }
        })
        .catch(err => {
          this.$message.error('系统错误，稍后再试，或联系技术人员')
        })
    },
    handleReset() {
      console.log("reset")
      this.FORM.resetFields()
    },
    handleCancel() {
      this.$router.go(-1)
    },
    async interceptors(values) {
      // expectBusTime
      let {
        sendDate,
        busEnd,
        busStart,
        insurance,
        other,
        sendrRegions,
        sAddress,
        rAddress,
        autoAssign,
        selectPicker,
        receiverRegions,
        expectArriveTime,
        ...props
      } = values

      const data = {
       // state: 1,
       // category: 1,
        sourceType: 1,
        autoAssign,
        ...props
      }
      console.log('selectPicker' ,autoAssign, selectPicker, expectArriveTime, expectArriveTime.key)
      if (autoAssign == false && selectPicker) {
        data.courierId = selectPicker.key
       // data.courierName = selectPicker.label
      }
      //busStart= `${busStart.format('HH:mm:ss')}`
     // busEnd= `${busEnd.format('HH:mm:ss')}`
     //let expectArriveTime = busStart + ' - ' + busEnd
      expectArriveTime = expectArriveTime.key
      const senderAddress = `${sendrRegions.join('')} ${sAddress}`
      const receiverAddress = `${receiverRegions.join('')} ${rAddress}`

      const senderLocation = await this.getLocation(senderAddress)
      const receiverLocation = await this.getLocation(receiverAddress)
      return {
        ...data,
        // charges: {
        //   insurance: Number(insurance),
        //   other: Number(other),
        //   normal: this.baseAmount,
        //   total: this.total
        // },
        amount: this.amount,
        senderAddress,
        receiverAddress,
      //  sendDate: sendDate.format('YYYY-MM-DD'),
        expectArriveTime,
        transferState: 0,
        senderLocation,
        receiverLocation
      }
    },
    // 计算两个坐标距离
    getDistance(lat1, lng1, lat2, lng2) {
       return new Promise(resolve => {
      lat1 = lat1 || 0;
      lng1 = lng1 || 0;
      lat2 = lat2 || 0;
      lng2 = lng2 || 0;

      let rad1 = lat1 * Math.PI / 180.0;
      let rad2 = lat2 * Math.PI / 180.0;
      let a = rad1 - rad2;
      let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      let r = 6378137;
      let distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)));
      console.log('distance', distance)
      // return distance;
      resolve (distance)
       })
    },
    submitSuccess(res) {
      this.$message.success('添加成功,等待打印服务')
      console.log('----')
      const { autoAssign, pickerId, msg } = res
      const zs = this
      console.log(res)
      getPdfUrl([res.data.data.id])
        .then(rs => {
          console.log(rs.data)
          const hide = zs.$message.loading('正在打印', 0)
          printPdf(rs.data.data).then(rs => {
            console.log(rs)
            hide()
            zs.$message.success(rs)
          }).catch(e => {
            hide()
            zs.$message.error('打印失败：请启动打印服务')
          })
        })
      // if ( msg ) {
      //   return this.$message.warn(msg)
      // }
      if (autoAssign == 'true') {
        if (!pickerId) {
          this.$message.warn('系统分配取件员失败，请在运单列表手动指定')
        }
      }
      this.FORM.resetFields()
    },
    // 获取班车时间列表
    getTimeList() {
        // api
        let params = {
          orgId: this.userInfo.orgId
        }
      let tableList = []
         this.$http.get(`${BUSTIME}?orgId=${params.orgId}`,).then(res => {
           if(res.data.code === 200 ) {
              let list = res.data.data.rows[0].times
              // list.map((item,index) => {
              //     if(item.times) {
              //         item.times= item.times.map((item1,index1)=> {
              //           return  {key:item.oid + index1 ,id:item1.id, carIndex: index1 + 1, startTime:item1.startTime, endTime:item1.endTime,}
              //         })
              //       }
              //     })
              this.timesTree = list.map(item => {
                return{id:item.id, label: item.startTime + '-' + item.endTime, value: item.startTime + '-' + item.endTime, }
              })
              console.log('timesTree', this.timesTree)
            }
           
          this.$message.success('查询成功')
          // this.refetch()
        })
      },

  },

}
</script>
<style lang="less">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
.address-wrap {
  display: flex;
  .form-item {
    flex: 1;
  }
}

input[type='number'] {
  -moz-appearance: textfield;
}

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
</style>
