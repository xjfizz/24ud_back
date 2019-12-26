<template>
  <a-modal
    title="导入execl报表"
    :visible="visible"
    :footer="null"
    @cancel="handleClose"
    :destroyOnClose="true"
    :width="700"
  >
    <a-upload
      class="import-btn"
      action="/api/orders/importExcel"
      :beforeUpload="handleBeforeUpload"
    >
      <a-button>
        <a-icon type="upload"/>选择execl文件
      </a-button>
    </a-upload>
    <a-form v-if="tableShow" :form="AntForm" @submit="handleSubmit">
      <a-row>

        <a-col :span="12" v-show="sendSite">
        <a-form-item :wrapperCol="wrapperCol" :labelCol="labelCol" label="目的网点">

          <a-cascader changeOnSelect :options="siteList" placeholder="选择网点" v-model="sendSiteId" :fieldNames="sendField" />

        </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :wrapperCol="wrapperCol" :labelCol="labelCol" label="录入时间">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择时间"
              @change="dateOk"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item :wrapperCol="wrapperCol" :labelCol="labelCol" label="运输单位" >
            <a-select   :options="orgOption" v-model="orgId">
            </a-select>
          </a-form-item>
        </a-col>-->
        <a-col :span="12"> 
          <a-form-item :wrapperCol="wrapperCol" :labelCol="labelCol" label="付款方式">
            <a-select defaultValue="2" v-model="payType" >
              <a-select-option value="2">到付</a-select-option>
              <a-select-option value="1">寄付</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item :wrapperCol="wrapperCol" :labelCol="labelCol" label="是否转运">
            <a-select v-model="transferState" >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="0">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-form-item class="form-btns">
        <a-button type="primary" html-type="submit">确认</a-button>
      </a-form-item>
    </a-form>
<!--    <excel-form v-if="tableShow" :options="options" @submit="handleSubmit"/>-->
    <!-- <a-table
      bordered
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="dataSource"
      v-if="tableShow"
    ></a-table>-->
  </a-modal>
</template>

<script >
import excel from '@/utils/excel'
import FormMixis from '@/mixins/form'
import { URL_ORDERS_IMPORT } from '@/api/url'
import excelConfig from './excel.config'
import excelEditConfig from './excel.edit'
// import ExcelForm from '@/components/common-excel-form'
import { mapGetters } from 'vuex'
import Storage from 'store2'
import { URL_COMPANY, URL_ORG_ALL_CHILD_ , URL_SYSTEM_AUTH_STRUCTURE_ALL } from '../../../api/url'



import { axios } from '@/utils/request'

