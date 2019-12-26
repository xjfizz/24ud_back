<template>
  <a-input-group compact class="a-input-group">
    <a-select
      :defaultValue="option.value"
      class="a-input-select"
      @change="handleFieldChange"
      :style="selectStyle"
    >
      <a-select-option
        :value="item.value"
        v-for="item in option.select.children"
        :key="item.value"
      >{{ item.title }}</a-select-option>
    </a-select>
    <s-input :option="option.input" @change="input"/>
    <!-- <a-input :style="inputStyle" @change="handleInput" :placeholder="inputPlacehodler"/> -->
  </a-input-group>
</template>

<script >
import ToolMixins from '@/mixins/tool'
import SInput from './input'

export default {
  name: 'SInputSelect',
  data() {
    return {
      field: '',
      timer: null
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.field = this.option.value
  },
  computed: {
    inputPlacehodler() {
      const { placehodler = '输入查询的内容' } = this.option.input
      return placehodler
    },
    selectStyle() {
      const { width = '100' } = this.option.select
      return { width: `${width}px` }
    }
  },
  methods: {
    handleFieldChange(value) {
      this.field = value
    },
    input(param) {
      const { place_ignore } = param
      const { field } = this
      const params = {}
      params[field] = place_ignore
      this.$emit('change', params)
    }
  },
  mixins: [ToolMixins],
  components: { SInput }
}
</script>
<style lang="less" scoped>
.s-input-group {
  display: flex;
}
</style>