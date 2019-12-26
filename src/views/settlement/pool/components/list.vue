<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="width"
    :title="Vtitle"
    @cancel="handleClose"
    :destroyOnClose="true"
  >
    <a-table
      style="text-align: center;"
      :columns="columns"
      :dataSource="tableData"
      bordered
      :rowKey="keyRow"
    >
      <a-button slot="operation" slot-scope="text, record" @click="showDetail(record)">查看</a-button>
    </a-table>
    <common-detail
      :row="detailContent"
      :config="setting"
      :visible="detailVisible"
      @close="handleCloseDetail"
    ></common-detail>
  </a-modal>
</template>

<script >
import CommonDetail from '@/components/common-detail' // 订单详情
import * as setting from '@/views/order/config'
import { URL_ORDER_INFO , SEARCHBYID} from '../../../../api/url'

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '10%',
    align: 'center'
  },
  {
    title: '订单编号',
    dataIndex: 'id',
    // width: '40%',
    scopedSlots: { customRender: 'deptName' }
  },
  // {
  //   title: '寄件地址',
  //   dataIndex: 'receiverAddress',
  //   width: '40%',
  //   scopedSlots: { customRender: 'receiverAddress' }
  // },
  // {
  //   title: '收件地址',
  //   dataIndex: 'senderAddress',
  //   width: '40%',
  //   scopedSlots: { customRender: 'senderAddress' }
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '15%',
    align: 'center',
    slot: true,
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  name: 'order-list-form',
  data() {
    return {
      wrapperCol: {
        span: 14
      },
      labelCol: {
        span: 10
      },
      keyRow: record => record['id'],
      columns,
      detailContent: {},
      setting: { ...setting },
      detailVisible: false
    }
  },
  props: {
    url: {
      type: String
    },
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
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
    tableData() {
      return this.list.map((item, index) => {
        return {
          index: ++index,
          id: item
        }
      })
    },
    Vtitle() {
      return `${this.title}列表`
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    showDetail(detail) {
      // this.$http.get(URL_ORDER_INFO + `/${detail.id}`).then(res => {
       let params = {
          id: detail.id
        }
       this.$http.get(`${SEARCHBYID}/${params.id}`).then(res => {
        console.log(res.data)
        this.detailContent = res.data.data
        this.detailVisible = true
      })
    },
    handleCloseDetail() {
      this.detailVisible = false
    }
  },
  components: {
    CommonDetail
  }
}
</script>
