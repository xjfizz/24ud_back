<template>
  <a-select
    :placeholder="option.placeholder"
    :style="styleObj"
    :allowClear="true"
    @change="onChange($event, option.field)"
  >
    <a-select-option
      v-for="item in option.children"
      :key="item.value"
      :value="item.value"
    >{{ item.title }}</a-select-option>
  </a-select>
</template>

<script >
import ToolMixins from '@/mixins/tool'

export default {
  name: 'SSelect',
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    onChange(value, field) {
      const param = {}
      param[field] = value
      this.$emit('change', param)
    }
  },
  mixins: [ToolMixins]
}
</script>