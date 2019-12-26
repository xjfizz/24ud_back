<template>
  <header>
    <span>运单详情</span>
    <span>运单编号EW23123123223</span>
    <span>待发件</span>
  </header>
</template>

<script >
export default {
  name: 'CommonDetailLogger',
  data() {
    return {
    }
  },
  props: {
    options: {
      type: Object,
      default: () => {}
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