<template>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="FORM" @submit="handleSubmit">
      <template
        v-for="item in fields"
        :slot="item.field"
        slot-scope="option"
        :record="option"
      >
      <!-- <slot :name="tem.field" :record="option"/> -->
      </template>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">Search</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import FormMixis from '@/mixins/form'

export default {
  data() {
    return {
      expand: false,
      fields: [{ field: 'one', label: '第一' }, { field: 'two', label: '第二' }]
    }
  },
  mixins: [FormMixis],
  props: {
    // fields: {
    //   type: Array,
    //   default: () => {}
    // }
  },
  methods: {
    handleReset() {
      this.form.resetFields()
    },

    toggle() {
      this.expand = !this.expand
    }
  }
}
</script>
