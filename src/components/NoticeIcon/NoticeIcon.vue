<template>
  <div>
    <a-popover
      style="height: 50px"
      v-model="visible"
      trigger="click"
      placement="bottomRight"
      overlayClassName="header-notice-wrapper"
      :autoAdjustOverflow="true"
      :arrowPointAtCenter="true"
      :overlayStyle="{ width: '300px'}"
    >
      <template slot="content">
        <a-spin :spinning="loading" :indicator="indicator" tip="Loading...">
          <a-tabs defaultActiveKey="1" @change="changeTab" ><!-- @change="callback" -->
            <a-tab-pane tab="今日通知"
                        class="demo-infinite-container"
                        v-infinite-scroll="handleInfiniteOnLoad"
                        :infinite-scroll-disabled="busy"
                        :infinite-scroll-distance="10"
                        style="height: 400px"
                        key="1">
              <a-list
                :dataSource="data">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-list-item-meta>
                    <a slot="title" href="#" @click="doDetail(item)">{{item.title}}</a>
                     <!-- <p slot="description">{{item.waybillId}}</p> -->
                    <p slot="description">{{item.createTime}}</p>
                    <a-avatar style="background-color: white" slot="avatar"
                              src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                  </a-list-item-meta>
                </a-list-item>
                <div v-if="lastMessage" class="lastMessage">最后一条啦O(∩_∩)O哈哈~</div>
                <div v-if="loading && !busy" class="demo-loading-container">
                  <a-spin/>
                </div>
              </a-list>
            </a-tab-pane>
            <a-tab-pane tab="历史记录"
                        class="demo-infinite-container"
                        v-infinite-scroll="handleInfiniteOnLoad"
                        :infinite-scroll-disabled="busy"
                        :infinite-scroll-distance="10"
                        style="height: 400px"
                        key="2">
              <div class="lastMessage">暂未开放~</div> 
              <!-- <a-list
                :dataSource="data">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-list-item-meta>
                    <a slot="title" href="#" @click="doDetail(item)">{{item.title}}</a>
                    <p slot="description">{{item.createTime}}</p>
                    <a-avatar style="background-color: white" slot="avatar"
                              src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                  </a-list-item-meta>
                </a-list-item>
                <div v-if="lastMessage" class="lastMessage">最后一条啦O(∩_∩)O哈哈~</div>
                <div v-if="loading && !busy" class="demo-loading-container">
                  <a-spin/>
                </div>
              </a-list> -->
            </a-tab-pane>
          </a-tabs>
        </a-spin>
      </template>

      <span @click="fetchNotice" class="header-notice">
      <a-badge :count="this.total">
        <a-icon style="font-size: 16px; padding: 4px" type="bell"/>
      </a-badge>
    </span>
    </a-popover>
    <a-modal
      title="指派取件人"
      v-model="visibleOrder"
      @ok="handleOk"
    >
      <a-row :span="15" class="textSty">
        <a-col :span="4">
          <label>订单编号:</label>
        </a-col>
        <a-col :span="20">
          <span>{{form.orderCode}}</span>
        </a-col>
      </a-row>
      <a-row :span="24" class="textSty">
        <a-col :span="4">
          <label>寄件人:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.sender}}</span>
        </a-col>
        <a-col :span="4">
          <label>寄件人电话:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.senderPhone}}</span>
        </a-col>
      </a-row>
        <a-row :span="24" class="textSty">
        <a-col :span="4">
          <label>收件人:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.receiver}}</span>
        </a-col>
        <a-col :span="4">
          <label>收件人电话:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.receiverPhone}}</span>
        </a-col>
      </a-row>
        <a-row :span="24" class="textSty">
        <a-col :span="4">
          <label>起始网点:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.startOrgName}}</span>
        </a-col>
        <a-col :span="4">
          <label>目的网点:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.destOrgName}}</span>
        </a-col>
      </a-row>
        <a-row :span="24" class="textSty">
        <a-col :span="4">
          <label>物品信息:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.goodsInfo}}</span>
        </a-col>
        <a-col :span="4">
          <label>物品重量:</label>
        </a-col>
        <a-col :span="8">
          <span>{{form.goodsWeight}}</span>
        </a-col>
      </a-row>

      </a-row>
        <a-row :span="24" class="textSty">
        <a-col :span="4">
          <label>寄件地址:</label>
        </a-col>
        <a-col :span="20">
          <span>{{form.senderAddress}}</span>
        </a-col>
      </a-row>

       </a-row>
        <a-row :span="24" class="textSty">
        <a-col :span="4">
          <label>收件地址:</label>
        </a-col>
        <a-col :span="20">
          <span>{{form.receiverAddress}}</span>
        </a-col>
      </a-row>

      <a-row :span="24"  class="textSty">
        <a-col :span="4">
          <label>指派人:</label>
        </a-col>
        <a-col :span="20">
          <a-select style="width: 80%"   @change="handleChange" placeholder=" 请选择指派人">
            <a-select-option  v-for="(item, index) in couriers" :value="item.id" :key="index">{{item.name}}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row :span="15" class="textSty">
        <a-col :span="4">
          <label>备注:</label>
        </a-col>
        <a-col :span="20">
          <a-textarea
            v-model="form.remarks"
            style="width: 80%"
            rows="4"
            placeholder="请输入备注"
          />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import Storage from 'store2'
  import { axios } from '@/utils/request'
  import { URL_MESSAGES, URL_COURIER, URL_ORDER_INFO, URL_READ_MESSAGE, URL_COURIER_TODAY_ALL, ORDER_TODAY_SCAN , SEARCHBYID, URL_MESSAGES_USERID} from '@/api/url'
  import infiniteScroll from 'vue-infinite-scroll'
  import { mapGetters } from 'vuex'

  import PickupForm from '../../views/order/components/pickup-form' // 指定取件员

  export default {
    directives: { infiniteScroll },
    name: 'HeaderNotice',
    data() {
      return {
        indicator: <a-icon type="loading" style="font-size: 24px" spin/>,
        userId: '',
        userInfo:{},
        data: [],
        total: '',
        loading: false,
        loadding: false,
        visible: false,
        pickupVisible: false,
        busy: false,
        page: 0,
        currentId:1,
        listName: [],
        lastMessage: false,
        visibleOrder: false,
        selectType: '',
        selectArr: [],
        orderId:'',
        couriers: [],
        form: {
          orderId: '',
          remarks: '',
          receiveId: ''
      },
      mesageCount:0,
    }
    },
    computed: {
      ...mapGetters(['siteId', 'id2Label','nickname'])
    },

    beforeMount() {
      // this.fetchData((res) => {
      //   console.log('===res===', res)
      //   this.total = res.totalCount
      //   this.data = res.data
      // })
    },
    mounted() {
      this.userInfo = JSON.parse(localStorage.getItem('login_user'))
      // 设置通知全局样式
      this.$notification.config({
        placement: 'bottomRight',
        duration: null
      });
      //监听鼠标滚动事件
      window.addEventListener('mousewheel', this.debounce(this.handleScroll,300), true)||window.addEventListener("DOMMouseScroll",this.debounce(this.handleScroll,300),false)
      //this.getkdyList()
      this.getList()
      // WebSocket
      if ('WebSocket' in window) {
        // this.websocket = new WebSocket('ws://api.24ud.cn/message/websocket/' + Storage.get('login_user').id)
        // this.websocket = new WebSocket('wss://api.24ud.cn/message/websocket/' + this.userId)

        this.initWebSocket()
      } else {
        alert('当前浏览器不支持websocket协议,消息推送功能将无法使用!请更换浏览器(如:chrome)')
      }
    },
    beforeDestroy() {
      this.onbeforeunload()
    },
    methods: {
      // 获取快递员列表
      getkdyList(row) {
        console.log('this.$store.state', this.$store.state)
        const params = {
         oid: row.startOrgId
        }
        this.$http.get(URL_COURIER_TODAY_ALL, { params }).then(res => {
          if(res.data.code == 200) {
            this.couriers = res.data.data
            console.log('couriers', this.couriers)
          }
      
        })
      },
      //切换栏目
      changeSel(id){
        console.log(id)
      },
      //函数防抖
      debounce(func, wait) {
        let timeout;
        return function () {
          let context = this;
          let args = arguments;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            func.apply(context, args)
          }, wait);
        }
      },
      getList() { 
        this.userId = Storage.get('login_user').userId
        console.log('=======getList========')
        axios.get(`${URL_MESSAGES_USERID}/${this.userInfo.userId}?page=${this.page}`).then(res => {
          if(res.data.data.rows.length !== 0) {
            this.lastMessage = false
          } else {
            this.lastMessage = true
          }
           this.total = res.data.data.total
           this.data = this.data.concat(res.data.data.rows)
           this.$store.dispatch("changeMesage", this.data.length)
          this.loading = false
          console.log('this.data', this.data)
        })

      },
      //判断滚动方向
      handleScroll(e){
        let direction = e.deltaY > 0 ? 'down' : 'up'
        if(direction === 'down' && !this.lastMessage) {
          this.loading = true
          this.page++
          this.getList()
        }
      },
      fetchNotice() {
        // if (!this.visible) {
        //   this.loading = true
        //   if (!this.data) {
        //     setTimeout(() => {
        //       this.loading = false
        //       // this.fetchData()
        //     }, 100)
        //   }
        // }
        this.loading = false
        this.visible = !this.visible
      },
      fetchData(callback) {
        this.userId = Storage.get('login_user').id
        console.log('=======fetchData========')
        axios.get(`${URL_MESSAGES}/user/${this.userId}?page=${this.page}`).then(res => {
          // this.total = res.totalCount
          // this.data = res.data
          callback(res)
        })
      },
      handleInfiniteOnLoad() {
        console.log('=======handleInfiniteOnLoad========')
        console.log(this.data)
        const data = this.data
        this.loading = true
        if (data.length >= this.total) {
          this.$message.warning('没有更多了')
          this.busy = true
          this.loading = false
          return
        }
        this.fetchData((res) => {
          this.data = data.concat(res.data)
          this.loading = false
        })
      },
      loadMore() {
        console.log('滚频')
      },
      initWebSocket() {
          // this.websocket = new WebSocket('wss://api.24ud.cn/message/websocket/' + this.userId)
             this.websocket = new WebSocket('wss://api.24ud.cn/websocket/' + this.userInfo.userId) // 线上
           // this.websocket = new WebSocket('ws://192.168.1.153:8080/websocket/' + this.userInfo.userId)
           //this.websocket = new WebSocket('ws://121.40.165.18:8800')

        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

       
      
        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      }
      ,
      setErrorMessage() {
        console.log('WebSocket连接发生错误,状态码:' + this.websocket.readyState)
      }
      ,
      setOnopenMessage() {
        console.log('WebSocket连接成功,状态码:' + this.websocket.readyState)
          this.page = 0
          this.data = []
          this.getList()
         // this.websocket.send("发送数据");
      }
      ,
      setOnmessageMessage(event) {
        //根据服务器推送的消息做自己的业务处理
        console.log('收到消息event', event)
        const res = JSON.parse(event.data)
        console.log('收到消息', res)
        if (res) {
          console.log(res)
          this.page = 0
          this.data = []
          this.getList()
       
        // this.openNotification(res)
         this.getOrderDetail(res)
          if (this.data.length >= 10) {
            this.data.pop()
          }
        }
        // console.log('服务端返回:' ,msg)
      }
      ,
      setOncloseMessage() {
        this.initWebSocket()
        console.log('WebSocket连接关闭,状态码:' + this.websocket.readyState)
      }
      ,
      onbeforeunload() {
        this.closeWebSocket()
      }
      ,
      closeWebSocket() {
       // this.websocket.close()
      },
      doDetail(detail) {
        console.log('detail',detail)
        this.getOrder(detail)
      
        // this.$router.push({ path: `/message/detail`})
      },
      handleOk(e) {
        console.log(e);
        console.log('form', this.form)
        if(this.form.courierId === '') {
          this.$message.warning('快递员不能为空!')
        } else {
          let params = {
            wbId: this.form.orderId || '',
            courierId: this.form.courierId || '',
            remark: this.form.remarks || '',
            userId: this.userInfo.userId,
            state:1,
            orgId: this.userInfo.orgId
            
          }

          axios.put(ORDER_TODAY_SCAN, params).then(res => {
            console.log('res',res)
            if(res.data.code == 200) {
              this.$message.success(res.data.message)
              this.visibleOrder = false
              this.readMessage()
              this.page = 0
              this.$router.push({path: '/order/index'})
            } else {
              this.$message.error(res.data.message)
             }
          })
        }
      },
      handleChange(value) {
        console.log(`selected ${value}`);
        this.couriers.forEach(item => {
          if(item.id === value) {
            this.form.courierName = item.name
          }
        })
        this.form.courierId = value
      },
      readMessage() {
        axios.get(`${URL_READ_MESSAGE}/${this.form.messageId}`).then(res => {
          console.log('res',res)
          if(res.data.code == 200) {
            this.page = 0
            this.data = []
            this.getList()
            this.form = {
              orderId: '',
              remarks: '',
              receiveId: '',
              receiveName: '',
              messageId: ''
            }
          }
        })
      },
      // 弹出框
      openNotification (row) {
        this.$notification.open({
          message: '您有一条订单待查收!',
          description: `订单编号:${row.tdNo}`,
          duration: 4.5,
          onClick:() => {
            console.log('点击消息')
            this.$router.push({path: '/order/index'})
            this.$store.dispatch("clickMesage",row.tdNo)
          }
        });
      },
      changeTab() {
        // this.$store.dispatch("changeMesage", this.mesageCount++)
        // this.$store.dispatch("clickMesage", 123456789)
        // this.openNotification();
      },
      // 获取订单详情
      getOrderDetail(row) {
        let params = {
          id: row.waybillId
        }

         axios.get(`${SEARCHBYID}/${params.id}`).then(res => {
          console.log(res)
          if(res.data.code == 200) {
             // this.data.unshift(res)
             //  this.$store.dispatch("changeMesage", this.data.length)
              this.openNotification(res.data.data)
               
          }

        })

      },
          // 获取订单
      getOrder(row) {


        this.form.orderId = row.waybillId
        this.form.messageId = row.id
        // this.visible = false
        // this.visibleOrder = true

        let params = {
          id: row.waybillId
        }

         axios.get(`${SEARCHBYID}/${params.id}`).then(res => {
          console.log(res)
          if(res.data.code == 200) {
            this.form.orderCode = res.data.data.tdNo

            this.form.sender = res.data.data.sender
            this.form.senderPhone = res.data.data.senderPhone
            this.form.receiver = res.data.data.receiver
            this.form.receiverPhone = res.data.data.receiverPhone
            this.form.startOrgName = res.data.data.startOrgName
            this.form.destOrgName = res.data.data.destOrgName
            this.form.goodsInfo = res.data.data.goodsInfo
            this.form.goodsWeight = res.data.data.goodsWeight
            this.form.senderAddress = res.data.data.senderAddress
            this.form.receiverAddress = res.data.data.receiverAddress

            this.visible = false
            this.visibleOrder = true
            this.getkdyList(res.data.data)
          }
        })

      }

    },

  }
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }

  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 300px;
    /*height: 100px;*/
  }

  .demo-loading-container {
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
  }
</style>
<style lang="less" scoped>
  .header-notice {
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
  .lastMessage{
    text-align: center;
    color: #7e7e84;
    font-size: 16px;
  }
  .textSty{
    margin-top: 10px;
  }
</style>
