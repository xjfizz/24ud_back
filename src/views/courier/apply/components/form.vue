<template>
  <a-modal
    :title="formTitle"
    :visible="visible"
    :footer="null"
    :width="width"
    :bodyStyle="bodyStyle"
    @cancel="handleClose"
  >
    <!-- <div class="statusText">成功</div> -->
    <a-card :bordered="false" :headStyle="bodyStyle" :bodyStyle="bodyStyle" title="基本信息">
      <ul class="baseInfo">
        <li v-for="item in fieldValues" :key="item.value">
          <span class="info-label">{{item.label}} :</span>
          <span class="info-text">{{item.value}}</span>
        </li>
      </ul>
    </a-card>
    <!--  v-if="row.type === 1" -->
    <a-card  :bodyStyle="bodyStyle" :headStyle="bodyStyle" :bordered="false" title="认证信息">
      <ul class="checklist">
        <li v-for="item in checkList" :key="item.label">
          <div class="check-label">{{item.label}}</div>
          <div class="check-thumb">
            <!--  :src="img.indexOf('http') > -1 ? img : imgNo" -->
            <img
              @click="handleViewThumb(img)"
              v-for="(img, index) in item.path"
              :key="index"
              class="thumb"
              :src=" img.indexOf('http') > -1 ? img : imgNo"
            >
          </div>
          <div class="check-result" >{{checkStatus.text}}</div>
        </li>
      </ul>
    </a-card>
    <div class="black">
      <div class="check-btns" > <!-- v-if="checkStatus.status" -->
        <a-popconfirm
          :title="btn.confirm"
          v-for="btn in btns"
          :key="btn.state"
          @confirm="handleConfirm(btn)"
        >
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button class="btn" :type="btn.type">{{btn.label}}</a-button>
        </a-popconfirm>
      </div>
    </div>
    <a-modal :footer="null" :width="900" :visible="thumbVisible" @cancel="handleViewThumb">
      <img class="view-thumb" :src="viewPhoto" alt>
    </a-modal>
  </a-modal>
</template>

<script >
import FormMixis from '@/mixins/form'
import UploadMixin from '@/mixins/upload'
const fields = [
  {
    field: 'name',
    label: '姓名'
  },
  {
    field: 'sex',
    label: '性别'
  },
  {
    field: 'phone',
    label: '电话'
  },
  {
    field: 'identity',
    label: '身份证号'
  },
  {
    field: 'school',
    label: '毕业院校'
  },
  {
    field: 'education',
    label: '学历'
  },
  {
    field: 'address',
    label: '居住地址'
  },
  {
    field: 'emergencyPeople',
    label: '紧急联系人电话'
  }
]

const btns = [
  { label: '通过', state: 2, type: 'primary', confirm: '确认审核通过么？' }, // 认证
  { label: '驳回', state: 0, type: 'danger', confirm: '确认驳回申请？' } // 禁用
]
export default {
  name: 'ApplyForm',
  data() {
    return {
      fields,
      btns,
      thumbVisible: false,
      bodyStyle: {
        padding: '0 20px'
      },
      viewPhoto: '',
      imgNo:require('../../../../assets/image/no.jpg') 
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
      default: 600
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
    formTitle() {
      return this.row.state === 0 ? '申请审核' : '审核结果'
    },
    checkList() {
      // const { timelyCourier = {}, diplomas = '' } = this.row
      //  const { timelyCourier = {}, diplomas = '' } = this.row
      // const { idCards = {} } = (timelyCourier || {})
      // const cards = idCards || {}
      let {front = '', back = '', diploma = ''} = this.row
      let checkList = []
     // const cardImgs = Object.keys(cards).map(key => cards[key].path || '')
      if (front) {
        // front = front.indexOf('http') > -1 ? front : this.imgNo
        // back = back.indexOf('http') > -1 ? back : this.imgNo
        checkList.push({
          label: '身份认证',
          path: [front,  back]
        })
      }
      if (diploma) {
        // diploma = diploma.indexOf('http') > -1 ? diploma : this.imgNo
        checkList.push({
          label: '学历认证',
          path:[ diploma] 
        })
      }
      console.log('checkList', checkList)
      return checkList
    },
    courier() {
      const { timelyCourier = {} } = this.row
      return timelyCourier || {}
    },
    fieldValues() {
      return this.fields.map(item => {
        const { label, field } = item
        const { courier = {} } = this
        console.log(courier)
        let value = this.row[field] || courier[field]
        if (field === 'sex') {
          value = value === 2 ? '女' : '男'
        }
        return {
          label,
          value
        }
      })
    },
    checkStatus() {
      let { state } = this.row
      // const status = state === 1
      // const text = state === 2 ? '成功' : '失败'
      let status = state
      let text = '未认证'
      switch(status) {
        case 1:
          text = '未认证';
          break;
        case 2:
          text = '已认证';
          break;
        case 0:
          text = '已禁用';
          break;
      }
      return {
        status,
        text
      }
    }
  },
  methods: {
    handleViewThumb(img) {
      this.thumbVisible = !this.thumbVisible
      this.viewPhoto = img
    },
    handleClose() {
      this.$emit('close')
    },
    handleConfirm(btn) {
      let { id } = this.row
      let { state } = btn
      let params = {
        ids: [id],
        state: state
      }
      this.$http
        .put(this.url,params)
        .then(res => {
          const { data } = res
          if (res.data.code === 200) {
            this.$message.success('操作成功')
            this.handleClose()
            this.reload()
          }
        })
        .catch(error => {
          this.$message.success('操作失败，请稍后再试')
        })
    }
  },
  inject: ['reload']
}
</script>
<style lang="less" scoped>
.header-title {
  position: relative;
  .statusText {
    position: absolute;
    left: 50%;
    width: 80px;
    height: 80px;
    text-align: center;
    border-radius: 50%;
    transform: translateX(-50%);
    background: #ff0000;
  }
  .success {
    background: green;
  }
}
.baseInfo {
  display: flex;
  flex-flow: row wrap;
  padding-top: 20px;
  li {
    line-height: 20px;
    padding: 4px;
    width: 50%;
  }
  .full {
    width: 100%;
  }
  .info-label {
    display: inline-block;
    width: 120px;
  }
}
.black {
  padding: 30px 0;
  text-align: center;
}
.checklist {
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
  .check-label {
    width: 80px;
  }
  .check-thumb {
    flex: 1;
  }
  .check-result {
    width: 120px;
    font-size: 20px;
    color: #193df5;
  }
  .check-btns {
    width: 200px;
    .btn {
      margin-right: 5px;
    }
  }
  .thumb {
    width: 100px;
    margin-right: 5px;
  }
}
.view-thumb {
  width: 100%;
}
</style>
