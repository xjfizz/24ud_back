<template>
  <div>
    <a-select
      :defaultValue="option.value"
      class="a-input-select"
      :style="selectStyle"
      :placeholder="option.select.placeholder || ''"
      @change="handleFieldChange"
      allowClear
      :labelInValue="true"
      :options="option.select.children"
    >
      <!-- <a-select-option
        :value="item.value"
        v-for="item in option.select.children"
        :key="item.value"
      >{{ item.title }}</a-select-option>-->
    </a-select>
    <a-range-picker @change="onChange"/>
  </div>
</template>

<script >
import ToolMixins from '@/mixins/tool'
import SRangePicker from './range-picker'

export default {
  name: 'SPickerSelect',
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
    selectStyle() {
      const { width = '100' } = this.option.select
      return { width: `${width}px` }
    },
    format() {
      return this.option.format || 'YYYY-MM-DD'
    }
  },
  methods: {
    handleFieldChange(fields) {
      this.field = fields.key
    },
    onChange(picker) {
      const { format } = this
      const [startTime, endTime] = picker.map(item => item.format(format))
      const { field } = this
      const params = {
        timeType: this.field,
        startTime,
        endTime
      }
      this.$emit('change', params)
    }
  },
  mixins: [ToolMixins],
  components: { SRangePicker }
}
</script>
<style lang="less" scoped>
.s-input-group {
  display: flex;
}
</style>