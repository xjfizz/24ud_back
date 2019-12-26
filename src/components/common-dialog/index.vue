<template>
  <a-modal
    :footer="null"
    :closable="closable"
    :visible="visible"
    @cancel="handleClose"
    :mask="mask"
    :width="width"
  >
    <slot name="title"/>
    <slot name="content"/>
    <slot name="footer"/>
  </a-modal>
</template>

<script >
export default {
  name: 'CommonDialog',
  props: {
    options: {
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
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
