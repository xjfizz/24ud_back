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
  name: 'SCascaderSplit',
  data() {
    return {
      params: {},
      fields: []
    }
  },
  mounted() {
    const { fields } = this.option
    this.fields = fields
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onChange(values) {
      const { fields } = this
      const params = {}
      fields.forEach((field, index) => {
        const value = values[index] || ''
        params[field] = value
      })

      console.log(params)

      this.$emit('change', params)
    }
  },
  mixins: [ToolMixins]
}
</script>