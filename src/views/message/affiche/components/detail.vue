<template>
  <a-modal title="新闻详情" :visible="visible" :footer="null" :width="width" @cancel="handleClose">
    <div class="content">
      这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容
      这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容
      这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容
      这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容
      这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容这是新闻的具体内容
    </div>
  </a-modal>
</template>

<script >
export default {
  name: 'NoticeDetail',
  data() {
    return {}
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    cate: {
      type: Number
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
    statusText() {
      const { module } = this
      return module.label
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
