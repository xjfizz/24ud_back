<template>
  <span>
    <a-popconfirm title="你确定删除么?" @confirm="onDelete">
      <a-icon slot="icon" type="question-circle-o" style="color: red"/>
      <a
        :type="btn.color"
        :icon="btn.icon"
        class="btn"
      >{{btn.title}}</a>
    </a-popconfirm>
  </span>
</template>

<script>
export default {
  name: 'CommonDelete',
  props: {
    btn: {
      type: Object,
      default: () => { }
    },
    row: {
      type: Object
    }
  },
  methods: {
    onDelete() {
      const {row , btn} = this
      this.$emit('trigger', row, btn)
    }
  }
}
</script>