export default {
  name: 'pickup-form',
  data() {
    return {
      userInfo: {},
      siteList:{},
      sendField:{
        label:'label',
        value:'id',
        children:'children'
      },
      AntForm: this.$form.createForm(this),
      wrapperCol: {
        span: 14
      },
      labelCol: {
        span: 10
      },
      columns: [],
      dataSource: [],
      tableShow: false,
      options: [],
      sendSite: true,
      payType: '1',
      transferState:'0',
      createTime: '',
      sendSiteId: null,
      orgId: null ,
      sendSiteOption: [
      
      ],
      orgOption: [
      
      ]
    }
  },
  computed: {
    ...mapGetters(['siteId', 'nickname'])
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    //   siteList: {
    //   type: Array,
    //   default: []
    // },
  },
  created() {
  
   this.userInfo= Storage.get('login_user')
   this.getSiteList()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    dateOk(date,dateString){
      this.createTime = dateString
    },
    orgChange(val,opt){

    },
    handleBeforeUpload(file) {
      console.log('file', file)
      const fileExt = file.name
        .split('.')
        .pop()
        .toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        console.log('file', file)
        this.readFile(file)
        this.file = file
      } else {
        this.$message.warning('文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。')
        return false
      }
      return false
    },
    readFile(file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadstart = e => {
        this.uploadLoading = true
        this.tableLoading = true
        this.showProgress = true
      }
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100)
      }
      reader.onerror = e => {
        this.$message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$message.info('文件读取成功')
        const data = e.target.result
        console.log('data', data)
        let { header, results } = excel.read(data, 'array', excelConfig)
        console.log('header', header, results)
          header =  header.map( item => {
          return  item.replace(/\s*/g,"");
        })
        console.log('header1', header)
        // const tableTitle
        const tableTitle = header.map(title => {
          const dataIndex = excelConfig[title] || title
          return { title, dataIndex }
        })
        console.log('tableTitle', tableTitle)
        const formItems = Object.keys(excelEditConfig)
          .filter(key => {
            return excelEditConfig[key]
          })
          .map(key => excelEditConfig[key])
        console.log(formItems)

        this.options = formItems
        this.dataSource = results
        this.columns = tableTitle
        this.tableShow = true
        // this.tableLoading = false
        // this.showRemoveFile = true


        this.checkUser()
      }
    },
    checkUser(){
      const u = Storage.get('login_user')
      console.log('u.siteIds', u.siteIds)
     
      if(u.level  < 4) {
      
         this.sendSite = true
      } else if(u.level >= 4) {
        this.sendSite = false
      }

      // if(u.siteIds){
      //   let siteId = ''
      //   let index;
      //   for (let i = u.siteIds.length - 1; i >= 0; i--) {
      //     if (u.siteIds[i] !== null && u.siteIds[i] !== '') {
      //       siteId = u.siteIds[i]
      //       index = i;
      //       break
      //     }
      //   }
      //   console.log('i', index)
      //   if (index<3){
      //     this.sendSite = true
      //     /* 站点判断 */
      //     /* 站点判断-end */
      //     this.$http.get(URL_ORG_ALL_CHILD_ +`?id=${siteId}`).then(res => {
      //       console.log('----', res)
      //       setTimeout( () => {
      //         console.log('----', res)
      //         this.sendSiteOption = res.data
      //       },500)
      //     })
      //   } else {
      //     this.sendSite = false
      //   }


      //   this.$http.get(URL_COMPANY + `?oid=${index === 0 ? '' : siteId}`).then(res => {
      //     console.log(res)
      //     this.orgOption = res.data.map(it => {
      //      return { title: it.companyName,
      //        value:it.id}
      //     })
      //   })
     // }
    },

  // 获取站点树
    getSiteList() {
      axios.get(`${URL_SYSTEM_AUTH_STRUCTURE_ALL}?id=${this.userInfo.orgId}`).then(res => {
       const data = res.data.data
       this.siteList = this.formatData(data)
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


    handleSubmit(e) {
      e.preventDefault();
      const u = Storage.get('login_user')
      if((this.sendSiteId === '' || this.sendSiteId ===null)  && u.siteIds[3] == '' && u.siteIds[3] == null) {
        return this.$message.success('当前未选择网点!')
      }
      // const newFields = {}
      // Object.keys(e)
      //   .filter(key => e[key] != undefined)
      //   .forEach(key => {
      //     newFields[key] = e[key]
      //   })

      // const { siteId, nickname } = this
      // console.log(this.dataSource)
      const last = this
      console.log(this)

      let orgName = ''
      console.log('orgOption', this.orgOption)
      this.orgOption.forEach(it =>{
        if(it.value == last.orgId){
          orgName = it.title
        }
      })
      // const newValues = this.dataSource.map(item => {
      //
      //   return {
      //     ...item,
      //     ...newFields,
      //     transportation: {
      //       sendSite: nickname,
      //       sendSiteId: siteId
      //     }
      //   }
      // })
      console.log('dataSource', this.dataSource, this.sendSiteId)

      const newValues  = this.dataSource.map(it => {
        const u = this.userInfo
        let siteId = ''
        let orgIg = ''
        let startOrgId = ''
        let destOrgId = ''
        console.log('u',u,this.userInfo)
        let that = this
       if(this.userInfo.level < 4) {
          destOrgId = that.sendSiteId[this.sendSiteId.length - 1] || ''
          console.log('===',that.userInfo, that.userInfo.orgId)
          startOrgId = that.userInfo.orgIg
          console.log('=====', that.userInfo, that.userInfo.orgId)
          return {
          ...it,
          orgId: that.userInfo.orgId,
          startOrgId: that.userInfo.orgId,
          destOrgId: destOrgId,
          payType: that.payType,
        //  transferState: that.transferState,
          createTime: that.createTime,
          userId: that.userInfo.userId
        }
        } else {
     
          destOrgId = that.userInfo.orgId
          startOrgId = that.userInfo.orgId
           return {
          ...it,
          orgId: that.userInfo.orgId,
          startOrgId: that.userInfo.orgId,
          destOrgId: that.userInfo.orgId,
          payType: that.payType,
         // transferState: that.transferState,
          createTime: that.createTime,
          userId: that.userInfo.userId
        }
        }
       

        // for(let i = this.sendSiteId.length; i>0; i--) {
        //   if(this.sendSiteId[i] !== null || this.sendSiteId[i] !== '') {
        //     siteId = this.sendSiteId[i]
        //     break
        //   }
        // }
      //   console.log('u', u, this.sendSiteId)
      //   /* 判断是站点还是总部 */
      //   if(this.sendSiteId === null) {/* 站点*/
      //     if (u.siteIds[3] == '' || u.siteIds[3] == null) {
      //       if(u.siteIds[2] != ''){
      //         siteId = u.siteIds[2]
      //         // orgName = this.sendSiteOption[0].label
      //       }
      //     }else {
      //       siteId= u.siteIds[3]
      //       // orgName = this.sendSiteOption[0].label
      //     }
      //   } else {/* 总部 */
      //     if (this.sendSiteId[3] == '' || this.sendSiteId[3] == null) {
      //       if(this.sendSiteId[2] != ''){
      //         console.log('this.sendSiteId', this.sendSiteId, this.sendSiteId[2])
      //         siteId = this.sendSiteId[this.sendSiteId.length - 1]
      //       }
      //     }else {
      //       siteId = this.sendSiteId[3]
      //     }
      //   }
      //   setTimeout( () => {
      //     console.log('siteId', siteId, this.sendSiteOption)
      //   }, 500);
      //  // let sendSite = sendSiteOption
      //   return {
      //     ...it,
      //     transportation: {
      //       sendSiteId: siteId,
      //       transferList: [
      //         {
      //           transportId: last.orgId,
      //           transport: orgName,
      //           nextSiteId: siteId
      //         }
      //       ]
      //     },
      //     createTime: last.sendTime,
      //     transferState: Number(this.transferState)

      //   }
      })
      console.log('newValues', newValues)
     this.$http.post(URL_ORDERS_IMPORT, newValues).then(res => {
       console.log('res',res)
        // this.$emit('close')
       if(res.data.code === 200) {
         //this.visible = false
         this.$message.success('导入成功')
         this.$emit("close")
       } else {
             this.$message.error('导入失败，请核对导入表格')
       }
      })
     return false
    },
    interceptors(value) {
      console.log(value)
      // const [id] = this.orderIds
      // const { picker } = value
      // return {
      //   id,
      //   state: 2,
      //   picker: {
      //     id: picker
      //   }
      // }
    },
    handleUploadchange(event) {
      const { status } = event.file
      if (status === 'done') {
        this.$message.success('导入成功')
      } else if (status === 'uploading ') {
        // todo
      }
    }
  },
  // mixins: [FormMixis],
  // components: {
  //   ExcelForm
  // }
}
</script>
<style lang="less" scoped>
.data-tree {
  text-align: center;
  .ant-transfer-list {
    width: 260px;
    height: 300px;
  }
}
.import-btn {
  display: block;
  text-align: center;
}
.modalWrap {
  min-width: 600px;
  width: auto;
}
</style>
