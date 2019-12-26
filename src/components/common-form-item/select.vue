<template>
  <a-select
    :placeholder="option.placeholder"
    style="width: 200px"
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
export default {
  name: 'SSelect',
  data() {
    return {
      clear: true
    }
  },
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
  }
}
</script>