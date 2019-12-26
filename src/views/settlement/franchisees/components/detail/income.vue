<template>
  <section class="detail-wrapper">
    <header>流水记录</header>
    <common-table
      :columns="columns"
      :url="url"
      :params="params"
      :options="option"
    />
  </section>
</template>

<script >
import { CommonTable } from '@/components'
import { URL_COURIER_TRANSACTIONS } from '@/api/url'
const tableConfig = {
  selectAll: false,
  rowKey: 'tid',
  pageSpan: 24,
  initFetch: true
}
const columns = [
  {
    title: '序号',
    dataIndex: 'num'
  },
  {
    title: '金额(元)',
    dataIndex: 'money'
  },
  {
    title: '时间',
    dataIndex: 'time'
  },
  {
    title: '类型',
    dataIndex: 'type'
  }
]
export default {
  name: 'CourierDetailIncome',
  data() {
    return {
      columns,
      option: tableConfig,
      params: {}
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    url() {
      const { id = '' } = this
      return `${URL_COURIER_TRANSACTIONS}/${id}`
    }
  },
  components: {
    CommonTable
  }
}
</script>
<style lang="less" scoped>
</style>