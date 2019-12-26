<!--
 * @Author: your name
 * @Date: 2019-11-22 17:32:51
 * @LastEditTime: 2019-12-04 20:48:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \24ud-back\src\components\common-tools\common-pagination.vue
 -->
<template>
  <div>
    <a-pagination
      size="small"
      :total="options.total"
      showQuickJumper
      showSizeChanger
      @change="onChange"
      :showTotal="showTotal"
      @showSizeChange="showSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonPagination',
  props: {
    options: {
      type: Object,
      default: () => { }
    },
    current: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onChange(page) {
      this.$emit('page-change', { page: --page })
    },
    showSizeChange(page, limit) {
      this.$emit('page-change', { page: --page, limit })
    },
    showTotal(total) {
      const tips = this.options.tips || '共 {num} 条数据'
      return tips.replace(/{num}/g, total)
    }
  }
}
</script>
