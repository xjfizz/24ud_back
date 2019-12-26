<template>
  <a-input
    v-if="!option.slot"
    v-decorator="[
                `field-${option.index}`,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
    :placeholder="option.placeholder"
  />
</template>

<script >
export default {
  name: 'SInput',
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