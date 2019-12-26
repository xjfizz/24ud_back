<template>
  <a-form layout="inline">
    <a-form-item class="option-item" v-for="option in options" :key="option.placeholder">
      <template v-if="option.slot">
        <slot :name="option.slot"/>
      </template>
      <template v-else>
        <component :is="option.component" :option="option" @change="onChange"></component>
      </template>
    </a-form-item>
  </a-form>
</template>

<script >
import * as components from './tools'

export default {
  name: 'CommonOptionFilter',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange(params) {
      this.$emit('change', params)
    }
  },
  components: components.default
}
</script>

<style scoped lang="less">
.option-item {
  margin-right: 10px;
}
</style>
