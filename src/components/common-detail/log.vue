<!--
 * @Author: your name
 * @Date: 2019-12-03 22:42:50
 * @LastEditTime: 2019-12-09 15:58:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\components\common-detail\log.vue
 -->
<template>
  <section class="detail-wrapper">
    <a-table :rowKey="record => record['time']" :columns="columns" :dataSource="logs"></a-table>
  </section>
</template>

<script >
const columns = [
    {
      title: '操作网点',
      dataIndex: 'orgName'
    },
  {
    title: '操作人',
    dataIndex: 'userName'
  },
  {
    title: '快递员',
    dataIndex: 'courierName'
  },
  {
    title: '订单明细',
    dataIndex: 'detail'
  },
  {
    title: '操作时间',
    dataIndex: 'createTime'
  },
  {
    title: '备注',
    dataIndex: 'remarks'
  }
]
export default {
  name: 'CommonDetailLogger',
  data() {
    return {
      columns
    }
  },
  props: {
    logs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // source() {
    //   const { logs } = this
    //   return 1
    // }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
.detail-wrapper {
}
</style>
