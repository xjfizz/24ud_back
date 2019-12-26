<template>
  <span>{{putTime}}</span>
</template>

<script>
export default {
  name: 'CommonTime',
  props: {
    row: {
      type: Object,
      default: () => { }
    },
    prefix: {
      type: String,
      default: ' ~ '
    }
  },
  computed: {
    putTime() {
      let { row = {}, prefix} = this
      if (!row.endTime) prefix = ''
      return `${row.startTime}${prefix}${row.endTime}`
    }
  }
}
</script>
