<template>
  <a-cascader
    :options="siteListTree"
    @change="onChange($event)"
    expandTrigger="hover"
    :placeholder="option.placeholder"
  />
</template>

<script >
import ToolMixins from '@/mixins/tool'
import { mapGetters } from 'vuex'

export default {
  name: 'SCascader',
  data() {
    return {
      params: {},
      filed: ''
    }
  },
  computed: {
    ...mapGetters(['siteListTree'])
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
      params[field] = value.slice().pop()
      this.$emit('change', params)
    }
  },
  mixins: [ToolMixins]
}
</script>