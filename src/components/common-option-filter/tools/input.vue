<template>
  <a-input
    :style="inputStyle"
    :addonBefore="option.addonBefore"
    @change="handleInput"
    :placeholder="inputPlaceholder"
    v-model="inputValue"
  />
</template>

<script >
import ToolMixins from '@/mixins/tool'

export default {
  name: 'SInput',
  data() {
    return {
      timer: null,
      params: {},
      field: '',
      inputValue: ''
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    },
  },
  mounted() {
    const { field = 'place_ignore', value = '' } = this.option
    this.params[field] = value
    this.field = field
  },
  computed: {
    inputPlaceholder() {
      const { placeholder = '输入查询的内容' } = this.option
      return placeholder
    },
    inputStyle() {
      const { style } = this.option
      return style || {}
    },
    // inputValue() {
    //   const { value } = this.option
    //   return value
    // }
  },
  methods: {
    handleInput(input) {
      const { target } = input
      const value = target.value
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
          const { params, field } = this
          params[field] = value
          this.$emit('change', params)
          this.timer = null
        }, 200)
    },
    // 下拉框改变触发input清空
    clear() {
      this.inputValue = ''
    }
  },
  mixins: [ToolMixins]
}
</script>
