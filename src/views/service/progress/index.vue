<template>
  <a-card>
    <div class="search">
      <a-select v-model="category" style="width:120px" v-decorator="[

                {
                  rules: [{
                    required: true,
                    message: '账号类型',
                  }],
                }
              ]"
                 placeholder="请选择账号类型">
        <a-select-option v-for="item in userType" :key="item.value"
        >{{item.name}}</a-select-option
        >
      </a-select>
      <a-input-search @search="handleSearch" style="width: 40%" placeholder="请输入运单号">
        <a-button slot="enterButton" type="primary">搜索</a-button>
      </a-input-search>
    </div>
    <div class="search-list" v-if="logs.length == 0" style="text-align:center">暂无订单信息</div>
    <div class="search-list" v-if="logs.length">
      <h3 class="list-hd">
        订单跟踪进度
        <a-button class="detail" type="primary" @click="handleViewDetail">查看订单详情</a-button>
      </h3>
      <a-timeline mode="alternate" :reverse="true">
        <span slot="pendingDot">正在拼命送货中</span>
        <a-timeline-item
          v-for="(log, key) in logs"
          :key="key"
          class="tileline-item"
          :class="{active: key=== logsLen}"
          :color="key=== logsLen? 'red': '#999'"
        >
          <a-icon slot="dot" type="up-circle"/>
          【{{log.nextSiteName || '暂无'}}】
          <br>
          {{log.detail}}  {{log.createTime}}
        </a-timeline-item>
      </a-timeline>
    </div>
    <!-- <div class="empty" v-if="!logs.length">
      等待搜索 测试订单：OD20190412112306970
      <div>没有相关订单信息</div>
    </div>-->
    <order-detail
      :row="order"
      :config="config"
      :visible="detailVisible"
      :width="800"
      @close="handleCloseDetail"
    />
  </a-card>
</template>

<script>
import { ORDER_TODAY, ORDER_JSD } from '@/api/url'
import OrderDetail from '@/components/common-detail'
import * as setting from '@views/order/config'

export default {
  name: 'Progress',
  data() {
    return {
      config: { ...setting },
      detailVisible: false,
      category: '1',
      order: {},
      logs: [],
      userType:[
        {name: '当日达', value: 1},
        {name: '即时达', value: 2},
      ],
      category: 1
    }
  },
  computed: {
    logsLen() {
      return this.logs.length - 1
    }
  },
  methods: {
    handleSearch(id) {
       let url = ORDER_TODAY
      if(this.category == 1) {
        url = `${ORDER_TODAY}?wbNo=${id}&category=${this.category}`

      }else if(this.category == 2) {
        url = `${ORDER_JSD}?wbNo=${id}&category=${this.category}`
      }
      this.$http.get(url).then(res => {
        if(res.data.data.rows.length > 0) {
        let [ data ] = res.data.data.rows
        let { charges = {}, transportation = {}, accident = {}, ...props } = data
        this.order = {
          ...props,
          charges,
          transportation,
          accident
        }
        if (data.logs.length) {
          this.logs = data.logs
          this.$message.success('查询成功')
        } else {
          this.logs = []
          this.$message.success('暂无此订单信息')
        }
        } else {
          this.logs = []
          this.$message.success('暂无此订单信息')
       
        }
      })
    },
    handleChange(e) {
      this.category = e
    },
    handleCloseDetail() {
      this.detailVisible = false
    },
    handleViewDetail() {
      this.detailVisible = true
    }
  },
  components: {
    OrderDetail
  }
}
</script>

<style scoped lang="less">
.search {
  margin: 20px 0;
  text-align: center;
}
.list-hd {
  padding: 10px 0 20px;
  text-align: center;
}
.tileline-item {
  color: #888;
  &.active {
    color: red;
  }
}
.detail {
  float: right;
}
.empty {
  text-align: center;
  height: 600px;
}
</style>
