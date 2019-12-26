<template>
  <a-cascader
    :options="option.children"
    @change="onChange($event, option.field)"
    expandTrigger="hover"
    :placeholder="option.placeholder"
  />
</template>

<script >
import ToolMixins from '@/mixins/tool'

export default {
  name: 'SCascader',
  data() {
    return {
      params: {},
      filed: ''
    }
  },
  mounted() {
    const { field } = this.option
    this.field = field
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onChange(value) {
      const { params, field } = this
      params[field] = value
      this.$emit('change', params)
    }
  },
  mixins: [ToolMixins]
}
</script>