/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable space-before-function-paren */
import './order-modify.less'
import { URL_COURIER,QUESTION, QUESTION_ADD, URL_COURIER_TODAY_ALL, URL_SYSTEM_AUTH_STRUCTURE_ALL, URL_SETTLEMENT_QUOTE_CLAC } from '@/api/url'
import { mapGetters } from 'vuex'
import { axios } from '@/utils/request'
import Storage from 'store2'
import { setTimeout } from 'timers'

export default {
  name: 'order-modify',
  data() {
    return {
      form: this.$form.createForm(this),
      wrapperCol: {
        span: 12
      },
      labelCol: {
        span: 5
      },
      isTransfer: false,
      couriers: [],
      siteListTree: [],
      questionList:[],
      userInfo:{},
      site:[],
      isSite: false,
      amount: 0,
      goodsWeight: 0,
      isEnSureWeight: false
    }
  },
  props: {
    row: {
      type: [Object, Array]
    },
    url: {
      type: String,
      default: ''
    }, 
    action: {
      type: Object,
      default: () => {}
    },
    orderIds: {
      type: Array,
      default: () => []
    },
    siteList: {
      type: Array,
      default: () => []
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
    ...mapGetters(['siteId', 'siteTree', 'id2Label', 'nickname', 'userId',]),
    isBatch() {
      const { id } = this.row
      return !!id
    },
    meta() {
      const { action } = this
      return action.meta || {}
    },
    title() {
      const { title } = this.meta
      return title
    },
    state() {
      // 将要转为state的值
      const { state } = this.meta
      return state
    }
  },
  created() {
    // 获取用户信息
    this.userInfo = JSON.parse(localStorage.getItem('login_user'))
    console.log('this.userInfo', this.userInfo)


    // let orgId = this.userInfo.orgId
    let orgId = this.row.destOrgId // 根据不同订单目的网点选择快递员

    // todo 合并到store
    this.$http.get(`${URL_COURIER_TODAY_ALL}?oid=${orgId}`,).then(res => {
      console.log('res', res)
      if(res.data.code == 200) {
            this.couriers = res.data.data.map(item => {
                const { id, name } = item
                return {
                    value: id,
                    label: name
                }
            })
        }

    })
    this. getQuestionList()
    this.getSiteList()
    console.log(this.row)
    // this.goodsWeight = 3 //this.row.goodsWeight || 0 // 取件重量默认
    //this.amount = this.row.amount || 0 // 取件价格默认
  },
  methods: {
    // 获取站点树
    getSiteList() {
      axios.get(`${URL_SYSTEM_AUTH_STRUCTURE_ALL}`).then(res => {
       const data = res.data.data
       this.site = this.formatData(data)
       setTimeout(() => {
        console.log('this.sites', this.site)
       }, 1000)
        
     })
    },
    formatData(data) {
      data.forEach(item => {
          if(item.children) {
            this.formatData(item.children)
          } 
        item.label = item.name
        item.value = item.id
        })
      return data
    },

    // 获取问题件
    getQuestionList(){
      this.$http
              .get(`${QUESTION}`)
              .then(res => {
               if(res.data.code === 200) {
                 this.questionList = res.data.data.map(item => {
                   return{
                     value: item.id,
                     label: item.typeContent
                   }
                 })
                console.log('this.questionList', this.questionList)
               }
                
              })
              // eslint-disable-next-line handle-callback-err
              .catch(error => this.$message.error('系统错误，请稍后再试'))
    },
    // 金额赋值/重量
    setGoodsWeight(row) {
      console.log(row)
      this.isEnSureWeight = false
      this.goodsWeight = row.goodsWeight
      this.amount = row.amount
    },
    handleSubmit(e) {
      e.preventDefault()
      let userInfo = JSON.parse(localStorage.getItem('login_user'))
      let params = {
        wbId:this.row.id || '',
        user: this.nickname,
        userId: this.userId,
        orgId: userInfo.siteIds[0], 
    }
      this.form.validateFields((err, values) => {
        if (!err) {
          const { row, orderIds, isBatch, action } = this
            // if(action.title === undefined) {
            //     action.title = ''
            // }
            console.log('action', action)
          // const {
          //   type,
          //   meta: { title, ...props }
          // } = action
            const {
                type,
                title, ...props
            } = action
            const meta = {title, ...props}
          let ids = []
          if (!isBatch) {
            ids = orderIds
          } else {
            ids = [row.id]
          }
          const { remarks } = values
          let data = {
           // ids: ids, /*id: ids.join(),*/
              remarks,
           }
          const { id2Label } = this // id-站点
          console.log('提交', this, ids, data, values )
          params.state = props.meta.state
           if( this.isTransfer && (params.state == 6 || params.state == 4)) { // 待出库
              data = {
                remarks,
                nextSiteId: values.siteOption[values.siteOption.length - 1],
            }
           }

           if( !this.isTransfer && this.isSite && (params.state == 5) && (action.type == "transferinStorage" || action.type == "nextStorage")) { // 转运入库
             data = {
              remarks,
              orgId: values.siteOption[values.siteOption.length - 1],
          }
         }

           if(!this.isTransfer && params.state == 6)  { // 转入待派送
              data = {
                remarks,
                courierId: values.deliverId,
            }
           }

           if(!this.isTransfer && params.state == 7)  { // 转入派送中
              data = {
                  detail: values.signType
              }
            }
         

            console.log(values)

           if((row.state == 2 || row.state == 4) && this.isSite) {
              data.orgId = values.siteOption[values.siteOption.length - 1]
           }

           console.log('data', data, props, this.siteId, userInfo, row)
            Object.assign(params, data)

            // // 取件付现金操作
            // if(action.type == 'takeup') {
            //   params = {
            //     amount: this.amount,
            //     goodsWeight: this.goodsWeight,
            //     confirm:true,
            //     payStatus:true,
            //     tdNo: row.tdNo,
            //     id: row.id,
            //     ...params,
            //   }
  
            //   return (
            //     this.$http
            //      .put(`${this.url}`, params)
            //      .then(res => {
            //       if(res.data.code === 200) {
            //         this.$message.success('操作成功')
            //         this.$emit('close-form')
            //        } else {
            //         this.$message.warn(res.data.message)
            //        }
            //      })
            //      // eslint-disable-next-line handle-callback-err
            //      .catch(error => this.$message.error('系统错误，请稍后再试'))
            //  )
            // }
              
            if (params.state != 99 ) {
              return (
                this.$http
                 .put(`${this.url}/scan`, params)
                 .then(res => {
                  if(res.data.code === 200) {
                    this.$message.success('操作成功')
                    this.$emit('close-form')
                   } else {
                    this.$message.warn(res.data.message)
                   }
                 })
                 // eslint-disable-next-line handle-callback-err
                 .catch(error => this.$message.error('系统错误，请稍后再试'))
             )
            } 
            else {
              console.log('data', data, props, this.siteId, userInfo, params,values)
              
              let option = {
                detail:values.problemDetail,
                abnormalType:values.problemType,
                remarks: values.remarks,
                state: 99,
                wbId:this.row.id || '',
                 orgId: userInfo.siteIds[0], 
              }
         
              return (
                this.$http
                //  .post(`${QUESTION_ADD}`, option)
                .put(`${this.url}/scan`, option)
                 .then(res => {
                   if(res.data.code === 200) {
                    this.$message.success('操作成功')
                    this.$emit('close-form')
                   } else {
                    this.$message.success(res.data.message)
                   }
                  
                 })
                 // eslint-disable-next-line handle-callback-err
                 .catch(error => this.$message.error('系统错误，请稍后再试'))
             )
            }
    
        }
        this.$message.warn('请按要求填写')
      })
    },

    // // 根据重量计算金额
    async handleCalcPrice(filed) {
     
      const fieldValues = this.form.getFieldsValue()
      console.log('filed', filed, fieldValues, this.goodsWeight)
      let {senderLocation, receiverLocation} = this.row


      let distance = await this.getDistance(senderLocation.x, senderLocation.y, receiverLocation.x, receiverLocation.y);
      console.log(senderLocation, receiverLocation, distance)
    

      if (!this.goodsWeight) {
        return
      }
      this.$http
        .post(URL_SETTLEMENT_QUOTE_CLAC, {
        //  category: 1,
         // city,
       //   district,
           point:{
             x:senderLocation.x,
             y:senderLocation.y,
           },
          weight: this.goodsWeight,
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
          //  this.amount = res.data.data.totalAmount
          this.amount = res.data.data.totalAmount
          console.log('this.amount', this.amount)
           } else {
             this.$message.warning(res.data.message)
           }
        })
        .catch(err => {
          this.$message.error('系统错误，稍后再试，或联系技术人员')
        })

    },
       //   // 计算两个坐标距离
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
     // 确认重量
     enSureWeight() {
       console.log(this.row)
       
     let   params = {
          amount: this.amount,
          goodsWeight: this.goodsWeight,
          confirm:true,
          payStatus:true,
          tdNo: this.row.tdNo,
          id: this.row.id,
        }

        
          this.$http
           .put(`${this.url}`, params)
           .then(res => {
            if(res.data.code === 200) {
              this.$message.success('操作成功')
              this.isEnSureWeight = true
              //this.$emit('close-form')
             } else {
              this.$message.warn(res.data.message)
              this.isEnSureWeight = false
             }
           })
           // eslint-disable-next-line handle-callback-err
           .catch(error => this.$message.error('系统错误，请稍后再试'))
      
     
     },

    summaryList() {
      if (!this.isBatch) return []
      const { tdNo, charges = {}, transportation = {}, paymentType, startOrgName , destOrgName} = this.row
      // const sendSite = transportation ? transportation.sendSite : '暂无数据'
        const sendSite = startOrgName ? startOrgName : '暂无数据'
        const destSite = destOrgName ? destOrgName : '暂无数据'
      return [
        {
          title: '运单编号',
          value: tdNo
        },
      
        // {
        //   title: '总费用',
        //   value: `${charges.total} 元`
        // },
        {
          title: '付款方式',
          value: paymentType === 2 ? '到付' : '寄付'
        },
        {
          title: '起始网点',
          value: sendSite
        },
        {
          title: '目的网点',
          value: destSite
        },
      ]
    },
    cancelRender() {
      const { wrapperCol, labelCol } = this
      return (
        <a-col>
          <a-form-item label="选择取消类型" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-select
              class="form-item"
              placeholder="选择取消类型"
              width="200"
              vDecorator={[
                'cancelType',
                {
                  rules: [{ required: true, message: '请选择取消类型' }]
                }
              ]}
            >
              <a-select-option value="1">取消类型1</a-select-option>
              <a-select-option value="2">取消类型2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="选择取消类别" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-select
              class="form-item"
              placeholder="选择取消类别"
              width="200"
              vDecorator={[
                'cancelCategory',
                {
                  rules: [{ required: true, message: '选择取消类别' }]
                }
              ]}
            >
              <a-select-option value="1">取消类别--1</a-select-option>
              <a-select-option value="2">取消类别--2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="输入取消描述" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-textarea
              rows="4"
              placeholder="输入取消描述"
              vDecorator={['cancelDetail', { rules: [{ required: true, message: '请输入取消描述' }] }]}
            />
          </a-form-item>
        </a-col>
      )
    },
    sendingRender() {
      // const { wrapperCol, labelCol } = this
      return (
        // <a-col>
        //   <a-form-item label="派件方式" labelCol={labelCol} wrapperCol={wrapperCol}>
        //     <a-radio-group
        //       vDecorator={['sendMethod', { initialValue: 1, rules: [{ required: true, message: '请选择派件方式' }] }]}
        //     >
        //       <a-radio value={1}>系统指派</a-radio>
        //       <a-radio value={2}>手动指派</a-radio>
        //     </a-radio-group>
        //   </a-form-item>
        // </a-col>
        null
      )
    },
    problemRender() {
      const { wrapperCol, labelCol } = this
      return (
        <a-col>
          <a-form-item label="选择问题件类型" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-select
              class="form-item"
              placeholder="选择问题件类型"
              width="200"
              options={this.questionList}
              vDecorator={[
                'problemType',
                {
                  rules: [{ required: true, message: '请选择问题件类型' }]
                }
              ]}
            >
            
            </a-select>
          </a-form-item>
          <a-form-item label="问题件描述" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-textarea
              rows="4"
              placeholder="输入问题件描述"
              vDecorator={['problemDetail', { rules: [{ required: true, message: '请输入问题件描述' }] }]}
            />
          </a-form-item>
        </a-col>
      )
    },
    returnRender() {
      const { wrapperCol, labelCol } = this
      return (
        <a-col>
          <a-form-item label="选择退回件类型" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-select
              class="form-item"
              placeholder="选择退回件类型"
              width="200"
              vDecorator={[
                'refundType',
                {
                  rules: [{ required: true, message: '请选择退回件类型' }]
                }
              ]}
            >
              <a-select-option value="退回件类型--1">退回件类型--1</a-select-option>
              <a-select-option value="退回件类型--2">退回件类型--2</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="退回件描述" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-textarea
              rows="4"
              placeholder="输入退回件描述"
              vDecorator={['refundDetail', { rules: [{ required: true, message: '请输入退回件描述' }] }]}
            />
          </a-form-item>
        </a-col>
      )
    },
    normalRender() {
      // 出库
      // const { wrapperCol, labelCol } = this
      // return (
      //   <a-col>
      //     <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
      //       <a-radio-group
      //         vDecorator={[
      //           'transfer',
      //           {
      //             initialValue: '0'
      //           }
      //         ]}
      //       >
      //         <a-radio value="0">否</a-radio>
      //         <a-radio value="1">是</a-radio>
      //       </a-radio-group>
      //     </a-form-item>
      //   </a-col>
      //  // null
      // )


     // 揽件入库
      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)
      let localSite = (JSON.parse(localStorage.getItem('login_user'))).orgId
      const isSite = row.startOrgId == localSite ? false : true
      this.isSite = isSite
     
     // this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isSite, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isSite ? (
            <div>
              <a-form-item label="入库站点" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="请选择"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择入库站点' }] }]}
                />
              </a-form-item>
            </div>
          ) :null }
        </a-col>
      )

    },

    transferinStorageRender() {
      // 出库
      // const { wrapperCol, labelCol } = this
      // return (
      //   <a-col>
      //     <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
      //       <a-radio-group
      //         vDecorator={[
      //           'transfer',
      //           {
      //             initialValue: '0'
      //           }
      //         ]}
      //       >
      //         <a-radio value="0">否</a-radio>
      //         <a-radio value="1">是</a-radio>
      //       </a-radio-group>
      //     </a-form-item>
      //   </a-col>
      //  // null
      // )


     // 转运入库
      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)
      let localSite = (JSON.parse(localStorage.getItem('login_user'))).orgId
      const isSite = row.destOrgId == localSite ? false : true
      this.isSite = isSite
     
     // this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isSite, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isSite ? (
            <div>
              <a-form-item label="下一站" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="下一站网点"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择下一站网点' }] }]}
                />
              </a-form-item>
            </div>
          ) :null }
        </a-col>
      )

    },




    nextStorageRender() {
      // 下一站

      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)
      let localSite = (JSON.parse(localStorage.getItem('login_user'))).orgId
      const isSite = row.destOrgId == localSite ? false : true
      this.isSite = isSite
     
     // this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isSite, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isSite ? (
            <div>
              {/* <a-form-item label="下一站" labelCol={labelCol} wrapperCol={wrapperCol}> */}
              <a-form-item label="入库站点" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="入库站点"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择入库站点' }] }]}
                />
              </a-form-item>
            </div>
          ) :null }
        </a-col>
      )

    },

    transferNormalRender() {
      // 转运出库
      const { wrapperCol, labelCol } = this
      return (
        <a-col>
          <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'transfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      )
    },
    outRender() {
      // 出库
      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)



      let orgId = this.row.destOrgId // 根据不同订单目的网点选择快递员

      // todo 合并到store
      this.$http.get(`${URL_COURIER_TODAY_ALL}?oid=${orgId}`,).then(res => {
        console.log('res', res)
        if(res.data.code == 200) {
              this.couriers = res.data.data.map(item => {
                  const { id, name } = item
                  return {
                      value: id,
                      label: name
                  }
              })
          }
  
      })

      const isTransfer = row.transferState == 1
      this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isTransfer, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isTransfer ? (
            <div>
              <a-form-item label="下一站" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="下一站网点"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择下一站网点' }] }]}
                />
              </a-form-item>
            </div>
          ) : (
            <a-form-item label="选择派件员" labelCol={labelCol} wrapperCol={wrapperCol}>
              <a-select
                class="form-item"
                placeholder="选择派件员"
                VDecorator={['deliverId', { rules: [{ required: true, message: '必须选择派件员' }] }]}
                options={this.couriers}
              />
            </a-form-item>
          )}
        </a-col>
      )
    },


    outPRender() {
      // 派件出库
      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)
      const isTransfer = row.transferState == 0
      this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isTransfer, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isTransfer ? (
            <div>
              <a-form-item label="下一站" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="下一站网点"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择下一站网点' }] }]}
                />
              </a-form-item>
            </div>
          ) : (
            <a-form-item label="选择派件员" labelCol={labelCol} wrapperCol={wrapperCol}>
              <a-select
                class="form-item"
                placeholder="选择派件员"
                VDecorator={['deliverId', { rules: [{ required: true, message: '必须选择派件员' }] }]}
                options={this.couriers}
              />
            </a-form-item>
          )}
        </a-col>
      )
    },
    
    outTRender() {
      // 转运出库
      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)
     const isTransfer = row.transferState == 0
      this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isTransfer, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isTransfer ? (
            <div>
              <a-form-item label="下一站" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="下一站网点"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择下一站网点' }] }]}
                />
              </a-form-item>
            </div>
          ) : (
            <a-form-item label="选择派件员" labelCol={labelCol} wrapperCol={wrapperCol}>
              <a-select
                class="form-item"
                placeholder="选择派件员"
                VDecorator={['deliverId', { rules: [{ required: true, message: '必须选择派件员' }] }]}
                options={this.couriers}
              />
            </a-form-item>
          )}
        </a-col>
      )
    },

    
    transferOutStorageRender() {
      // 转运出库
      const { wrapperCol, labelCol, row, state } = this
      console.log( '--', row, this)
     const isTransfer = row.transferState == 1
        this.isTransfer = isTransfer
        this.siteListTree = this.site
        // const isTransfer = state === 6
        console.log('isTransfer', isTransfer, this.siteList )
      return (
        <a-col>
          {/* <a-form-item label="是否转运" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'tranfer',
                {
                  initialValue: '0'
                }
              ]}
            >
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item> */}
          {isTransfer ? (
            <div>
              <a-form-item label="下一站" labelCol={labelCol} wrapperCol={wrapperCol}>
                <a-cascader
                  options={this.siteListTree}
                  placeholder="下一站网点"
                  expandTrigger="hover"
                  changeOnSelect
                  vDecorator={['siteOption', { rules: [{ required: true, message: '请选择下一站网点' }] }]}
                />
              </a-form-item>
            </div>
          ) : (
            <a-form-item label="选择派件员" labelCol={labelCol} wrapperCol={wrapperCol}>
              <a-select
                class="form-item"
                placeholder="选择派件员"
                VDecorator={['deliverId', { rules: [{ required: true, message: '必须选择派件员' }] }]}
                options={this.couriers}
              />
            </a-form-item>
          )}
        </a-col>
      )
    },
    signRender() {
      // 签收
      const { wrapperCol, labelCol } = this
      return (
        <a-col>
          <a-form-item label="签收类型" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'signType',
                {
                  initialValue: '本人'
                }
              ]}
            >
              <a-radio value="本人">本人签收</a-radio>
              <a-radio value="代签">代签</a-radio>
            </a-radio-group>
          </a-form-item>
          {/* <a-form-item label="备注" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-textarea
              rows="4"
              placeholder="请输入备注"
              vDecorator={['remark', { rules: [{ required: true, message: '请输入备注' }] }]}
            />
          </a-form-item> */}
        </a-col>
      )
    },


    takeupRender() {
      // 取件
      const { wrapperCol, labelCol } = this
     // this.goodsWeight = 8 // JSON.parse(JSON.stringify(this.row.goodsWeight))
    //  this.amount = 3 //JSON.parse(JSON.stringify(this.row.amount))
      return (
        <a-col>
          {/* <a-form-item label="签收类型" labelCol={labelCol} wrapperCol={wrapperCol}>
            <a-radio-group
              vDecorator={[
                'signType',
                {
                  initialValue: '本人'
                }
              ]}
            >
              <a-radio value="本人">本人签收</a-radio>
              <a-radio value="代签">代签</a-radio>
            </a-radio-group>
          </a-form-item> */}

          <a-form-item label="重量" labelCol={labelCol} wrapperCol={{span:18}}>
            <a-col span={16}>
              {/* type="number" */}
            <a-input
              placeholder="请输入重量"

              min="0"
              max="100000"
              class="form-item"
              addonAfter="公斤"
              
              placeholder="请输入数字"
              onChange={this.handleCalcPrice.bind(this)}
             v-model={this.goodsWeight}
              // vDecorator={['goodsWeight', { rules: [{ required: true, message: '请输入重量' }] }]}
            />
            </a-col>
            <a-col span={2}>
   
            </a-col>
            <a-col span={4}>
              <a-button type="primary" onClick={this.enSureWeight}>确认重量</a-button>
            </a-col>
            
          
          </a-form-item>

          <a-form-item label="金额" labelCol={labelCol} wrapperCol={wrapperCol}>
            {/* <a-input
              disabled
              placeholder="应付金额"
              vDecorator={['amount', { rules: [{ initialValue: {amount}, required: true, message: '应付金额' }] }]}
            /> */}
            <a-input v-model={this.amount} disabled class="form-item" addonAfter="元" type="number" placeholder="应付金额"/>
          </a-form-item>
        </a-col>
      )
    }

  },
  
  render() {
    const { title, visible, isBatch } = this
    const { type } = this.action
    const modalProps = {
      width: 600,
      footer: null,
      destroyOnClose: true,
      title,
      visible
    }

    // 订单简介
    const summary = this.summaryList()
    const OrderSummary = (
      <a-row class="order-summary">
        {summary.map(item => {
          return (
            <a-col span="12">
              <span class="item-label">{item.title}:</span>
              <span class="item-title">{item.value}</span>
            </a-col>
          )
        })}
      </a-row>
    )
    const renderFn =
      visible && type
        ? this[`${type}Render`]
        : function() {
          return null
        }

    const FormItems = typeof renderFn === 'function' ? renderFn() : null

    return (
      <a-modal {...{ props: { ...modalProps }, on: { cancel: () => this.$emit('close') } }}>
        {isBatch ? OrderSummary : null}
        <a-form form={this.form} onSubmit={this.handleSubmit.bind(this)}>
          {FormItems}
          <a-form-item label="备注" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
            <a-textarea
              rows="4"
              placeholder="请输入备注"
              vDecorator={['remarks', { rules: [{ required: false, message: '请输入备注' }] }]}
            />
          </a-form-item>
          <a-form-item class="form-btns">
              {type !== 'takeup' ? (
              <a-button visible={type !== 'takeup'}  type="primary" html-type="submit">
              确认
            </a-button>
             ) : (
              <a-button visible={type == 'takeup'}   disabled={!this.isEnSureWeight} type="primary" html-type="submit">
              确认
            </a-button>
             )}
            {/* <a-button visible={type !== 'takeup'}  type="primary" html-type="submit">
              确认
            </a-button>
            <a-button visible={type == 'takeup'}   disabled={!this.isEnSureWeight} type="primary" html-type="submit">
              确认
            </a-button> */}
          </a-form-item>
        </a-form>
      </a-modal>
    )
  }
}
