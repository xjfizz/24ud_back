<template>
<div>
    <a-radio-group
    :placeholder="option.placeholder"
    buttonStyle="solid"
    :defaultValue="option.defaultValue"
    :allowClear="true"
    @change="onChange($event, option.field)"
  >
    <a-radio-button
      v-for="item in option.children"
      :key="item.value"
      :value="item.value"
      @click="handleChange(item)"
    >{{item.label}}</a-radio-button>
  </a-radio-group>
</div>
</template>

<script >
import ToolMixins from '@/mixins/tool'

export default {
  name: 'SSelect',
  props: {
    option: {
      type: Object,
      default: () => {}
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