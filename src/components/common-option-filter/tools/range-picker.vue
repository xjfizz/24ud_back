<template>
  <a-range-picker @change="onChange" :style="styleObj"/>
</template>

<script >
import ToolMixins from '@/mixins/tool'

export default {
  name: 'SSelect',
  props: {
    option: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    format() {
      return this.option.format || 'YYYY-MM-DD'
    }
  },
  methods: {
    onChange(picker, field) {
      const { format } = this
      const [startTime, endTime] = picker.map(item => item.format(format))
      this.$emit('change', { startTime, endTime })
    }
  },
  mixins: [ToolMixins]
}
</script>