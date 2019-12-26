<template>
  <div>
    <a-card v-if="loading">
      <a-skeleton :loading="loading" active/>
    </a-card>
    <a-card class="cards" v-if="!loading">
      <header>
        <span class="detail-title">质控信息</span>
        <div class="tips" :class="currentState.type">{{currentState.label}}</div>
        <a-button
          class="btn-item"
          type="primary"
          @click="handleFormClick"
          v-if="currentBtn.label"
        >{{currentBtn.label}}</a-button>
      </header>
      <ul class="detail-list" v-if="alist.length">
        <li v-for="item in alist" :key="item.label" :class="item.cls">
          <span class="detail-label">{{item.label}} :</span>
          <span>{{item.value}}</span>
        </li>
        <li v-if="arbitration.state===3">
          <span class="detail-label">附件</span>
          <span>
            <a :href="downloadURL" :download="arbitration.fileName">
              <a-icon type="download"/>下载
            </a>
          </span>
        </li>
      </ul>
    </a-card>
    <a-card v-if="!loading">
      <header>
        <span class="detail-title">投诉单信息</span>
        <span class="danger-title">投诉编号: {{content.complaintId}}</span>
      </header>
      <ul class="detail-list">
        <li v-for="item in list" :key="item.label" :class="item.cls">
          <template v-if="item.component">
            <component :is="item.component" :id="item.value"></component>
          </template>
          <template v-else>
            <span class="detail-label">{{item.label}} :</span>
            <span>{{item.value}}</span>
          </template>
        </li>
      </ul>
    </a-card>
    <a-card class="cards" title="操作记录" v-if="dataSource.length">
      <a-table rowKey="id" :dataSource="dataSource" :columns="columns"></a-table>
    </a-card>
    <detail-form
      :row="formData"
      :btn="currentBtn"
      :visible="formlVisible"
      @close="handleCloseForm"
    />
  </div>
</template>
<script>
import DetailForm from './components/detail-form'
import SIsOrder from './components/is-waybill'
import * as CONFIG from './config.detail'
import { URL_SERVICE_ARBITRATIONS, URL_SERVICE_ARBITRATIONS_DOWN } from '@/api/url'
export default {
  data() {
    return {
      loading: true,
      content: {},
      arbitration: {},
      dataSource: [],
      columns: [...CONFIG.columns],
      detailLabel: '',
      waybillShow: true,
      formlVisible: false,
      formCate: 0
    }
  },
  // mixins: [FormMixis],
  computed: {
    btns() {
      const { state } = this.content
      if (!state) return []
      return CONFIG.operations.filter(item => item.state === state)
    },
    list() {
      const { content = {} } = this
      const { items } = CONFIG
      return items.map(item => {
        const { field, component } = item
        let value = content[field]
        return {
          ...item,
          value
        }
      })
    },
    alist() {
      const { arbitration } = this
      const { aitems } = CONFIG
      let ret = aitems
      if (arbitration.state !== 3) {
        ret = ret.filter(item => item.state !== 3)
      }
      return ret.map(item => {
        const { field } = item
        const value = arbitration[field]
        return {
          ...item,
          value
        }
      })
    },
    currentState() {
      const { arbitration = {} } = this
      return CONFIG.state[arbitration.state] || {}
    },
    formData() {
      const { arbitration = {}, content = {} } = this
      return {
        id: arbitration.id,
        complaintId: content.id,
        complainant: content.complainant,
        arbitrationType: arbitration.arbitrationType
      }
    },
    currentBtn() {
      const { arbitration = {} } = this
      const { state = '' } = arbitration
      return CONFIG.operations[state] || {}
    },
    downloadURL() {
      const { id = '' } = this.arbitration
      // 开发环境需要添加 api 修改在URL文件
      return `${URL_SERVICE_ARBITRATIONS_DOWN}/${id}/download`
    }
  },
  created() {
    const { id } = this.$route.params
    this.$http.get(URL_SERVICE_ARBITRATIONS + '/' + id).then(res => {
      const { data } = res
      const { arbitration, complaint } = data
      this.content = complaint
      this.arbitration = arbitration    
      this.dataSource = complaint.logs.concat(arbitration.logs)

      this.loading = false
    })
  },
  methods: {
    handleChange(e) {
      this.waybillShow = e
    },
    handleFormClick(e) {
      this.formCate = e.cate
      this.formlVisible = true
    },
    handleCloseForm() {
      this.formlVisible = false
    }
  },
  components: {
    DetailForm,
    SIsOrder
  }
}
</script>
<style lang="less" scoped>
@danger: #ea0101f0;
@warn: #bd7777;
@success: #3cd488;
header {
  line-height: 30px;
  margin-bottom: 20px;
}
.detail-title {
  font-size: 18px;
  color: #888;
}
.detail-complaintId {
  margin-left: 20px;
}
.detail-list {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  li {
    width: 50%;
    padding: 10px 0;
  }
  .full {
    width: 100%;
  }
  .detail-label {
    display: inline-block;
    width: 120px;
    color: #999;
  }
}
.btn-item {
  float: right;
}
.tips {
  display: inline-block;
  margin-left: 20px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 12px;
  transform: rotate(-45deg);
  color: #fff;
  line-height: 70px;
  text-align: center;
  &.danger {
    background: @danger;
  }
  &.warn {
    background: @warn;
  }
  &.success {
    background: @success;
  }
}
.danger-title {
  margin-left: 20px;
  color: @danger;
}
.cards {
  margin-top: 5px;
}
</style>